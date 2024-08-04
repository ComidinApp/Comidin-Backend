const express = require('express');
const Commerce = require('../controllers/commerce');
const router = express.Router();

// Create a commerce
router.post('/', async (req, res) => {
    try {
        const commerce = await Commerce.create(req.body);
        res.status(201).json(commerce);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all commerces
router.get('/', async (req, res) => {
    try {
        const commerces = await Commerce.findAll();
        res.status(200).json(commerces);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a commerce by ID
router.get('/:id', async (req, res) => {
    try {
        const commerce = await Commerce.findByPk(req.params.id);
        if (commerce) {
            res.status(200).json(commerce);
        } else {
            res.status(404).json({ message: 'Commerce not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a commerce by ID
router.put('/:id', async (req, res) => {
    try {
        const commerce = await Commerce.findByPk(req.params.id);
        if (commerce) {
            await commerce.update(req.body);
            res.status(200).json(commerce);
        } else {
            res.status(404).json({ message: 'Commerce not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a commerce by ID
router.delete('/:id', async (req, res) => {
    try {
        const commerce = await Commerce.findByPk(req.params.id);
        if (commerce) {
            await commerce.destroy();
            res.status(204).json({ message: 'Commerce deleted' });
        } else {
            res.status(404).json({ message: 'Commerce not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
