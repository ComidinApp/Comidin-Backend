const { check } = require('express-validator');

// Validaciones para crear una publicación
const createPublicationValidation = [
  check('name')
    .notEmpty()
    .withMessage('Publication name is required')
    .isString()
    .withMessage('Publication name must be a string'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('product_id')
    .isInt({ min: 1 })
    .withMessage('Product ID must be a positive integer'),
  check('price')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Price must be a decimal with up to 2 decimal places'),
  check('expiration_date')
    .isDate()
    .withMessage('Expiration date must be a valid date'),
];

// Validaciones para actualizar una publicación
const updatePublicationValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Publication name must be a string'),
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
  check('expiration_date')
    .optional()
    .isDate()
    .withMessage('Expiration date must be a valid date'),
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
