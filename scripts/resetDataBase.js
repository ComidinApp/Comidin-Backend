require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../src/database');

// Importar modelos (IMPORTANTE para que sequelize conozca las FK)
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
require('../src/models/planBenefits');
require('../src/models/orderHistory');

async function resetDatabase() {
  const env = 'development';

  try {
    console.log(' Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log(' Conexión OK');

    console.log(' Desactivando FOREIGN_KEY_CHECKS...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');

    console.log(' Eliminando tablas...');
    const tables = [
      'payment',
      'customer_complain',
      'order_history',
      'rating',
      'order_detail',
      '`order`',
      'publication',
      'product',
      'product_category',
      'address',
      'employee',
      'subscription',
      'plan_benefits',
      'plan',
      'role',
      'commerce_category',
      'commerce',
      '`user`',
    ];

    for (const table of tables) {
      await sequelize.query(`DROP TABLE IF EXISTS ${table};`);
    }

    console.log(' Reactivando FOREIGN_KEY_CHECKS...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log(' Recreando tablas según modelos...');
    await sequelize.sync();
    console.log(' Tablas recreadas');

    console.log(` Ejecutando seeders (env=${env})...`);
    await new Promise((resolve, reject) => {
      exec(
        `npx sequelize-cli db:seed:all --config config/config.js --env ${env}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(stderr);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        }
      );
    });

    console.log('--Base de datos reseteada con éxito');
    process.exit(0);

  } catch (err) {
    console.error('--Error durante el reset:', err);
    try {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    } catch {}
    process.exit(1);
  }
}

resetDatabase();
