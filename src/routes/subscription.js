const express = require('express');
const Subscription = require('../controllers/subscription');
const router = express.Router();

// Create a subscription
router.post('/', async (req, res) => {
    try {
        const subscription = await Subscription.create(req.body);
        res.status(201).json(subscription);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all subscriptions
router.get('/', async (req, res) => {
    try {
        const subscriptions = await Subscription.findAll();
        res.status(200).json(subscriptions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a subscription by ID
router.get('/:id', async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            res.status(200).json(subscription);
        } else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a subscription by ID
router.put('/:id', async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            await subscription.update(req.body);
            res.status(200).json(subscription);
        } else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a subscription by ID
router.delete('/:id', async (req, res) => {
    try {
        const subscription = await Subscription.findByPk(req.params.id);
        if (subscription) {
            await subscription.destroy();
            res.status(204).json({ message: 'Subscription deleted' });
        } else {
            res.status(404).json({ message: 'Subscription not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
