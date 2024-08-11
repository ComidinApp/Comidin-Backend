const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const CustomerComplain = sequelize.define('customer_complain', {
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
  complain_description: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

module.exports = CustomerComplain;