const express = require('express');
const { validationResult } = require('express-validator');
const Payment = require('../controllers/payment');
const {
  createPaymentValidation,
  updatePaymentValidation,
  orderIdValidation,
} = require('../validators/paymentValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createPaymentValidation, validate, Payment.createPayment);
router.get('/', Payment.findAllPayments);
router.get('/:id', Payment.findPaymentById);
router.put('/:id', updatePaymentValidation, validate, Payment.updatePayment);
router.delete('/:id', Payment.deletePayment);
router.get('/order/:orderId', orderIdValidation, validate, Payment.findPaymentsByOrderId);

module.exports = router;
