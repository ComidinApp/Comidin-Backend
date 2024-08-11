const express = require('express');
const Plan = require('../controllers/plan');
const router = express.Router();

router.post('/', Plan.createPlan);
router.get('/', Plan.findAllPlans);
router.get('/:id', Plan.findPlanById);
router.put('/:id', Plan.updatePlan);
router.delete('/:id', Plan.deletePlan);

module.exports = router;
