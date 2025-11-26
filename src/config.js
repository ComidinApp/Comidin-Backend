// config/config.js
require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQLDB_USER,
    password: process.env.MYSQLDB_PASSWORD,
    database: process.env.MYSQLDB_DATABASE,
    host: process.env.MYSQLDB_HOST || '127.0.0.1',
    dialect: 'mysql',
    timezone: '-03:00',
    dialectOptions: {
      useUTC: false,
      dateStrings: true,
      typeCast: function (field, next) {
        if (field.type === 'DATETIME') {
          return field.string();
        }
        return next();
      },
    },
  },
};
