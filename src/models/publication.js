const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Publication = sequelize.define('publication', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
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
    type: Sequelize.DATE,
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

Publication.findPublicationsByCommerceId = async function(commerceId) {
  try {
    const publications = await Publication.findAll({
      where: { commerce_id: commerceId }
    });

    return publications;
  } catch (error) {
    console.error('Error finding Publications:', error);
    throw error;
  }
};

module.exports = Publication;
