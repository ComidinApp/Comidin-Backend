// validators/userValidation.js
const { check } = require('express-validator');

const createUserValidation = [
  check('first_name').notEmpty().withMessage('First name is requiredd').isString(),
  check('last_name').notEmpty().withMessage('Last name is required').isString(),
  check('email').isEmail().withMessage('Must be a valid email').notEmpty(),
  check('phone_number').notEmpty().withMessage('Phone number is required').isMobilePhone(),
  check('national_id').notEmpty().withMessage('National ID is required'),
  check('is_active').isBoolean().withMessage('Is active must be a boolean'),
  check('birthday').isDate().withMessage('Must be a valid date'),
  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
];

const updateUserValidation = [
  check('first_name').optional().isString(),
  check('last_name').optional().isString(),
  check('email').optional().isEmail(),
  check('phone_number').optional().isMobilePhone(),
  check('national_id').optional(),
  check('is_active').optional().isBoolean(),
  check('birthday').optional().isDate(),
  check('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/\d/)
    .withMessage('Password must contain at least one number')
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage('Password must contain at least one special character'),
];

module.exports = {
  createUserValidation,
  updateUserValidation,
};