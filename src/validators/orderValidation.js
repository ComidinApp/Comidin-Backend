
const { check } = require('express-validator');

// Validaciones para crear un pedido
const createOrderValidation = [
  check('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('total_amount')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total amount must be a decimal with up to 2 decimal places'),
  check('status')
    .isString()
    .withMessage('Status must be a string'),
  check('delivery_type')
    .isString()
    .withMessage('Delivery type must be a string'),
];

// Validaciones para actualizar un pedido
const updateOrderValidation = [
  check('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('total_amount')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total amount must be a decimal with up to 2 decimal places'),
  check('status')
    .optional()
    .isString()
    .withMessage('Status must be a string'),
  check('delivery_type')
    .optional()
    .isString()
    .withMessage('Delivery type must be a string'),
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

module.exports = {
  createOrderValidation,
  updateOrderValidation,
  userIdValidation,
  commerceIdValidation,
};
