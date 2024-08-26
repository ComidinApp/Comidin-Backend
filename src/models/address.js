const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const User = require('./user');

const Address = sequelize.define('address', {
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
  street_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  number: {
    type: Sequelize.STRING,
    allowNull: false
  },
  postal_code: {
    type: Sequelize.STRING,
    allowNull: false
  },
  home_type: {
    type: Sequelize.STRING,
    allowNull: true
  },
  extra_info: {
    type: Sequelize.STRING,
    allowNull: true
  },
  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  home_referral_name: {
    type: Sequelize.STRING,
    allowNull: true
  },
  coordinates: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

// Define associations
Address.belongsTo(User, { foreignKey: 'user_id' });

// Define custom methods
Address.findAddressesByUserId = async function(userId) {
  try {
    const addresses = await Address.findAll({
      where: { user_id: userId }
    });
    return addresses;
  } catch (error) {
    console.error('Error finding Addresses:', error);
    throw error;
  }
};

module.exports = Address;
