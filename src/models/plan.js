
const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const Plan = sequelize.define('plan', {
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

module.exports = Plan;