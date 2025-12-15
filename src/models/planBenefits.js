const Sequelize = require('sequelize');
const { sequelize } = require('../database'); 
const Plan = require('./plan');

const PlanBenefit = sequelize.define('plan_benefits', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  plan_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: 'plan',
      key: 'id',
    },
  },

  // NULL = ilimitadas
  max_publications: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },

  can_add_stock: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  commerce_listing_visibility: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  access_reports: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  manage_employees_roles: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  better_search_position: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },
  exclusive_promotions: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: false },

  created_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true,
});

PlanBenefit.belongsTo(Plan, { foreignKey: 'plan_id' });

module.exports = PlanBenefit;
