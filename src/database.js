const { Sequelize } = require('sequelize');
const host = process.env.MYSQLDB_HOST;
const user = process.env.MYSQLDB_USER;
const pass = process.env.MYSQLDB_PASSWORD;
const database = process.env.MYSQLDB_DATABASE;

//Sacar esto que esta hardcodeado ajio
const sequelize = new Sequelize(database, user, pass, {
    host: host,
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