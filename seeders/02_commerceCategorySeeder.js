'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
 
    await queryInterface.bulkInsert('commerce_category', [
      {
        name: 'Panadería',
        description: 'Se encargan de la elaboración de productos que te alegran la tarde con unos buenos mates.'
      },
      {
        name: 'Carnicería',
        description: 'Ofrecen carne fresca de excelente calidad para asados y más.'
      },
      {
        name: 'Panchería',
        description: 'El lugar ideal para disfrutar de unos deliciosos panchos al paso.'
      },
      {
        name: 'Verdulería',
        description: 'Proveen frutas y verduras frescas y de estación.'
      },
      {
        name: 'Heladería',
        description: 'Especialistas en la venta de helados artesanales para todas las estaciones del año.'
      },
      {
        name: 'Pizzería',
        description: 'Preparan y venden pizzas de todo tipo, perfectas para compartir en familia o con amigos.'
      },
      {
        name: 'Dietética',
        description: 'Comercializan productos naturales, orgánicos y saludables.'
      },
      {
        name: 'Rotisería',
        description: 'Venden comidas preparadas listas para llevar, perfectas para el almuerzo o la cena.'
      },
      {
        name: 'Pastelería',
        description: 'Se especializan en la venta de tortas, postres y dulces artesanales.'
      },
      {
        name: 'Fiambrería',
        description: 'Ofrecen una variedad de fiambres, quesos y embutidos de la mejor calidad.'
      }    
    ], {});
        
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('commerce_category', null, {});
  }
};