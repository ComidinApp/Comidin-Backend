const { check } = require('express-validator');

// Validaciones para crear una categoría de producto
const createProductCategoryValidation = [
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('name')
    .notEmpty()
    .withMessage('Category name is required')
    .isString()
    .withMessage('Category name must be a string'),
  check('description')
    .notEmpty()
    .withMessage('Category description is required')
    .isString()
    .withMessage('Category description must be a string'),
];

// Validaciones para actualizar una categoría de producto
const updateProductCategoryValidation = [
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('name')
    .optional()
    .isString()
    .withMessage('Category name must be a string'),
  check('description')
    .optional()
    .isString()
    .withMessage('Category description must be a string'),
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

module.exports = {
  createProductCategoryValidation,
  updateProductCategoryValidation,
  commerceIdValidation,
};
