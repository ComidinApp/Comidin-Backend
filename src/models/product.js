const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

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
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Product.findProductsByCommerceId = async function(commerceId) {
  try {
    const products = await Product.findAll({
      where: { commerce_id: commerceId }
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
      where: { product_category_id: categoryId }
    });

    return products;
  } catch (error) {
    console.error('Error finding Products:', error);
    throw error;
  }
};

module.exports = Product;
