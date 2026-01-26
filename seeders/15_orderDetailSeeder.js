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


      { order_id: 100, publication_id: 24, created_at: new Date('2024-11-15'), quantity: 1, amount: 1800 },
      { order_id: 100, publication_id: 26, created_at: new Date('2024-11-15'), quantity: 1, amount: 900 },

      { order_id: 101, publication_id: 25, created_at: new Date('2024-12-10'), quantity: 1, amount: 2300 },
      { order_id: 101, publication_id: 27, created_at: new Date('2024-12-10'), quantity: 1, amount: 800 },

      { order_id: 102, publication_id: 24, created_at: new Date('2025-01-20'), quantity: 1, amount: 1800 },

      { order_id: 103, publication_id: 25, created_at: new Date('2025-02-08'), quantity: 1, amount: 2300 },
      { order_id: 103, publication_id: 26, created_at: new Date('2025-02-08'), quantity: 1, amount: 900 },

      { order_id: 104, publication_id: 24, created_at: new Date('2025-03-18'), quantity: 1, amount: 1800 },
      { order_id: 104, publication_id: 26, created_at: new Date('2025-03-18'), quantity: 1, amount: 900 },
      { order_id: 104, publication_id: 27, created_at: new Date('2025-03-18'), quantity: 1, amount: 800 },

      { order_id: 105, publication_id: 24, created_at: new Date('2025-04-09'), quantity: 2, amount: 3600 },
      { order_id: 105, publication_id: 26, created_at: new Date('2025-04-09'), quantity: 1, amount: 900 },

      { order_id: 106, publication_id: 25, created_at: new Date('2025-05-23'), quantity: 1, amount: 2300 },
      { order_id: 106, publication_id: 27, created_at: new Date('2025-05-23'), quantity: 1, amount: 800 },

      { order_id: 107, publication_id: 24, created_at: new Date('2025-06-13'), quantity: 1, amount: 1800 },
      { order_id: 107, publication_id: 25, created_at: new Date('2025-06-13'), quantity: 1, amount: 2300 },

      { order_id: 108, publication_id: 26, created_at: new Date('2025-07-02'), quantity: 2, amount: 1800 },
      { order_id: 108, publication_id: 24, created_at: new Date('2025-07-02'), quantity: 1, amount: 1800 },

      { order_id: 109, publication_id: 25, created_at: new Date('2025-08-16'), quantity: 1, amount: 2300 },

      { order_id: 110, publication_id: 24, created_at: new Date('2025-09-11'), quantity: 1, amount: 1800 },
      { order_id: 110, publication_id: 26, created_at: new Date('2025-09-11'), quantity: 1, amount: 900 },
      { order_id: 110, publication_id: 27, created_at: new Date('2025-09-11'), quantity: 1, amount: 800 },

      { order_id: 111, publication_id: 25, created_at: new Date('2025-10-05'), quantity: 1, amount: 2300 },
      { order_id: 111, publication_id: 26, created_at: new Date('2025-10-05'), quantity: 1, amount: 900 },
{ order_id: 9401, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"), quantity: 2, amount: 3400 },
{ order_id: 9401, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"), quantity: 1, amount: 900 },

{ order_id: 9402, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 1 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9403, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 3 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9404, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9405, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"), quantity: 1, amount: 1700 },
{ order_id: 9405, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"), quantity: 1, amount: 900 },
{ order_id: 9405, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"), quantity: 1, amount: 2300 },

{ order_id: 9406, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 1700 },

{ order_id: 9407, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 3 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9408, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9409, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 7 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9410, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 9 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9411, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 11 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9412, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 3 MONTH)"), quantity: 2, amount: 4600 },

{ order_id: 9413, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9413, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 900 },
{ order_id: 9413, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9414, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 3 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9415, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9416, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 7 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9417, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 9 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9418, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 11 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9419, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 13 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9420, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 15 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9421, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 17 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9421, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 17 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9421, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 17 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9422, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 4 MONTH)"), quantity: 1, amount: 2300 },

{ order_id: 9423, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 1 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9424, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 3 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9425, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9426, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 7 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9427, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 9 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9428, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 11 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9429, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 13 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9429, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 13 DAY)"), quantity: 1, amount: 900 },
{ order_id: 9429, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 13 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9430, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 15 DAY)"), quantity: 1, amount: 1700 },

{ order_id: 9431, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 17 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9432, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 19 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9433, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 21 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9434, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 23 DAY)"), quantity: 3, amount: 2700 },

// Mes 5 (9435–9450)
{ order_id: 9435, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MONTH)"), quantity: 1, amount: 2300 },

{ order_id: 9436, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 1 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9437, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 2 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9438, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 3 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9439, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 4 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9440, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 5 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9440, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 5 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9441, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 6 DAY)"), quantity: 1, amount: 1700 },

{ order_id: 9442, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 7 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9442, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 7 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9443, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 8 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9444, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 9 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9445, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9445, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9446, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 11 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9447, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 12 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9448, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 13 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9449, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9450, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 15 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9450, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 15 DAY)"), quantity: 1, amount: 2900 },

// Mes 6 (9451–9468)
{ order_id: 9451, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 6 MONTH)"), quantity: 1, amount: 1700 },

{ order_id: 9452, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9452, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 1 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9453, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 2 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9454, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 3 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9455, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 4 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9455, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 4 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9456, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9457, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 6 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9458, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 7 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9459, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 8 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9460, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9460, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9461, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 10 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9462, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 11 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9463, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9464, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 13 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9465, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9465, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 14 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9466, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 15 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9467, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9468, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 17 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9468, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 17 DAY)"), quantity: 2, amount: 1800 },

// Mes 7 (9469–9487) 19 órdenes listadas en tu P2
{ order_id: 9469, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 MONTH)"), quantity: 1, amount: 2300 },

{ order_id: 9470, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 1 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9471, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 2 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9471, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 2 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9472, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 3 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9472, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 3 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9473, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 4 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9474, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9475, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 6 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9475, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 6 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9476, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 7 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9477, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 8 DAY)"), quantity: 2, amount: 5800 },

{ order_id: 9478, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9478, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 900 },

{ order_id: 9479, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 10 DAY)"), quantity: 2, amount: 4600 },

{ order_id: 9480, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 11 DAY)"), quantity: 3, amount: 2700 },

{ order_id: 9481, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9482, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 13 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9483, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9483, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 14 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9484, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 15 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9485, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9486, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 17 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9486, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 17 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9487, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 1700 },

// Mes 8 (9488–9512) 25 órdenes listadas en tu P2
{ order_id: 9488, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 8 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9489, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 1 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9490, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 2 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9490, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 2 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9491, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 3 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9491, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 3 DAY)"), quantity: 1, amount: 900 },
{ order_id: 9492, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 4 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9493, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 5 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9494, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 6 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9494, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 6 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9495, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 7 DAY)"), quantity: 1, amount: 900 },
{ order_id: 9496, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 8 DAY)"), quantity: 2, amount: 5800 },
{ order_id: 9497, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9497, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 9 DAY)"), quantity: 1, amount: 900 },
{ order_id: 9498, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 10 DAY)"), quantity: 2, amount: 4600 },
{ order_id: 9499, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 11 DAY)"), quantity: 3, amount: 2700 },
{ order_id: 9500, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9501, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 13 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9502, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9502, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 14 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9503, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 15 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9504, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9505, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 17 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9505, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 17 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9506, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9507, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 19 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9507, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 19 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9508, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9509, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 21 DAY)"), quantity: 2, amount: 4600 },
{ order_id: 9510, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 22 DAY)"), quantity: 3, amount: 2700 },
{ order_id: 9511, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 23 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9512, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 24 DAY)"), quantity: 2, amount: 1800 },

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
