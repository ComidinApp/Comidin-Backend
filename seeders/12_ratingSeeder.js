'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('rating', [
    // Opiniones de Usuario 1
  { 
      user_id: 1,
      commerce_id: 1,
      order_id: 1,
      product_id: 1,
      rate_order: '5'
  },
  { 
      user_id: 1,
      commerce_id: 2,
      order_id: 2,
      product_id: 1,
      rate_order: '4'
  },
  { 
      user_id: 1,
      commerce_id: 3,
      order_id: 3,
      product_id: 1,
      rate_order: '3'
  },
  { 
      user_id: 1,
      commerce_id: 4,
      order_id: 4,
      product_id: 1,
      rate_order: '5'
  },
  { 
      user_id: 1,
      commerce_id: 5,
      order_id: 5,
      product_id: 1,
      rate_order: '2'
  },

  // Opiniones de Usuario 2
  { 
      user_id: 2,
      commerce_id: 1,
      order_id: 6,
      product_id: 1,
      rate_order: '6'
  },
  { 
      user_id: 2,
      commerce_id: 2,
      order_id: 7,
      product_id: 1,
      rate_order: '7'
  },
  { 
      user_id: 2,
      commerce_id: 6,
      order_id: 8,
      product_id: 1,
      rate_order: '8'
  },
  { 
      user_id: 2,
      commerce_id: 7,
      order_id: 9,
      product_id: 1,
      rate_order: '5'
  },

  // Opiniones de Usuario 3
  { 
      user_id: 3,
      commerce_id: 3,
      order_id: 10,
      product_id: 1,
      rate_order: '10'
  },
  { 
      user_id: 3,
      commerce_id: 4,
      order_id: 11,
      product_id: 1,
      rate_order: '9'
  },
  { 
      user_id: 3,
      commerce_id: 8,
      order_id: 12,
      product_id: 1,
      rate_order: '8'
  },

  // Opiniones de Usuario 4
  { 
      user_id: 4,
      commerce_id: 5,
      order_id: 13,
      product_id: 1,
      rate_order: '4'
  },
  { 
      user_id: 4,
      commerce_id: 6,
      order_id: 14,
      product_id: 1,
      rate_order: '5'
  },
  { 
      user_id: 4,
      commerce_id: 9,
      order_id: 15,
      product_id: 1,
      rate_order: '6'
  },
  { 
      user_id: 4,
      commerce_id: 10,
      order_id: 16,
      product_id: 1,
      rate_order: '7'
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