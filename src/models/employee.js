const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection
const Role = require('./role');
const Commerce = require('./commerce');
const Subscription = require('./subscription');

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
    address: {
      type: Sequelize.STRING,
      allowNull: true
    },
    postal_code: {
      type: Sequelize.STRING,
      allowNull: true
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    country: {
        type: Sequelize.STRING,
        allowNull: true
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'pending'
    },
    avatar_url: {
      type: Sequelize.STRING,
      allowNull: false
    },
    verification_code: {
      type: Sequelize.STRING,
      allowNull: true
  },
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

Employee.belongsTo(Role, { foreignKey: 'role_id' });
Employee.belongsTo(Commerce, { foreignKey: 'commerce_id' });
Employee.hasMany(Subscription, { foreignKey: 'commerce_id', sourceKey: 'commerce_id' });

Employee.findAllEmployees = async function() {
  try {
    const employees = await Employee.findAll({
      include: [
        {
          model: Role,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Employee.findEmployeeById = async function(id) {
  try {
    const employees = await Employee.findByPk(id,{
      include: [
        {
          model: Role,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Employee.findAdminEmployeeByCommerceId = async function(commerceId) {
  try {
    const employees = await Employee.findOne({
      where: {
        commerce_id: commerceId,
      },
      include: [
        {
          model: Role,
          where: {
            name: 'Propietario'
          },
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Employee.findEmployeesByCommerceId = async function(commerceId) {
  try {
    const employees = await Employee.findAll({
      where: { commerce_id: commerceId },
      include: [
        {
          model: Role,
          attributes: ['name']
        },
        {
          model: Commerce,
          attributes: ['name']
        }
      ]
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

Employee.findEmployeeByEmail = async function(email) {
  try {
    const employees = await Employee.findOne({
      where: { email: email },
      include: [
        {
          model: Role,
          attributes: ['name', 'id']
        },
        {
          model: Commerce,
          attributes: ['name', 'status', 'id']
        },
        {
          model: Subscription,
          attributes: ['id', 'plan_id'],
          include: {
            model: sequelize.models.plan,
            attributes: ['name']
          }
        }
      ],
      attributes: ['id', 'role_id', 'first_name', 'last_name', 'email', 'avatar_url', 'status', 'verification_code']
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};


module.exports = Employee;