'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('product_category', [
    //Solo de los primeros 10 comercios
  // Categorías para "La Flor de Caballito" (Panadería)
  {//1
    commerce_id: 1,  
    name: 'Postres',
    description: 'Tortas, tartas y dulces frescos.'
  },
  {//2
    commerce_id: 1,
    name: 'Panificación',
    description: 'Variedad de panes, facturas y otros productos horneados.'
  },
  {//3
    commerce_id: 1,
    name: 'Snacks Dulces',
    description: 'Galletitas y pequeños bocados para disfrutar.'
  },


  {//4
    commerce_id: 2,  
    name: 'Facturas',
    description: 'Medialunas, vigilantes y otras facturas frescas.'
  },
  {//5
    commerce_id: 2,
    name: 'Pan Integral',
    description: 'Pan elaborado con harinas integrales para una opción más saludable.'
  },
  {//6
    commerce_id: 2,
    name: 'Tortas Artesanales',
    description: 'Tortas caseras para cualquier ocasión.'
  },


  {//7
    commerce_id: 3,  
    name: 'Cortes Premium',
    description: 'Selección de carnes premium para asados y comidas especiales.'
  },
  {//8
    commerce_id: 3,
    name: 'Embutidos',
    description: 'Chorizos, morcillas y embutidos para asado.'
  },
  {//9
    commerce_id: 3,
    name: 'Carnes de Cerdo',
    description: 'Cortes frescos de cerdo de alta calidad.'
  },

  // Categorías para "La tuca" (Carnicería)
  {//10
    commerce_id: 4,  
    name: 'Cortes Clásicos',
    description: 'Carne de res de cortes clásicos como cuadril y paleta.'
  },
  {//11
    commerce_id: 4,
    name: 'Pollo',
    description: 'Pollo fresco y en diversas presentaciones.'
  },
  {//12
    commerce_id: 4,
    name: 'Carne Molida',
    description: 'Carne molida fresca, ideal para empanadas y albóndigas.'
  },

  // Categorías para "El entrerriano" (Panchería)
  {//13
    commerce_id: 5,  
    name: 'Panchos Especiales',
    description: 'Variedad de panchos con distintos ingredientes y salsas.'
  },
  {//14
    commerce_id: 5,
    name: 'Fritos',
    description: 'Papas fritas, bastones de mozzarella y otros snacks.'
  },
  {//15
    commerce_id: 5,
    name: 'Bebidas',
    description: 'Gaseosas y cervezas para acompañar los panchos.'
  },

  // Categorías para "Panceto" (Panchería)
  {//16
    commerce_id: 6, 
    name: 'Panchos Clásicos',
    description: 'Panchos tradicionales con ketchup, mostaza y más.'
  },
  {//17
    commerce_id: 6,
    name: 'Snacks Fritos',
    description: 'Snacks como papas fritas, aros de cebolla y más.'
  },
  {//18
    commerce_id: 6,
    name: 'Aderezos',
    description: 'Variedad de salsas y aderezos para complementar.'
  },

  {//19
    commerce_id: 13,  
    name: 'Mariscos',
    description: 'Mariscos frescos del mar.'
  },
  {//20
    commerce_id: 13,
    name: 'Pescado',
    description: 'Pescados frescos del mar, rio y lago.'
  },
  {//21
    commerce_id: 13,
    name: 'Moluscos',
    description: 'Moluscos frescos del mar.'
  },

  {//22
    commerce_id: 14,  
    name: 'Mariscos',
    description: 'Mariscos frescos del mar.'
  },
  {//23
    commerce_id: 14,
    name: 'Pescado',
    description: 'Pescados frescos del mar, rio y lago.'
  },
  {//24
    commerce_id: 14,
    name: 'Moluscos',
    description: 'Moluscos frescos del mar.'
  },    
  // 
  {//25
    commerce_id: 9,  
    name: 'Galletitas',
    description: 'Surtidos de galletitas con variedad.'
  },
  {//26
    commerce_id: 9,
    name: 'Vinos',
    description: 'Selección de vinos importados y exportados.'
  },
  {//27
    commerce_id: 9,
    name: 'Gaseosas Y bebidas',
    description: 'Variedad de gaseosas y juegos.'
  },        
  // 
  {//28
    commerce_id: 10,  
    name: 'Golosinas',
    description: 'Amplia variedad de golosinas y dulces.'
  },
  {//29
    commerce_id: 10,
    name: 'Cigarrillos',
    description: 'Variedad de cigarrillos.'
  },
  {//30
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