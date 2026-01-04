// src/models/employee.js
const Sequelize = require('sequelize');
const { sequelize } = require('../database');
const { Op } = require('sequelize');

const Employee = sequelize.define('employee', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  commerce_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'commerce', key: 'id' } },
  role_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: 'role', key: 'id' } },
  first_name: { type: Sequelize.STRING, allowNull: false },
  last_name: { type: Sequelize.STRING, allowNull: false },
  email: { type: Sequelize.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
  phone_number: { type: Sequelize.STRING, allowNull: false, unique: true },
  national_id: { type: Sequelize.STRING, allowNull: false, unique: true },
  address: { type: Sequelize.STRING, allowNull: true },
  postal_code: { type: Sequelize.STRING, allowNull: true },
  created_at: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.NOW },
  password: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING, allowNull: true },
  country: { type: Sequelize.STRING, allowNull: true },
  status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'pending' },
  avatar_url: { type: Sequelize.STRING, allowNull: false },
  verification_code: { type: Sequelize.STRING, allowNull: true },
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
});

/**
 * ✅ Asociaciones diferidas:
 * Llamar a Employee.initAssociations() una vez, después de cargar todos los modelos.
 */
Employee.initAssociations = function () {
  const { role: Role, commerce: Commerce, subscription: Subscription } = sequelize.models;

  if (Role) Employee.belongsTo(Role, { foreignKey: 'role_id' });
  if (Commerce) Employee.belongsTo(Commerce, { foreignKey: 'commerce_id' });
  if (Subscription) Employee.hasMany(Subscription, { foreignKey: 'commerce_id', sourceKey: 'commerce_id' });
};

function getIncludes() {
  const { role: Role, commerce: Commerce } = sequelize.models;
  const include = [];
  if (Role) include.push({ model: Role, attributes: ['name', 'id'] });
  if (Commerce) include.push({ model: Commerce, attributes: ['name', 'id', 'status'] });
  return include;
}

Employee.findAllEmployees = async function () {
  try {
    return await Employee.findAll({ include: getIncludes() });
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Employee.findEmployeeById = async function (id) {
  try {
    return await Employee.findByPk(id, { include: getIncludes() });
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

// ⚠️ Esto seguía usando Role.name = 'Propietario'. Lo dejo por compatibilidad.
Employee.findAdminEmployeeByCommerceId = async function (commerceId) {
  try {
    const { role: Role, commerce: Commerce } = sequelize.models;

    return await Employee.findOne({
      where: { commerce_id: commerceId },
      include: [
        Role ? { model: Role, where: { name: 'Propietario' }, attributes: ['name'] } : null,
        Commerce ? { model: Commerce, attributes: ['name'] } : null,
      ].filter(Boolean),
    });
  } catch (error) {
    console.error('Error finding Employees with Role and Commerce:', error);
    throw error;
  }
};

Employee.findEmployeesByCommerceId = async function (commerceId) {
  try {
    return await Employee.findAll({
      where: { commerce_id: commerceId },
      include: getIncludes(),
    });
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

Employee.findEmployeesByRoleId = async function (roleId) {
  try {
    return await Employee.findAll({ where: { role_id: roleId } });
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};
Employee.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Employee.belongsTo(Commerce, { foreignKey: 'commerce_id', as: 'commerce' });
Employee.hasMany(Subscription, { foreignKey: 'commerce_id', sourceKey: 'commerce_id', as: 'subscriptions' });

Employee.findEmployeeByEmail = async function (email) {
  try {
    const employee = await Employee.findOne({
      where: { email },
      include: [
        {
          association: 'role',
          attributes: ['name', 'id'],
        },
        {
          association: 'commerce',
          attributes: ['name', 'status', 'id'],
        },
        {
          association: 'subscriptions',
          attributes: ['id', 'plan_id'],
          include: {
            model: sequelize.models.plan,
            attributes: ['name'],
          },
        },
      ],
      attributes: [
        'id',
        'role_id',
        'first_name',
        'last_name',
        'email',
        'avatar_url',
        'status',
        'verification_code',
      ],
    });

    return employee;
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};




Employee.findEmployeesByCommerceIdAndRoleIds = async function (commerceId, roleIds) {
  try {
    const employees = await Employee.findAll({
      where: {
        commerce_id: commerceId,
        role_id: { [Op.in]: roleIds },
        // status: 'active', // si aplica, ajustalo
      },
      attributes: ['id', 'first_name', 'last_name', 'email', 'role_id', 'commerce_id', 'status'],
    });

    return employees;
  } catch (error) {
    console.error('Error finding Employees by commerce and roleIds:', error);
    throw error;
  }
};


module.exports = Employee;
