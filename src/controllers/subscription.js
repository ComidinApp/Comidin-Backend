const mercadopago = require('mercadopago');
const Subscription = require('../models/subscription');
const mercadopago = require('mercadopago');

// Configuración con token de prueba (sandbox)
mercadopago.configure({
  access_token: process.env.MP_ACCESS_TOKEN || 'TEST-420657664234961-081519-ad8b4d93df5c34207d2ab2930bf7d170-293639184'
});

// Crear suscripción recurrente (preapproval)
exports.createSubscription = async (req, res) => {
  try {
    const { plan_id, commerce_id } = req.body;

    // Solo Estándar (2) y Premium (3)
    const PLAN_PRICES = {
      2: 5999,   // Estándar
      3: 13999   // Premium
    };

    if (![2, 3].includes(plan_id)) {
      return res.status(400).json({ error: 'Plan inválido. Solo Estándar o Premium.' });
    }

    const preapprovalData = {
      reason: plan_id === 2 ? 'Suscripción Estándar' : 'Suscripción Premium',
      auto_recurring: {
        frequency: 1,               // cada 1
        frequency_type: 'months',   // mes
        transaction_amount: PLAN_PRICES[plan_id],
        currency_id: 'ARS',
        start_date: new Date().toISOString(),
        end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString() // 12 meses
      },
      back_url: 'http://localhost:3000/success',
      payer_email: 'test_user_365215538@testuser.com' // usar usuario de prueba de 
    };

    const mpResponse = await mercadopago.preapproval.create(preapprovalData);

    res.status(201).json({
      subscription_url: mpResponse.body.init_point, // link a enviar al front
      subscription_id: mpResponse.body.id,
      plan: plan_id === 2 ? 'Estándar' : 'Premium',
      commerce_id,
      start: preapprovalData.auto_recurring.start_date,
      end: preapprovalData.auto_recurring.end_date
    });

  } catch (error) {
    console.error('Error creando suscripción:', error);
    res.status(500).json({ error: 'No se pudo crear la suscripción', message: error.message });
  }
};

// (Opcional) Consultar estado de suscripción por ID
exports.getSubscriptionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const mpResponse = await mercadopago.preapproval.findById(id);
    res.status(200).json(mpResponse.body);
  } catch (error) {
    console.error('Error obteniendo suscripción:', error);
    res.status(500).json({ error: 'No se pudo obtener la suscripción', message: error.message });
  }
};

