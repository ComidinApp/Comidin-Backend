'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('order', [
    // Usuario 1
    {
      user_id: 1,
      commerce_id: 1,
      address_id: 1,
      created_at: new Date('2024-09-25'),
      total_amount: '300',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'cash',
      items_quantity: 3
  },
  {
      user_id: 1,
      commerce_id: 2,
      address_id: 1,
      created_at: new Date('2024-09-26'),
      total_amount: '300',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'cash',
      items_quantity: 2
  },
  {
      user_id: 1,
      commerce_id: 3,
      address_id: 1,
      created_at: new Date('2024-09-27'),
      total_amount: '700',
      status: 'pending',
      delivery_type: 'delivery',
      payment_method: 'cash',
      items_quantity: 1
  },
  {
      user_id: 1,
      commerce_id: 4,
      address_id: 1,
      created_at: new Date('2024-09-28'),
      total_amount: '800',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'cash',
      items_quantity: 1
  },
  {
      user_id: 1,
      commerce_id: 5,
      address_id: 1,
      created_at: new Date('2024-09-29'),
      total_amount: '900',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },

  // Usuario 2
  {
      user_id: 2,
      commerce_id: 1,
      address_id: 1,
      created_at: new Date('2024-09-30'),
      total_amount: '1000',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 3
  },
  {//7
      user_id: 2,
      commerce_id: 2,
      address_id: 1,
      created_at: new Date('2024-10-01'),
      total_amount: '1100',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 2
  },
  {
      user_id: 2,
      commerce_id: 6,
      address_id: 1,
      created_at: new Date('2024-10-02'),
      total_amount: '1200',
      status: 'pending',
      delivery_type: 'delivery',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 2,
      commerce_id: 7,
      address_id: 1,
      created_at: new Date('2024-10-03'),
      total_amount: '1300',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },

  // Usuario 3
  {//10
      user_id: 3,
      commerce_id: 3,
      address_id: 1,
      created_at: new Date('2024-10-04'),
      total_amount: '1500',
      status: 'pending',
      delivery_type: 'delivery',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 3,
      commerce_id: 4,
      address_id: 1,
      created_at: new Date('2024-10-05'),
      total_amount: '1600',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 3,
      commerce_id: 8,
      address_id: 1,
      created_at: new Date('2024-10-06'),
      total_amount: '1700',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },

  // Usuario 4
  {
      user_id: 4,
      commerce_id: 5,
      address_id: 1,
      created_at: new Date('2024-10-07'),
      total_amount: '3000',
      status: 'pending',
      delivery_type: 'delivery',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 4,
      commerce_id: 6,
      address_id: 1,
      created_at: new Date('2024-10-08'),
      total_amount: '3500',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 4,
      commerce_id: 9,
      address_id: 1,
      created_at: new Date('2024-10-09'),
      total_amount: '4000',
      status: 'pending',
      delivery_type: 'pickup',
      payment_method: 'mercadopago',
      items_quantity: 1
  },
  {
      user_id: 4,
      commerce_id: 10,
      address_id: 1,
      created_at: new Date('2024-10-10'),
      total_amount: '4500',
      status: 'pending',
      delivery_type: 'delivery',
      payment_method: 'mercadopago',
      items_quantity: 5
  },
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order', null, {});
  }
};