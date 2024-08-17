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

CustomerComplain.findCustomerComplainByUserId = async function(userId) {
  try {
    const complains = await CustomerComplain.findAll({
      where: { user_id: userId }
    });

    return complains;
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

CustomerComplain.findCustomerComplainByCommerceId = async function(commerceId) {
  try {
    const complains = await CustomerComplain.findAll({
      where: { commerce_id: commerceId }
    });

    return complains;
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

CustomerComplain.findCustomerComplainByOrderId = async function(orderId) {
  try {
    const complain = await CustomerComplain.findOne({
      where: { order_id: orderId }
    });

    return complain;
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

module.exports = CustomerComplain;