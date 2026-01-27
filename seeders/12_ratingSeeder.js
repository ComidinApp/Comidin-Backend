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
                    // ===== Mes 1 (ids 9401-9404) =====
          { user_id: 1, commerce_id: 21, order_id: 9401, product_id: 1, rate_order: 5, comment: 'Excelente atención, todo salió como esperaba.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9401)') },
          { user_id: 2, commerce_id: 21, order_id: 9402, product_id: 1, rate_order: 4, comment: 'Muy bien en general, buena experiencia.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9402)') },
          { user_id: 3, commerce_id: 21, order_id: 9403, product_id: 1, rate_order: 5, comment: 'Todo impecable, sin problemas.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9403)') },
          { user_id: 4, commerce_id: 21, order_id: 9404, product_id: 1, rate_order: 4, comment: 'Cumplió con lo prometido.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9404)') },

          // ===== Mes 2 (ids 9405-9411) =====
          { user_id: 1, commerce_id: 21, order_id: 9405, product_id: 1, rate_order: 4, comment: 'Buena atención y respuesta rápida.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9405)') },
          { user_id: 2, commerce_id: 21, order_id: 9406, product_id: 1, rate_order: 3, comment: 'Estuvo bien, aunque podría mejorar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9406)') },
          { user_id: 3, commerce_id: 21, order_id: 9407, product_id: 1, rate_order: 2, comment: 'No fue la mejor experiencia.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9407)') },
          { user_id: 4, commerce_id: 21, order_id: 9408, product_id: 1, rate_order: 3, comment: 'Aceptable, dentro de todo.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9408)') },
          { user_id: 1, commerce_id: 21, order_id: 9409, product_id: 1, rate_order: 5, comment: 'Excelente, volvería a elegirlo.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9409)') },
          { user_id: 2, commerce_id: 21, order_id: 9410, product_id: 1, rate_order: 4, comment: 'Muy conforme con el servicio.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9410)') },
          { user_id: 3, commerce_id: 21, order_id: 9411, product_id: 1, rate_order: 5, comment: 'Todo perfecto, sin vueltas.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9411)') },

          // ===== Mes 3 (ids 9412-9421) =====
          { user_id: 4, commerce_id: 21, order_id: 9412, product_id: 1, rate_order: 4, comment: 'Muy buen trato y cumplimiento.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9412)') },
          { user_id: 1, commerce_id: 21, order_id: 9413, product_id: 1, rate_order: 4, comment: 'Buena experiencia general.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9413)') },
          { user_id: 2, commerce_id: 21, order_id: 9414, product_id: 1, rate_order: 3, comment: 'Correcto, sin destacar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9414)') },
          { user_id: 3, commerce_id: 21, order_id: 9415, product_id: 1, rate_order: 2, comment: 'Tuve algunos inconvenientes.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9415)') },
          { user_id: 4, commerce_id: 21, order_id: 9416, product_id: 1, rate_order: 3, comment: 'Cumplió, pero puede mejorar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9416)') },
          { user_id: 1, commerce_id: 21, order_id: 9417, product_id: 1, rate_order: 5, comment: 'Excelente gestión, todo ok.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9417)') },
          { user_id: 2, commerce_id: 21, order_id: 9418, product_id: 1, rate_order: 4, comment: 'Muy bien, buena coordinación.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9418)') },
          { user_id: 3, commerce_id: 21, order_id: 9419, product_id: 1, rate_order: 5, comment: 'Todo salió redondo.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9419)') },
          { user_id: 4, commerce_id: 21, order_id: 9420, product_id: 1, rate_order: 4, comment: 'Buen servicio, conforme.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9420)') },
          { user_id: 1, commerce_id: 21, order_id: 9421, product_id: 1, rate_order: 5, comment: 'Impecable, lo recomiendo.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9421)') },

          // ===== Mes 4 (ids 9422-9434) =====
          { user_id: 2, commerce_id: 21, order_id: 9422, product_id: 1, rate_order: 3, comment: 'Bien, aunque algo lento.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9422)') },
          { user_id: 3, commerce_id: 21, order_id: 9423, product_id: 1, rate_order: 2, comment: 'No cumplió mis expectativas.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9423)') },
          { user_id: 4, commerce_id: 21, order_id: 9424, product_id: 1, rate_order: 3, comment: 'Regular, puede mejorar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9424)') },
          { user_id: 1, commerce_id: 21, order_id: 9425, product_id: 1, rate_order: 5, comment: 'Excelente, todo en orden.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9425)') },
          { user_id: 2, commerce_id: 21, order_id: 9426, product_id: 1, rate_order: 4, comment: 'Muy buen servicio y atención.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9426)') },
          { user_id: 3, commerce_id: 21, order_id: 9427, product_id: 1, rate_order: 5, comment: 'Todo perfecto, sin demoras.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9427)') },
          { user_id: 4, commerce_id: 21, order_id: 9428, product_id: 1, rate_order: 4, comment: 'Conforme, buena coordinación.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9428)') },
          { user_id: 1, commerce_id: 21, order_id: 9429, product_id: 1, rate_order: 4, comment: 'Muy bien, repetiría.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9429)') },
          { user_id: 2, commerce_id: 21, order_id: 9430, product_id: 1, rate_order: 3, comment: 'Aceptable, sin grandes problemas.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9430)') },
          { user_id: 3, commerce_id: 21, order_id: 9431, product_id: 1, rate_order: 2, comment: 'Tuve inconvenientes y no se resolvió rápido.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9431)') },
          { user_id: 4, commerce_id: 21, order_id: 9432, product_id: 1, rate_order: 3, comment: 'Normal, podría ser mejor.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9432)') },
          { user_id: 1, commerce_id: 21, order_id: 9433, product_id: 1, rate_order: 5, comment: 'Excelente, súper conforme.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9433)') },
          { user_id: 2, commerce_id: 21, order_id: 9434, product_id: 1, rate_order: 4, comment: 'Muy bien, todo claro.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9434)') },

          // ===== Mes 5 (ids 9435-9450) =====
          { user_id: 1, commerce_id: 21, order_id: 9435, product_id: 1, rate_order: 5, comment: 'Excelente experiencia, todo ok.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9435)') },
          { user_id: 2, commerce_id: 21, order_id: 9436, product_id: 1, rate_order: 4, comment: 'Muy buen trato y rapidez.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9436)') },
          { user_id: 3, commerce_id: 21, order_id: 9437, product_id: 1, rate_order: 5, comment: 'Impecable, sin fallas.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9437)') },
          { user_id: 4, commerce_id: 21, order_id: 9438, product_id: 1, rate_order: 4, comment: 'Buen servicio, conforme.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9438)') },
          { user_id: 1, commerce_id: 21, order_id: 9439, product_id: 1, rate_order: 4, comment: 'Todo bien, buena comunicación.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9439)') },
          { user_id: 2, commerce_id: 21, order_id: 9440, product_id: 1, rate_order: 5, comment: 'Excelente, todo como esperaba.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9440)') },
          { user_id: 3, commerce_id: 21, order_id: 9441, product_id: 1, rate_order: 3, comment: 'Bien, aunque con detalles.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9441)') },
          { user_id: 4, commerce_id: 21, order_id: 9442, product_id: 1, rate_order: 5, comment: 'Muy conforme, gran atención.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9442)') },
          { user_id: 1, commerce_id: 21, order_id: 9443, product_id: 1, rate_order: 4, comment: 'Correcto, buena experiencia.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9443)') },
          { user_id: 2, commerce_id: 21, order_id: 9444, product_id: 1, rate_order: 3, comment: 'Aceptable, sin destacar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9444)') },
          { user_id: 3, commerce_id: 21, order_id: 9445, product_id: 1, rate_order: 4, comment: 'Muy bien, todo ordenado.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9445)') },
          { user_id: 4, commerce_id: 21, order_id: 9446, product_id: 1, rate_order: 5, comment: 'Excelente, repetiría sin duda.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9446)') },
          { user_id: 1, commerce_id: 21, order_id: 9447, product_id: 1, rate_order: 4, comment: 'Muy buen servicio general.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9447)') },
          { user_id: 2, commerce_id: 21, order_id: 9448, product_id: 1, rate_order: 3, comment: 'Bien, pero podría mejorar.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9448)') },
          { user_id: 3, commerce_id: 21, order_id: 9449, product_id: 1, rate_order: 2, comment: 'No quedé conforme.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9449)') },
          { user_id: 4, commerce_id: 21, order_id: 9450, product_id: 1, rate_order: 5, comment: 'Excelente atención y resultado.', created_at: Sequelize.literal('(SELECT created_at FROM `order` WHERE id = 9450)') },
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
