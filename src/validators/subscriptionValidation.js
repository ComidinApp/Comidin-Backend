const { check } = require('express-validator');

// Validaciones para crear una suscripción
const createSubscriptionValidation = [
  check('plan_id')
    .isInt({ min: 1 })
    .withMessage('Plan ID must be a positive integer and is required'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer and is required'),
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
