'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
 
    await queryInterface.bulkInsert('commerce_category', [
      {
      name: 'Panaderia',
      description: 'Se encargan de la elaboracion de productos que te alegran la tarde con matecitos :)'
      },
      {
      name: 'Carniceria',
      description: 'Se encargan de la comercializacion de carnecita'
      },
      {
      name: 'Pancheria',
      description: 'Se encargan de la comercializacion de panchitos :)'
      },      
    ], {});
        
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('commerce_category', null, {});
  }
};