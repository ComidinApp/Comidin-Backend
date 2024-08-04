const Sequelize = require('sequelize');
const db = require('./config'); // Import database connection

const Commerce = db.define('commerce', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  subscription: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'address',
      key: 'id'
    }
  },
  addressId: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: 'address',
      key: 'id'
    }
  },
  commerceCategoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: 'commerce_category',
      key: 'id'
    }
  },
  commerceNationalId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: true
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdOn: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  openAt: {
    type: Sequelize.TIME,
    allowNull: true
  },
  closeAt: {
    type: Sequelize.TIME,
    allowNull: true
  }
}, {
});

module.exports = Commerce;