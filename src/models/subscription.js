
const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Subscription = sequelize.define('subscription', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    plan_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'plan',
        key: 'id'
      }
    },
    commerce_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'commerce',
        key: 'id'
      }
    },
    created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = Subscription;