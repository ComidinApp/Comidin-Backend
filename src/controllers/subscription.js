// src/controllers/subscription.js
const Subscription = require('../models/subscription');
const { sequelize } = require('../database'); // para usar transacciones

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

// crea el preapproval en MP y devuelve id/init_point (en lugar de solo armar un link)
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

    // ✅ Crear preapproval vía API de Mercado Pago para obtener id e init_point
    const r = await fetch('https://api.mercadopago.com/preapproval', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        preapproval_plan_id: preapprovalPlanId,
        reason: Number(plan_id) === 2 ? 'Suscripción Estándar' : 'Suscripción Premium',
        payer_email,
        external_reference: String(commerce_id), // importante para identificar comercio
        back_url: `${process.env.FRONTEND_URL}/mi-cuenta/suscripciones/resultado`,
        status: 'pending',
      }),
    });

    const payload = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(r.status).json({ error: 'Error creando preapproval en MP', details: payload });
    }

    // payload incluye: id (preapproval_id), init_point/sandbox_init_point, etc.
    return res.status(201).json(payload);
  } catch (error) {
    console.error('Error creando suscripción:', error);
    return res.status(500).json({ error: 'No se pudo crear la suscripción', message: error?.message });
  }
};

// se llama al volver del checkout, confirma con MP y guarda en la base
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, plan_id } = req.body;

    if (!preapproval_id) return res.status(400).json({ error: 'preapproval_id es requerido' });
    if (!commerce_id)   return res.status(400).json({ error: 'commerce_id es requerido' });

    // pedimos el detalle de la suscripción a MP
    const r = await fetch(`https://api.mercadopago.com/preapproval/${preapproval_id}`, {
      headers: { Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}` }
    });
    const mp = await r.json().catch(() => ({}));
    if (!r.ok) {
      return res.status(502).json({ error: 'Error consultando Mercado Pago', details: mp });
    }

    // solo seguimos si está autorizada
    if (mp.status !== 'authorized') {
      return res.status(409).json({ error: 'La suscripción todavía no está autorizada', mp_status: mp.status });
    }

    // resolvemos qué plan local es (puede venir en el body o lo inferimos del preapproval_plan_id)
    const INVERSE_PLAN_ID_MAP = Object.entries(PLAN_ID_MAP).reduce((acc, [localId, mpPlanId]) => {
      if (mpPlanId) acc[mpPlanId] = Number(localId);
      return acc;
    }, {});

    let resolvedPlanId = Number(plan_id);
    if (!resolvedPlanId && mp.preapproval_plan_id) {
      const found = INVERSE_PLAN_ID_MAP[mp.preapproval_plan_id];
      if (found) resolvedPlanId = Number(found);
    }
    if (![2, 3].includes(resolvedPlanId)) {
      return res.status(400).json({ error: 'No pude resolver el plan local' });
    }

    // garantizamos solo un plan activo por comercio
    let sub;
    await sequelize.transaction(async (t) => {
      const existing = await Subscription.findOne({
        where: { commerce_id: Number(commerce_id) },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!existing) {
        sub = await Subscription.create(
          {
            commerce_id: Number(commerce_id),
            plan_id: resolvedPlanId,
            // opcional: si tenés columnas, podés guardar info útil de MP:
            // mp_preapproval_id: mp.id,
            // payer_email: mp?.payer_email || null,
            // next_payment_date: mp?.auto_recurring?.next_payment_date || null,
          },
          { transaction: t }
        );
      } else if (existing.plan_id !== resolvedPlanId) {
        await existing.update(
          {
            plan_id: resolvedPlanId,
            // opcional: mp_preapproval_id / payer_email / next_payment_date
          },
          { transaction: t }
        );
        sub = existing;
      } else {
        sub = existing; // ya estaba en el mismo plan
      }
    });

    return res.status(200).json({ ok: true, subscription: sub });
  } catch (error) {
    console.error('Error confirmando suscripción:', error);
    return res.status(500).json({ error: 'Error interno confirmando la suscripción' });
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
