const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const OrderHistory = sequelize.define(
  'order_history',
  {
    id: { type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true 
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'order', key: 'id' },
    },
    status: { type: Sequelize.STRING, 
        allowNull: false 
    },
    created_at: { type: Sequelize.DATE, 
        allowNull: false, 
        defaultValue: Sequelize.NOW 
    },
  },
  { createdAt: false, updatedAt: false, freezeTableName: true }
);

module.exports = OrderHistory;
