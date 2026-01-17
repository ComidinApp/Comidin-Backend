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
        {
        id: 100,
        user_id: 1,
        commerce_id: 20,
        address_id: 1,
        created_at: new Date('2024-11-15'),
        total_amount: 2500,
        items_quantity: 3,
        status: 'PAID',
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
        status: 'PAID',
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
        status: 'PAID',
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
        status: 'PAID',
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"),
  total_amount: 4000,
  status: 'COMPLETED',
  delivery_type: 'delivery',
  payment_method: 'mercadopago',
  items_quantity: 2
},
{
  id: 9102,
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"),
  total_amount: 3200,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 2
},
{
  id: 9103,
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
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
  user_id: Sequelize.literal("FLOOR(1 + (RAND() * 5))"),
  commerce_id: 21,
  address_id: 1,
  created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 10 MONTH)"),
  total_amount: 900,
  status: 'COMPLETED',
  delivery_type: 'pickup',
  payment_method: 'cash',
  items_quantity: 1
},
// ===============================
// DEMO ORDERS (10 x 12 meses = 120)
// ids: 9301..9420
// meses: 0..11
// user_id: MOD(id,5)+1  => 1..5
// ===============================

// Mes 0 (actual) -> 9301..9310
{ id: 9301, user_id: Sequelize.literal("MOD(9301,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9302, user_id: Sequelize.literal("MOD(9302,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9303, user_id: Sequelize.literal("MOD(9303,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9304, user_id: Sequelize.literal("MOD(9304,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9305, user_id: Sequelize.literal("MOD(9305,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9306, user_id: Sequelize.literal("MOD(9306,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9307, user_id: Sequelize.literal("MOD(9307,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9308, user_id: Sequelize.literal("MOD(9308,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9309, user_id: Sequelize.literal("MOD(9309,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9310, user_id: Sequelize.literal("MOD(9310,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 1 -> 9311..9320
{ id: 9311, user_id: Sequelize.literal("MOD(9311,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9312, user_id: Sequelize.literal("MOD(9312,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9313, user_id: Sequelize.literal("MOD(9313,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9314, user_id: Sequelize.literal("MOD(9314,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9315, user_id: Sequelize.literal("MOD(9315,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9316, user_id: Sequelize.literal("MOD(9316,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9317, user_id: Sequelize.literal("MOD(9317,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9318, user_id: Sequelize.literal("MOD(9318,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9319, user_id: Sequelize.literal("MOD(9319,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9320, user_id: Sequelize.literal("MOD(9320,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 2 -> 9321..9330
{ id: 9321, user_id: Sequelize.literal("MOD(9321,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9322, user_id: Sequelize.literal("MOD(9322,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9323, user_id: Sequelize.literal("MOD(9323,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9324, user_id: Sequelize.literal("MOD(9324,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9325, user_id: Sequelize.literal("MOD(9325,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9326, user_id: Sequelize.literal("MOD(9326,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9327, user_id: Sequelize.literal("MOD(9327,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9328, user_id: Sequelize.literal("MOD(9328,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9329, user_id: Sequelize.literal("MOD(9329,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9330, user_id: Sequelize.literal("MOD(9330,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 3 -> 9331..9340
{ id: 9331, user_id: Sequelize.literal("MOD(9331,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9332, user_id: Sequelize.literal("MOD(9332,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9333, user_id: Sequelize.literal("MOD(9333,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9334, user_id: Sequelize.literal("MOD(9334,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9335, user_id: Sequelize.literal("MOD(9335,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9336, user_id: Sequelize.literal("MOD(9336,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9337, user_id: Sequelize.literal("MOD(9337,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9338, user_id: Sequelize.literal("MOD(9338,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9339, user_id: Sequelize.literal("MOD(9339,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9340, user_id: Sequelize.literal("MOD(9340,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 4 -> 9341..9350
{ id: 9341, user_id: Sequelize.literal("MOD(9341,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9342, user_id: Sequelize.literal("MOD(9342,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9343, user_id: Sequelize.literal("MOD(9343,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9344, user_id: Sequelize.literal("MOD(9344,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9345, user_id: Sequelize.literal("MOD(9345,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9346, user_id: Sequelize.literal("MOD(9346,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9347, user_id: Sequelize.literal("MOD(9347,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9348, user_id: Sequelize.literal("MOD(9348,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9349, user_id: Sequelize.literal("MOD(9349,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9350, user_id: Sequelize.literal("MOD(9350,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 5 -> 9351..9360
{ id: 9351, user_id: Sequelize.literal("MOD(9351,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9352, user_id: Sequelize.literal("MOD(9352,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9353, user_id: Sequelize.literal("MOD(9353,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9354, user_id: Sequelize.literal("MOD(9354,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9355, user_id: Sequelize.literal("MOD(9355,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9356, user_id: Sequelize.literal("MOD(9356,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9357, user_id: Sequelize.literal("MOD(9357,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9358, user_id: Sequelize.literal("MOD(9358,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9359, user_id: Sequelize.literal("MOD(9359,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9360, user_id: Sequelize.literal("MOD(9360,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 6 -> 9361..9370
{ id: 9361, user_id: Sequelize.literal("MOD(9361,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9362, user_id: Sequelize.literal("MOD(9362,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9363, user_id: Sequelize.literal("MOD(9363,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9364, user_id: Sequelize.literal("MOD(9364,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9365, user_id: Sequelize.literal("MOD(9365,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9366, user_id: Sequelize.literal("MOD(9366,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9367, user_id: Sequelize.literal("MOD(9367,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9368, user_id: Sequelize.literal("MOD(9368,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9369, user_id: Sequelize.literal("MOD(9369,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9370, user_id: Sequelize.literal("MOD(9370,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 7 -> 9371..9380
{ id: 9371, user_id: Sequelize.literal("MOD(9371,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9372, user_id: Sequelize.literal("MOD(9372,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9373, user_id: Sequelize.literal("MOD(9373,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9374, user_id: Sequelize.literal("MOD(9374,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9375, user_id: Sequelize.literal("MOD(9375,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9376, user_id: Sequelize.literal("MOD(9376,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9377, user_id: Sequelize.literal("MOD(9377,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9378, user_id: Sequelize.literal("MOD(9378,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9379, user_id: Sequelize.literal("MOD(9379,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9380, user_id: Sequelize.literal("MOD(9380,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 8 -> 9381..9390
{ id: 9381, user_id: Sequelize.literal("MOD(9381,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9382, user_id: Sequelize.literal("MOD(9382,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9383, user_id: Sequelize.literal("MOD(9383,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9384, user_id: Sequelize.literal("MOD(9384,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9385, user_id: Sequelize.literal("MOD(9385,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9386, user_id: Sequelize.literal("MOD(9386,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9387, user_id: Sequelize.literal("MOD(9387,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9388, user_id: Sequelize.literal("MOD(9388,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9389, user_id: Sequelize.literal("MOD(9389,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9390, user_id: Sequelize.literal("MOD(9390,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 9 -> 9391..9400
{ id: 9391, user_id: Sequelize.literal("MOD(9391,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9392, user_id: Sequelize.literal("MOD(9392,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9393, user_id: Sequelize.literal("MOD(9393,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9394, user_id: Sequelize.literal("MOD(9394,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9395, user_id: Sequelize.literal("MOD(9395,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9396, user_id: Sequelize.literal("MOD(9396,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9397, user_id: Sequelize.literal("MOD(9397,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9398, user_id: Sequelize.literal("MOD(9398,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9399, user_id: Sequelize.literal("MOD(9399,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9400, user_id: Sequelize.literal("MOD(9400,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 10 -> 9401..9410
{ id: 9401, user_id: Sequelize.literal("MOD(9401,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9402, user_id: Sequelize.literal("MOD(9402,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9403, user_id: Sequelize.literal("MOD(9403,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9404, user_id: Sequelize.literal("MOD(9404,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9405, user_id: Sequelize.literal("MOD(9405,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9406, user_id: Sequelize.literal("MOD(9406,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9407, user_id: Sequelize.literal("MOD(9407,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9408, user_id: Sequelize.literal("MOD(9408,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9409, user_id: Sequelize.literal("MOD(9409,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9410, user_id: Sequelize.literal("MOD(9410,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },

// Mes 11 -> 9411..9420
{ id: 9411, user_id: Sequelize.literal("MOD(9411,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 2 DAY)"),  total_amount: 4000, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9412, user_id: Sequelize.literal("MOD(9412,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 4 DAY)"),  total_amount: 3200, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9413, user_id: Sequelize.literal("MOD(9413,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 6 DAY)"),  total_amount: 2600, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9414, user_id: Sequelize.literal("MOD(9414,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 8 DAY)"),  total_amount: 1800, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9415, user_id: Sequelize.literal("MOD(9415,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 10 DAY)"), total_amount: 5200, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 2 },
{ id: 9416, user_id: Sequelize.literal("MOD(9416,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 12 DAY)"), total_amount: 4700, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9417, user_id: Sequelize.literal("MOD(9417,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 14 DAY)"), total_amount: 3400, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 2 },
{ id: 9418, user_id: Sequelize.literal("MOD(9418,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 16 DAY)"), total_amount: 4100, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 },
{ id: 9419, user_id: Sequelize.literal("MOD(9419,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 18 DAY)"), total_amount: 2900, status: 'COMPLETED', delivery_type: 'pickup',   payment_method: 'cash',        items_quantity: 1 },
{ id: 9420, user_id: Sequelize.literal("MOD(9420,5)+1"), commerce_id: 21, address_id: 1, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 20 DAY)"), total_amount: 3500, status: 'COMPLETED', delivery_type: 'delivery', payment_method: 'mercadopago', items_quantity: 3 }


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
