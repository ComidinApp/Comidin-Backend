const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Address = sequelize.define('address', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
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
  created_on: {
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
});

Address.associate = function(models) {
  Address.belongsTo(sequelize.define('User'), { foreignKey: 'user_id' });
};

module.exports = Address;