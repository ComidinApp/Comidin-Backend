const express = require('express');
const CommerceCategory = require('../controllers/commerceCategory');
const router = express.Router();

router.post('/', CommerceCategory.createCommerceCategory);
router.get('/', CommerceCategory.findAllCommerceCategories);
router.get('/:id', CommerceCategory.findCommerceCategoryById);
router.put('/:id', CommerceCategory.updateCommerceCategory);
router.delete('/:id', CommerceCategory.deleteCommerceCategory);

module.exports = router;
