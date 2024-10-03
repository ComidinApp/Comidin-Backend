'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
  await queryInterface.bulkInsert('role', [
    {
      name: 'Administrador',
      description: 'Rol con acceso completo al sistema. Puede gestionar comercios, empleados, productos y realizar configuraciones avanzadas. Encargado de supervisar todas las operaciones del comercio.'
    },
    {
      name: 'Cocinero',
      description: 'Responsable de la preparación y elaboración de los productos alimenticios en el comercio. Debe garantizar la calidad de los productos y el cumplimiento de los tiempos de entrega.'
    },
    {
      name: 'Repartidor',
      description: 'Encargado de la entrega de los pedidos a los clientes. Su responsabilidad es asegurar que los productos lleguen en buen estado y a tiempo.'
    },
    {
      name: 'Cajero',
      description: 'Gestiona el cobro de los pedidos, maneja transacciones de pago y provee atención al cliente en el punto de venta. También se encarga de gestionar cualquier incidencia relacionada con pagos.'
    },
    {
      name: 'Supervisor de Ventas',
      description: 'Supervisa el equipo de ventas y garantiza que se cumplan los objetivos comerciales. Analiza las estadísticas de ventas y propone mejoras para optimizar el rendimiento del negocio.'
    }
  ], {});
      
} catch (error) {
    console.error('Error executing seeder:', error);
  }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('role', null, {});
  }
};