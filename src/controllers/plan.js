const Plan = require('../models/plan');

exports.createPlan = async (req, res) => {
  try {
    const plan = await Plan.create(req.body);
    res.status(201).json(plan);
  } catch (error) {
    console.error('Error creating Plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllPlans = async (req, res) => {
  try {
    const plans = await Plan.findAll();
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching Plans:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findPlanById = async (req, res) => {
  try {
    const plan = await Plan.findByPk(req.params.id);
    if (plan) {
      res.status(200).json(plan);
    } else {
      res.status(404).json({ error: 'Plan not found' });
    }
  } catch (error) {
    console.error('Error fetching Plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updatePlan = async (req, res) => {
  try {
    const [updated] = await Plan.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedPlan = await Plan.findByPk(req.params.id);
      res.status(200).json(updatedPlan);
    } else {
      res.status(404).json({ error: 'Plan not found' });
    }
  } catch (error) {
    console.error('Error updating Plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deletePlan = async (req, res) => {
  try {
    const deleted = await Plan.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Plan not found' });
    }
  } catch (error) {
    console.error('Error deleting Plan:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
