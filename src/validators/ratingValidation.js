const { check } = require('express-validator');

// Validaciones para crear una calificación
const createRatingValidation = [
  check('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('order_id')
    .isInt({ min: 1 })
    .withMessage('Order ID must be a positive integer'),
  check('product_id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  check('rate_order')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rate order must be an integer between 1 and 5'),
];

// Validaciones para actualizar una calificación
const updateRatingValidation = [
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
  check('product_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  check('rate_order')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rate order must be an integer between 1 and 5'),
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

const productIdValidation = [
  check('productId')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
];

module.exports = {
  createRatingValidation,
  updateRatingValidation,
  userIdValidation,
  commerceIdValidation,
  orderIdValidation,
  productIdValidation
};
