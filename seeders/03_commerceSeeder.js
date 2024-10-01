'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

    await queryInterface.bulkInsert('commerce', [
      {//1
        name: 'La Celeste',
        commerce_category_id: 1, // Panadería
        street_name: 'Av. Rivadavia',
        number: '6450',
        postal_code: '1405',
        commerce_national_id: '1001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/laCeleste.png',
        open_at: '07:00:00',
        close_at: '20:00:00',
        created_at: new Date()
      },
      {//2
        name: 'El Vergel',
        commerce_category_id: 1, // Panadería
        street_name: 'Duarte Quirós',
        number: '2345',
        postal_code: '5000',
        commerce_national_id: '1002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/elVergel.png',
        open_at: '08:00:00',
        close_at: '19:00:00',
        created_at: new Date()
      },
      {//3
        name: 'Locos por el Asado',
        commerce_category_id: 2, // Carnicería
        street_name: 'Belgrano',
        number: '1023',
        postal_code: '1870',
        commerce_national_id: '2001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/locosPorElAsado.png',
        open_at: '08:00:00',
        close_at: '18:00:00',
        created_at: new Date()
      },
      {//4
        name: 'La Tuca',
        commerce_category_id: 2, // Carnicería
        street_name: '25 de Mayo',
        number: '678',
        postal_code: '5000',
        commerce_national_id: '2002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/laTuca.jfif',
        open_at: '09:00:00',
        close_at: '19:00:00',
        created_at: new Date()
      },
      {//5
        name: 'En entrerriano',
        commerce_category_id: 3, // Panchería
        street_name: 'Achaval Rodriguez',
        number: '99',
        postal_code: '5020',
        commerce_national_id: '3001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/elEntrerriano.jfif',
        open_at: '11:00:00',
        close_at: '23:00:00',
        created_at: new Date()
      },
      {//6
        name: 'Panceto',
        commerce_category_id: 3, // Panchería
        street_name: 'Calle 12',
        number: '777',
        postal_code: '1900',
        commerce_national_id: '3002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/panceto.jfif',
        open_at: '12:00:00',
        close_at: '23:00:00',
        created_at: new Date()
      },
      {//7
        name: 'La quinta entrega',
        commerce_category_id: 4, // Verduleria
        street_name: 'Av. San Martín',
        number: '1500',
        postal_code: '1414',
        commerce_national_id: '4001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/laQuintaEntrega.png',
        open_at: '06:00:00',
        close_at: '14:00:00',
        created_at: new Date()
      },
      {//8
        name: 'El Mercadillo',
        commerce_category_id: 4, // Verduleria
        street_name: 'Hipólito Yrigoyen',
        number: '1234',
        postal_code: '1884',
        commerce_national_id: '4002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/elMercadillo.jfif',
        open_at: '08:00:00',
        close_at: '15:00:00',
        created_at: new Date()
      },
      {//9
        name: 'Grido',
        commerce_category_id: 5, // Heladeria
        street_name: 'Av. Callao',
        number: '245',
        postal_code: '1022',
        commerce_national_id: '5001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/grido.png',
        open_at: '10:00:00',
        close_at: '00:00:00',
        created_at: new Date()
      },
      {//10
        name: 'Valence',
        commerce_category_id: 5, // Heladeria
        street_name: 'Av. General Paz',
        number: '2340',
        postal_code: '1407',
        commerce_national_id: '5002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/valence.png',
        open_at: '10:00:00',
        close_at: '01:00:00',
        created_at: new Date()
      },
      {//11
        name: 'Cafe de barrio',
        commerce_category_id: 6, // Cafetería
        street_name: 'Av. Libertador',
        number: '2876',
        postal_code: '1104',
        commerce_national_id: '6001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/cafeDeBarrio.jfif',
        open_at: '08:00:00',
        close_at: '22:00:00',
        created_at: new Date()
      },
      {//12
        name: 'Starbucks',
        commerce_category_id: 6, // Cafetería
        street_name: 'Av. Colón',
        number: '3234',
        postal_code: '5000',
        commerce_national_id: '6002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/starbuck.jfif',
        open_at: '07:00:00',
        close_at: '21:00:00',
        created_at: new Date()
      },
      {//13
        name: 'Pescados la Carihuela',
        commerce_category_id: 7, // Pescadería
        street_name: 'Costanera',
        number: '89',
        postal_code: '7600',
        commerce_national_id: '7001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/laCarihuela.jfif',
        open_at: '07:00:00',
        close_at: '16:00:00',
        created_at: new Date()
      },
      {//14
        name: 'Pescaderia El Dorado',
        commerce_category_id: 7, // Pescadería
        street_name: 'Malecón',
        number: '567',
        postal_code: '5000',
        commerce_national_id: '7002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/elDorado.jfif',
        open_at: '08:00:00',
        close_at: '17:00:00',
        created_at: new Date()
      },
      {//15
        name: 'Buenos Dias',
        commerce_category_id: 8, // Supermercado
        street_name: 'San Juan',
        number: '1456',
        postal_code: '1708',
        commerce_national_id: '8001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/buenosDias.jfif',
        open_at: '09:00:00',
        close_at: '22:00:00',
        created_at: new Date()
      },
      {//16
        name: 'Vea',
        commerce_category_id: 8, // Supermercado
        street_name: 'Rivadavia',
        number: '5644',
        postal_code: '1406',
        commerce_national_id: '8002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/vea.jfif',
        open_at: '09:00:00',
        close_at: '21:00:00',
        created_at: new Date()
      },
      {//17
        name: 'Entresano',
        commerce_category_id: 9, // Almacén
        street_name: 'Sarmiento',
        number: '1123',
        postal_code: '1708',
        commerce_national_id: '9001',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/entresano.jfif',
        open_at: '00:00:00',
        close_at: '23:59:00',
        created_at: new Date()
      },
      {//18
        name: 'Organica',
        commerce_category_id: 9, // Almacén
        street_name: 'San Martín',
        number: '6789',
        postal_code: '5000',
        commerce_national_id: '9002',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/organica.jfif',
        open_at: '07:00:00',
        close_at: '20:00:00',
        created_at: new Date()
      },
      {//19
        name: 'Kiosko El Centrico',
        commerce_category_id: 11, // Kiosco
        street_name: 'Enfermera Clermont',
        number: '369',
        postal_code: '5000',
        commerce_national_id: '9003',
        is_active: true,
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-logos/kioscoElCentrico.jfif',
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