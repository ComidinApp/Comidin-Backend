'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('subscription', [
    {
      commerce_id: 1,
      plan_id: 1,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      plan_id: 2,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      plan_id: 3,
      created_at: new Date()
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscription', null, {});
  }
};