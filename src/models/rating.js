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

Rating.findRatingByUserId = async function(userId) {
  try {
    const ratings = await Rating.findAll({
      where: { user_id: userId }
    });

    return ratings;
  } catch (error) {
    console.error('Error finding Ratings:', error);
    throw error;
  }
};

Rating.findRatingByCommerceId = async function(commerceId) {
  try {
    const ratings = await Rating.findAll({
      where: { commerce_id: commerceId }
    });

    return ratings;
  } catch (error) {
    console.error('Error finding Ratings:', error);
    throw error;
  }
};

Rating.findRatingByOrderId = async function(orderId) {
  try {
    const rating = await Rating.findOne({
      where: { order_id: orderId }
    });

    return rating;
  } catch (error) {
    console.error('Error finding Rating:', error);
    throw error;
  }
};

module.exports = Rating;