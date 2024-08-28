'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
 
    await queryInterface.bulkInsert('user', [
      {
        first_name: 'Fran',
        last_name:'Somoza',
        email:'fran@hotmail.com',
        phone_number:'99999999',
        national_id:'999999',
        is_active: true,
        password:'12wref@edfs3',
        birthday:'2000-05-04',
        created_at: new Date()
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
