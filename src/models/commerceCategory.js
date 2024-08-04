const Sequelize = require('sequelize');
const db = require('./config'); // Import database connection

const CommerceCategory = db.define('commerce_category', {
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
        allowNull: false
    }
});

module.exports = CommerceCategory;