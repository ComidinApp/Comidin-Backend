const Commerce = require('../models/commerce');

exports.createCommerce = async (req, res) => {
    try {
        const commerce = await Commerce.create(req.body);
        res.status(201).json(commerce);
    } catch (error) {
        console.error('Error creating Commerce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findAllCommerces = async (req, res) => {
    try {
        const commerces = await Commerce.findAll();
        res.status(200).json(commerces);
    } catch (error) {
        console.error('Error fetching Commerces:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findCommerceById = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error fetching Commerce by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateCommerce = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        await commerce.update(body);
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error updating Commerce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.deleteCommerce = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'Commerce not found with id: ' + id });
        }
        await commerce.destroy();
        res.status(200).json(commerce);
    } catch (error) {
        console.error('Error deleting Commerce:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.findCommercesByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;
        const commerces = await Commerce.findCommercesByCategoryId(categoryId);
        if (!commerces) {
            return res.status(404).json({ message: 'No commerces found for this category.' });
        }
        res.status(200).json(commerces);
    } catch (error) {
        console.error('Error fetching Commerces by Category ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
