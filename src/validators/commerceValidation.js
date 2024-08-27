const { check } = require('express-validator');

// Validaciones para crear un comercio
const createCommerceValidation = [
  check('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  check('commerce_category_id')
    .isInt({ min: 1 })
    .withMessage('Commerce category ID must be a positive integer'),
  check('street_name')
    .isString()
    .withMessage('Street name must be a string')
    .notEmpty()
    .withMessage('Street name cannot be empty'),
  check('number')
    .isString()
    .withMessage('Number must be a string')
    .notEmpty()
    .withMessage('Number cannot be empty'),
  check('postal_code')
    .isString()
    .withMessage('Postal code must be a string')
    .notEmpty()
    .withMessage('Postal code cannot be empty'),
  check('commerce_national_id')
    .isString()
    .withMessage('Commerce national ID must be a string')
    .notEmpty()
    .withMessage('Commerce national ID cannot be empty'),
  check('is_active')
    .isBoolean()
    .withMessage('Is active must be a boolean value'),
  check('image_url')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  check('open_at')
    .optional()
    .isString()
    .withMessage('Open at must be a valid time string')
    .notEmpty()
    .withMessage('Open at cannot be empty'),
  check('close_at')
    .optional()
    .isString()
    .withMessage('Close at must be a valid time string')
    .notEmpty()
    .withMessage('Close at cannot be empty')
];

// Validaciones para actualizar un comercio
const updateCommerceValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  check('commerce_category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce category ID must be a positive integer'),
  check('street_name')
    .optional()
    .isString()
    .withMessage('Street name must be a string')
    .notEmpty()
    .withMessage('Street name cannot be empty'),
  check('number')
    .optional()
    .isString()
    .withMessage('Number must be a string')
    .notEmpty()
    .withMessage('Number cannot be empty'),
  check('postal_code')
    .optional()
    .isString()
    .withMessage('Postal code must be a string')
    .notEmpty()
    .withMessage('Postal code cannot be empty'),
  check('commerce_national_id')
    .optional()
    .isString()
    .withMessage('Commerce national ID must be a string')
    .notEmpty()
    .withMessage('Commerce national ID cannot be empty'),
  check('is_active')
    .optional()
    .isBoolean()
    .withMessage('Is active must be a boolean value'),
  check('image_url')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  check('open_at')
    .optional()
    .isString()
    .withMessage('Open at must be a valid time string')
    .notEmpty()
    .withMessage('Open at cannot be empty'),
  check('close_at')
    .optional()
    .isString()
    .withMessage('Close at must be a valid time string')
    .notEmpty()
    .withMessage('Close at cannot be empty')
    
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createCommerceValidation,
  updateCommerceValidation,
  commerceIdValidation,
};
