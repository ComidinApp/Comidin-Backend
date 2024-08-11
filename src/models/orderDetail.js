const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const OrderDetail = sequelize.define('order_detail', {
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
  publication_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'publication',
      key: 'id'
    }
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  quantity: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  tips: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
  amount: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  },
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

module.exports = OrderDetail;
