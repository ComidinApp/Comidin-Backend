const { check } = require('express-validator');

// Validaciones para crear una categoría de comercio
const createCommerceCategoryValidation = [
  check('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  check('description')
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description cannot be empty'),
    check('image_url')
      .optional()
];

// Validaciones para actualizar una categoría de comercio
const updateCommerceCategoryValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty'),
  check('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .notEmpty()
    .withMessage('Description cannot be empty'),
    check('image_url')
      .optional()
];

// Validaciones para los parámetros de la ruta
const categoryIdValidation = [
  check('id')
    .isInt({ min: 1 })
    .withMessage('Category ID must be a positive integer'),
];

module.exports = {
  createCommerceCategoryValidation,
  updateCommerceCategoryValidation,
  categoryIdValidation,
};
