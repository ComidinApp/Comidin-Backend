const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const Product = require('./product');
const ProductCategory = require('./productCategory');
const Commerce = require('./commerce');

const Publication = sequelize.define('publication', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  is_active: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: 'active'
  },
  commerce_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  },
  product_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'product',
      key: 'id'
    }
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  discount_percentaje: {
    type: Sequelize.DECIMAL(10, ),
    allowNull: false,
  },
  discounted_price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  available_stock: {
    type: Sequelize.DECIMAL(10, 0),
    allowNull: false,
  },
  expiration_date: {
    type: Sequelize.DATE,
    allowNull: false,
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

Publication.belongsTo(Product, { foreignKey: 'product_id' });
Publication.belongsTo(Commerce, { foreignKey: 'commerce_id' });

Publication.findAllPublications = async function() {
  try {
    const employees = await Publication.findAll({
      include: [
        {
          model: Product,
          attributes: ['name','description','image_url', 'product_category_id'],
          include: [
            {
              model: ProductCategory,
              attributes: ['name']
            }
          ]
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Publication.findPublicationsByCommerceId = async function(commerceId) {
  try {
    const publications = await Publication.findAll({
      where: { commerce_id: commerceId },
      include: [
        {
          model: Product,
          attributes: ['name','description','image_url']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return publications;
  } catch (error) {
    console.error('Error finding Publications:', error);
    throw error;
  }
};

module.exports = Publication;
