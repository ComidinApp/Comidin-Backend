require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../src/database');

// Importar modelos 
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
      const tableName = table.startsWith('`') ? table : `\`${table}\``;
      await sequelize.query(`DROP TABLE IF EXISTS ${tableName};`);
    }

    console.log(' Reactivando FOREIGN_KEY_CHECKS...');
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

    console.log(' Tablas eliminadas. Recreando tablas según los modelos...');
    //  fuerza recreación limpia
    await sequelize.sync({ force: true });
    console.log('Tablas recreadas según los modelos.');

    console.log(` Ejecutando TODOS los seeders con sequelize-cli (env=${env})...`);
    await new Promise((resolve, reject) => {
      exec(
        `npx sequelize-cli db:seed:all --config config/config.js --env ${env}`,
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
    try {
      // Por si quedó apagado
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    } catch {}
    process.exit(1);
  }
}

resetDatabase();
