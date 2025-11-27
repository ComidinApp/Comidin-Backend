// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.MYSQLDB_HOST || 'mysqldb',
    dialect: 'mysql',
  },
};
