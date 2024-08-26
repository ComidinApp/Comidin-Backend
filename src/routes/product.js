const express = require('express');
const { validationResult } = require('express-validator');
const Product = require('../controllers/product');
const {
  createProductValidation,
  updateProductValidation,
  commerceIdValidation,
  categoryIdValidation,
} = require('../validators/productValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createProductValidation, validate, Product.createProduct);
router.get('/', Product.findAllProducts);
router.get('/:id', Product.findProductById);
router.put('/:id', updateProductValidation, validate, Product.updateProduct);
router.delete('/:id', Product.deleteProduct);
router.get('/commerce/:commerceId', commerceIdValidation, validate, Product.findProductsByCommerceId);
router.get('/productCategory/:categoryId', categoryIdValidation, validate, Product.findProductsByCategoryId);
module.exports = router;
