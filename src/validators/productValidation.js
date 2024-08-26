const { check } = require('express-validator');

// Validaciones para crear un producto
const createProductValidation = [
  check('name')
    .notEmpty()
    .withMessage('Product name is required')
    .isString()
    .withMessage('Product name must be a string'),
  check('description')
    .optional()
    .isString()
    .withMessage('Product description must be a string'),
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('product_category_id')
    .isInt({ min: 1 })
    .withMessage('Product Category ID must be a positive integer'),
  check('image_url')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  check('product_code')
    .notEmpty()
    .withMessage('Product code is required')
    .isString()
    .withMessage('Product code must be a string')
    .isLength({ max: 100 })
    .withMessage('Product code must be at most 100 characters long'),
];

// Validaciones para actualizar un producto
const updateProductValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Product name must be a string'),
  check('description')
    .optional()
    .isString()
    .withMessage('Product description must be a string'),
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('product_category_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Product Category ID must be a positive integer'),
  check('image_url')
    .optional()
    .isURL()
    .withMessage('Image URL must be a valid URL'),
  check('product_code')
    .optional()
    .isString()
    .withMessage('Product code must be a string')
    .isLength({ max: 100 })
    .withMessage('Product code must be at most 100 characters long'),
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

const categoryIdValidation = [
  check('categoryId')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
];

module.exports = {
  createProductValidation,
  updateProductValidation,
  commerceIdValidation,
  categoryIdValidation,
};
