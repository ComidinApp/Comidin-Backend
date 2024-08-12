const express = require('express');
const Address = require('../controllers/address');
const router = express.Router();

router.post('/', Address.createAddress);
router.get('/', Address.findAllAddresses);
router.get('/:id', Address.findAddressById);
router.put('/:id', Address.updateAddress);
router.delete('/:id', Address.deleteAddress);
// find adresses by user id 

module.exports = router;
