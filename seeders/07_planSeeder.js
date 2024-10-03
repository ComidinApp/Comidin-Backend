'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('plan', [
    {
      name: 'Plan Aperitivo',
      description: 'Perfecto para dar tus primeros pasos y descubrir lo que Comidin tiene para ofrecer. Incluye hasta 10 publicaciones disponibles, sin capacidad para agregar stock. Visibilidad baja en el listado de comercios, sin acceso a reportes ni estadísticas. No incluye agregado de empleados ni roles.'
    },
    {
      name: 'Plan Plato Principal',
      description: 'Lleva tu comercio al siguiente nivel con más herramientas para impulsar tus ventas. Hasta 25 publicaciones con stock ilimitado. Acceso a reportes y estadísticas para un mejor seguimiento de tu negocio. Opción de sumar empleados y roles a tu cuenta para una gestión más eficiente, con visibilidad baja en el listado de comercios.'
    },
    {
      name: 'Plan Banquete',
      description: 'Disfruta de todas las ventajas y maximiza el potencial de tu comercio con nuestra oferta más completa. Publicaciones ilimitadas para tu comercio, mejor posicionamiento en las búsquedas para destacar frente a la competencia. Acceso a reportes, estadísticas y promociones exclusivas. Gestión avanzada con la posibilidad de sumar empleados y roles sin restricciones.'
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plan', null, {});
  }
};