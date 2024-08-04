
const Sequelize = require('sequelize');
const { sequelize } = require('../database'); // Import database connection

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
    is_active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    birthday: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    created_on: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.associate = function(models) {
    User.hasMany(sequelize.define('Address'), { foreignKey: 'address_id' });
};

module.exports = User;