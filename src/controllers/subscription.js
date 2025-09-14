
const Subscription = require('../models/subscription');

// helper para normalizar el body que viene del front
function normalizeBody(req, _res, next) {
  const b = req.body || {};
  if (b.planId != null && req.body.plan_id == null) req.body.plan_id = b.planId;
  if (b.commerceId != null && req.body.commerce_id == null) req.body.commerce_id = b.commerceId;
  if (b.email && !req.body.payer_email) req.body.payer_email = b.email;

  if (req.body.plan_id != null) req.body.plan_id = Number(req.body.plan_id);
  if (req.body.commerce_id != null) req.body.commerce_id = Number(req.body.commerce_id);
  next();
}
exports.normalizeBody = normalizeBody;

// relación de planes locales con los preapproval de MP
const PLAN_ID_MAP = {
  2: process.env.MP_PLAN_STD,   // Estándar
  3: process.env.MP_PLAN_PREM,  // Premium
};

// crea el link de checkout de MP según el plan elegido
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id, payer_email } = req.body;

    if (![2, 3].includes(Number(plan_id))) {
      return res.status(400).json({ error: 'Plan inválido. Solo Estándar (2) o Premium (3).' });
    }
    if (!commerce_id) return res.status(400).json({ error: 'commerce_id es requerido' });
    if (!payer_email) return res.status(400).json({ error: 'payer_email es requerido' });

    const preapprovalPlanId = PLAN_ID_MAP[Number(plan_id)];
    if (!preapprovalPlanId) {
      return res.status(500).json({ error: 'El plan de MP no está configurado en el servidor' });
    }

    const link = `https://www.mercadopago.com.ar/subscriptions/checkout?preapproval_plan_id=${preapprovalPlanId}`;

    return res.status(201).json({
      link,
      plan: Number(plan_id) === 2 ? 'Estándar' : 'Premium',
      commerce_id,
      payer_email,
    });
  } catch (error) {
    console.error('Error creando suscripción:', error);
    return res.status(500).json({ error: 'No se pudo crear la suscripción', message: error?.message });
  }
};

// se llama al volver del checkout, confirma con MP y guarda en la base
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, payer_email, plan_id } = req.body;

    if (!preapproval_id) return res.status(400).json({ error: 'preapproval_id es requerido' });
    if (!commerce_id)   return res.status(400).json({ error: 'commerce_id es requerido' });
    if (!payer_email)   return res.status(400).json({ error: 'payer_email es requerido' });

    // pedimos el detalle de la suscripción a MP
    const r = await fetch(`https://api.mercadopago.com/preapproval/${preapproval_id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    if (!r.ok) {
      const t = await r.text().catch(() => '');
      return res.status(502).json({ error: 'Error consultando Mercado Pago', details: t });
    }
    const mp = await r.json();

    // solo seguimos si está autorizada
    if (mp.status !== 'authorized') {
      return res.status(409).json({ error: 'La suscripción todavía no está autorizada', mp_status: mp.status });
    }

    // resolvemos qué plan local es (puede venir en el body o lo inferimos del preapproval_plan_id)
    let resolvedPlanId = Number(plan_id);
    if (!resolvedPlanId && mp.preapproval_plan_id) {
      const found = Object.entries(PLAN_ID_MAP).find(([, val]) => val === mp.preapproval_plan_id);
      if (found) resolvedPlanId = Number(found[0]);
    }
    if (![2, 3].includes(resolvedPlanId)) {
      return res.status(400).json({ error: 'No pude resolver el plan local' });
    }

    // guardamos la suscripción local, si ya existe no la duplica
    const [sub, created] = await Subscription.findOrCreate({
      where: { commerce_id: Number(commerce_id), plan_id: resolvedPlanId },
      defaults: { commerce_id: Number(commerce_id), plan_id: resolvedPlanId }
    });

    return res.status(200).json({ ok: true, created, subscription: sub });
  } catch (error) {
    console.error('Error confirmando suscripción:', error);
    return res.status(500).json({ error: 'Error interno confirmando la suscripción' });
  }
};

// webhook opcional de MP (si configurás notificaciones)
// en general no viene info suficiente para asociar, por eso el confirm del front es importante
exports.webhook = async (req, res) => {
  try {
    const { type, data } = req.body || {};
    if (type === 'preapproval' && data?.id) {
      // acá se podría volver a consultar a MP con data.id
    }
    res.status(200).send('OK');
  } catch (e) {
    console.error('Webhook error', e);
    res.status(200).send('OK');
  }
};

// --------- CRUD locales ---------
exports.findAllSubscriptions = async (_req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching Subscriptions:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findSubscriptionById = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);
    if (subscription) res.status(200).json(subscription);
    else res.status(404).json({ error: `Subscription not found with id: ${id}` });
  } catch (error) {
    console.error('Error fetching Subscription by ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);
    if (subscription) {
      await subscription.update(body);
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ error: `Subscription not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Subscription:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);
    if (subscription) {
      await subscription.destroy();
      res.status(200).json({ message: 'Subscription successfully deleted' });
    } else {
      res.status(404).json({ error: `Subscription not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error deleting Subscription:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findSubscriptionsByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const subscriptions = await Subscription.findSubscriptionsByCommerceId(commerceId);
    if (subscriptions && subscriptions.length > 0) res.status(200).json(subscriptions);
    else res.status(404).json({ message: 'No subscriptions found for this commerce.' });
  } catch (error) {
    console.error('Error fetching Subscriptions by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findSubscriptionsByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    const subscriptions = await Subscription.findSubscriptionsByPlanId(planId);
    if (subscriptions && subscriptions.length > 0) res.status(200).json(subscriptions);
    else res.status(404).json({ message: 'No subscriptions found for this plan.' });
  } catch (error) {
    console.error('Error fetching Subscriptions by Plan ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

// endpoint para bajar al plan gratis: elimina subs locales del comercio
exports.downgradeToFree = async (req, res) => {
  try {
    const { commerce_id } = req.body || {};
    if (!commerce_id) {
      return res.status(400).json({ error: 'commerce_id es requerido' });
    }

    await Subscription.destroy({ where: { commerce_id: Number(commerce_id) } });

    return res.status(200).json({ ok: true, message: 'Comercio pasado a plan gratuito' });
  } catch (error) {
    console.error('Error en downgrade a Free:', error);
    return res.status(500).json({ error: 'No se pudo pasar a plan gratuito' });
  }
};
