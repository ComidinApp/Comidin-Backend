const express = require('express');
const { validationResult } = require('express-validator');
const ProductCategory = require('../controllers/productCategory');
const {
  createProductCategoryValidation,
  updateProductCategoryValidation,
  commerceIdValidation,
} = require('../validators/productCategoryValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createProductCategoryValidation, validate, ProductCategory.createProductCategory);
router.get('/', ProductCategory.findAllProductCategories);
router.get('/:id', ProductCategory.findProductCategoryById);
router.put('/:id', updateProductCategoryValidation, validate, ProductCategory.updateProductCategory);
router.delete('/:id', ProductCategory.deleteProductCategory);
router.get('/commerce/:commerceId', commerceIdValidation, validate, ProductCategory.findProductCategoriesByCommerceId);
module.exports = router;
