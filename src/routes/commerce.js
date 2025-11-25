const express = require('express');
const { validationResult } = require('express-validator');
const Commerce = require('../controllers/commerce');
const {
  createCommerceValidation,
  updateCommerceValidation,
  commerceIdValidation,
} = require('../validators/commerceValidation');

const router = express.Router();

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createCommerceValidation, validate, Commerce.createCommerce);
router.get('/', Commerce.findAllCommerces);

// NUEVO ENDPOINT DE BÚSQUEDA CON FILTROS
// Ejemplos:
// GET /commerces/search?postal_code=1407
// GET /commerces/search?expiring_publications=true
// GET /commerces/search?postal_code=1407&expiring_publications=true
router.get('/search', Commerce.searchCommerces);


router.get('/category/:categoryId', Commerce.findCommercesByCategoryId);

router.get('/:id', commerceIdValidation, validate, Commerce.findCommerceById);
router.put('/:id', updateCommerceValidation, validate, Commerce.updateCommerce);
router.put('/activate/:id', Commerce.activateCommerce);
router.put('/status/:id', Commerce.changeCommerceStatus);
router.delete('/:id', commerceIdValidation, validate, Commerce.deleteCommerce);

module.exports = router;
