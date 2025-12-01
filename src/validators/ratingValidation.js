const { check } = require('express-validator');

const createRatingValidation = [
  check('user_id').isInt({ min: 1 }),
  check('commerce_id').isInt({ min: 1 }),
  check('order_id').isInt({ min: 1 }),
  check('product_id').isInt({ min: 1 }),
  check('rate_order').isInt({ min: 1, max: 5 }),
  check('comment')
    .optional()
    .isString()
    .isLength({ max: 255 })
    .withMessage('Comment max length is 255 chars')
];

const updateRatingValidation = [
  check('user_id').optional().isInt({ min: 1 }),
  check('commerce_id').optional().isInt({ min: 1 }),
  check('order_id').optional().isInt({ min: 1 }),
  check('product_id').optional().isInt({ min: 1 }),
  check('rate_order').optional().isInt({ min: 1, max: 5 }),
  check('comment').optional().isString().isLength({ max: 255 }),
];

const userIdValidation = [
  check('userId').isInt({ min: 1 }),
];

const commerceIdValidation = [
  check('commerceId').isInt({ min: 1 }),
];

const orderIdValidation = [
  check('orderId').isInt({ min: 1 }),
];

module.exports = {
  createRatingValidation,
  updateRatingValidation,
  userIdValidation,
  commerceIdValidation,
  orderIdValidation,
};
