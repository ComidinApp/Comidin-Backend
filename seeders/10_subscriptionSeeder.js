'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('subscription', [
  // Plan "Esencial"
  {
    commerce_id: 1, // La Flor de Caballito
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 2, // El Trigal de Córdoba
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 3, // Don Pedro Carnicería
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 4, // El Bife de Oro
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 5, // Pancho Roldan
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 6, // Los Pibes del Pancho
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 7, // La Huerta de Doña Rosa
    plan_id: 1, // Plan Aperitivo
    created_at: new Date()
  },
  {
    commerce_id: 8, // Verdulería El Tomate
    plan_id: 2, // Plan Plato Principa
    created_at: new Date()
  },
  {
    commerce_id: 9, // Helados Torino
    plan_id: 3, // Plan Banquete
    created_at: new Date()
  },
  {
    commerce_id: 10, // Heladería Grido
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