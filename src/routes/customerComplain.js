const express = require('express');
const CustomerComplain = require('../controllers/customerComplain');
const router = express.Router();

router.post('/', CustomerComplain.createCustomerComplain);
router.get('/', CustomerComplain.findAllCustomerComplains);
router.get('/:id', CustomerComplain.findCustomerComplainById);
router.put('/:id', CustomerComplain.updateCustomerComplain);
router.delete('/:id', CustomerComplain.deleteCustomerComplain);
router.get('/user/:userId', CustomerComplain.findCustomerComplainByUserId);
router.get('/commerce/:commerceId', CustomerComplain.findCustomerComplainByCommerceId);
router.get('/order/:orderId', CustomerComplain.findCustomerComplainByOrderId);
// find complain by user
// find complain by commerce
// find complain by order id

module.exports = router;
