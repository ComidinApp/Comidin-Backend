// src/controllers/subscription.js
const Subscription = require('../models/subscription');
const { sequelize } = require('../database');

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

// ---- Helpers Mercado Pago
async function mpFetch(path, init = {}) {
  const url = `https://api.mercadopago.com${path}`;
  const headers = {
    Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    'Content-Type': 'application/json',
    ...(init.headers || {}),
  };
  const r = await fetch(url, { ...init, headers });
  const text = await r.text();
  let json;
  try { json = JSON.parse(text); } catch { json = { raw: text }; }
  if (!r.ok) {
    const err = new Error(json?.message || json?.error || `Mercado Pago ${r.status}`);
    err.status = r.status;
    err.details = json;
    throw err;
  }
  return json;
}
const mpGet  = (path) => mpFetch(path, { method: 'GET' });
const mpPost = (path, body) => mpFetch(path, { method: 'POST', body: JSON.stringify(body) });

// crea el preapproval en MP y, si MP exige card_token, hace fallback a init_point del plan
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id, payer_email } = req.body;

    // Validaciones básicas
    if (![2, 3].includes(Number(plan_id))) {
      return res.status(400).json({ error: 'Plan inválido. Solo Estándar (2) o Premium (3).' });
    }
    if (!commerce_id) return res.status(400).json({ error: 'commerce_id es requerido' });
    if (!payer_email) return res.status(400).json({ error: 'payer_email es requerido' });

    if (!process.env.MP_ACCESS_TOKEN) {
      return res.status(500).json({ error: 'MP_ACCESS_TOKEN no configurado en el servidor' });
    }
    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({ error: 'FRONTEND_URL no configurado en el servidor' });
    }

    const preapprovalPlanId = PLAN_ID_MAP[Number(plan_id)];
    if (!preapprovalPlanId || String(preapprovalPlanId).trim() === '') {
      return res.status(500).json({ error: 'El preapproval_plan_id de MP no está configurado' });
    }

    // 1) Intento “API”: crear preapproval (algunas cuentas lo permiten)
    const payload = {
      preapproval_plan_id: preapprovalPlanId,
      reason: Number(plan_id) === 2 ? 'Suscripción Estándar' : 'Suscripción Premium',
      payer_email: String(payer_email).trim(),
      external_reference: String(commerce_id),
      back_url: `${process.env.FRONTEND_URL}/mi-cuenta/suscripciones/resultado`,
      status: 'pending',
    };

    try {
      const mp = await mpPost('/preapproval', payload);
      return res.status(201).json({
        id: mp.id,
        init_point: mp.init_point,
        sandbox_init_point: mp.sandbox_init_point,
        mode: 'preapproval_api',
      });
    } catch (e) {
      // 2) Fallback “checkout del plan”: si MP pide tarjeta, devolvemos el init_point del plan
      const needsCardToken =
        (e?.details?.message || '').toLowerCase().includes('card_token_id is required');

      if (!needsCardToken) {
        const status = e?.status || 400;
        return res.status(status).json({
          error: 'Error creando preapproval en MP',
          details: e?.details || { message: e?.message || 'Solicitud rechazada por MP' },
        });
      }

      const planInfo = await mpGet(`/preapproval_plan/${preapprovalPlanId}`);
      if (!planInfo?.init_point) {
        return res.status(502).json({
          error: 'No se pudo obtener el init_point del plan',
          details: planInfo || null,
        });
      }

      return res.status(200).json({
        id: null,
        init_point: planInfo.init_point,
        sandbox_init_point: planInfo.init_point,
        mode: 'plan_init_point_fallback',
      });
    }
  } catch (error) {
    const status = error?.status || 400;
    return res.status(status).json({
      error: 'Error creando preapproval en MP',
      details: error?.details || { message: error?.message || 'Solicitud rechazada por MP' },
    });
  }
};

// se llama al volver del checkout, confirma con MP y guarda en la base
// Opción B: si NO viene preapproval_id, buscamos con /preapproval/search por external_reference (+ plan)
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, plan_id } = req.body;

    if (!commerce_id) {
      return res.status(400).json({ error: 'commerce_id es requerido' });
    }

    // Traer info de MP:
    let mp;
    if (preapproval_id) {
      mp = await mpGet(`/preapproval/${preapproval_id}`);
    } else {
      // Fallback: buscar por external_reference (y plan si vino)
      const preapprovalPlanId = PLAN_ID_MAP[Number(plan_id)] || null;
      const params = new URLSearchParams({
        external_reference: String(commerce_id),
        sort: 'date_created',
        criteria: 'desc',
        limit: '1',
      });
      if (preapprovalPlanId) params.set('preapproval_plan_id', preapprovalPlanId);

      const list = await mpGet(`/preapproval/search?${params.toString()}`);
      const found = list?.results?.[0];
      if (!found) {
        return res.status(409).json({
          error: 'No encontré preapproval para este comercio en MP',
          hint: 'Revisá el back_url del plan y que el flujo haya completado el checkout',
        });
      }
      mp = found;
    }

    // Para TESTING: persistimos mientras no esté cancelada
    if (String(mp.status || '').toLowerCase() === 'cancelled') {
      return res.status(409).json({ error: 'La suscripción está cancelada', mp_status: mp.status, mp_id: mp.id });
    }

    // Resolver plan local desde el preapproval_plan_id si no lo mandaron
    const INVERSE_PLAN_ID_MAP = Object.entries(PLAN_ID_MAP).reduce((acc, [localId, mpPlanId]) => {
      if (mpPlanId) acc[mpPlanId] = Number(localId);
      return acc;
    }, {});

    let resolvedPlanId = Number(plan_id);
    if (!resolvedPlanId && mp.preapproval_plan_id) {
      const foundLocal = INVERSE_PLAN_ID_MAP[mp.preapproval_plan_id];
      if (foundLocal) resolvedPlanId = Number(foundLocal);
    }
    if (![2, 3].includes(resolvedPlanId)) {
      return res.status(400).json({ error: 'No pude resolver el plan local' });
    }

    // Upsert por commerce_id
    let sub;
    await sequelize.transaction(async (t) => {
      const existing = await Subscription.findOne({
        where: { commerce_id: Number(commerce_id) },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!existing) {
        sub = await Subscription.create(
          { commerce_id: Number(commerce_id), plan_id: resolvedPlanId },
          { transaction: t }
        );
      } else if (existing.plan_id !== resolvedPlanId) {
        await existing.update({ plan_id: resolvedPlanId }, { transaction: t });
        sub = existing;
      } else {
        sub = existing;
      }
    });

    return res.status(200).json({ ok: true, subscription: sub, mp_status: mp.status, mp_id: mp.id });
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
