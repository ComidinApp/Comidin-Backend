
const ProductCategory = require('../models/productCategory');

const createProductCategory = async (req, res) => {
    try {
        const { body } = req;
        const productCategory = new ProductCategory(body);
        await productCategory.save();
        return res.status(201).json(productCategory);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllProductCategories = async (req, res) => {
    try {
        const productCategory = await ProductCategory.findAll()
        return res.status(200).json(productCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findProductCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) {
            return res.status(404).json({ error: 'ProductCategory not found with id:' + id });
        }
        return res.status(200).json(productCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateProductCategory = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) {
            return res.status(404).json({ error: 'ProductCategory not found with id:' + id });
        }
        await ProductCategory.update(body);
        return res.status(201).json(productCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteProductCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const productCategory = await ProductCategory.findByPk(id);
        if (!productCategory) {
            return res.status(404).json({ error: 'ProductCategory not found with id:' + id });
        }
        await ProductCategory.destroy()
        return res.status(200).json(productCategory);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

module.exports =  {createProductCategory, updateProductCategory, deleteProductCategory, findAllProductCategories, findProductCategoryById};