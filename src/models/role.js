const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const { Op } = require('sequelize');

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

Role.findAllRoles = async function() {
  try {
    const roles = await Role.findAll({
      where: {
        name: {
          [Op.not]: ['Propietario', 'Administrador']
        }
      }
    });

    return roles;
  } catch (error) {
    console.error('Error finding roles:', error);
    throw error;
  }
};

module.exports = Role;