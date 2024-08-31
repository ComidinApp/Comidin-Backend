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
      email: 'jpdona@hotmail.com',
      phone_number: '123456789',
      national_id: '1',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "Juan@test1",
      created_at: new Date(),
      ciudad: 'Cordoba',
      pais: 'Argentina',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Tato',
      last_name: 'Cargnelutti',
      email: 'cargneluttilautaro@gmail.com',
      phone_number: '122456789',
      national_id: '2',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "Tato@test1",
      created_at: new Date(),
      ciudad: 'Cordoba',
      pais: 'Argentina',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Fran',
      last_name: 'Somoza',
      email: 'fran.s300@hotmail.com',
      phone_number: '122256789',
      national_id: '3',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "Fran@test1",
      created_at: new Date(),
      ciudad: 'Cordoba',
      pais: 'Argentina',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Flor',
      last_name: 'Farace',
      email: ' faraceflorencia@gmail.com',
      phone_number: '122356789',
      national_id: '4',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "Flor@test1",
      created_at: new Date(),
      ciudad: 'Cordoba',
      pais: 'Argentina',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 3,
      first_name: 'Cecilia',
      last_name: 'Tretel',
      email: 'ceci.perez@gmail.com',
      phone_number: '122456689',
      national_id: '5',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "Ceci@test1",
      created_at: new Date(),
      ciudad: 'Cordoba',
      pais: 'Argentina',
      status:'Active'
    },

  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('employee', null, {});
  }
};