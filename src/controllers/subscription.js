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

const PLAN_ID_MAP = {
  2: process.env.MP_PLAN_STD,
  3: process.env.MP_PLAN_PREM,
};

// Helpers Mercado Pago
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

// crea el preapproval
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id, payer_email } = req.body;
    if (![2, 3].includes(Number(plan_id))) return res.status(400).json({ error: 'Plan inválido.' });
    if (!commerce_id) return res.status(400).json({ error: 'commerce_id es requerido' });
    if (!payer_email) return res.status(400).json({ error: 'payer_email es requerido' });

    const preapprovalPlanId = PLAN_ID_MAP[Number(plan_id)];
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
      const needsCardToken =
        (e?.details?.message || '').toLowerCase().includes('card_token_id is required');
      if (!needsCardToken) throw e;

      const planInfo = await mpGet(`/preapproval_plan/${preapprovalPlanId}`);
      return res.status(200).json({
        id: null,
        init_point: planInfo.init_point,
        sandbox_init_point: planInfo.init_point,
        mode: 'plan_init_point_fallback',
      });
    }
  } catch (error) {
    return res.status(error?.status || 400).json({ error: error.message, details: error.details });
  }
};

// confirmar suscripción (versión mejorada)
exports.confirmSubscription = async (req, res) => {
  try {
    const { preapproval_id, commerce_id, plan_id } = req.body;
    if (!commerce_id) return res.status(400).json({ error: 'commerce_id es requerido' });

    if (preapproval_id) {
      const mp = await mpGet(`/preapproval/${preapproval_id}`);
      if (String(mp.status || '').toLowerCase() === 'cancelled') {
        return res.status(409).json({ error: 'La suscripción está cancelada', mp_status: mp.status });
      }
      return await persistLocalAndReply({ mp, plan_id, commerce_id, res });
    }

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
        .filter(r => String(r.status || '').toLowerCase() !== 'cancelled')
        .filter(r => !preapprovalPlanId || r.preapproval_plan_id === preapprovalPlanId);
      filtered.sort((a, b) => {
        const ta = new Date(a.date_created || a.created_at || 0).getTime();
        const tb = new Date(b.date_created || b.created_at || 0).getTime();
        return tb - ta;
      });
      return filtered[0];
    };

    let found = null, lastErr = null;
    for (const build of searchVariants) {
      const qs = build(baseParams).toString();
      try {
        const list = await mpGet(`/preapproval/search?${qs}`);
        const chosen = pickLatestAuthorized(list?.results);
        if (chosen) { found = chosen; break; }
      } catch (e) {
        lastErr = e;
        const msg = (e?.details?.message || e?.message || '').toLowerCase();
        if (!msg.includes('invalid sorting')) break;
      }
    }

    if (!found) {
      if (lastErr) {
        return res.status(lastErr?.status || 400).json({ error: 'Error buscando preapproval en MP', details: lastErr.details });
      }
      return res.status(409).json({ error: 'No encontré preapproval para este comercio en MP' });
    }

    if (String(found.status || '').toLowerCase() === 'cancelled') {
      return res.status(409).json({ error: 'La suscripción está cancelada', mp_status: found.status });
    }

    return await persistLocalAndReply({ mp: found, plan_id, commerce_id, res });
  } catch (error) {
    console.error('Error confirmando suscripción:', error);
    return res.status(500).json({ error: 'Error interno confirmando la suscripción' });
  }
};

// Downgrade to Free
exports.downgradeToFree = async (req, res) => {
  try {
    const { commerce_id } = req.body || {};
    if (!commerce_id) return res.status(400).json({ error: 'commerce_id es requerido' });
    let sub;
    await sequelize.transaction(async (t) => {
      const existing = await Subscription.findOne({ where: { commerce_id }, transaction: t, lock: t.LOCK.UPDATE });
      if (!existing)
        sub = await Subscription.create({ commerce_id, plan_id: 1 }, { transaction: t });
      else if (existing.plan_id !== 1)
        sub = await existing.update({ plan_id: 1 }, { transaction: t });
      else sub = existing;
    });
    return res.status(200).json({ ok: true, message: 'Comercio pasado a plan gratuito', subscription: sub });
  } catch (error) {
    console.error('Error en downgrade a Free:', error);
    return res.status(500).json({ error: 'No se pudo pasar a plan gratuito' });
  }
};

// Helper persist
async function persistLocalAndReply({ mp, plan_id, commerce_id, res }) {
  const INVERSE_PLAN_ID_MAP = Object.entries(PLAN_ID_MAP).reduce((a, [k, v]) => { if (v) a[v] = Number(k); return a; }, {});
  let resolvedPlanId = Number(plan_id);
  if (!resolvedPlanId && mp.preapproval_plan_id) resolvedPlanId = INVERSE_PLAN_ID_MAP[mp.preapproval_plan_id];
  if (![2, 3].includes(resolvedPlanId)) return res.status(400).json({ error: 'No pude resolver el plan local' });

  let sub;
  await sequelize.transaction(async (t) => {
    const existing = await Subscription.findOne({ where: { commerce_id }, transaction: t, lock: t.LOCK.UPDATE });
    if (!existing)
      sub = await Subscription.create({ commerce_id, plan_id: resolvedPlanId }, { transaction: t });
    else if (existing.plan_id !== resolvedPlanId)
      sub = await existing.update({ plan_id: resolvedPlanId }, { transaction: t });
    else sub = existing;
  });
  return res.status(200).json({ ok: true, subscription: sub, mp_status: mp.status, mp_id: mp.id });
}
