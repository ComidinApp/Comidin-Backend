const CommerceCategory = require('../models/commerceCategory');

const createCommerceCategory = async (req, res) => {
    try {
        const { body } = req;
        const commerceCategory = new CommerceCategory(body);
        await commerceCategory.save();
        return res.status(201).json(commerceCategory);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllCommerceCategories = async (req, res) => {
    try {
        const commerceCategory = await CommerceCategory.findAll()
        return res.status(200).json(commerceCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findCommerceCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id:' + id });
        }
        return res.status(200).json(commerceCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateCommerceCategory = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id:' + id });
        }
        await CommerceCategory.update(body);
        return res.status(201).json(commerceCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteCommerceCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const commerceCategory = await CommerceCategory.findByPk(id);
        if (!commerceCategory) {
            return res.status(404).json({ error: 'CommerceCategory not found with id:' + id });
        }
        await CommerceCategory.destroy()
        return res.status(200).json(commerceCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createCommerceCategory, updateCommerceCategory, deleteCommerceCategory, findAllCommerceCategories, findCommerceCategoryById};