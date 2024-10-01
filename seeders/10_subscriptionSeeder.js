'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('subscription', [
  // Plan "Esencial"
  {
    commerce_id: 1, 
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 2, 
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 3, 
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 4, 
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 5, 
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 6, 
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 7, 
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 8, 
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 9, 
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 10, 
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('subscription', null, {});
  }
};