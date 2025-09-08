
const mercadopago = require('mercadopago');
const Subscription = require('../models/subscription');

mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// Helpers
function getMpBody(res) {
  return res?.body ?? res?.response ?? res;
}

function normalizeBody(req, _res, next) {
  const b = req.body || {};
  if (b.planId != null && req.body.plan_id == null) req.body.plan_id = b.planId;
  if (b.commerceId != null && req.body.commerce_id == null) req.body.commerce_id = b.commerceId;
  if (b.email && !req.body.payer_email) req.body.payer_email = b.email;

  if (req.body.plan_id != null) req.body.plan_id = Number(req.body.plan_id);
  if (req.body.commerce_id != null) req.body.commerce_id = Number(req.body.commerce_id);
  return next();
}
exports.normalizeBody = normalizeBody;

/**
 * Crea la suscripción de Mercado Pago usando un preapproval_plan_id
 * (checkout de suscripciones). No hay fallback a tarjeta.
 */
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id, payer_email } = req.body;

    if (![2, 3].includes(Number(plan_id))) {
      return res.status(400).json({ error: 'Plan inválido. Solo Estándar (2) o Premium (3).' });
    }
    if (!commerce_id) {
      return res.status(400).json({ error: 'commerce_id es requerido' });
    }
    if (!payer_email) {
      return res.status(400).json({ error: 'payer_email (email) es requerido' });
    }

    const reason =
      Number(plan_id) === 2 ? 'Suscripción Estándar' : 'Suscripción Premium';
    const back_url = process.env.FRONTEND_URL || 'http://localhost:5173';
    const external_reference = `commerce-${commerce_id}-${Date.now()}`;

    // Map de planes desde variables de entorno
    const planIdMap = {
      2: process.env.MP_PLAN_STD,   // Estándar
      3: process.env.MP_PLAN_PREM,  // Premium
    };
    const preapprovalPlanId = planIdMap[Number(plan_id)];

    // Si falta el plan en .env, no llamamos a MP (evitamos "card_token_id is required")
    if (!preapprovalPlanId) {
      console.error('[Subscriptions] Falta preapproval_plan_id', {
        plan_id,
        MP_PLAN_STD: process.env.MP_PLAN_STD,
        MP_PLAN_PREM: process.env.MP_PLAN_PREM,
      });
      return res.status(500).json({
        error: 'No se pudo crear la suscripción',
        message:
          'Falta configurar MP_PLAN_STD / MP_PLAN_PREM o el ID no corresponde a esta cuenta.',
      });
    }

    // Payload estricto con preapproval_plan_id
    const payload = {
      preapproval_plan_id: preapprovalPlanId,
      payer_email,
      back_url,
      reason,
      external_reference,
    };

    console.log('[MP preapproval.create] payload =>', payload);

    const mpRes = await mercadopago.preapproval.create(payload);
    const body = getMpBody(mpRes);

    const link =
      body?.init_point ||
      body?.sandbox_init_point ||
      body?.redirect_url ||
      null;

    if (!link) {
      console.error('[Subscriptions] MP sin link en la respuesta', body);
      return res.status(500).json({
        error: 'No se pudo crear la suscripción',
        message: 'Mercado Pago no devolvió un enlace de checkout.',
      });
    }

    return res.status(201).json({
      link,
      id: body?.id || null,
      status: body?.status || null,
      plan: Number(plan_id) === 2 ? 'Estándar' : 'Premium',
      commerce_id,
      next_payment_date: body?.auto_recurring?.next_payment_date || null,
      external_reference: body?.external_reference || external_reference,
      raw: process.env.NODE_ENV === 'production' ? undefined : body,
    });
  } catch (error) {
    const mpMsg =
      error?.cause || error?.message || 'Error desconocido en Mercado Pago';
    console.error('Error creando suscripción:', error);
    return res.status(500).json({
      error: 'No se pudo crear la suscripción',
      message: mpMsg,
    });
  }
};

// Consulta estado de suscripción en MP por ID
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const mpRes = await mercadopago.preapproval.findById(id);
    const body = getMpBody(mpRes);
    return res.status(200).json(body);
  } catch (error) {
    console.error('Error obteniendo suscripción:', error);
    return res
      .status(500)
      .json({ error: 'No se pudo obtener la suscripción', message: error.message });
  }
};


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
    if (subscription) {
      res.status(200).json(subscription);
    } else {
      res.status(404).json({ error: `Subscription not found with id: ${id}` });
    }
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
    const subscriptions = await Subscription.findSubscriptionsByCommerceId(
      commerceId
    );
    if (subscriptions && subscriptions.length > 0) {
      res.status(200).json(subscriptions);
    } else {
      res
        .status(404)
        .json({ message: 'No subscriptions found for this commerce.' });
    }
  } catch (error) {
    console.error('Error fetching Subscriptions by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findSubscriptionsByPlanId = async (req, res) => {
  try {
    const { planId } = req.params;
    const subscriptions = await Subscription.findSubscriptionsByPlanId(planId);
    if (subscriptions && subscriptions.length > 0) {
      res.status(200).json(subscriptions);
    } else {
      res.status(404).json({ message: 'No subscriptions found for this plan.' });
    }
  } catch (error) {
    console.error('Error fetching Subscriptions by Plan ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
