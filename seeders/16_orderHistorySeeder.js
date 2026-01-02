'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const histories = [];
    let id = 1;

    const add = (order_id, status, created_at) => {
      histories.push({
        id: id++,
        order_id,
        status,
        created_at,
      });
    };

    const buildHistory = (order) => {
      const baseDate = order.created_at;

      add(order.id, 'PENDING', baseDate);

      if (order.status === 'CANCELLED') {
        add(order.id, 'CANCELLED', new Date(baseDate.getTime() + 1000));
        return;
      }

      if (['CONFIRMED', 'COMPLETED', 'DELIVERED', 'CLAIMED'].includes(order.status)) {
        add(order.id, 'CONFIRMED', new Date(baseDate.getTime() + 1000));
      }

      if (['COMPLETED', 'DELIVERED', 'CLAIMED'].includes(order.status)) {
        add(order.id, 'COMPLETED', new Date(baseDate.getTime() + 2000));
      }

      if (['DELIVERED', 'CLAIMED'].includes(order.status)) {
        add(order.id, 'DELIVERED', new Date(baseDate.getTime() + 3000));
      }

      if (order.status === 'CLAIMED') {
        add(order.id, 'CLAIMED', new Date(baseDate.getTime() + 4000));
      }

    };

  
    const orders = [
      { id: 1, status: 'PENDING', created_at: new Date('2024-09-25') },
      { id: 2, status: 'DELIVERED', created_at: new Date('2024-09-26') },
      { id: 3, status: 'DELIVERED', created_at: new Date('2024-09-27') },
      { id: 4, status: 'COMPLETED', created_at: new Date('2024-09-28') },
      { id: 5, status: 'CANCELLED', created_at: new Date('2024-09-29') },

      { id: 6, status: 'PENDING', created_at: new Date('2024-09-30') },
      { id: 7, status: 'DELIVERED', created_at: new Date('2024-10-01') },
      { id: 8, status: 'DELIVERED', created_at: new Date('2024-10-02') },
      { id: 9, status: 'COMPLETED', created_at: new Date('2024-10-03') },

      { id: 10, status: 'PENDING', created_at: new Date('2024-10-04') },
      { id: 11, status: 'CONFIRMED', created_at: new Date('2024-10-05') },
      { id: 12, status: 'DELIVERED', created_at: new Date('2024-10-06') },

      { id: 13, status: 'COMPLETED', created_at: new Date('2024-10-07') },
      { id: 14, status: 'PENDING', created_at: new Date('2024-10-08') },
      { id: 15, status: 'CONFIRMED', created_at: new Date('2024-10-09') },
      { id: 16, status: 'DELIVERED', created_at: new Date('2024-10-10') },

      { id: 100, status: 'CONFIRMED', created_at: new Date('2024-11-15') },
      { id: 101, status: 'DELIVERED', created_at: new Date('2024-12-10') },
      { id: 102, status: 'COMPLETED', created_at: new Date('2025-01-20') },
      { id: 103, status: 'CONFIRMED', created_at: new Date('2025-02-08') },
      { id: 104, status: 'DELIVERED', created_at: new Date('2025-03-18') },
      { id: 105, status: 'COMPLETED', created_at: new Date('2025-04-09') },
      { id: 106, status: 'CONFIRMED', created_at: new Date('2025-05-23') },
      { id: 107, status: 'DELIVERED', created_at: new Date('2025-06-13') },
      { id: 108, status: 'COMPLETED', created_at: new Date('2025-07-02') },
      { id: 109, status: 'CONFIRMED', created_at: new Date('2025-08-16') },
      { id: 110, status: 'DELIVERED', created_at: new Date('2025-09-11') },
      { id: 111, status: 'COMPLETED', created_at: new Date('2025-10-05') },
    ];

    for (const order of orders) {
      buildHistory(order);
    }

    try {
      await queryInterface.bulkInsert('order_history', histories, {});
    } catch (error) {
      console.error('Error executing seeder (order_history):', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_history', null, {});
  },
};
