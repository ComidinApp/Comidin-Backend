
const Product = require('../models/product');

const createProduct = async (req, res) => {
    try {
        const { body } = req;
        const product = new Product(body);
        await product.save();
        return res.status(201).json(product);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

const findAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll()
        return res.status(200).json(products);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found with id:' + id });
        }
        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const { body } = req;
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found with id:' + id });
        }
        await product.update(body);
        return res.status(201).json(product);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found with id:' + id });
        }
        await product.destroy()
        return res.status(200).json(product);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
}

const findProductsByCommerceId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const products = await Product.findProductsByCommerceId(commerceId);
        if (!products) {
            return res.status(404).json({ message: 'No products found for this commerce.' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

const findProductsByCategoryId = async (req, res) => {
    try {
        const { commerceId } = req.params;
        const products = await Product.findProductsByCategoryId(commerceId);
        if (!products) {
            return res.status(404).json({ message: 'No products found for this commerce.' });
        }
        return res.status(200).json(products);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: error.message });
    }
};

module.exports =  {createProduct, updateProduct, deleteProduct, findAllProducts, findProductById, findProductsByCommerceId, findProductsByCategoryId};