const express = require('express');
const { validationResult } = require('express-validator');
const CommerceCategory = require('../controllers/commerceCategory');
const {
  createCommerceCategoryValidation,
  updateCommerceCategoryValidation,
  categoryIdValidation,
} = require('../validators/commerceCategoryValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.post('/', createCommerceCategoryValidation, validate, CommerceCategory.createCommerceCategory);
router.get('/', CommerceCategory.findAllCommerceCategories);
router.get('/:id', categoryIdValidation, validate, CommerceCategory.findCommerceCategoryById);
router.put('/:id', updateCommerceCategoryValidation, validate, CommerceCategory.updateCommerceCategory);
router.delete('/:id', categoryIdValidation, validate, CommerceCategory.deleteCommerceCategory);

module.exports = router;
