
const Plan = require('../models/plan');

const createPlan = async (req, res) => {
    try {
        const { body } = req;
        const plan = new Plan(body);
        await plan.save();
        return res.status(201).json(plan);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllPlans = async (req, res) => {
    try {
        const plans = await Plan.findAll()
        return res.status(200).json(plans);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findPlanById = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found with id:' + id });
        }
        return res.status(200).json(plan);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updatePlan = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found with id:' + id });
        }
        await plan.update(body);
        return res.status(201).json(plan);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deletePlan = async (req, res) => {
    try {
        const { id } = req.params;
        const plan = await Plan.findByPk(id);
        if (!plan) {
            return res.status(404).json({ error: 'Plan not found with id:' + id });
        }
        await plan.destroy()
        return res.status(200).json(plan);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createPlan, updatePlan, deletePlan, findAllPlans, findPlanById};