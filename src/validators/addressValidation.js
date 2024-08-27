const { check } = require('express-validator');

// Validaciones para crear una dirección
const createAddressValidation = [
  check('user_id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer')
    .notEmpty()
    .withMessage('User ID cannot be empty'),
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
  check('home_type')
    .optional()
    .isString()
    .withMessage('Home type must be a string')
    .notEmpty()
    .withMessage('Home type cannot be empty'),
  check('extra_info')
    .optional()
    .isString()
    .withMessage('Extra info must be a string'),
  check('home_referral_name')
    .optional()
    .isString()
    .withMessage('Home referral name must be a string'),
  check('coordinates')
    .isString()
    .withMessage('Coordinates must be a string')
    .notEmpty()
    .withMessage('Coordinates cannot be empty')
];

// Validaciones para actualizar una dirección
const updateAddressValidation = [
  check('user_id')
    .optional()
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer')
    .notEmpty()
    .withMessage('User ID cannot be empty'),
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
  check('home_type')
    .optional()
    .isString()
    .withMessage('Home type must be a string'),
  check('extra_info')
    .optional()
    .isString()
    .withMessage('Extra info must be a string'),
  check('home_referral_name')
    .optional()
    .isString()
    .withMessage('Home referral name must be a string'),
  check('coordinates')
    .optional()
    .isString()
    .withMessage('Coordinates must be a string')
    .notEmpty()
    .withMessage('Coordinates cannot be empty')
];

// Validaciones para los parámetros de la ruta
const addressIdValidation = [
  check('id')
    .isInt({ min: 1 })
    .withMessage('Address ID must be a positive integer'),
];

module.exports = {
  createAddressValidation,
  updateAddressValidation,
  addressIdValidation,
};
