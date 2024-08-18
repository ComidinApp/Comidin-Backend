const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Order = sequelize.define('order', {
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
  },
  delivery_type: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

Order.findOrdersByUserId = async function(userId) {
  try {
    const orders = await Order.findAll({
      where: { user_id: userId }
    });

    return orders;
  } catch (error) {
    console.error('Error finding Orders:', error);
    throw error;
  }
};

Order.findOrdersByCommerceId = async function(commerceId) {
  try {
    const orders = await Order.findAll({
      where: { commerce_id: commerceId }
    });

    return orders;
  } catch (error) {
    console.error('Error finding Orders:', error);
    throw error;
  }
};

module.exports = Order;
