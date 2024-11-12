const ProductCategory = require('../models/productCategory');

exports.createProductCategory = async (req, res) => {
  try {
    const productCategory = await ProductCategory.create(req.body);
    res.status(201).json(productCategory);
  } catch (error) {
    console.error('Error creating ProductCategory:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findAllProductCategories = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findAll();
    res.status(200).json(productCategories);
  } catch (error) {
    console.error('Error fetching ProductCategories:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findProductCategoryById = async (req, res) => {
  try {
    const productCategory = await ProductCategory.findByPk(req.params.id);
    if (productCategory) {
      res.status(200).json(productCategory);
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error('Error fetching ProductCategory:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.updateProductCategory = async (req, res) => {
  try {
    const [updated] = await ProductCategory.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedProductCategory = await ProductCategory.findByPk(req.params.id);
      res.status(200).json(updatedProductCategory);
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error('Error updating ProductCategory:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.deleteProductCategory = async (req, res) => {
  try {
    const deleted = await ProductCategory.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'ProductCategory not found' });
    }
  } catch (error) {
    console.error('Error deleting ProductCategory:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};

exports.findProductCategoriesByCommerceId = async (req, res) => {
  try {
    const productCategories = await ProductCategory.findProductCategoriesByCommerceId(req.params.commerceId);
    if (productCategories.length) {
      res.status(200).json(productCategories);
    } else {
      res.status(404).json({ message: 'No product categories found for this commerce.' });
    }
  } catch (error) {
    console.error('Error fetching ProductCategories by Commerce ID:', error);
    res.status(409).json({ error: 'Conflict', meesage: error });
  }
};
