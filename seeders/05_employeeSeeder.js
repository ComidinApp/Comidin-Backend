'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('employee', [
    {
      commerce_id: 3,
      role_id: 1,
      first_name: 'Juan',
      last_name: 'Donalisio',
      email: 'juanpadon@gmail.com',
      phone_number: '123456789',
      national_id: '1',
      address: 'Illia 742',
      postal_code: "1001",
      password: "Juan@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/icecream.png',
      status:'active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Tato',
      last_name: 'Cargnelutti',
      email: 'cargneluttilautaro@gmail.com',
      phone_number: '122456789',
      national_id: '2',
      address: 'Mi direccion real 123',
      postal_code: "1001",
      password: "Tato@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/fries.png',
      status:'active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Fran',
      last_name: 'Somoza',
      email: 'fran.s300@hotmail.com',
      phone_number: '122256789',
      national_id: '3',
      address: 'San Martin 3212',
      postal_code: "1001",
      password: "Fran@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/bread.png',
      status:'active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Flor',
      last_name: 'Farace',
      email: ' faraceflorencia@gmail.com',
      phone_number: '122356789',
      national_id: '4',
      address: 'Av rafael nuñez 333',
      postal_code: "1001",
      password: "Flor@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/pizza.png',
      status:'active'
    },
    {
      commerce_id: 3,
      role_id: 3,
      first_name: 'Cecilia',
      last_name: 'Tretel',
      email: 'ceci.perez@gmail.com',
      phone_number: '122456689',
      national_id: '5',
      address: 'Gato y mancha 2231',
      postal_code: "1001",
      password: "Ceci@test1",
      created_at: new Date(),
      city: 'Cordoba',
      country: 'Argentina',
      avatar_url: 'https://comidin-assets-tjff.s3.amazonaws.com/avatar/coffe.png',
      status:'active'
    }

  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employee', null, {});
  }
};