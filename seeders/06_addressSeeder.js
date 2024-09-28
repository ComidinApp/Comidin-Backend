'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('address', [
    {
      user_id: 1,
      street_name: 'Enfermera Clermont',
      number: '377',
      postal_code: '5000',
      home_type: 'Apartment',
      extra_info: 'Cerca de cancha de Belgrano',
      home_referral_name: 'Unico edificio',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 2,
      street_name: 'Achaval Rodriguez',
      number: '12',
      postal_code: '5000',
      home_type: 'House',
      extra_info: 'Casa roja',
      home_referral_name: 'La rosita',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 3,
      street_name: 'Estrada',
      number: '123678',
      postal_code: '5000',
      home_type: 'House',
      extra_info: 'Arriba de Pet Shop',
      home_referral_name: 'La peque',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },
    {
      user_id: 4,
      street_name: 'Juan manuel Estrada',
      number: '1234',
      postal_code: '5000',
      home_type: 'Apartment',
      extra_info: 'Cerca de plaza españa',
      home_referral_name: '5H',
      coordinates: '40.712776,-74.005974',
      created_at: new Date()
    },

  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('address', null, {});
  }
};