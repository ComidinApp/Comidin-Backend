
const Subscription = require('../models/subscription');

const createSubscription = async (req, res) => {
    try {
        const { body } = req;
        const subscription = new Subscription(body);
        await subscription.save();
        return res.status(201).json(subscription);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll()
        return res.status(200).json(subscriptions);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findSubscriptionById = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found with id:' + id });
        }
        return res.status(200).json(subscription);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateSubscription = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found with id:' + id });
        }
        await subscription.update(body);
        return res.status(201).json(subscription);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteSubscription = async (req, res) => {
    try {
        const { id } = req.params;
        const subscription = await Subscription.findByPk(id);
        if (!subscription) {
            return res.status(404).json({ error: 'Subscription not found with id:' + id });
        }
        await subscription.destroy()
        return res.status(200).json(subscription);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findSubscriptionsByCommerceId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const subscriptions = await Subscription.findSubscriptionsByCommerceId(commerceId);
        if (!subscriptions) {
            return res.status(404).json({ message: 'No subscriptions found for this commerce.' });
        }
        return res.status(200).json(subscriptions);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

const findSubscriptionsByPlanId = async (req, res) => {
    try {
        const { planId } = req.params;
        const subscriptions = await Subscription.findSubscriptionsByPlanId(planId);
        if (!subscriptions) {
            return res.status(404).json({ message: 'No subscriptions found for this plan.' });
        }
        return res.status(200).json(subscriptions);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

module.exports =  {createSubscription, updateSubscription, deleteSubscription, findAllSubscriptions, findSubscriptionById, findSubscriptionsByCommerceId, findSubscriptionsByPlanId};