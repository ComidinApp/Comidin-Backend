'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('order_detail', [
    {

      order_id:1,
      publication_id: 1,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'100'
    },
    {
      order_id:2,
      publication_id: 2,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'300'
    },
    {
      order_id:3,
      publication_id: 3,
      created_at: new Date(),
      quantity:'1',
      tips:'1',
      amount:'100'
    }
  ], {});
    
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_detail', null, {});
  }
};