const express = require('express');
const { validationResult } = require('express-validator');
const Address = require('../controllers/address');
const {
  createAddressValidation,
  updateAddressValidation,
  addressIdValidation
} = require('../validators/addressValidation');
const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createAddressValidation, validate, Address.createAddress);
router.get('/', Address.findAllAddresses);
router.get('/:id', addressIdValidation, validate, Address.findAddressById);
router.put('/:id', updateAddressValidation, validate, Address.updateAddress);
router.delete('/:id', addressIdValidation, validate, Address.deleteAddress);
router.get('/user/:userId', Address.findAddressesByUserId);

module.exports = router;
