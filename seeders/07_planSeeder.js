'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('plan', [
    {
      name: 'Premium',
      description: 'Contiene publicaciones ilimitadas, mayor exposicion y accesos a estadisticas unicas' 
    },
    {
      name: 'Clasic',
      description: 'Contiene publicaciones ilimitadas y mayor exposicion' 
    },
    {
      name: 'Basic',
      description: 'Contiene unicamente publicaciones ilimitadas' 
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plan', null, {});
  }
};