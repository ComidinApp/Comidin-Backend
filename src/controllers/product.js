const Product = require('../models/product');
const { uploadImage } = require('../services/s3Service');
const { processImage } = require('../helpers/imageHelper');

exports.createProduct = async (req, res) => {
  try {
    const { image_url, image_name, ...productData } = req.body;
    const { buffer, contentType, filename } = processImage(image_url,image_name);

    const imageUrl = await uploadImage(buffer, contentType, filename);
    productData.image_url = imageUrl;

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating Product:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};


exports.findAllProducts = async (req, res) => {
  try {
    const products = await Product.findAllProducts();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching Products:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
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
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { body } = req;
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found with id: ' + id });
    }

    if (body.image_url != product.image_url) {
      const { image_url, image_name } = req.body;
      const { buffer, contentType, filename } = processImage(image_url,image_name);

      const imageUrl = await uploadImage(buffer, contentType, filename);
      body.image_url = imageUrl;
    } 

    await product.update(body);
    res.status(200).json(product);
  } catch (error) {
    console.error('Error updating Product:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: req.params.id } });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    await product.update({ is_deleted: true });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting Product:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
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
    res.status(409).json({ error: 'Conflict', meesage: error });
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
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
