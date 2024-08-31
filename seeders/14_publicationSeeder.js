'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('publication', [
    {
      name: 'Combo Criollos',
      commerce_id:1,
      product_id: 2,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    
    },
    {
      name: 'Combo Asado',
      commerce_id:2,
      product_id: 4,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      name: 'Pancho segundero',
      commerce_id:3,
      product_id: 6,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('publication', null, {});
  }
};