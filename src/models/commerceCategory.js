const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const CommerceCategory = sequelize.define('commerce_category', {
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
        type: Sequelize.STRING,
        allowNull: false,
        freezeTableName: true
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

module.exports = CommerceCategory;