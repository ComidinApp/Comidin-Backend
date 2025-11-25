const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const Product = require('./product');
const ProductCategory = require('./productCategory');
const Commerce = require('./commerce');
const CommerceCategory = require('./commerceCategory'); // 👈 nuevo

const { Op } = Sequelize; // 👈 para BETWEEN, etc.

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
    type: Sequelize.DECIMAL(10, ), // <- lo dejé como lo tenías
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

// models/publication.js

const { Op } = require("sequelize");

Publication.findCommercesWithExpiringPublications = async function ({ postalCode }) {
  try {

    // ---- DEFINIR EL DÍA DE HOY EN ARGENTINA ----
    const timeZone = 'America/Argentina/Buenos_Aires';

    const today = new Date().toLocaleString('en-US', { timeZone });
    const base = new Date(today);

    const startOfToday = new Date(base);
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date(base);
    endOfToday.setHours(23, 59, 59, 999);

    // ---- ARMAR EL WHERE ----
    const wherePublication = {
      is_active: 'active',
      expiration_date: {
        [Op.between]: [startOfToday, endOfToday],
      },
    };

    const whereCommerce = {};
    if (postalCode) {
      whereCommerce.postal_code = postalCode;
    }

    const publications = await Publication.findAll({
      where: wherePublication,
      include: [
        {
          model: Commerce,
          where: whereCommerce,
          include: [{ model: CommerceCategory, attributes: ['name'] }],
        },
      ],
    });

    const map = new Map();
    publications.forEach(pub => {
      if (pub.commerce && !map.has(pub.commerce.id)) {
        map.set(pub.commerce.id, pub.commerce);
      }
    });

    return Array.from(map.values());

  } catch (error) {
    console.error('Error finding Commerces with expiring Publications:', error);
    throw error;
  }
};


module.exports = Publication;
