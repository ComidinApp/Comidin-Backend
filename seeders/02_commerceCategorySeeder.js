'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
 
    await queryInterface.bulkInsert('commerce_category', [
      {//1
        name: 'Panadería',
        description: 'Se encargan de la elaboración de productos que te alegran la tarde con unos buenos mates.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Panaderia.jfif'
      },
      {//2
        name: 'Carnicería',
        description: 'Ofrecen carne fresca de excelente calidad para asados y más.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Carnicerias.jfif'
      },
      {//3
        name: 'Panchería',
        description: 'El lugar ideal para disfrutar de unos deliciosos panchos al paso.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Pancher%C3%ADa.jfif'
      },
      {//4
        name: 'Verdulería',
        description: 'Proveen frutas y verduras frescas y de estación.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Verduler%C3%ADa.jfif'
      },
      {//5
        name: 'Heladería',
        description: 'Especialistas en la venta de helados artesanales para todas las estaciones del año.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Helader%C3%ADa.jfif'
      },
      {//6
        name: 'Cafetería',
        description: 'Preparan y venden cafes, tes, chocolatas para que puedas disfrutas de un calido momento con amigos',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/cafe.jfif'
      },
      {//7
        name: 'Pescaderia',
        description: 'El lugar ideal para disfrutar de unos deliciosos mariscos y productos del mar.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Pescaderia.jfif'
      },
      {//8
        name: 'Supermercado',
        description: 'Encontra todos los productos para tu hogar en un unico lugar.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/supermercados.jfif'
      },
      {//9
        name: 'Almacen',
        description: 'Ofrecen una variedad de fiambres, quesos y embutidos de la mejor calidad y muchos productos mas.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/almacen.jfif'
      }, 
      { //10
        name: 'Pizzería',
        description: 'Preparan y venden pizzas de todo tipo, perfectas para compartir en familia o con amigos.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/Pizzer%C3%ADa.jfif'
      },
      {//11
        name: 'Kiosco',
        description: 'Comercializan golosinas, alfajores, galletas y muchos mas.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerceCategory/kioscos.jfif'
      },
      {//12
        name: 'Rotisería',
        description: 'Venden comidas preparadas listas para llevar, perfectas para el almuerzo o la cena.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Costillar.jfif'
      },
      {//13
        name: 'Pastelería',
        description: 'Se especializan en la venta de tortas, postres y dulces artesanales.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Costillar.jfif'
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