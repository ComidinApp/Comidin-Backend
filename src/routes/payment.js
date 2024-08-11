const express = require('express');
const Payment = require('../controllers/payment');
const router = express.Router();

router.post('/', Payment.createPayment);
router.get('/', Payment.findAllPayments);
router.get('/:id', Payment.findPaymentById);
router.put('/:id', Payment.updatePayment);
router.delete('/:id', Payment.deletePayment);

module.exports = router;
