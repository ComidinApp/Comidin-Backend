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
          status: 'PENDING',
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
          status: 'DELIVERED',
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
          status: 'CONFIRMED',
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
          status: 'CONFIRMED',
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
        {
        id: 100,
        user_id: 1,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2024-11-15'),
        total_amount: 2500,
        items_quantity: 3,
        status: 'CONFIRMED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 101,
        user_id: 2,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2024-12-10'),
        total_amount: 3100,
        items_quantity: 4,
        status: 'DELIVERED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 102,
        user_id: 3,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-01-20'),
        total_amount: 1800,
        items_quantity: 2,
        status: 'COMPLETED',
        delivery_type: 'delivery',
        payment_method: 'cash',
      },
      {
        id: 103,
        user_id: 4,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-02-08'),
        total_amount: 2700,
        items_quantity: 3,
        status: 'CONFIRMED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 104,
        user_id: 2,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-03-18'),
        total_amount: 3200,
        items_quantity: 3,
        status: 'DELIVERED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 105,
        user_id: 1,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-04-09'),
        total_amount: 4100,
        items_quantity: 5,
        status: 'COMPLETED',
        delivery_type: 'delivery',
        payment_method: 'cash',
      },
      {
        id: 106,
        user_id: 3,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-05-23'),
        total_amount: 2800,
        items_quantity: 3,
        status: 'CONFIRMED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 107,
        user_id: 4,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-06-13'),
        total_amount: 3400,
        items_quantity: 4,
        status: 'DELIVERED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 108,
        user_id: 2,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-07-02'),
        total_amount: 3900,
        items_quantity: 5,
        status: 'COMPLETED',
        delivery_type: 'delivery',
        payment_method: 'cash',
      },
      {
        id: 109,
        user_id: 1,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-08-16'),
        total_amount: 2300,
        items_quantity: 3,
        status: 'CONFIRMED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 110,
        user_id: 3,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-09-11'),
        total_amount: 4200,
        items_quantity: 5,
        status: 'DELIVERED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      {
        id: 111,
        user_id: 4,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2025-10-05'),
        total_amount: 3600,
        items_quantity: 4,
        status: 'COMPLETED',
        delivery_type: 'delivery',
        payment_method: 'mercadopago',
      },
      // DEMO - últimas 10 “ventanas” mensuales
{
  id: 9101,
  user_id: 3,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"),
  total_amount: 4000,
  status: 'CLAIMED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 2
},
{
  id: 9102,
  user_id: 2,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"),
  total_amount: 3200,
  status: 'CLAIMED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 2
},
{
  id: 9103,
  user_id: 1,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 3 MONTH)"),
  total_amount: 5200,
  status: 'COMPLETED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 3
},
{
  id: 9104,
  user_id: 4,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 4 MONTH)"),
  total_amount: 1800,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 1
},
{
  id: 9105,
  user_id: 1,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MONTH)"),
  total_amount: 4100,
  status: 'COMPLETED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 2
},
{
  id: 9106,
  user_id: 1,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 6 MONTH)"),
  total_amount: 2500,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 1
},
{
  id: 9107,
  user_id: 3,  
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 MONTH)"),
  total_amount: 5900,
  status: 'COMPLETED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 3
},
{
  id: 9108,
  user_id: 2,
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 8 MONTH)"),
  total_amount: 3400,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 2
},
{
  id: 9109,
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 3))"),
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 9 MONTH)"),
  total_amount: 4700,
  status: 'COMPLETED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 2
},
{
  id: 9110,
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 3))"),
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 10 MONTH)"),
  total_amount: 900,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 1
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
