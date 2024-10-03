'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
    await queryInterface.bulkInsert('customer_complain', [
      {
        user_id: 1,
        commerce_id: 1,
        order_id: 1, // Orden de usuario 1
        complain_description: 'El pedido llegó tarde',
        created_at: new Date('2024-09-25'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-09-26') // Fecha de cierre
    },
    {
        user_id: 2,
        commerce_id: 2,
        order_id: 7, // Orden de usuario 2
        complain_description: 'Me llegó el producto incorrecto',
        created_at: new Date('2024-10-01'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-10-02') // Fecha de cierre
    },
    {
        user_id: 3,
        commerce_id: 3,
        order_id: 10, // Orden de usuario 3
        complain_description: 'Nunca llegó mi producto',
        created_at: new Date('2024-10-04'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-10-05') // Fecha de cierre
    },
    {
        user_id: 4,
        commerce_id: 5,
        order_id: 13, // Orden de usuario 4
        complain_description: 'El producto llegó dañado',
        created_at: new Date('2024-10-07'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-10-08') // Fecha de cierre
    },
    {
        user_id: 1,
        commerce_id: 4,
        order_id: 4, // Orden de usuario 1
        complain_description: 'Demoraron demasiado en entregar',
        created_at: new Date('2024-09-28'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-09-29') // Fecha de cierre
    },
    {
        user_id: 3,
        commerce_id: 8,
        order_id: 12, // Orden de usuario 3
        complain_description: 'No recibí mi pedido',
        created_at: new Date('2024-10-06'), // Coincide con la fecha de la orden
        closed_at: new Date('2024-10-07') // Fecha de cierre
    },
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_complain', null, {});
  }
};