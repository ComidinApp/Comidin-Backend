// config/config.js
require('dotenv').config();

const common = {
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  host: process.env.MYSQLDB_HOST || 'mysqldb',
  dialect: 'mysql', // ← clave para sequelize-cli
};

module.exports = {
  development: { ...common },
  production: { ...common },
};
 