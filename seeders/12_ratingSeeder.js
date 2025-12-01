'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        'rating',
        [
          {
            user_id: 1,
            commerce_id: 1,
            order_id: 1,
            product_id: 1,
            rate_order: 5,
            comment: 'Excelente servicio, llegó rápido.'
          },
          {
            user_id: 1,
            commerce_id: 2,
            order_id: 2,
            product_id: 1,
            rate_order: 4,
            comment: 'Muy bueno, aunque demoró un poco.'
          },
          {
            user_id: 1,
            commerce_id: 3,
            order_id: 3,
            product_id: 1,
            rate_order: 3,
            comment: 'Aceptable.'
          },
          {
            user_id: 1,
            commerce_id: 4,
            order_id: 4,
            product_id: 1,
            rate_order: 5,
            comment: 'Todo perfecto.'
          },
          {
            user_id: 1,
            commerce_id: 5,
            order_id: 5,
            product_id: 1,
            rate_order: 2,
            comment: 'Llegó frío.'
          },

          // Usuario 2
          {
            user_id: 2,
            commerce_id: 1,
            order_id: 6,
            product_id: 1,
            rate_order: 4,
            comment: 'Bien calidad/precio.'
          },
          {
            user_id: 2,
            commerce_id: 2,
            order_id: 7,
            product_id: 1,
            rate_order: 5,
            comment: 'Excelente.'
          },
          {
            user_id: 2,
            commerce_id: 6,
            order_id: 8,
            product_id: 1,
            rate_order: 3,
            comment: 'Normal.'
          },
          {
            user_id: 2,
            commerce_id: 7,
            order_id: 9,
            product_id: 1,
            rate_order: 5,
            comment: 'Muy bueno.'
          },

          // Usuario 3
          {
            user_id: 3,
            commerce_id: 3,
            order_id: 10,
            product_id: 1,
            rate_order: 4,
            comment: 'Rico.'
          },
          {
            user_id: 3,
            commerce_id: 4,
            order_id: 11,
            product_id: 1,
            rate_order: 5,
            comment: 'Excelente.'
          },
          {
            user_id: 3,
            commerce_id: 8,
            order_id: 12,
            product_id: 1,
            rate_order: 4,
            comment: 'Buena porción.'
          },

          // Usuario 4
          {
            user_id: 4,
            commerce_id: 5,
            order_id: 13,
            product_id: 1,
            rate_order: 3,
            comment: 'Zafa.'
          },
          {
            user_id: 4,
            commerce_id: 6,
            order_id: 14,
            product_id: 1,
            rate_order: 4,
            comment: 'Bueno.'
          },
          {
            user_id: 4,
            commerce_id: 9,
            order_id: 15,
            product_id: 1,
            rate_order: 5,
            comment: 'Top.'
          },
          {
            user_id: 4,
            commerce_id: 10,
            order_id: 16,
            product_id: 1,
            rate_order: 4,
            comment: 'Rico, pero poca cantidad.'
          }
        ],
        {}
      );
    } catch (error) {
      console.error('Error executing seeder:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rating', null, {});
  }
};
