const { check } = require('express-validator');

// Validaciones para crear un empleado
const createEmployeeValidation = [
  check('commerce_id')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer')
    .notEmpty(),
  check('role_id')
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer')
    .notEmpty(),
  check('first_name')
    .isString()
    .withMessage('First name must be a string')
    .notEmpty(),
  check('last_name')
    .isString()
    .withMessage('Last name must be a string')
    .notEmpty(),
  check('email')
    .isEmail()
    .withMessage('Email must be a valid email address')
    .notEmpty(),
  check('phone_number')
    .isString()
    .withMessage('Phone number must be a string')
    .notEmpty(),
  check('national_id')
    .isString()
    .withMessage('National ID must be a string')
    .notEmpty(),
  check('postal_code')
    .isString()
    .withMessage('Postal code must be a string')
    .notEmpty(),
  check('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
];

// Validaciones para actualizar un empleado
const updateEmployeeValidation = [
  check('commerce_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
  check('role_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
  check('first_name')
    .optional()
    .isString()
    .withMessage('First name must be a string'),
  check('last_name')
    .optional()
    .isString()
    .withMessage('Last name must be a string'),
  check('email')
    .optional()
    .isEmail()
    .withMessage('Email must be a valid email address'),
  check('phone_number')
    .optional()
    .isString()
    .withMessage('Phone number must be a string'),
  check('national_id')
    .optional()
    .isString()
    .withMessage('National ID must be a string'),
  check('address')
    .optional()
    .isString()
    .withMessage('Street name must be a string'),
  check('postal_code')
    .optional()
    .isString()
    .withMessage('Postal code must be a string'),
  check('password')
    .optional()
    .isString()
    .withMessage('Password must be a string'),
];

// Validaciones para los parámetros de la ruta
const commerceIdValidation = [
  check('commerceId')
    .isInt({ min: 1 })
    .withMessage('Commerce ID must be a positive integer'),
];

const roleIdValidation = [
  check('roleId')
    .isInt({ min: 1 })
    .withMessage('Role ID must be a positive integer'),
];

module.exports = {
  createEmployeeValidation,
  updateEmployeeValidation,
  commerceIdValidation,
  roleIdValidation,
};
