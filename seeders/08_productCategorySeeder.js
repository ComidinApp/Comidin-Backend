'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product_category', [
    //Solo de los primeros 10 comercios
  // Categorías para "La Flor de Caballito" (Panadería)
  {
    commerce_id: 1,  // ID de "La Flor de Caballito"
    name: 'Postres',
    description: 'Tortas, tartas y dulces frescos.'
  },
  {
    commerce_id: 1,
    name: 'Panificación',
    description: 'Variedad de panes, facturas y otros productos horneados.'
  },
  {
    commerce_id: 1,
    name: 'Snacks Dulces',
    description: 'Galletitas y pequeños bocados para disfrutar.'
  },

  // Categorías para "El Trigal de Córdoba" (Panadería)
  {
    commerce_id: 2,  // ID de "El Trigal de Córdoba"
    name: 'Facturas',
    description: 'Medialunas, vigilantes y otras facturas frescas.'
  },
  {
    commerce_id: 2,
    name: 'Pan Integral',
    description: 'Pan elaborado con harinas integrales para una opción más saludable.'
  },
  {
    commerce_id: 2,
    name: 'Tortas Artesanales',
    description: 'Tortas caseras para cualquier ocasión.'
  },

  // Categorías para "Don Pedro Carnicería" (Carnicería)
  {
    commerce_id: 3,  // ID de "Don Pedro Carnicería"
    name: 'Cortes Premium',
    description: 'Selección de carnes premium para asados y comidas especiales.'
  },
  {
    commerce_id: 3,
    name: 'Embutidos',
    description: 'Chorizos, morcillas y embutidos para asado.'
  },
  {
    commerce_id: 3,
    name: 'Carnes de Cerdo',
    description: 'Cortes frescos de cerdo de alta calidad.'
  },

  // Categorías para "El Bife de Oro" (Carnicería)
  {
    commerce_id: 4,  // ID de "El Bife de Oro"
    name: 'Cortes Clásicos',
    description: 'Carne de res de cortes clásicos como cuadril y paleta.'
  },
  {
    commerce_id: 4,
    name: 'Pollo',
    description: 'Pollo fresco y en diversas presentaciones.'
  },
  {
    commerce_id: 4,
    name: 'Carne Molida',
    description: 'Carne molida fresca, ideal para empanadas y albóndigas.'
  },

  // Categorías para "Pancho Roldan" (Panchería)
  {
    commerce_id: 5,  // ID de "Pancho Roldan"
    name: 'Panchos Especiales',
    description: 'Variedad de panchos con distintos ingredientes y salsas.'
  },
  {
    commerce_id: 5,
    name: 'Fritos',
    description: 'Papas fritas, bastones de mozzarella y otros snacks.'
  },
  {
    commerce_id: 5,
    name: 'Bebidas',
    description: 'Gaseosas y cervezas para acompañar los panchos.'
  },

  // Categorías para "Los Pibes del Pancho" (Panchería)
  {
    commerce_id: 6,  // ID de "Los Pibes del Pancho"
    name: 'Panchos Clásicos',
    description: 'Panchos tradicionales con ketchup, mostaza y más.'
  },
  {
    commerce_id: 6,
    name: 'Snacks Fritos',
    description: 'Snacks como papas fritas, aros de cebolla y más.'
  },
  {
    commerce_id: 6,
    name: 'Aderezos',
    description: 'Variedad de salsas y aderezos para complementar.'
  },

  // Categorías para "La Huerta de Doña Rosa" (Verdulería)
  {
    commerce_id: 7,  // ID de "La Huerta de Doña Rosa"
    name: 'Verduras Frescas',
    description: 'Verduras de estación, frescas y orgánicas.'
  },
  {
    commerce_id: 7,
    name: 'Frutas de Estación',
    description: 'Frutas frescas disponibles según la temporada.'
  },
  {
    commerce_id: 7,
    name: 'Productos Orgánicos',
    description: 'Alimentos orgánicos libres de pesticidas.'
  },

  // Categorías para "Verdulería El Tomate" (Verdulería)
  {
    commerce_id: 8,  // ID de "Verdulería El Tomate"
    name: 'Frutas y Verduras',
    description: 'Amplia variedad de frutas y verduras frescas.'
  },
  {
    commerce_id: 8,
    name: 'Hierbas y Especias',
    description: 'Selección de hierbas frescas y especias para cocinar.'
  },
  {
    commerce_id: 8,
    name: 'Frutos Secos',
    description: 'Almendras, nueces y otros frutos secos.'
  },    
  // Categorías para "Almacén Don Juan" (Almacén)
  {
    commerce_id: 9,  // ID de "Almacén Don Juan"
    name: 'Galletitas',
    description: 'Surtidos de galletitas con variedad.'
  },
  {
    commerce_id: 9,
    name: 'Vinos',
    description: 'Selección de vinos importados y exportados.'
  },
  {
    commerce_id: 9,
    name: 'Gaseosas Y bebidas',
    description: 'Variedad de gaseosas y juegos.'
  },        
  // Categorías para "Kiosko El Nuevo Alberdi" (Kiosco)
  {
    commerce_id: 10,  // ID de "Kiosko El Nuevo Alberdi"
    name: 'Golosinas',
    description: 'Amplia variedad de golosinas y dulces.'
  },
  {
    commerce_id: 10,
    name: 'Cigarrillos',
    description: 'Variedad de cigarrillos.'
  },
  {
    commerce_id: 10,
    name: 'Gaseosas',
    description: 'Variedad de gaseosas y juegos.'
  }

  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('product_category', null, {});
  }
};