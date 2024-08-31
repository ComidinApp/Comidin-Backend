'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

    await queryInterface.bulkInsert('commerce', [
      {
        name: 'La Celeste',
        commerce_category_id: 1 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Av. 9 de Mayo',
        number: '1234',
        postal_code: '5020',
        commerce_national_id: '123',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {
        name: 'Carnes Argentinas',
        commerce_category_id: 2 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Savedra',
        number: '139',
        postal_code: '5020',
        commerce_national_id: '1233',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {
        name: 'Pancho Roldan',
        commerce_category_id: 3 ,//Aqui iria el id del commerceCategory que cree en el paso anterior
        street_name: 'Achaval Rodriguez',
        number: '99',
        postal_code: '5020',
        commerce_national_id: '1234',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      }
    ], {});
        
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('commerce', null, {});
  }
};