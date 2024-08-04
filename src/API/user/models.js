
const Sequelize = require('sequelize');
const { sequelize } = require('../../database'); // Import database connection

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Ensure valid email format
        }
    },
    phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    nationalId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    isActive: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    /* addressId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'address',
          key: 'id'
        }
      },
    roleId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    } */
});

module.exports = User;