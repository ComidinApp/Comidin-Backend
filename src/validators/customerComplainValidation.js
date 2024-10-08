const { check } = require('express-validator');

// Validaciones para crear una queja de cliente
const createCustomerComplainValidation = [
  check('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer')
    .notEmpty()
    .withMessage('User ID cannot be empty'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer')
    .notEmpty()
    .withMessage('Commerce ID cannot be empty'),
  check('order_id')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer')
    .notEmpty()
    .withMessage('Order ID cannot be empty'),
  check('complain_description')
    .isString()
    .withMessage('Complain description must be a string')
    .notEmpty()
    .withMessage('Complain description cannot be empty'),
  check('closed_at')
    .optional()
    .isISO8601()
    .withMessage('Closed date must be a valid date'),
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
  check('closed_at')
    .optional()
    .isISO8601()
    .withMessage('Closed date must be a valid date'),
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
