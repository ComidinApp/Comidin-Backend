
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
    },
    oauth_provider: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    createdAt: false,
    updatedAt: false,
    freezeTableName: true
});

User.findUserByEmail = async function(email) {
    try {
      const user = await User.findOne({
        where: { email: email },
        attributes: ['id', 'first_name','last_name', 'email', 'phone_number', 'national_id','is_active','birthday','oauth_provider']
      });
  
      return user;
    } catch (error) {
      console.error('Error finding User:', error);
      throw error;
    }
  };
  

module.exports = User;