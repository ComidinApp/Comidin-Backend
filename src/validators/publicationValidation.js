// validators/publicationValidation.js
const { check } = require('express-validator');

// Validaciones para crear una publicación
const createPublicationValidation = [
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),

  check('product_id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),

  check('price')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Price must be a decimal with up to 2 decimal places'),

  // ⬇️ Cambiado de isDate() a isISO8601() + toDate()
  check('expiration_date')
    .isISO8601()
    .withMessage('Expiration date must be a valid date')
    .toDate(),
];

// Validaciones para actualizar una publicación
const updatePublicationValidation = [
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),

  check('product_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),

  check('price')
    .optional()
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Price must be a decimal with up to 2 decimal places'),

  // ⬇️ Igual cambio aquí
  check('expiration_date')
    .optional()
    .isISO8601()
    .withMessage('Expiration date must be a valid date')
    .toDate(),
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createPublicationValidation,
  updatePublicationValidation,
  commerceIdValidation,
};
