const express = require('express');
const CustomerComplain = require('../controllers/customerComplain');
const router = express.Router();

router.post('/', CustomerComplain.createCustomerComplain);
router.get('/', CustomerComplain.findAllCustomerComplains);
router.get('/:id', CustomerComplain.findCustomerComplainById);
router.put('/:id', CustomerComplain.updateCustomerComplain);
router.delete('/:id', CustomerComplain.deleteCustomerComplain);

module.exports = router;
