// src/controllers/subscription.js
const Subscription = require('../models/subscription');
const { sequelize } = require('../database');

// --- Normalizador de body (camelCase → snake_case)
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

// Relación de planes locales con los preapproval de MP
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

// 👇 NUEVO: función para decidir cuándo una suscripción de MP está realmente activa
function isActiveMpStatus(status) {
  const s = String(status || '').toLowerCase();
  // Ajustable si MP usa otros estados, pero típicamente 'authorized' o 'active'
  return s === 'authorized' || s === 'active';
}

// ---- Crear preapproval o fallback a init_point del plan
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id, payer_email } = req.body;

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

    // 1) Intento “API”: crear preapproval
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
      // 2) Fallback “checkout del plan” si MP pide tarjeta
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

// ---- Confirmación (preapproval_id o búsqueda robusta)
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, plan_id } = req.body;
    if (!commerce_id) {
      return res.status(400).json({ error: 'commerce_id es requerido' });
    }

    // 🧩 Caso 1: viene explícito el preapproval_id
    if (preapproval_id) {
      const mp = await mpGet(`/preapproval/${preapproval_id}`);
      const mpStatus = String(mp.status || '').toLowerCase();

      if (!isActiveMpStatus(mpStatus)) {
        // ❌ NO persistimos nada si todavía está pendiente o en otro estado
        return res.status(409).json({
          error: 'La suscripción aún no está activa en Mercado Pago',
          mp_status: mp.status,
          mp_id: mp.id,
        });
      }

      // ✅ Solo acá persistimos en tu BD
      return await persistLocalAndReply({ mp, plan_id, commerce_id, res });
    }

    // 🧩 Caso 2: búsqueda por commerce + plan
    const preapprovalPlanId = PLAN_ID_MAP[Number(plan_id)] || null;
    const baseParams = { external_reference: String(commerce_id), limit: '5' };
    if (preapprovalPlanId) baseParams.preapproval_plan_id = preapprovalPlanId;

    const searchVariants = [
      (p) => new URLSearchParams({ ...p, sort: 'date_created:desc' }),
      (p) => new URLSearchParams({ ...p, sort: 'date_created', criteria: 'desc' }),
      (p) => new URLSearchParams({ ...p }),
    ];

    const pickLatestAuthorized = (results) => {
      if (!Array.isArray(results)) return null;

      const filtered = results
        // 👇 solo suscripciones con estado activo en MP
        .filter((r) => isActiveMpStatus(r.status))
        .filter((r) => !preapprovalPlanId || r.preapproval_plan_id === preapprovalPlanId);

      filtered.sort((a, b) => {
        const ta = new Date(a.date_created || a.created_at || 0).getTime();
        const tb = new Date(b.date_created || b.created_at || 0).getTime();
        return tb - ta;
      });

      return filtered[0];
    };

    let found = null;
    let lastErr = null;

    for (const build of searchVariants) {
      const qs = build(baseParams).toString();
      try {
        const list = await mpGet(`/preapproval/search?${qs}`);
        const chosen = pickLatestAuthorized(list?.results);
        if (chosen) {
          found = chosen;
          break;
        }
      } catch (e) {
        lastErr = e;
        const msg = (e?.details?.message || e?.message || '').toLowerCase();
        if (!msg.includes('invalid sorting')) break;
      }
    }

    if (!found) {
      if (lastErr) {
        return res
          .status(lastErr?.status || 400)
          .json({ error: 'Error buscando preapproval en MP', details: lastErr.details });
      }
      return res.status(409).json({
        error: 'No hay una suscripción activa para este comercio en Mercado Pago',
      });
    }

    // (por seguridad, aunque ya filtramos antes)
    const foundStatus = String(found.status || '').toLowerCase();
    if (!isActiveMpStatus(foundStatus)) {
      return res.status(409).json({
        error: 'La suscripción aún no está activa en Mercado Pago',
        mp_status: found.status,
        mp_id: found.id,
      });
    }

    return await persistLocalAndReply({ mp: found, plan_id, commerce_id, res });
  } catch (error) {
    console.error('Error confirmando suscripción:', error);
    return res.status(500).json({ error: 'Error interno confirmando la suscripción' });
  }
};

