const express = require('express');
const Product = require('../controllers/product');
const router = express.Router();

router.post('/', Product.createProduct);
router.get('/', Product.findAllProducts);
router.get('/:id', Product.findProductById);
router.put('/:id', Product.updateProduct);
router.delete('/:id', Product.deleteProduct);
// find products by commerce 
// find products by product category

module.exports = router;
