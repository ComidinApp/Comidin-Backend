const Sequelize = require('sequelize');
const { sequelize } = require('../database');
const { Op } = require('sequelize');

const Role = require('./role');
const Commerce = require('./commerce');
const Subscription = require('./subscription');

const Employee = sequelize.define(
  'employee',
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'commerce', key: 'id' },
    },
    role_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: { model: 'role', key: 'id' },
    },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    phone_number: { type: Sequelize.STRING, allowNull: false, unique: true },
    national_id: { type: Sequelize.STRING, allowNull: false, unique: true },
    address: { type: Sequelize.STRING, allowNull: true },
    postal_code: { type: Sequelize.STRING, allowNull: true },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    password: { type: Sequelize.STRING, allowNull: false },
    city: { type: Sequelize.STRING, allowNull: true },
    country: { type: Sequelize.STRING, allowNull: true },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'pending',
    },
    avatar_url: { type: Sequelize.STRING, allowNull: false },
    verification_code: { type: Sequelize.STRING, allowNull: true },
  },
  {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true,
  }
);

/* =======================
   ASOCIACIONES (ÚNICAS)
======================= */

Employee.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Employee.belongsTo(Commerce, { foreignKey: 'commerce_id', as: 'commerce' });
Employee.hasMany(Subscription, {
  foreignKey: 'commerce_id',
  sourceKey: 'commerce_id',
  as: 'subscriptions',
});

/* =======================
   QUERIES
======================= */

Employee.findAllEmployees = async function () {
  try {
    return await Employee.findAll({
      include: [
        { association: 'role', attributes: ['id', 'name'] },
        { association: 'commerce', attributes: ['id', 'name'] },
      ],
    });
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

Employee.findEmployeeById = async function (id) {
  try {
    return await Employee.findByPk(id, {
      include: [
        { association: 'role', attributes: ['id', 'name'] },
        { association: 'commerce', attributes: ['id', 'name'] },
      ],
    });
  } catch (error) {
    console.error('Error finding Employee by ID:', error);
    throw error;
  }
};

Employee.findAdminEmployeeByCommerceId = async function (commerceId) {
  try {
    return await Employee.findOne({
      where: { commerce_id: commerceId },
      include: [
        {
          association: 'role',
          where: { name: 'Propietario' },
          attributes: ['id', 'name'],
        },
        {
          association: 'commerce',
          attributes: ['id', 'name'],
        },
      ],
    });
  } catch (error) {
    console.error('Error finding admin employee:', error);
    throw error;
  }
};

Employee.findEmployeesByCommerceId = async function (commerceId) {
  try {
    return await Employee.findAll({
      where: { commerce_id: commerceId },
      include: [
        { association: 'role', attributes: ['id', 'name'] },
        { association: 'commerce', attributes: ['id', 'name'] },
      ],
    });
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

Employee.findEmployeesByRoleId = async function (roleId) {
  try {
    return await Employee.findAll({
      where: { role_id: roleId },
    });
  } catch (error) {
    console.error('Error finding Employees:', error);
    throw error;
  }
};

Employee.findEmployeeByEmail = async function (email) {
  try {
    return await Employee.findOne({
      where: { email },
      include: [
        { association: 'role', attributes: ['id', 'name'] },
        { association: 'commerce', attributes: ['id', 'name', 'status'] },
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
  } catch (error) {
    console.error('Error finding Employee by email:', error);
    throw error;
  }
};

Employee.findEmployeesByCommerceIdAndRoleIds = async function (
  commerceId,
  roleIds
) {
  try {
    return await Employee.findAll({
      where: {
        commerce_id: commerceId,
        role_id: { [Op.in]: roleIds },
      },
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'role_id',
        'commerce_id',
        'status',
      ],
    });
  } catch (error) {
    console.error(
      'Error finding Employees by commerce and roleIds:',
      error
    );
    throw error;
  }
};

module.exports = Employee;
