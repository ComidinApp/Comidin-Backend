
const mercadopago = require('mercadopago');


mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN,
});

// Mapa de planes
const PLAN_PRICES = {
  2: 5999,   // Estándar
  3: 13999,  // Premium
};


function getMpBody(res) {
  return res?.body ?? res?.response ?? res;
}


 function normalizeBody(req, _res, next) {
   const b = req.body || {};
   if (b.planId != null && b.plan_id == null) req.body.plan_id = Number(b.planId);
   if (b.commerceId != null && b.commerce_id == null) req.body.commerce_id = Number(b.commerceId);
   if (b.email && !b.payer_email) req.body.payer_email = b.email;
   if (req.body.plan_id != null) req.body.plan_id = Number(req.body.plan_id);
   if (req.body.commerce_id != null) req.body.commerce_id = Number(req.body.commerce_id);
   next();
 }



exports.normalizeBody = normalizeBody;

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

    const preapprovalData = {
      reason,
      payer_email,
      auto_recurring: {
        frequency: 1,
        frequency_type: 'months',
        transaction_amount: PLAN_PRICES[plan_id],
        currency_id: 'ARS',
        
      },
      back_url: process.env.FRONTEND_URL || 'http://localhost:5173', 
      
      external_reference: `commerce-${commerce_id}-${Date.now()}`,
    };

    const mpRes = await mercadopago.preapproval.create(preapprovalData);
    const body = getMpBody(mpRes);

    const link = body?.init_point || body?.sandbox_init_point || null;

    return res.status(201).json({
      link,                    
      id: body?.id || null,
      plan: plan_id === 2 ? 'Estándar' : 'Premium',
      commerce_id,
      next_payment_date: body?.auto_recurring?.next_payment_date || null,
      external_reference: body?.external_reference || preapprovalData.external_reference,
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
