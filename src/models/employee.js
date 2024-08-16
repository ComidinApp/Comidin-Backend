
const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'commerce',
        key: 'id'
      }
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'role',
        key: 'id'
      }
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    last_name: {
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
    phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    national_id: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Employee.findEmployeesByCommerceId = async function(commerceId) {
  try {
    const employees = await Employee.findAll({
      where: { commerce_id: commerceId }
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

Employee.findEmployeesByRoleId = async function(roleId) {
  try {
    const employees = await Employee.findAll({
      where: { role_id: roleId }
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

module.exports = Employee;