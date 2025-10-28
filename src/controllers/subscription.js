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

async function mpGet(path) {
  return mpFetch(path, { method: 'GET' });
}

async function mpPost(path, body) {
  return mpFetch(path, { method: 'POST', body: JSON.stringify(body) });
}

// crea el preapproval en MP y devuelve id/init_point
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

    // (1) Verificar que el plan exista y pertenezca al token actual
    let planInfo;
    try {
      planInfo = await mpGet(`/preapproval_plan/${preapprovalPlanId}`);
      // opcional: podrías validar acá owner/collector_id si lo necesitas
    } catch (e) {
      // Si el plan no existe / no pertenece, típicamente devuelve 404 ó 401/403.
      const status = e?.status || 502;
      return res.status(status).json({
        error: 'El preapproval_plan_id no es válido para este access token',
        details: e?.details || { message: e?.message || 'Plan inválido o inaccesible' },
      });
    }

    // Payload mínimo para flujo con plan (redirección), forzamos 'pending'
    const payload = {
      preapproval_plan_id: preapprovalPlanId,
      reason: Number(plan_id) === 2 ? 'Suscripción Estándar' : 'Suscripción Premium',
      payer_email: String(payer_email).trim(),
      external_reference: String(commerce_id),
      back_url: `${process.env.FRONTEND_URL}/mi-cuenta/suscripciones/resultado`,
      status: 'pending', // <= importante para evitar modo "authorized" (tarjeta requerida)
    };

    // Log de diagnóstico (sanitizado)
    try {
      console.info('[MP PREAPPROVAL CREATE] payload:', {
        preapproval_plan_id: payload.preapproval_plan_id,
        reason: payload.reason,
        payer_email: payload.payer_email,
        external_reference: payload.external_reference,
        back_url: payload.back_url,
        status: payload.status,
      });
      console.info('[MP PREAPPROVAL PLAN CHECK] id:', preapprovalPlanId, 'active:', planInfo?.status || 'unknown');
    } catch {}

    const mp = await mpPost('/preapproval', payload);

    return res.status(201).json({
      id: mp.id,
      init_point: mp.init_point,
      sandbox_init_point: mp.sandbox_init_point,
    });
  } catch (error) {
    const status = error?.status || 400;
    return res.status(status).json({
      error: 'Error creando preapproval en MP',
      details: error?.details || { message: error?.message || 'Solicitud rechazada por MP' },
    });
  }
};

// se llama al volver del checkout, confirma con MP y guarda en la base
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, plan_id } = req.body;

    if (!preapproval_id) return res.status(400).json({ error: 'preapproval_id es requerido' });
    if (!commerce_id)   return res.status(400).json({ error: 'commerce_id es requerido' });

    // pedimos el detalle de la suscripción a MP
    const mp = await mpGet(`/preapproval/${preapproval_id}`);

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
            // next_payment_date: mp?.next_payment_date ? new Date(mp.next_payment_date) : null,
            // external_reference: mp?.external_reference || String(commerce_id),
          },
          { transaction: t }
        );
      } else if (existing.plan_id !== resolvedPlanId) {
        await existing.update(
          {
            plan_id: resolvedPlanId,
            // mp_preapproval_id: mp.id,
            // next_payment_date: mp?.next_payment_date ? new Date(mp.next_payment_date) : null,
            // external_reference: mp?.external_reference || String(commerce_id),
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
