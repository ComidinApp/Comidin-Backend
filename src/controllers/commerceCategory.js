const CommerceCategory = require('../models/commerceCategory');

exports.createCommerceCategory = async (req, res) => {
    try {
        const commerceCategory = await CommerceCategory.create(req.body);
        res.status(201).json(commerceCategory);
    } catch (error) {
        console.error('Error creating CommerceCategory:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findAllCommerceCategories = async (req, res) => {
    try {
        const commerceCategories = await CommerceCategory.findAll();
        res.status(200).json(commerceCategories);
    } catch (error) {
        console.error('Error fetching CommerceCategories:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.findCommerceCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id: ' + id });
        }
        res.status(200).json(commerceCategory);
    } catch (error) {
        console.error('Error fetching CommerceCategory by ID:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.updateCommerceCategory = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id: ' + id });
        }
        await commerceCategory.update(body);
        res.status(200).json(commerceCategory);
    } catch (error) {
        console.error('Error updating CommerceCategory:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};

exports.deleteCommerceCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id: ' + id });
        }
        await commerceCategory.destroy();
        res.status(200).json(commerceCategory);
    } catch (error) {
        console.error('Error deleting CommerceCategory:', error);
        res.status(409).json({ error: 'Conflict', meesage: error });
    }
};
