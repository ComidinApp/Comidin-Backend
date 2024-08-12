const express = require('express');
const Payment = require('../controllers/payment');
const router = express.Router();

router.post('/', Payment.createPayment);
router.get('/', Payment.findAllPayments);
router.get('/:id', Payment.findPaymentById);
router.put('/:id', Payment.updatePayment);
router.delete('/:id', Payment.deletePayment);
// find payments by user
// find payments by commerce
// find payments by order id

module.exports = router;
