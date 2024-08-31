'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product_category', [
    {
      commerce_id: 1,
      name: 'Postre',
      description: 'Abarca tortas y dulces' 
    },
    {
      commerce_id: 1,
      name: 'Panificacion',
      description: 'Panes, criollos, facturas y grisines' 
    },
    {
      commerce_id: 2,
      name: 'Carnes envasadas',
      description: 'Carnes para consumir en el acto' 
    },
    {
      commerce_id: 2,
      name: 'Carnes fresca',
      description: 'Carne sin evasado' 
    },
    {
      commerce_id: 3,
      name: 'Frito',
      description: 'Hecho con aceite como papas fritas' 
    },
    {
      commerce_id: 3,
      name: 'Hervidos',
      description: 'salchichaz, huevos, etc' 
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_category', null, {});
  }
};