const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Rating = sequelize.define(
  'rating',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'commerce',
        key: 'id',
      },
    },
    order_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'order',
        key: 'id',
      },
    },
    product_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    rate_order: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    comment: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);


// Todas las calificaciones de un usuario
Rating.findRatingsByUserId = async function (userId) {
  return Rating.findAll({ where: { user_id: userId } });
};

// Todas las calificaciones de un comercio
Rating.findRatingsByCommerceId = async function (commerceId) {
  return Rating.findAll({ where: { commerce_id: commerceId } });
};

// Calificación por orden
Rating.findRatingByOrderId = async function (orderId) {
  return Rating.findOne({ where: { order_id: orderId } });
};

module.exports = Rating;
