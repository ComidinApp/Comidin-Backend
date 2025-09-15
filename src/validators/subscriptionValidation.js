const { check, oneOf } = require('express-validator');
// Validaciones para crear una suscripción
const createSubscriptionValidation = [
  oneOf(
    [ check('plan_id').isInt({ min: 1 }), check('planId').isInt({ min: 1 }) ],
    'Plan ID must be a positive integer and is required'
  ),
  oneOf(
    [ check('commerce_id').isInt({ min: 1 }), check('commerceId').isInt({ min: 1 }) ],
    'Commerce ID must be a positive integer and is required'
  ),
  check('payer_email').optional().isEmail().withMessage('payer_email must be a valid email'),
  (req, _res, next) => {
    if (req.body.plan_id == null && req.body.planId != null) req.body.plan_id = Number(req.body.planId);
    if (req.body.commerce_id == null && req.body.commerceId != null) req.body.commerce_id = Number(req.body.commerceId);
    if (!req.body.payer_email && req.body.email) req.body.payer_email = req.body.email;
    next();
  }
];

// Validaciones para actualizar una suscripción
const updateSubscriptionValidation = [
  check('plan_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Plan ID must be a positive integer'),
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

// Validaciones para los parámetros de la ruta
const planIdValidation = [
  check('planId')
    .isInt({ min: 1 })
    .withMessage('Plan ID must be a positive integer'),
];

const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createSubscriptionValidation,
  updateSubscriptionValidation,
  planIdValidation,
  commerceIdValidation,
};
