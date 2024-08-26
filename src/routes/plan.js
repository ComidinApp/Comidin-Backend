const express = require('express');
const { validationResult } = require('express-validator');
const Plan = require('../controllers/plan');
const {
  createPlanValidation,
  updatePlanValidation,
} = require('../validators/planValidation');
const router = express.Router();
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
router.post('/', createPlanValidation, validate, Plan.createPlan);
router.get('/', Plan.findAllPlans);
router.get('/:id', Plan.findPlanById);
router.put('/:id', updatePlanValidation, validate, Plan.updatePlan);
router.delete('/:id', Plan.deletePlan);
module.exports = router;
