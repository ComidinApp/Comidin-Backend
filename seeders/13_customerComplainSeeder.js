'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('customer_complain', [
        {
          user_id: 1,
          commerce_id: 1,
          order_id: 1,
          complain_description: 'El pedido llegó tarde',
          created_at: new Date('2024-09-25'),
          closed_at: new Date('2024-09-26'),
          was_satisfactory: null,
          satisfaction_answered_at: null,
        },
        {
          user_id: 2,
          commerce_id: 2,
          order_id: 7,
          complain_description: 'Me llegó el producto incorrecto',
          created_at: new Date('2024-10-01'),
          closed_at: new Date('2024-10-02'),
          was_satisfactory: true,
          satisfaction_answered_at: new Date('2024-10-03'),
        },
        {
          user_id: 3,
          commerce_id: 3,
          order_id: 10,
          complain_description: 'Nunca llegó mi producto',
          created_at: new Date('2024-10-04'),
          closed_at: new Date('2024-10-05'),
          was_satisfactory: false,
          satisfaction_answered_at: new Date('2024-10-06'),
        },
        {
          user_id: 4,
          commerce_id: 5,
          order_id: 13,
          complain_description: 'El producto llegó dañado',
          created_at: new Date('2024-10-07'),
          closed_at: new Date('2024-10-08'),
          was_satisfactory: null,
          satisfaction_answered_at: null,
        },
        {
          user_id: 1,
          commerce_id: 4,
          order_id: 4,
          complain_description: 'Demoraron demasiado en entregar',
          created_at: new Date('2024-09-28'),
          closed_at: new Date('2024-09-29'),
          was_satisfactory: true,
          satisfaction_answered_at: new Date('2024-09-30'),
        },
        {
          user_id: 3,
          commerce_id: 8,
          order_id: 12,
          complain_description: 'No recibí mi pedido',
          created_at: new Date('2024-10-06'),
          closed_at: new Date('2024-10-07'),
          was_satisfactory: false,
          satisfaction_answered_at: new Date('2024-10-08'),
        },
      ], {});
    } catch (error) {
      console.error('Error executing seeder:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_complain', null, {});
  },
};
