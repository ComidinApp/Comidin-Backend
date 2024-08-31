'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product', [
    {
      commerce_id: 1,
      name: 'Torta de manzana',
      description: 'Torta con manzana rey',
      image_url:'Https....',
      product_code:'432',
      product_category_id:1,
      created_at: new Date()

    },
    {
      commerce_id: 1,
      name: 'Pan flauta',
      description: 'El que usas para el sanguche de milanguesa',
      image_url:'http.....',
      product_code:'123',
      product_category_id:2,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      name: 'Palomita envasada',
      description: 'Corte palomita',
      image_url:'http....',
      product_code:'321',
      product_category_id:3,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      name: 'Matambre',
      description: 'Bueno para asado',
      image_url:'htpp....',
      product_code:'231',
      product_category_id:4,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Caja de papa fritas',
      description: '500g de papas tipo baston fritas',
      image_url:'htpps...',
      product_code:'312',
      product_category_id:5,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Pancho el gran rolando',
      description: 'Pancho con triple salchica,bañado de salsas, medio metro :)',
      image_url:'https...',
      product_code:'534',
      product_category_id:6,
      created_at: new Date()
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product', null, {});
  }
};
