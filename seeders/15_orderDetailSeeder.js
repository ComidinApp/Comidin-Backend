'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert('order_detail', [
        // order 1: total 300 = 2*100 + 1*100
        { order_id: 1,  publication_id: 1, created_at: new Date('2024-09-25'), quantity: 2, amount: 200 },
        { order_id: 1,  publication_id: 2, created_at: new Date('2024-09-25'), quantity: 1, amount: 100 },

        // order 2: total 300 = 1*100 + 1*200
        { order_id: 2,  publication_id: 3, created_at: new Date('2024-09-26'), quantity: 1, amount: 100 },
        { order_id: 2,  publication_id: 4, created_at: new Date('2024-09-26'), quantity: 1, amount: 200 },

        // order 3: total 700 = 2*200 + 1*300
        { order_id: 3,  publication_id: 5, created_at: new Date('2024-09-27'), quantity: 2, amount: 400 },
        { order_id: 3,  publication_id: 6, created_at: new Date('2024-09-27'), quantity: 1, amount: 300 },

        // order 4: total 800 = 2*200 + 2*200
        { order_id: 4,  publication_id: 7, created_at: new Date('2024-09-28'), quantity: 2, amount: 400 },
        { order_id: 4,  publication_id: 8, created_at: new Date('2024-09-28'), quantity: 2, amount: 400 },

        // order 5: total 900 = 3*300
        { order_id: 5,  publication_id: 1, created_at: new Date('2024-09-29'), quantity: 3, amount: 900 },

        // order 6: total 1000 = 5*200
        { order_id: 6,  publication_id: 2, created_at: new Date('2024-09-30'), quantity: 5, amount: 1000 },

        // order 7: total 1100= 3*200 + 1*500
        { order_id: 7,  publication_id: 3, created_at: new Date('2024-10-01'), quantity: 3, amount: 600 },
        { order_id: 7,  publication_id: 4, created_at: new Date('2024-10-01'), quantity: 1, amount: 500 },

        // order 8: total 1200 = 4*300
        { order_id: 8,  publication_id: 5, created_at: new Date('2024-10-02'), quantity: 4, amount: 1200 },

        // order 9: total 1300 = 2*400 + 1*500
        { order_id: 9,  publication_id: 6, created_at: new Date('2024-10-03'), quantity: 2, amount: 800 },
        { order_id: 9,  publication_id: 7, created_at: new Date('2024-10-03'), quantity: 1, amount: 500 },

        // order 10: total 1500 = 5*300
        { order_id: 10, publication_id: 8, created_at: new Date('2024-10-04'), quantity: 5, amount: 1500 },

        // order 11: total 1600 = 4*400
        { order_id: 11, publication_id: 1, created_at: new Date('2024-10-05'), quantity: 4, amount: 1600 },

        // order 12: total 1700 = 2*400 + 3*300
        { order_id: 12, publication_id: 2, created_at: new Date('2024-10-06'), quantity: 2, amount: 800 },
        { order_id: 12, publication_id: 3, created_at: new Date('2024-10-06'), quantity: 3, amount: 900 },

        // order 13: total 3000 = 6*500
        { order_id: 13, publication_id: 4, created_at: new Date('2024-10-07'), quantity: 6, amount: 3000 },

        // order 14: total 3500 = 7*500
        { order_id: 14, publication_id: 5, created_at: new Date('2024-10-08'), quantity: 7, amount: 3500 },

        // order 15: total 4000 = 8*500
        { order_id: 15, publication_id: 6, created_at: new Date('2024-10-09'), quantity: 8, amount: 4000 },

        // order 16: total 4500 = 5*900
        { order_id: 16, publication_id: 7, created_at: new Date('2024-10-10'), quantity: 5, amount: 4500 },
      ], {});
    } catch (error) {
      console.error('Error executing seeder (order_detail):', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('order_detail', null, {});
  }
};
