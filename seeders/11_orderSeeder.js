'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('order', [
        // Usuario 1
        {
          id: 1,
          user_id: 1,
          commerce_id: 1,
          address_id: 1,
          created_at: new Date('2024-09-25'),
          total_amount: 300,               // = 200 + 100
          status: 'PENDING',
          delivery_type: 'pickup',
          payment_method: 'cash',
          items_quantity: 3                // = 2 + 1
        },
        {
          id: 2,
          user_id: 1,
          commerce_id: 2,
          address_id: 1,
          created_at: new Date('2024-09-26'),
          total_amount: 300,               // = 1*100 + 1*200
          status: 'PAID',
          delivery_type: 'pickup',
          payment_method: 'cash',
          items_quantity: 2                // = 1 + 1
        },
        {
          id: 3,
          user_id: 1,
          commerce_id: 3,
          address_id: 1,
          created_at: new Date('2024-09-27'),
          total_amount: 700,               // = 2*200 + 1*300
          status: 'DELIVERED',
          delivery_type: 'delivery',
          payment_method: 'cash',
          items_quantity: 3                // = 2 + 1
        },
        {
          id: 4,
          user_id: 1,
          commerce_id: 4,
          address_id: 1,
          created_at: new Date('2024-09-28'),
          total_amount: 800,               // = 2*200 + 2*200
          status: 'COMPLETED',
          delivery_type: 'pickup',
          payment_method: 'cash',
          items_quantity: 4                // = 2 + 2
        },
        {
          id: 5,
          user_id: 1,
          commerce_id: 5,
          address_id: 1,
          created_at: new Date('2024-09-29'),
          total_amount: 900,               // = 3*300
          status: 'CANCELLED',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 3
        },

        // Usuario 2
        {
          id: 6,
          user_id: 2,
          commerce_id: 1,
          address_id: 1,
          created_at: new Date('2024-09-30'),
          total_amount: 1000,              // = 5*200
          status: 'PENDING',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 5
        },
        {
          id: 7,
          user_id: 2,
          commerce_id: 2,
          address_id: 1,
          created_at: new Date('2024-10-01'),
          total_amount: 1100,              // = 3*200 + 1*500
          status: 'PAID',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 4
        },
        {
          id: 8,
          user_id: 2,
          commerce_id: 6,
          address_id: 1,
          created_at: new Date('2024-10-02'),
          total_amount: 1200,              // = 4*300
          status: 'DELIVERED',
          delivery_type: 'delivery',
          payment_method: 'mercadopago',
          items_quantity: 4
        },
        {
          id: 9,
          user_id: 2,
          commerce_id: 7,
          address_id: 1,
          created_at: new Date('2024-10-03'),
          total_amount: 1300,              // = 2*400 + 1*500
          status: 'COMPLETED',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 3
        },

        // Usuario 3
        {
          id: 10,
          user_id: 3,
          commerce_id: 3,
          address_id: 1,
          created_at: new Date('2024-10-04'),
          total_amount: 1500,              // = 5*300
          status: 'PENDING',
          delivery_type: 'delivery',
          payment_method: 'mercadopago',
          items_quantity: 5
        },
        {
          id: 11,
          user_id: 3,
          commerce_id: 4,
          address_id: 1,
          created_at: new Date('2024-10-05'),
          total_amount: 1600,              // = 4*400
          status: 'PAID',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 4
        },
        {
          id: 12,
          user_id: 3,
          commerce_id: 8,
          address_id: 1,
          created_at: new Date('2024-10-06'),
          total_amount: 1700,              // = 2*400 + 3*300
          status: 'DELIVERED',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 5
        },

        // Usuario 4
        {
          id: 13,
          user_id: 4,
          commerce_id: 5,
          address_id: 1,
          created_at: new Date('2024-10-07'),
          total_amount: 3000,              // = 6*500
          status: 'COMPLETED',
          delivery_type: 'delivery',
          payment_method: 'mercadopago',
          items_quantity: 6
        },
        {
          id: 14,
          user_id: 4,
          commerce_id: 6,
          address_id: 1,
          created_at: new Date('2024-10-08'),
          total_amount: 3500,              // = 7*500
          status: 'PENDING',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 7
        },
        {
          id: 15,
          user_id: 4,
          commerce_id: 9,
          address_id: 1,
          created_at: new Date('2024-10-09'),
          total_amount: 4000,              // = 8*500
          status: 'PAID',
          delivery_type: 'pickup',
          payment_method: 'mercadopago',
          items_quantity: 8
        },
        {
          id: 16,
          user_id: 4,
          commerce_id: 10,
          address_id: 1,
          created_at: new Date('2024-10-10'),
          total_amount: 4500,              // = 5*900
          status: 'DELIVERED',
          delivery_type: 'delivery',
          payment_method: 'mercadopago',
          items_quantity: 5
        },
      ], {});
    } catch (error) {
      console.error('Error executing seeder (order):', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order', null, {});
  }
};
