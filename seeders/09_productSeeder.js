'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product', [
    {
      commerce_id: 1,
      name: 'Pan de Campo',
      description: 'Pan artesanal de masa madre',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/panDeCampo.jfif',
      product_code: '101',
      product_category_id: 2,
      created_at: new Date()
    },
    {
      commerce_id: 1,
      name: 'Facturas Mixtas',
      description: 'Variedad de facturas con dulce de leche y crema',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/facturasMixtas.jfif',
      product_code: '102',
      product_category_id: 2,
      created_at: new Date()
    },
    {
      commerce_id: 1,
      name: 'Chipa',
      description: 'Deliciosos chipas de queso',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/chipa.jfif',
      product_code: '103',
      product_category_id: 2,
      created_at: new Date()
    },
    
    // El Vergel - Panadería (id: 2)
    {
      commerce_id: 2,
      name: 'Bizcochos de Grasa',
      description: 'Bizcochos crocantes ideales para acompañar mate',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/BizcochosdeGrasa.jfif',
      product_code: '201',
      product_category_id: 4,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      name: 'Pan Integral',
      description: 'Pan integral con semillas',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanIntegral.jfif',
      product_code: '202',
      product_category_id: 5,
      created_at: new Date()
    },
    {
      commerce_id: 2,
      name: 'Torta de Manzana',
      description: 'Torta casera de manzana y canela',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/TortadeManzana.jfif',
      product_code: '203',
      product_category_id: 6,
      created_at: new Date()
    },
    
    // Locos por el Asado - Carnicería (id: 3)
    {
      commerce_id: 3,
      name: 'Chorizo Criollo',
      description: 'Chorizo criollo tradicional',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/ChorizoCriollo.jfif',
      product_code: '301',
      product_category_id: 8,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Morcilla',
      description: 'Morcilla para asado',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Morcilla.jfif',
      product_code: '302',
      product_category_id: 8,
      created_at: new Date()
    },
    {
      commerce_id: 3,
      name: 'Tira de Asado',
      description: 'Tira de asado premium',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/TiradeAsado.jfif',
      product_code: '303',
      product_category_id: 7,
      created_at: new Date()
    },
    
    // La Tuca - Carnicería (id: 4)
    {
      commerce_id: 4,
      name: 'Vacío',
      description: 'Vacío jugoso y tierno',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Vac%C3%ADo.jfif',
      product_code: '401',
      product_category_id: 10,
      created_at: new Date()
    },
    {
      commerce_id: 4,
      name: 'Milanesa de Carne',
      description: 'Milanesas listas para freír',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/MilanesadeCarne.jfif',
      product_code: '402',
      product_category_id: 10,
      created_at: new Date()
    },
    {
      commerce_id: 4,
      name: 'Costillar',
      description: 'Costillar de primera calidad',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Costillar.jfif',
      product_code: '403',
      product_category_id: 10,
      created_at: new Date()
    },
    
    // En entrerriano - Panchería (id: 5)
    {
      commerce_id: 5,
      name: 'Super Pancho',
      description: 'Pancho gigante con salsa especial',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/SuperPancho.jfif',
      product_code: '501',
      product_category_id: 13,
      created_at: new Date()
    },
    {
      commerce_id: 5,
      name: 'Pancho con Cheddar',
      description: 'Pancho bañado en salsa cheddar',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanchoconCheddar.jfif',
      product_code: '502',
      product_category_id: 13,
      created_at: new Date()
    },
    {
      commerce_id: 5,
      name: 'Pancho Clásico',
      description: 'Pancho tradicional con ketchup y mostaza',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanchoCl%C3%A1sico.jfif',
      product_code: '503',
      product_category_id: 13,
      created_at: new Date()
    },
    
    // Panceto - Panchería (id: 6)
    {
      commerce_id: 6,
      name: 'Pancho Panceto',
      description: 'Pancho relleno con panceta y queso',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanchoPanceto.jfif',
      product_code: '601',
      product_category_id: 16,
      created_at: new Date()
    },
    {
      commerce_id: 6,
      name: 'Pancho Completo',
      description: 'Pancho con todo: papas, queso, salsas',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanchoCompleto.jfif',
      product_code: '602',
      product_category_id: 16,
      created_at: new Date()
    },
    {
      commerce_id: 6,
      name: 'Pancho Vegetariano',
      description: 'Pancho con salchicha vegetariana',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/PanchoVegetariano.jfif',
      product_code: '603',
      product_category_id: 16,
      created_at: new Date()
    },
    
    //  Pescados la Carihuela- Pescadería (id: 13)
    {
      commerce_id: 13,
      name: 'Filet de Merluza',
      description: 'Filet fresco de merluza del día',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/FiletdeMerluza.jfif',
      product_code: '701',
      product_category_id: 20,
      created_at: new Date()
    },
    {
      commerce_id: 13,
      name: 'Camarones',
      description: 'Camarones congelados listos para cocinar',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Camarones.jfif',
      product_code: '702',
      product_category_id: 21,
      created_at: new Date()
    },
    {
      commerce_id: 13,
      name: 'Pulpo',
      description: 'Pulpo fresco, ideal para parrilla o cocina',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Pulpo.jfif',
      product_code: '703',
      product_category_id: 21,
      created_at: new Date()
    },
    
    // La Lonja - Pescadería (id: 14)
    {
      commerce_id: 14,
      name: 'Trucha',
      description: 'Trucha de agua dulce, ideal para asar',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Trucha.jfif',
      product_code: '801',
      product_category_id: 23,
      created_at: new Date()
    },
    {
      commerce_id: 14,
      name: 'Salmón Rosado',
      description: 'Salmón rosado fresco para sushi o asado',
      image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/Salm%C3%B3nRosado.jfif',
      product_code: '802',
      product_category_id: 23,
      created_at: new Date()
    },
     { //24
        commerce_id: 20,
        name: 'Hamburguesa Clásica',
        description: 'Hamburguesa con cheddar, tomate y lechuga.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/hamburguesaClasica.jpg',
        product_code: '2001',
        product_category_id: 30,
        created_at: new Date(),
      },
      {
        commerce_id: 20,
        name: 'Hamburguesa Doble',
        description: 'Doble carne, doble cheddar, pan brioche.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/hamburguesaDoble.jpg',
        product_code: '2002',
        product_category_id: 30,
        created_at: new Date(),
      },
      {
        commerce_id: 20,
        name: 'Papas Fritas',
        description: 'Porción mediana de papas fritas.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/papasFritas.jpg',
        product_code: '2003',
        product_category_id: 31,
        created_at: new Date(),
      },
      {
        commerce_id: 20,
        name: 'Coca-Cola 500ml',
        description: 'Bebida gaseosa fría 500ml.',
        image_url: 'https://comidin-assets-tjff.s3.amazonaws.com/commerce-products/cocaCola500.jpg',
        product_code: '2004',
        product_category_id: 32,
        created_at: new Date(),
      }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product', null, {});
  }
};
