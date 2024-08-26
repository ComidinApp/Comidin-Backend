const Product = require('../models/product');

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating Product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching Products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error fetching Product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating Product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting Product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findProductsByCommerceId = async (req, res) => {
  try {
    const products = await Product.findProductsByCommerceId(req.params.commerceId);
    if (products.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found for this commerce.' });
    }
  } catch (error) {
    console.error('Error fetching Products by Commerce ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.findProductsByCategoryId = async (req, res) => {
  try {
    const products = await Product.findProductsByCategoryId(req.params.categoryId);
    if (products.length) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products found for this category.' });
    }
  } catch (error) {
    console.error('Error fetching Products by Category ID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
