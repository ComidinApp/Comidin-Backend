'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('publication', [
    {
      available_stock: 120,
      price: 3000,
      discounted_price: 3000,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:1,
      product_id: 2,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 200,
      price: 3000,
      is_active: 'active',
      discounted_price: 3000,
      discount_percentaje: 0,
      commerce_id:2,
      product_id: 4,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 3000,
      is_active: 'active',
      discounted_price: 3000,
      discount_percentaje: 0,
      commerce_id:3,
      product_id: 3,
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