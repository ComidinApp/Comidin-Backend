'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('role', [
    {
      name: 'Admin',
      description:'Administrador rol con full acceso, hace todo el loco',
    },
    {
      name: 'Cocinero',
      description:'Te cocina el loco',
    },
    {
      name: 'Delivery',
      description:'Te entrega el pedido el loco',
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};