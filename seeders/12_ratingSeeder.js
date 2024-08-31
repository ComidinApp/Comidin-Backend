'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('rating', [
    {
      user_id: 1,
      commerce_id: 1,
      order_id:1,
      rate_order:'5'
    },
    {
      user_id: 2,
      commerce_id: 2,
      order_id:2,
      rate_order:'7'
    },
    {
      user_id: 3,
      commerce_id: 3,
      order_id:3,
      rate_order:'10'
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('rating', null, {});
  }
};