'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
    await queryInterface.bulkInsert('customer_complain', [
    {
      user_id: 1,
      commerce_id: 1,
      order_id:1,
      complain_description:'El pedido llego tarde',
      created_at: new Date(),
      closed_at: new Date()
    },
    {
      user_id: 2,
      commerce_id: 2,
      order_id:2,
      complain_description:'Me llego el rpoducto incorrecto',
      created_at: new Date(),
      closed_at: new Date()
    },
    {
      user_id: 3,
      commerce_id: 3,
      order_id:3,
      complain_description:'Nunca llego mi producto',
      created_at: new Date(),
      closed_at: new Date()
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('customer_complain', null, {});
  }
};