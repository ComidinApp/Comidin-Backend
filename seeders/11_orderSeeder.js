'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('order', [
    // Usuario 1
    {
      user_id: 1,
      commerce_id: 1,
      created_at: new Date('2024-09-25'),
      total_amount: '500',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 1,
      commerce_id: 2,
      created_at: new Date('2024-09-26'),
      total_amount: '600',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 1,
      commerce_id: 3,
      created_at: new Date('2024-09-27'),
      total_amount: '700',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 1,
      commerce_id: 4,
      created_at: new Date('2024-09-28'),
      total_amount: '800',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 1,
      commerce_id: 5,
      created_at: new Date('2024-09-29'),
      total_amount: '900',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },

  // Usuario 2
  {
      user_id: 2,
      commerce_id: 1,
      created_at: new Date('2024-09-30'),
      total_amount: '1000',
      status: 'Finalizado',
      delivery_type: 'Bici'
  },
  {
      user_id: 2,
      commerce_id: 2,
      created_at: new Date('2024-10-01'),
      total_amount: '1100',
      status: 'Finalizado',
      delivery_type: 'Bici'
  },
  {
      user_id: 2,
      commerce_id: 6,
      created_at: new Date('2024-10-02'),
      total_amount: '1200',
      status: 'Finalizado',
      delivery_type: 'Bici'
  },
  {
      user_id: 2,
      commerce_id: 7,
      created_at: new Date('2024-10-03'),
      total_amount: '1300',
      status: 'Finalizado',
      delivery_type: 'Bici'
  },

  // Usuario 3
  {
      user_id: 3,
      commerce_id: 3,
      created_at: new Date('2024-10-04'),
      total_amount: '1500',
      status: 'Finalizado',
      delivery_type: 'Auto'
  },
  {
      user_id: 3,
      commerce_id: 4,
      created_at: new Date('2024-10-05'),
      total_amount: '1600',
      status: 'Finalizado',
      delivery_type: 'Auto'
  },
  {
      user_id: 3,
      commerce_id: 8,
      created_at: new Date('2024-10-06'),
      total_amount: '1700',
      status: 'Finalizado',
      delivery_type: 'Auto'
  },

  // Usuario 4
  {
      user_id: 4,
      commerce_id: 5,
      created_at: new Date('2024-10-07'),
      total_amount: '3000',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 4,
      commerce_id: 6,
      created_at: new Date('2024-10-08'),
      total_amount: '3500',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 4,
      commerce_id: 9,
      created_at: new Date('2024-10-09'),
      total_amount: '4000',
      status: 'Finalizado',
      delivery_type: 'Moto'
  },
  {
      user_id: 4,
      commerce_id: 10,
      created_at: new Date('2024-10-10'),
      total_amount: '4500',
      status: 'Finalizado',
      delivery_type: 'Moto'
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