const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Role = sequelize.define('role', {
  id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  name: {
      type: Sequelize.STRING,
      allowNull: false
  },
  description: {
      type: Sequelize.TEXT,
      allowNull: false
  }
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

module.exports = Role;