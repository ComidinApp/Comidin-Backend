'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product', [
    {
      commerce_id: 1,
      name: 'Baguete',
      description: 'Esto es la descripcion para el baguete',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/baguete-laceleste.jpeg',
      product_code:'432',
      product_category_id:1,
      created_at: new Date()

    },
    {
      commerce_id: 1,
      name: 'Criollo Hojaldre',
      description: 'Esto es la descripcion para el criollo de hojaldre',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/criollodehojalre-laceleste.jpg',
      product_code:'123',
      product_category_id:2,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Hamburguesa de guacamole',
      description: 'El señor de la nooooocheeeee',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/hamburguesaguacamole-panchoroldan.jpg',
      product_code:'321',
      product_category_id:3,
      created_at: new Date()
    },
    {
      commerce_id: 1,
      name: 'Medialuna salada',
      description: 'Es salada',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/medialunasalada-laceleste.jpg',
      product_code:'231',
      product_category_id:4,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Super Pancho Rolano',
      description: 'Pancho con salchicha - medio metro bañado en salsa',
      image_url:'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/superpancho-panchoroldan.jpg',
      product_code:'312',
      product_category_id:5,
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
