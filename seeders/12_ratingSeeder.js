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
          },
          { user_id: 1, commerce_id: 21, order_id: 9401, product_id: 1, rate_order: 5, comment: 'Excelente atención, todo salió como esperaba.', created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)") },
          { user_id: 2, commerce_id: 21, order_id: 9402, product_id: 1, rate_order: 4, comment: 'Muy bien en general, buena experiencia.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 1 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9403, product_id: 1, rate_order: 5, comment: 'Todo impecable, sin problemas.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 3 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9404, product_id: 1, rate_order: 4, comment: 'Cumplió con lo prometido.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 5 DAY)") },

          // ===== MES 2 (hace 2 meses) =====
          { user_id: 1, commerce_id: 21, order_id: 9405, product_id: 1, rate_order: 4, comment: 'Buena atención y respuesta rápida.', created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)") },
          { user_id: 2, commerce_id: 21, order_id: 9406, product_id: 1, rate_order: 3, comment: 'Estuvo bien, aunque podría mejorar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 1 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9407, product_id: 1, rate_order: 2, comment: 'No fue la mejor experiencia.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 3 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9408, product_id: 1, rate_order: 3, comment: 'Aceptable, dentro de todo.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 5 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9409, product_id: 1, rate_order: 5, comment: 'Excelente, volvería a elegirlo.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 7 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9410, product_id: 1, rate_order: 4, comment: 'Muy conforme con el servicio.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 9 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9411, product_id: 1, rate_order: 5, comment: 'Todo perfecto, sin vueltas.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 11 DAY)") },

          // ===== MES 3 (hace 3 meses) =====
          { user_id: 4, commerce_id: 21, order_id: 9412, product_id: 1, rate_order: 4, comment: 'Muy buen trato y cumplimiento.', created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 3 MONTH)") },
          { user_id: 1, commerce_id: 21, order_id: 9413, product_id: 1, rate_order: 4, comment: 'Buena experiencia general.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 1 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9414, product_id: 1, rate_order: 3, comment: 'Correcto, sin destacar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 3 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9415, product_id: 1, rate_order: 2, comment: 'Tuve algunos inconvenientes.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 5 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9416, product_id: 1, rate_order: 3, comment: 'Cumplió, pero puede mejorar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 7 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9417, product_id: 1, rate_order: 5, comment: 'Excelente gestión, todo ok.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 9 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9418, product_id: 1, rate_order: 4, comment: 'Muy bien, buena coordinación.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 11 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9419, product_id: 1, rate_order: 5, comment: 'Todo salió redondo.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 13 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9420, product_id: 1, rate_order: 4, comment: 'Buen servicio, conforme.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 15 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9421, product_id: 1, rate_order: 5, comment: 'Impecable, lo recomiendo.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 17 DAY)") },

          // ===== MES 4 (hace 4 meses) =====
          { user_id: 2, commerce_id: 21, order_id: 9422, product_id: 1, rate_order: 3, comment: 'Bien, aunque algo lento.', created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 4 MONTH)") },
          { user_id: 3, commerce_id: 21, order_id: 9423, product_id: 1, rate_order: 2, comment: 'No cumplió mis expectativas.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 1 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9424, product_id: 1, rate_order: 3, comment: 'Regular, puede mejorar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 3 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9425, product_id: 1, rate_order: 5, comment: 'Excelente, todo en orden.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 5 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9426, product_id: 1, rate_order: 4, comment: 'Muy buen servicio y atención.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 7 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9427, product_id: 1, rate_order: 5, comment: 'Todo perfecto, sin demoras.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 9 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9428, product_id: 1, rate_order: 4, comment: 'Conforme, buena coordinación.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 11 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9429, product_id: 1, rate_order: 4, comment: 'Muy bien, repetiría.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 13 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9430, product_id: 1, rate_order: 3, comment: 'Aceptable, sin grandes problemas.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 15 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9431, product_id: 1, rate_order: 2, comment: 'Tuve inconvenientes y no se resolvió rápido.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 17 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9432, product_id: 1, rate_order: 3, comment: 'Normal, podría ser mejor.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 19 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9433, product_id: 1, rate_order: 5, comment: 'Excelente, súper conforme.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 21 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9434, product_id: 1, rate_order: 4, comment: 'Muy bien, todo claro.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 23 DAY)") },

          // ===== MES 5 (hace 5 meses) =====
          { user_id: 1, commerce_id: 21, order_id: 9435, product_id: 1, rate_order: 5, comment: 'Excelente experiencia, todo ok.', created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MONTH)") },
          { user_id: 2, commerce_id: 21, order_id: 9436, product_id: 1, rate_order: 4, comment: 'Muy buen trato y rapidez.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 1 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9437, product_id: 1, rate_order: 5, comment: 'Impecable, sin fallas.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 2 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9438, product_id: 1, rate_order: 4, comment: 'Buen servicio, conforme.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 3 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9439, product_id: 1, rate_order: 4, comment: 'Todo bien, buena comunicación.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 4 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9440, product_id: 1, rate_order: 5, comment: 'Excelente, todo como esperaba.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 5 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9441, product_id: 1, rate_order: 3, comment: 'Bien, aunque con detalles.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 6 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9442, product_id: 1, rate_order: 5, comment: 'Muy conforme, gran atención.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 7 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9443, product_id: 1, rate_order: 4, comment: 'Correcto, buena experiencia.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 8 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9444, product_id: 1, rate_order: 3, comment: 'Aceptable, sin destacar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 9 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9445, product_id: 1, rate_order: 4, comment: 'Muy bien, todo ordenado.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9446, product_id: 1, rate_order: 5, comment: 'Excelente, repetiría sin duda.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 11 DAY)") },
          { user_id: 1, commerce_id: 21, order_id: 9447, product_id: 1, rate_order: 4, comment: 'Muy buen servicio general.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 12 DAY)") },
          { user_id: 2, commerce_id: 21, order_id: 9448, product_id: 1, rate_order: 3, comment: 'Bien, pero podría mejorar.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 13 DAY)") },
          { user_id: 3, commerce_id: 21, order_id: 9449, product_id: 1, rate_order: 2, comment: 'No quedé conforme.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 14 DAY)") },
          { user_id: 4, commerce_id: 21, order_id: 9450, product_id: 1, rate_order: 5, comment: 'Excelente atención y resultado.', created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 15 DAY)") },
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
