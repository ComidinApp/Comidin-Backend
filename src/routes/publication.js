const express = require('express');
const { validationResult } = require('express-validator');
const Publication = require('../controllers/publication');
const {
  createPublicationValidation,
  updatePublicationValidation,
  commerceIdValidation,
} = require('../validators/publicationValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createPublicationValidation, validate, Publication.createPublication);
router.get('/', Publication.findAllPublications);
router.get('/:id', Publication.findPublicationById);
router.put('/:id', updatePublicationValidation, validate, Publication.updatePublication);
router.delete('/:id', Publication.deletePublication);
router.get('/commerce/:commerceId', commerceIdValidation, validate, Publication.findPublicationsByCommerceId);
module.exports = router;
