
const mercadopago = require('mercadopago');
const Subscription = require('../models/subscription');


mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});


const PLAN_PRICES = {
  2: 5999,   // Estándar
  3: 13999,  // Premium
};

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

// ===================== CREATE (Mercado Pago) =====================
// Crea preaprobación apuntando a un preapproval_plan de MP para obtener init_point
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

    const reason = Number(plan_id) === 2 ? 'Suscripción Estándar' : 'Suscripción Premium';
    const back_url = process.env.FRONTEND_URL || 'http://localhost:5173';
    const external_reference = `commerce-${commerce_id}-${Date.now()}`;

    const planIdMap = {
      2: process.env.MP_PLAN_STD,   // Estándar
      3: process.env.MP_PLAN_PREM,  // Premium
    };
    const preapprovalPlanId = planIdMap[Number(plan_id)];

    let mpRes;
    if (preapprovalPlanId) {
 
      mpRes = await mercadopago.preapproval.create({
        preapproval_plan_id: preapprovalPlanId,
        payer_email,
        back_url,
        reason,
        external_reference,
      
      });
    } else {

      mpRes = await mercadopago.preapproval.create({
        reason,
        payer_email,
        auto_recurring: {
          frequency: 1,
          frequency_type: 'months',
          transaction_amount: PLAN_PRICES[plan_id],
          currency_id: 'ARS',
        },
        back_url,
        external_reference,
      });
    }

    const body = getMpBody(mpRes);
    const link =
      body?.init_point ||
      body?.sandbox_init_point ||
      body?.redirect_url ||
      null;



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
    console.error('Error creando suscripción:', error);
    return res.status(500).json({
      error: 'No se pudo crear la suscripción',
      message: error?.message,
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
    return res.status(500).json({ error: 'No se pudo obtener la suscripción', message: error.message });
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
    const subscriptions = await Subscription.findSubscriptionsByCommerceId(commerceId);
    if (subscriptions && subscriptions.length > 0) {
      res.status(200).json(subscriptions);
    } else {
      res.status(404).json({ message: 'No subscriptions found for this commerce.' });
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
