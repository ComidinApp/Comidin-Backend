const { check } = require('express-validator');

// Validaciones para crear un detalle de pedido
const createOrderDetailValidation = [
  check('order_id')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('publication_id')
    .isInt({ min: 1 })
    .withMessage('Publication ID must be a positive integer'),
  check('quantity')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Quantity must be a decimal with up to 2 decimal places'),
  check('amount')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Amount must be a decimal with up to 2 decimal places'),
];

// Validaciones para actualizar un detalle de pedido
const updateOrderDetailValidation = [
  check('order_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('publication_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Publication ID must be a positive integer'),
  check('quantity')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Quantity must be a decimal with up to 2 decimal places'),
  check('amount')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Amount must be a decimal with up to 2 decimal places'),
];

// Validaciones para los parámetros de la ruta
const orderIdValidation = [
  check('orderId')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
];

const publicationIdValidation = [
  check('publicationId')
    .isInt({ min: 1 })
    .withMessage('Publication ID must be a positive integer'),
];

module.exports = {
  createOrderDetailValidation,
  updateOrderDetailValidation,
  orderIdValidation,
  publicationIdValidation,
};