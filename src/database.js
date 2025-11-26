// src/database.js
const { Sequelize } = require('sequelize');

const host = process.env.MYSQLDB_HOST;
const user = process.env.MYSQLDB_USER;
const pass = process.env.MYSQLDB_PASSWORD;
const database = process.env.MYSQLDB_DATABASE;

// Configurar Sequelize con timezone Argentina
const sequelize = new Sequelize(database, user, pass, {
  host: host,
  dialect: 'mysql',
  timezone: '-03:00', // ⚡ Fuerza horario Argentina (UTC-3)
  dialectOptions: {
    useUTC: false,     // ⚡ No convertir automáticamente a UTC
    dateStrings: true, // Devolver fechas como string
    typeCast: function (field, next) {
      if (field.type === 'DATETIME') {
        return field.string(); // Mantiene la fecha/hora tal como está en la DB
      }
      return next();
    },
  },
  // logging: console.log, // si querés ver los SQL, descomentá esto
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
