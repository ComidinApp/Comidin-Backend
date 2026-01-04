const Sequelize = require('sequelize');
const { sequelize } = require('../database');

const CustomerComplain = sequelize.define(
  'customer_complain',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'user', key: 'id' },
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'commerce', key: 'id' },
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'order', key: 'id' },
    },
    complain_description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    closed_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    was_satisfactory: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: null,
    },
    satisfaction_answered_at: {
      type: Sequelize.DATE,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

CustomerComplain.findCustomerComplainByUserId = async function (userId) {
  try {
    return await CustomerComplain.findAll({ where: { user_id: userId } });
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

CustomerComplain.findCustomerComplainByCommerceId = async function (commerceId) {
  try {
    return await CustomerComplain.findAll({ where: { commerce_id: commerceId } });
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

CustomerComplain.findCustomerComplainByOrderId = async function (orderId) {
  try {
    return await CustomerComplain.findOne({ where: { order_id: orderId } });
  } catch (error) {
    console.error('Error finding Complains:', error);
    throw error;
  }
};

module.exports = CustomerComplain;
