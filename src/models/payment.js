const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Payment = sequelize.define('payment', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'order',
      key: 'id'
    }
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  total_amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

module.exports = Payment;
