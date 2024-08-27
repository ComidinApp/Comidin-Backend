const { check } = require('express-validator');

// Validaciones para crear un plan
const createPlanValidation = [
  check('name')
    .notEmpty()
    .withMessage('Plan name is required')
    .isString()
    .withMessage('Plan name must be a string'),
  check('description')
    .notEmpty()
    .withMessage('Plan description is required')
    .isString()
    .withMessage('Plan description must be a string'),
];

// Validaciones para actualizar un plan
const updatePlanValidation = [
  check('name')
    .optional()
    .isString()
    .withMessage('Plan name must be a string'),
  check('description')
    .optional()
    .isString()
    .withMessage('Plan description must be a string'),
];

module.exports = {
  createPlanValidation,
  updatePlanValidation,
};
