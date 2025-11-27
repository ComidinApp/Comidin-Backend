// scripts/resetDatabase.js
require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../database');

// IMPORTAMOS TODOS LOS MODELOS para que Sequelize conozca las tablas
require('../models/user');
require('../models/commerce');
require('../models/commerceCategory');
require('../models/employee');
require('../models/address');
require('../models/order');
require('../models/orderDetail');
require('../models/product');
require('../models/productCategory');
require('../models/subscription');
require('../models/rating');
require('../models/customerComplain');
require('../models/role');
require('../models/plan');
require('../models/publication');
require('../models/payment');

async function resetDatabase() {
  try {
    console.log(' Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log(' Conexión OK');

    console.log(' Ejecutando sequelize.sync({ force: true }) (DROP + CREATE de todas las tablas)...');
    await sequelize.sync({ force: true });
    console.log(' Tablas recreadas según los modelos.');

    console.log(' Ejecutando TODOS los seeders con sequelize-cli...');
    await new Promise((resolve, reject) => {
      exec(
        'npx sequelize-cli db:seed:all --config config/config.js --env development',
        (error, stdout, stderr) => {
          if (error) {
            console.error(' Error ejecutando los seeders:', error.message);
            console.error(stderr);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        }
      );
    });

    console.log(' Base de datos reseteada y seeders ejecutados con éxito');
    process.exit(0);
  } catch (err) {
    console.error(' Error durante el reset de la base:', err);
    process.exit(1);
  }
}

resetDatabase();
