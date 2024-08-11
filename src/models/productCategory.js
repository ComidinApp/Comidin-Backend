const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection


const ProductCategory = sequelize.define('product_category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'commerce',
        key: 'id'
      }
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = ProductCategory;