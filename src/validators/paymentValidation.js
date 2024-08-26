const { check } = require('express-validator');

// Validaciones para crear un pago
const createPaymentValidation = [
  check('order_id')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('total_amount')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total amount must be a decimal with up to 2 decimal places'),
  check('status')
    .notEmpty()
    .withMessage('Status is required')
    .isString()
    .withMessage('Status must be a string'),
];

// Validaciones para actualizar un pago
const updatePaymentValidation = [
  check('order_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('total_amount')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total amount must be a decimal with up to 2 decimal places'),
  check('status')
    .optional()
    .isString()
    .withMessage('Status must be a string'),
];

// Validaciones para los parámetros de la ruta
const orderIdValidation = [
  check('orderId')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
];

module.exports = {
  createPaymentValidation,
  updatePaymentValidation,
  orderIdValidation,
};
