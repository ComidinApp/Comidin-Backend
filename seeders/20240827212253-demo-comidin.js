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

    await queryInterface.bulkInsert('commerce_category', [
      {
      name: 'Panaderia',
      description: 'Se encargan de la elaboracion de productos que te alegran la tarde con matecitos :)'
      },
      {
      name: 'Carniceria',
      description: 'Se encargan de la comercializacion de carnecita'
      },
      {
      name: 'Pancheria',
      description: 'Se encargan de la comercializacion de panchitos :)'
      },      
    ], {});

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

  await queryInterface.bulkInsert('role', [
    {
      name: 'Admin',
      description:'Administrador rol con full acceso, hace todo el loco',
    },
    {
      name: 'Cocinero',
      description:'Te cocina el loco',
    },
    {
      name: 'Delivery',
      description:'Te entrega el pedido el loco',
    }
  ], {});

  await queryInterface.bulkInsert('employee', [
    {
      commerce_id: 3,
      role_id: 1,
      first_name: 'Juan',
      last_name: 'Donalisio',
      email: 'juan.perez@gmail.com',
      phone_number: '123456789',
      national_id: '1',
      street_name: 'Av. Siempre Viva',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "SecurePass!123",
      created_at: new Date(),
      ciudad: 'Cordoba',
      dni:'42564738',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Tato',
      last_name: 'Carneluti',
      email: 'Tato.perez@gmail.com',
      phone_number: '122456789',
      national_id: '2',
      street_name: 'Colonia C',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "SecurePass!123",
      created_at: new Date(),
      ciudad: 'Cordoba',
      dni:'42534738',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Fran',
      last_name: 'Somoza',
      email: 'fran.perez@gmail.com',
      phone_number: '122256789',
      national_id: '3',
      street_name: 'Santa R',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "SecurePass!123",
      created_at: new Date(),
      ciudad: 'Cordoba',
      dni:'42111738',
      status:'Active'
    },
    {
      commerce_id: 3,
      role_id: 2,
      first_name: 'Flor',
      last_name: 'Farace',
      email: 'flor.perez@gmail.com',
      phone_number: '122356789',
      national_id: '4',
      street_name: 'Cba',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "SecurePass!123",
      created_at: new Date(),
      ciudad: 'Cordoba',
      dni:'42222238',
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
      street_name: 'Calle sin numero',
      number: '742',
      postal_code: "1001",
      is_active: true,
      birthday: "1985-07-20",
      password: "SecurePass!123",
      created_at: new Date(),
      ciudad: 'Cordoba',
      dni:'42577738',
      status:'Active'
    },

  ], {});

  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
