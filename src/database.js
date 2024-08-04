const { Sequelize } = require('sequelize');

//Sacar esto que esta hardcodeado ajio
const sequelize = new Sequelize('fazt_db', 'fazt', '123456', {
    host: 'mysqldb',
    dialect: 'mysql',
});

const connectDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = { sequelize, connectDatabase };