const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const ProductCategory = require('./productCategory');
const Commerce = require('./commerce');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  commerce_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  },
  product_category_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'product_category',
      key: 'id'
    }
  },
  image_url: {
    type: Sequelize.STRING,
    allowNull: true
  },
  product_code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  is_deleted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Product.belongsTo(ProductCategory, { foreignKey: 'product_category_id' });
Product.belongsTo(Commerce, { foreignKey: 'commerce_id' });

Product.findAllProducts = async function() {
  try {
    const products = await Product.findAll({
      where: { is_deleted: false },
      include: [
        {
          model: ProductCategory,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return products;
  } catch (error) {
    console.error('Error finding Products with Category and Commerce:', error);
    throw error;
  }
};

Product.findProductsByCommerceId = async function(commerceId) {
  try {
    const products = await Product.findAll({
      where: { commerce_id: commerceId, is_deleted: false },
      include: [
        {
          model: ProductCategory,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return products;
  } catch (error) {
    console.error('Error finding Products:', error);
    throw error;
  }
};

Product.findProductsByCategoryId = async function(categoryId) {
  try {
    const products = await Product.findAll({
      where: { product_category_id: categoryId, is_deleted: false }
    });

    return products;
  } catch (error) {
    console.error('Error finding Products:', error);
    throw error;
  }
};

module.exports = Product;
