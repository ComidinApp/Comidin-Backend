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
          { user_id: 1, commerce_id: 21, order_id: 9401, product_id:3, rate_order: 5, comment: 'Excelente atención, todo salió como esperaba.' },
          { user_id: 2, commerce_id: 21, order_id: 9402, product_id: 4, rate_order: 4, comment: 'Muy bien en general, buena experiencia.' },
          { user_id: 3, commerce_id: 21, order_id: 9403, product_id:2, rate_order: 5, comment: 'Todo impecable, sin problemas.' },
          { user_id: 4, commerce_id: 21, order_id: 9404, product_id: 1, rate_order: 4, comment: 'Cumplió con lo prometido.' },

          // ===== MES 2 (hace 2 meses) =====
          { user_id: 1, commerce_id: 21, order_id: 9405, product_id: 1, rate_order: 4, comment: 'Buena atención y respuesta rápida.' },
          { user_id: 2, commerce_id: 21, order_id: 9406, product_id: 4, rate_order: 3, comment: 'Estuvo bien, aunque podría mejorar.' },
          { user_id: 3, commerce_id: 21, order_id: 9407, product_id: 2, rate_order: 2, comment: 'No fue la mejor experiencia.'},
          { user_id: 4, commerce_id: 21, order_id: 9408, product_id: 3, rate_order: 3, comment: 'Aceptable, dentro de todo.' },
          { user_id: 1, commerce_id: 21, order_id: 9409, product_id: 3, rate_order: 5, comment: 'Excelente, volvería a elegirlo.' },
          { user_id: 2, commerce_id: 21, order_id: 9410, product_id: 2, rate_order: 4, comment: 'Muy conforme con el servicio.' },
          { user_id: 3, commerce_id: 21, order_id: 9411, product_id: 1, rate_order: 5, comment: 'Todo perfecto, sin vueltas.'},

          // ===== MES 3 (hace 3 meses) =====
          { user_id: 4, commerce_id: 21, order_id: 9412, product_id: 1, rate_order: 4, comment: 'Muy buen trato y cumplimiento.' },
          { user_id: 1, commerce_id: 21, order_id: 9413, product_id: 4, rate_order: 4, comment: 'Buena experiencia general.'},
          { user_id: 2, commerce_id: 21, order_id: 9414, product_id: 2, rate_order: 3, comment: 'Correcto, sin destacar.' },
          { user_id: 3, commerce_id: 21, order_id: 9415, product_id: 2, rate_order: 2, comment: 'Tuve algunos inconvenientes.' },
          { user_id: 4, commerce_id: 21, order_id: 9416, product_id: 1, rate_order: 3, comment: 'Cumplió, pero puede mejorar.' },
          { user_id: 1, commerce_id: 21, order_id: 9417, product_id: 3, rate_order: 5, comment: 'Excelente gestión, todo ok.' },
          { user_id: 2, commerce_id: 21, order_id: 9418, product_id: 1, rate_order: 4, comment: 'Muy bien, buena coordinación.' },
          { user_id: 3, commerce_id: 21, order_id: 9419, product_id: 4, rate_order: 5, comment: 'Todo salió redondo.'},
          { user_id: 4, commerce_id: 21, order_id: 9420, product_id: 3, rate_order: 4, comment: 'Buen servicio, conforme.'},
          { user_id: 1, commerce_id: 21, order_id: 9421, product_id: 1, rate_order: 5, comment: 'Impecable, lo recomiendo.'},

          // ===== MES 4 (hace 4 meses) =====
          { user_id: 2, commerce_id: 21, order_id: 9422, product_id: 1, rate_order: 3, comment: 'Bien, aunque algo lento.'},
          { user_id: 3, commerce_id: 21, order_id: 9423, product_id: 2, rate_order: 2, comment: 'No cumplió mis expectativas.' },
          { user_id: 4, commerce_id: 21, order_id: 9424, product_id: 4, rate_order: 3, comment: 'Regular, puede mejorar.' },
          { user_id: 1, commerce_id: 21, order_id: 9425, product_id: 3, rate_order: 5, comment: 'Excelente, todo en orden.' },
          { user_id: 2, commerce_id: 21, order_id: 9426, product_id: 1, rate_order: 4, comment: 'Muy buen servicio y atención.'},
          { user_id: 3, commerce_id: 21, order_id: 9427, product_id: 2, rate_order: 5, comment: 'Todo perfecto, sin demoras.' },
          { user_id: 4, commerce_id: 21, order_id: 9428, product_id: 1, rate_order: 4, comment: 'Conforme, buena coordinación.'},
          { user_id: 1, commerce_id: 21, order_id: 9429, product_id: 3, rate_order: 4, comment: 'Muy bien, repetiría.' },
          { user_id: 2, commerce_id: 21, order_id: 9430, product_id: 1, rate_order: 3, comment: 'Aceptable, sin grandes problemas.'},
          { user_id: 3, commerce_id: 21, order_id: 9431, product_id: 2, rate_order: 2, comment: 'Tuve inconvenientes y no se resolvió rápido.'},
          { user_id: 4, commerce_id: 21, order_id: 9432, product_id: 4, rate_order: 3, comment: 'Normal, podría ser mejor.'},
          { user_id: 1, commerce_id: 21, order_id: 9433, product_id: 1, rate_order: 5, comment: 'Excelente, súper conforme.'},
          { user_id: 2, commerce_id: 21, order_id: 9434, product_id: 4, rate_order: 4, comment: 'Muy bien, todo claro.' },

          // ===== MES 5 (hace 5 meses) =====
          { user_id: 1, commerce_id: 21, order_id: 9435, product_id: 2, rate_order: 5, comment: 'Excelente experiencia, todo ok.' },
          { user_id: 2, commerce_id: 21, order_id: 9436, product_id: 4, rate_order: 4, comment: 'Muy buen trato y rapidez.'},
          { user_id: 3, commerce_id: 21, order_id: 9437, product_id: 2, rate_order: 5, comment: 'Impecable, sin fallas.' },
          { user_id: 4, commerce_id: 21, order_id: 9438, product_id: 1, rate_order: 4, comment: 'Buen servicio, conforme.' },
          { user_id: 1, commerce_id: 21, order_id: 9439, product_id: 1, rate_order: 4, comment: 'Todo bien, buena comunicación.' },
          { user_id: 2, commerce_id: 21, order_id: 9440, product_id: 4, rate_order: 5, comment: 'Excelente, todo como esperaba.'},
          { user_id: 3, commerce_id: 21, order_id: 9441, product_id: 1, rate_order: 3, comment: 'Bien, aunque con detalles.' },
          { user_id: 4, commerce_id: 21, order_id: 9442, product_id: 3, rate_order: 5, comment: 'Muy conforme, gran atención.' },
          { user_id: 1, commerce_id: 21, order_id: 9443, product_id: 4, rate_order: 4, comment: 'Correcto, buena experiencia.' },
          { user_id: 2, commerce_id: 21, order_id: 9444, product_id: 3, rate_order: 3, comment: 'Aceptable, sin destacar.' },
          { user_id: 3, commerce_id: 21, order_id: 9445, product_id: 1, rate_order: 4, comment: 'Muy bien, todo ordenado.' },
          { user_id: 4, commerce_id: 21, order_id: 9446, product_id: 4, rate_order: 5, comment: 'Excelente, repetiría sin duda.'},
          { user_id: 1, commerce_id: 21, order_id: 9447, product_id:4, rate_order: 4, comment: 'Muy buen servicio general.'},
          { user_id: 2, commerce_id: 21, order_id: 9448, product_id: 3, rate_order: 3, comment: 'Bien, pero podría mejorar.' },
          { user_id: 3, commerce_id: 21, order_id: 9449, product_id: 2, rate_order: 2, comment: 'No quedé conforme.' },
          { user_id: 4, commerce_id: 21, order_id: 9450, product_id: 1, rate_order: 5, comment: 'Excelente atención y resultado.' },
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
