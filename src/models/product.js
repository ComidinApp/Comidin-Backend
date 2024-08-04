const Sequelize = require('sequelize');
const db = require('./config');

const Product = db.define('product', {
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
  commerceId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce',
      key: 'id'
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  productCode: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  createdOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  }
}, {
});

module.exports = Product;