// ---- Pasar a plan Free (upsert a plan_id = 1)
exports.downgradeToFree = async (req, res) => {
  try {
    const { commerce_id } = req.body || {};
    if (!commerce_id) {
      return res.status(400).json({ error: 'commerce_id es requerido' });
    }
    let sub;
    await sequelize.transaction(async (t) => {
      const existing = await Subscription.findOne({
        where: { commerce_id: Number(commerce_id) },
        transaction: t,
        lock: t.LOCK.UPDATE,
      });

      if (!existing) {
        sub = await Subscription.create(
          { commerce_id: Number(commerce_id), plan_id: 1 },
          { transaction: t }
        );
      } else if (existing.plan_id !== 1) {
        await existing.update({ plan_id: 1 }, { transaction: t });
        sub = existing;
      } else {
        sub = existing;
      }
    });

    return res.status(200).json({ ok: true, message: 'Comercio pasado a plan gratuito', subscription: sub });
  } catch (error) {
    console.error('Error en downgrade a Free:', error);
    return res.status(500).json({ error: 'No se pudo pasar a plan gratuito' });
  }
};

// ---- Helpers persistencia
async function persistLocalAndReply({ mp, plan_id, commerce_id, res }) {
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
}

// ---- CRUD / Listados ----
exports.findAllSubscriptions = async (_req, res) => {
  try {
    const subscriptions = await Subscription.findAll();
    res.status(200).json(subscriptions);
  } catch (error) {
    console.error('Error fetching Subscriptions:', error);
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
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
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const { id } = req.params;
    const subscription = await Subscription.findByPk(id);
    if (subscription) {
      await subscription.update(req.body || {});
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ error: `Subscription not found with id: ${id}` });
    }
  } catch (error) {
    console.error('Error updating Subscription:', error);
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
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
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
  }
};

exports.findSubscriptionsByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    const subscriptions = await Subscription.findAll({ where: { commerce_id: Number(commerceId) } });
    // devolvemos 200 con [] si no hay nada (front interpreta como plan 1)
    res.status(200).json(subscriptions || []);
  } catch (error) {
    console.error('Error fetching Subscriptions by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
  }
};

exports.findSubscriptionsByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    const subscriptions = await Subscription.findAll({ where: { plan_id: Number(planId) } });
    res.status(200).json(subscriptions || []);
  } catch (error) {
    console.error('Error fetching Subscriptions by Plan ID:', error);
    res.status(409).json({ error: 'Conflict', message: error?.message || String(error) });
  }
};

const { getBenefitsByCommerceId } = require('../services/subscriptionBenefitsService');

exports.getBenefitsByCommerceId = async (req, res) => {
  try {
    const { commerceId } = req.params;
    if (!commerceId) return res.status(400).json({ error: 'commerceId es requerido' });

    const benefits = await getBenefitsByCommerceId(commerceId);

    // devolvemos JSON plano (sin metadata pesada de Sequelize)
    return res.status(200).json({
      plan_id: benefits.plan_id,
      max_publications: benefits.max_publications, // null = ilimitadas
      can_add_stock: benefits.can_add_stock,
      commerce_listing_visibility: benefits.commerce_listing_visibility,
      access_reports: benefits.access_reports,
      manage_employees_roles: benefits.manage_employees_roles,
      better_search_position: benefits.better_search_position,
      exclusive_promotions: benefits.exclusive_promotions,
    });
  } catch (e) {
    console.error('Error getBenefitsByCommerceId:', e);
    return res.status(500).json({ error: 'Error obteniendo beneficios' });
  }
};

