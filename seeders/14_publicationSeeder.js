'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('publication', [
    {
      available_stock: 50,
      price: 300,
      discounted_price: 200,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:1,
      product_id: 1,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 20,
      price: 30,
      is_active: 'active',
      discounted_price: 20,
      discount_percentaje: 0,
      commerce_id:1,
      product_id: 2,
      created_at: new Date(),
      price:'30',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 60,
      is_active: 'active',
      discounted_price: 50,
      discount_percentaje: 0,
      commerce_id:2,
      product_id: 6,
      created_at: new Date(),
      price:'60',
      expiration_date:new Date(),
    },
    {
      available_stock: 10,
      price: 300,
      discounted_price: 25,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:2,
      product_id: 4,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 5,
      price: 100,
      is_active: 'active',
      discounted_price: 80,
      discount_percentaje: 0,
      commerce_id:2,
      product_id: 5,
      created_at: new Date(),
      price:'100',
      expiration_date:new Date(),
    },
    {
      available_stock: 2,
      price: 70,
      is_active: 'active',
      discounted_price: 60,
      discount_percentaje: 0,
      commerce_id:2,
      product_id: 6,
      created_at: new Date(),
      price:'70',
      expiration_date:new Date(),
    },
    {
      available_stock: 30,
      price: 700,
      discounted_price: 630,
      discount_percentaje: 10,
      is_active: 'active',
      commerce_id:3,
      product_id: 7,
      created_at: new Date(),
      price:'700',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 30,
      price: 110,
      is_active: 'active',
      discounted_price: 100,
      discount_percentaje: 0,
      commerce_id:3,
      product_id: 8,
      created_at: new Date(),
      price:'110',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 3000,
      is_active: 'active',
      discounted_price: 3000,
      discount_percentaje: 0,
      commerce_id:3,
      product_id: 9,
      created_at: new Date(),
      price:'3000',
      expiration_date:new Date(),
    },
    {
      available_stock: 2,
      price: 2500,
      discounted_price: 2500,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:4,
      product_id: 10,
      created_at: new Date(),
      price:'2500',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 8,
      price: 500,
      is_active: 'active',
      discounted_price: 500,
      discount_percentaje: 0,
      commerce_id:4,
      product_id: 11,
      created_at: new Date(),
      price:'500',
      expiration_date:new Date(),
    },
    {
      available_stock: 10,
      price: 600,
      is_active: 'active',
      discounted_price: 600,
      discount_percentaje: 0,
      commerce_id:4,
      product_id: 12,
      created_at: new Date(),
      price:'600',
      expiration_date:new Date(),
    },
    {
      available_stock: 12,
      price: 700,
      discounted_price: 700,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:5,
      product_id: 13,
      created_at: new Date(),
      price:'700',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 5,
      price: 300,
      is_active: 'active',
      discounted_price: 300,
      discount_percentaje: 0,
      commerce_id:5,
      product_id: 14,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 890,
      is_active: 'active',
      discounted_price: 800,
      discount_percentaje: 0,
      commerce_id:5,
      product_id: 15,
      created_at: new Date(),
      price:'890',
      expiration_date:new Date(),
    },
    {
      available_stock: 4,
      price: 300,
      discounted_price: 300,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:6,
      product_id: 16,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 20,
      price: 300,
      is_active: 'active',
      discounted_price: 300,
      discount_percentaje: 0,
      commerce_id:6,
      product_id: 17,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 300,
      is_active: 'active',
      discounted_price: 200,
      discount_percentaje: 0,
      commerce_id:6,
      product_id: 18,
      created_at: new Date(),
      price:'300',
      expiration_date:new Date(),
    },
    {
      available_stock: 10,
      price: 780,
      discounted_price: 700,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:13,
      product_id: 19,
      created_at: new Date(),
      price:'780',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 2,
      price: 1500,
      is_active: 'active',
      discounted_price: 1500,
      discount_percentaje: 0,
      commerce_id:13,
      product_id: 20,
      created_at: new Date(),
      price:'1500',
      expiration_date:new Date(),
    },
    {
      available_stock: 22,
      price: 1500,
      is_active: 'active',
      discounted_price: 1600,
      discount_percentaje: 0,
      commerce_id:13,
      product_id: 21,
      created_at: new Date(),
      price:'1500',
      expiration_date:new Date(),
    },
    {
      available_stock: 8,
      price: 3000,
      discounted_price: 1800,
      discount_percentaje: 0,
      is_active: 'active',
      commerce_id:14,
      product_id: 22,
      created_at: new Date(),
      price:'3000',
      expiration_date:new Date(),
    
    },
    {
      available_stock: 9,
      price: 1200,
      is_active: 'active',
      discounted_price: 1200,
      discount_percentaje: 0,
      commerce_id:14,
      product_id: 23,
      created_at: new Date(),
      price:'1200',
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