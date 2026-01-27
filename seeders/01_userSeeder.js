'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('user', [
        {
          first_name: 'Fran',
          last_name:'Somoza',
          email:'fran@hotmail.com',
          phone_number:'99998999',
          national_id:'999799',
          is_active: true,
          password:'Fran@test1',
          birthday:'2000-05-04',
          created_at: new Date(),
          oauth_provider: 'cognito'
        },
        {
          first_name: 'Juan',
          last_name:'Donalisio',
          email:'juan@hotmail.com',
          phone_number:'99979999',
          national_id:'996999',
          is_active: true,
          password:'Juan@test1',
          birthday:'2000-05-04',
          created_at: new Date(),
          oauth_provider: 'cognito'
        },
        {
          first_name: 'Flor',
          last_name:'Farace',
          email:'flor@hotmail.com',
          phone_number:'95999999',
          national_id:'999499',
          is_active: true,
          password:'Flor@test1',
          birthday:'2000-05-04',
          created_at: new Date(),
          oauth_provider: 'cognito'
        },
        {
          first_name: 'lautaro',
          last_name:'cargnelutti',
          email:'cargneluttilautaro@gmail.com',
          phone_number:'3525505050',
          national_id:'40123123',
          is_active: true,
          password:'Tato@test1',
          birthday:'2000-01-26 21:00:00',
          created_at: new Date(),
          password:'Google107469842123688739342!',
          oauth_provider: 'google'
        }
      ], {});

    
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
