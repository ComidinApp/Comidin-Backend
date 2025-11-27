require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: '127.0.0.1', // importante: localhost para correr desde tu máquina
    dialect: 'mysql'
  }
};
