const express = require('express');
const { validationResult } = require('express-validator');
const CustomerComplain = require('../controllers/customerComplain');
const {
  createCustomerComplainValidation,
  updateCustomerComplainValidation,
  userIdValidation,
  commerceIdValidation,
  orderIdValidation,
} = require('../validators/customerComplainValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createCustomerComplainValidation, validate, CustomerComplain.createCustomerComplain);
router.get('/', CustomerComplain.findAllCustomerComplains);
router.get('/:id', CustomerComplain.findCustomerComplainById);
router.put('/:id', updateCustomerComplainValidation, validate, CustomerComplain.updateCustomerComplain);
router.delete('/:id', CustomerComplain.deleteCustomerComplain);
router.get('/user/:userId', userIdValidation, validate, CustomerComplain.findCustomerComplainByUserId);
router.get('/commerce/:commerceId', commerceIdValidation, validate, CustomerComplain.findCustomerComplainByCommerceId);
router.get('/order/:orderId', orderIdValidation, validate, CustomerComplain.findCustomerComplainByOrderId);

module.exports = router;
