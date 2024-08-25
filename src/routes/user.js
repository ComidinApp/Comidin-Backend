const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../controllers/user');
const router = express.Router();

router.post(
  '/',
  [
    check('first_name').notEmpty().withMessage('First name is required').isString(),
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
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  User.createUser
);

router.get('/', User.findAllUsers);
router.get('/:id', User.findUserById);
router.put(
  '/:id',
  [
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
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  User.updateUser
);

router.delete('/:id', User.deleteUser);

module.exports = router;