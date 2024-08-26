const { check } = require('express-validator');

// Validaciones para crear un rol
const createRoleValidation = [
  check('name')
    .notEmpty()
    .withMessage('Role name is required')
    .isString()
    .withMessage('Role name must be a string'),
  check('description')
    .notEmpty()
    .withMessage('Role description is required')
    .isString()
    .withMessage('Role description must be a string'),
];

// Validaciones para actualizar un rol
const updateRoleValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Role name must be a string'),
  check('description')
    .optional()
    .isString()
    .withMessage('Role description must be a string'),
];

module.exports = {
  createRoleValidation,
  updateRoleValidation,
};
