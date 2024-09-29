'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

    await queryInterface.bulkInsert('commerce', [
      {
        name: 'La Flor de Caballito',
        commerce_category_id: 1, // Panadería
        street_name: 'Av. Rivadavia',
        number: '6450',
        postal_code: '1405',
        commerce_national_id: '1001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '07:00:00',
        close_at: '20:00:00',
        created_at: new Date()
      },
      {
        name: 'El Trigal de Córdoba',
        commerce_category_id: 1, // Panadería
        street_name: 'Duarte Quirós',
        number: '2345',
        postal_code: '5000',
        commerce_national_id: '1002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '08:00:00',
        close_at: '19:00:00',
        created_at: new Date()
      },
      {
        name: 'Don Pedro Carnicería',
        commerce_category_id: 2, // Carnicería
        street_name: 'Belgrano',
        number: '1023',
        postal_code: '1870',
        commerce_national_id: '2001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '08:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {
        name: 'El Bife de Oro',
        commerce_category_id: 2, // Carnicería
        street_name: '25 de Mayo',
        number: '678',
        postal_code: '5000',
        commerce_national_id: '2002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '19:00:00',
        created_at: new Date()
      },
      {
        name: 'Pancho Roldan',
        commerce_category_id: 3, // Panchería
        street_name: 'Achaval Rodriguez',
        number: '99',
        postal_code: '5020',
        commerce_national_id: '3001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '11:00:00',
        close_at: '23:00:00',
        created_at: new Date()
      },
      {
        name: 'Los Pibes del Pancho',
        commerce_category_id: 3, // Panchería
        street_name: 'Calle 12',
        number: '777',
        postal_code: '1900',
        commerce_national_id: '3002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '12:00:00',
        close_at: '23:00:00',
        created_at: new Date()
      },
      {
        name: 'La Huerta de Doña Rosa',
        commerce_category_id: 4, // Verduleria
        street_name: 'Av. San Martín',
        number: '1500',
        postal_code: '1414',
        commerce_national_id: '4001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '06:00:00',
        close_at: '14:00:00',
        created_at: new Date()
      },
      {
        name: 'Verdulería El Tomate',
        commerce_category_id: 4, // Verduleria
        street_name: 'Hipólito Yrigoyen',
        number: '1234',
        postal_code: '1884',
        commerce_national_id: '4002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '08:00:00',
        close_at: '15:00:00',
        created_at: new Date()
      },
      {
        name: 'Helados Torino',
        commerce_category_id: 5, // Heladeria
        street_name: 'Av. Callao',
        number: '245',
        postal_code: '1022',
        commerce_national_id: '5001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '10:00:00',
        close_at: '00:00:00',
        created_at: new Date()
      },
      {
        name: 'Heladería Grido',
        commerce_category_id: 5, // Heladeria
        street_name: 'Av. General Paz',
        number: '2340',
        postal_code: '1407',
        commerce_national_id: '5002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '10:00:00',
        close_at: '01:00:00',
        created_at: new Date()
      },
      {
        name: 'Cafetería La Biela',
        commerce_category_id: 6, // Cafetería
        street_name: 'Av. Libertador',
        number: '2876',
        postal_code: '1104',
        commerce_national_id: '6001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '08:00:00',
        close_at: '22:00:00',
        created_at: new Date()
      },
      {
        name: 'Café Martínez',
        commerce_category_id: 6, // Cafetería
        street_name: 'Av. Colón',
        number: '3234',
        postal_code: '5000',
        commerce_national_id: '6002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '07:00:00',
        close_at: '21:00:00',
        created_at: new Date()
      },
      {
        name: 'La Pescadería del Puerto',
        commerce_category_id: 7, // Pescadería
        street_name: 'Costanera',
        number: '89',
        postal_code: '7600',
        commerce_national_id: '7001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '07:00:00',
        close_at: '16:00:00',
        created_at: new Date()
      },
      {
        name: 'Pescados del Mar',
        commerce_category_id: 7, // Pescadería
        street_name: 'Malecón',
        number: '567',
        postal_code: '5000',
        commerce_national_id: '7002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '08:00:00',
        close_at: '17:00:00',
        created_at: new Date()
      },
      {
        name: 'Supermercado La Feria',
        commerce_category_id: 8, // Supermercado
        street_name: 'San Juan',
        number: '1456',
        postal_code: '1708',
        commerce_national_id: '8001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '22:00:00',
        created_at: new Date()
      },
      {
        name: 'Supermercado Coto',
        commerce_category_id: 8, // Supermercado
        street_name: 'Rivadavia',
        number: '5644',
        postal_code: '1406',
        commerce_national_id: '8002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '09:00:00',
        close_at: '21:00:00',
        created_at: new Date()
      },
      {
        name: 'MiniMarket 24/7',
        commerce_category_id: 9, // Almacén
        street_name: 'Sarmiento',
        number: '1123',
        postal_code: '1708',
        commerce_national_id: '9001',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '00:00:00',
        close_at: '23:59:00',
        created_at: new Date()
      },
      {
        name: 'Almacén Don Juan',
        commerce_category_id: 9, // Almacén
        street_name: 'San Martín',
        number: '6789',
        postal_code: '5000',
        commerce_national_id: '9002',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '07:00:00',
        close_at: '20:00:00',
        created_at: new Date()
      },
      {
        name: 'Kiosko El Nuevo Alberdi',
        commerce_category_id: 10, // Kiosco
        street_name: 'Enfermera Clermont',
        number: '369',
        postal_code: '5000',
        commerce_national_id: '9003',
        is_active: true,
        image_url: 'https://url.de.la.imagen',
        open_at: '07:00:00',
        close_at: '20:00:00',
        created_at: new Date()
      },
    ], {});
        
  } catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('commerce', null, {});
  }
};