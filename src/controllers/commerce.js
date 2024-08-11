
const Commerce = require('../models/commerce');

const createCommerce = async (req, res) => {
    try {
        const { body } = req;
        const commerce = new Commerce(body);
        await commerce.save();
        return res.status(201).json(commerce);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllCommerces = async (req, res) => {
    try {
        const commerces = await Commerce.findAll()
        return res.status(200).json(commerces);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findCommerceById = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'commerce not found with id:' + id });
        }
        return res.status(200).json(commerce);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateCommerce = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'commerce not found with id:' + id });
        }
        await commerce.update(body);
        return res.status(201).json(commerce);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteCommerce = async (req, res) => {
    try {
        const { id } = req.params;
        const commerce = await Commerce.findByPk(id);
        if (!commerce) {
            return res.status(404).json({ error: 'commerce not found with id:' + id });
        }
        await commerce.destroy()
        return res.status(200).json(commerce);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createCommerce, updateCommerce, deleteCommerce, findAllCommerces, findCommerceById};