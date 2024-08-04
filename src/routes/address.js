const express = require('express');
const Address = require('../controllers/address');
const router = express.Router();

// Create an address
router.post('/', async (req, res) => {
    try {
        const address = await Address.create(req.body);
        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all addresses
router.get('/', async (req, res) => {
    try {
        const addresses = await Address.findAll();
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an address by ID
router.get('/:id', async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (address) {
            res.status(200).json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an address by ID
router.put('/:id', async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (address) {
            await address.update(req.body);
            res.status(200).json(address);
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an address by ID
router.delete('/:id', async (req, res) => {
    try {
        const address = await Address.findByPk(req.params.id);
        if (address) {
            await address.destroy();
            res.status(204).json({ message: 'Address deleted' });
        } else {
            res.status(404).json({ message: 'Address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
