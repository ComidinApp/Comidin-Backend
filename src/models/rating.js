const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection


const Rating = sequelize.define('rating', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'commerce',
        key: 'id'
      }
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id'
      }
    },
    rate_order: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = Rating;