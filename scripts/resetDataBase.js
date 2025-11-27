// scripts/resetDatabase.js
require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../database'); // usa tu archivo database.js

async function resetDatabase() {
  try {
    console.log(' Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log(' Conexión OK');

    console.log(' Borrando y recreando TODAS las tablas según los modelos (sync({ force: true }))...');
    await sequelize.sync({ force: true });
    console.log(' Tablas recreadas correctamente');

    console.log('Ejecutando TODOS los seeders con sequelize-cli...');
    await new Promise((resolve, reject) => {
      exec(
        'npx sequelize-cli db:seed:all --config config/config.js --env development',
        (error, stdout, stderr) => {
          if (error) {
            console.error('Error ejecutando los seeders:', error.message);
            console.error(stderr);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        }
      );
    });

    console.log('Base de datos reseteada y seeders ejecutados con éxito');
    process.exit(0);
  } catch (err) {
    console.error(' Error durante el reset de la base:', err);
    process.exit(1);
  }
}

resetDatabase();
