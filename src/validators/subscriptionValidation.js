// src/validators/subscriptionValidation.js
const { body, param, oneOf } = require('express-validator');

// ✅ Crear suscripción (POST /subscriptions)
// - Acepta plan_id o planId en el body (int >= 1)
// - Acepta commerce_id o commerceId en el body (int >= 1)
// - payer_email opcional pero, si viene, debe ser email válido
const createSubscriptionValidation = [
  oneOf(
    [body('plan_id').isInt({ min: 1 }), body('planId').isInt({ min: 1 })],
    'Plan ID must be a positive integer and is required'
  ),
  oneOf(
    [body('commerce_id').isInt({ min: 1 }), body('commerceId').isInt({ min: 1 })],
    'Commerce ID must be a positive integer and is required'
  ),
  body('payer_email').optional().isEmail().withMessage('payer_email must be a valid email'),

  // Normalización (por si el front envía camelCase)
  (req, _res, next) => {
    const b = req.body || {};
    if (b.plan_id == null && b.planId != null) req.body.plan_id = Number(b.planId);
    if (b.commerce_id == null && b.commerceId != null) req.body.commerce_id = Number(b.commerceId);
    if (!b.payer_email && b.email) req.body.payer_email = b.email;
    next();
  },
];

// ✅ Actualizar suscripción (PUT /subscriptions/:id)
// - Valida el :id de la ruta
// - plan_id y commerce_id opcionales en body, pero si vienen deben ser enteros >=1
const updateSubscriptionValidation = [
  param('id').isInt({ min: 1 }).withMessage('id must be a positive integer'),
  body('plan_id').optional().isInt({ min: 1 }).withMessage('Plan ID must be a positive integer'),
  body('commerce_id').optional().isInt({ min: 1 }).withMessage('Commerce ID must be a positive integer'),
];

// ✅ GET /subscriptions/plan/:planId
const planIdValidation = [
  param('planId').isInt({ min: 1 }).withMessage('Plan ID must be a positive integer'),
];

// ✅ GET /subscriptions/commerce/:commerceId
const commerceIdValidation = [
  param('commerceId').isInt({ min: 1 }).withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createSubscriptionValidation,
  updateSubscriptionValidation,
  planIdValidation,
  commerceIdValidation,
};
