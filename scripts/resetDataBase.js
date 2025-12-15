require('dotenv').config();
const { exec } = require('child_process');
const { sequelize } = require('../src/database');

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

async function resetDatabase() {
  const env = 'development';

  try {
    console.log('🔌 Conectando a la base de datos...');
    await sequelize.authenticate();
    console.log('✅ Conexión OK');

    console.log('🧨 Eliminando tablas en orden...');
    await sequelize.transaction(async (t) => {
      await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;', { transaction: t });

      const tables = [
        'payment',
        'customer_complain',
        'rating',
        'order_detail',
        'order',
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
        'user',
      ];

      for (const table of tables) {
        await sequelize.query(`DROP TABLE IF EXISTS \`${table}\`;`, { transaction: t });
      }

      await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;', { transaction: t });
    });

    console.log('✅ Tablas eliminadas. Recreando tablas según los modelos...');
    await sequelize.sync();
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
