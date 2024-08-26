const { check } = require('express-validator');

// Validaciones para crear una queja de cliente
const createCustomerComplainValidation = [
  check('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('order_id')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('complain_description')
    .isString()
    .withMessage('Complain description must be a string'),
  check('terminate_at')
    .optional()
    .isISO8601()
    .withMessage('Terminate date must be a valid date'),
];

// Validaciones para actualizar una queja de cliente
const updateCustomerComplainValidation = [
  check('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('order_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('complain_description')
    .optional()
    .isString()
    .withMessage('Complain description must be a string'),
  check('terminate_at')
    .optional()
    .isISO8601()
    .withMessage('Terminate date must be a valid date'),
];

// Validaciones para los parámetros de la ruta
const userIdValidation = [
  check('userId')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
];

const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

const orderIdValidation = [
  check('orderId')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
];

module.exports = {
  createCustomerComplainValidation,
  updateCustomerComplainValidation,
  userIdValidation,
  commerceIdValidation,
  orderIdValidation,
};
