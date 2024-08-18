const express = require('express');
const ProductCategory = require('../controllers/productCategory');
const router = express.Router();

router.post('/', ProductCategory.createProductCategory);
router.get('/', ProductCategory.findAllProductCategories);
router.get('/:id', ProductCategory.findProductCategoryById);
router.put('/:id', ProductCategory.updateProductCategory);
router.delete('/:id', ProductCategory.deleteProductCategory);
router.get('/commerce/:commerceId', ProductCategory.findProductCategoriesByCommerceId);

module.exports = router;
