const express = require('express');
const Commerce = require('../controllers/commerce');
const router = express.Router();

router.post('/', Commerce.createCommerce);
router.get('/', Commerce.findAllCommerces);
router.get('/:id', Commerce.findCommerceById);
router.put('/:id', Commerce.updateCommerce);
router.delete('/:id', Commerce.deleteCommerce);

module.exports = router;
