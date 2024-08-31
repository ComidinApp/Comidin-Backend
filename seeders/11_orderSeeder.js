'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('order', [
    {
      user_id: 1,
      commerce_id: 1,
      created_at: new Date(),
      total_amount:'500',
      status:'Finalizado',
      delivery_type:'Moto'
    },
    {
      user_id: 2,
      commerce_id: 2,
      created_at: new Date(),
      total_amount:'1000',
      status:'Finalizado',
      delivery_type:'Bici'
    },
    {
      user_id: 3,
      commerce_id: 3,
      created_at: new Date(),
      total_amount:'4000',
      status:'Finalizado',
      delivery_type:'Auto'
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order', null, {});
  }
};