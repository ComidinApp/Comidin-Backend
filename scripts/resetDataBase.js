// scripts/resetDatabase.js
require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../src/database');

// IMPORTAMOS TODOS LOS MODELOS
require('../src/models/user');
require('../src/models/commerce');
require('../src/models/commerceCategory');
require('../src/models/employee');
require('../src/models/address');
require('../src/models/order');
require('../src/models/orderDetail');
require('../src/models/product');
require('../src/models/productCategory');
require('../src/models/subscription');
require('../src/models/rating');
require('../src/models/customerComplain');
require('../src/models/role');
require('../src/models/plan');
require('../src/models/publication');
require('../src/models/payment');

async function resetDatabase() {
  const env = process.env.NODE_ENV || 'development';

  try {
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conexión OK');

    console.log('🧨 Ejecutando sequelize.sync({ force: true }) (DROP + CREATE de todas las tablas)...');
    await sequelize.sync({ force: true });
    console.log('✅ Tablas recreadas según los modelos.');

    console.log(`🌱 Ejecutando TODOS los seeders con sequelize-cli (env=${env})...`);
    await new Promise((resolve, reject) => {
      exec(
        `npx sequelize-cli db:seed:all --config config/config.js --env ${env}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error('❌ Error ejecutando los seeders:', error.message);
            console.error(stderr);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        }
      );
    });

    console.log('🎉 Base de datos reseteada y seeders ejecutados con éxito');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error durante el reset de la base:', err);
    process.exit(1);
  }
}

resetDatabase();
