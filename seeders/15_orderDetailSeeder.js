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
      // 9101 total 4000 = 1*2300 + 1*1700
{ order_id: 9101, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9101, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 1 MONTH)"), quantity: 1, amount: 1700 },

// 9102 total 3200 = 1*1700 + 1*1500 (ajusto con 9004 a 1500? no: dejo 9003 (900) + 9004 (2900) no da)
// Mejor: 1*1700 + 1*1500 no existe, así que lo hago 1*2300 + 1*900 = 3200
{ order_id: 9102, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9102, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 2 MONTH)"), quantity: 1, amount: 900 },

// 9103 total 5200 = 1*2300 + 1*2900
{ order_id: 9103, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 3 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9103, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 3 MONTH)"), quantity: 1, amount: 2900 },

// 9104 total 1800 = 2*900
{ order_id: 9104, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 4 MONTH)"), quantity: 2, amount: 1800 },

// 9105 total 4100 = 1*2300 + 2*900
{ order_id: 9105, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9105, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 5 MONTH)"), quantity: 2, amount: 1800 },

// 9106 total 2500 = 1*1700 + 1*900 (2600) no. 1*2300 + 1*900 (3200) no.
// Entonces lo dejo 1*1700 + 1*900 = 2600 y ajusto order 9106 arriba? NO. Mejor: 1*900 + 1*900 + 1*900 = 2700 tampoco.
// Solución limpia: usar publication 9002 (1700) + publication 9003 (900) = 2600, así que acá uso 2600 y si querés exactitud cambiá order 9106 total a 2600.
// Yo te lo dejo exacto con total 2500:  (no existe con estos precios) -> uso 1*2500 directo: cambiá price de 9001 a 2500? No.
// OK, coherencia matemática > capricho: dejo 2600 y sugerencia mínima: cambiá el total_amount de 9106 a 2600.
{ order_id: 9106, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 6 MONTH)"), quantity: 1, amount: 1700 },
{ order_id: 9106, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 6 MONTH)"), quantity: 1, amount: 900 },

// 9107 total 5900 = 1*2300 + 1*1700 + 1*1900? no. 1*2900 + 2*1700 = 6300.
// Mejor: 1*2900 + 1*2300 + 1*900 = 6100.
// Con estos precios, 5900 exacto no sale. Te lo dejo coherente y ajustás total_amount.
{ order_id: 9107, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 MONTH)"), quantity: 1, amount: 2900 },
{ order_id: 9107, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 MONTH)"), quantity: 1, amount: 2300 },
{ order_id: 9107, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 7 MONTH)"), quantity: 1, amount: 900 },

// 9108 total 3400 = 2*1700
{ order_id: 9108, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 8 MONTH)"), quantity: 2, amount: 3400 },

// 9109 total 4700 = 1*2900 + 2*900 (4700)
{ order_id: 9109, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 9 MONTH)"), quantity: 1, amount: 2900 },
{ order_id: 9109, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 9 MONTH)"), quantity: 2, amount: 1800 },

// 9110 total 900 = 1*900
{ order_id: 9110, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(NOW(), INTERVAL 10 MONTH)"), quantity: 1, amount: 900 }
,
// ===============================
// DEMO ORDER_DETAILS (para 9301..9420)
// Consistentes con total_amount/items_quantity
// ===============================

// Patrones:
// 4000 -> (9001 x1=2300) + (9002 x1=1700)
// 3200 -> (9001 x1=2300) + (9003 x1=900)
// 2600 -> (9002 x1=1700) + (9003 x1=900)
// 1800 -> (9003 x2=1800)
// 5200 -> (9004 x1=2900) + (9001 x1=2300)
// 4700 -> (9004 x1=2900) + (9003 x2=1800)
// 3400 -> (9002 x2=3400)
// 4100 -> (9001 x1=2300) + (9003 x2=1800)
// 2900 -> (9004 x1=2900)
// 3500 -> (9002 x1=1700) + (9003 x2=1800)

// Mes 0 (9301..9310)
{ order_id: 9301, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9301, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9302, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9302, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9303, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9303, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9304, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9305, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9305, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9306, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9306, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9307, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9308, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9308, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9309, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9310, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9310, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 0 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 1 (9311..9320)
{ order_id: 9311, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9311, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9312, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9312, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9313, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9313, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9314, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9315, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9315, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9316, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9316, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9317, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9318, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9318, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9319, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9320, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9320, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 1 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 2..11: sigue EXACTAMENTE el mismo patrón que Mes 1, cambiando el INTERVAL MONTH y los order_id.
// (No, no te lo corto: ya está completo arriba en orders; acá te lo dejo completo también para 12 meses.)

// Mes 2 (9321..9330)
{ order_id: 9321, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9321, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9322, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9322, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },
{ order_id: 9323, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9323, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },
{ order_id: 9324, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },
{ order_id: 9325, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9325, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9326, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9326, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9327, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9328, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9328, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9329, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9330, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9330, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 2 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 3 (9331..9340)
{ order_id: 9331, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9331, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9332, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9332, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },
{ order_id: 9333, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9333, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },
{ order_id: 9334, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },
{ order_id: 9335, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9335, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9336, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9336, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9337, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },
{ order_id: 9338, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9338, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },
{ order_id: 9339, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9340, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9340, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 3 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },
// Mes 4 (9341..9350)
{ order_id: 9341, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9341, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9342, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9342, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9343, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9343, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9344, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9345, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9345, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9346, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9346, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9347, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9348, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9348, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9349, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9350, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9350, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 4 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 5 (9351..9360)
{ order_id: 9351, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9351, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9352, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9352, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9353, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9353, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9354, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9355, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9355, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9356, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9356, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9357, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9358, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9358, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9359, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9360, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9360, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 5 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 6 (9361..9370)
{ order_id: 9361, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9361, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9362, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9362, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9363, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9363, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9364, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9365, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9365, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9366, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9366, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9367, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9368, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9368, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9369, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9370, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9370, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 6 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 7 (9371..9380)
{ order_id: 9371, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9371, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9372, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9372, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9373, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9373, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9374, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9375, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9375, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9376, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9376, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9377, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9378, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9378, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9379, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9380, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9380, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 7 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 8 (9381..9390)
{ order_id: 9381, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9381, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9382, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9382, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9383, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9383, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9384, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9385, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9385, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9386, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9386, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9387, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9388, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9388, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9389, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9390, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9390, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 8 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 9 (9391..9400)
{ order_id: 9391, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9391, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9392, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9392, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9393, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9393, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9394, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9395, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9395, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9396, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9396, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9397, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9398, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9398, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9399, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9400, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9400, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 9 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 10 (9401..9410)
{ order_id: 9401, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9401, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9402, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9402, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9403, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9403, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9404, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9405, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9405, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9406, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9406, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9407, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9408, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9408, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9409, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9410, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9410, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 10 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },

// Mes 11 (9411..9420)
{ order_id: 9411, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9411, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 2 DAY)"),  quantity: 1, amount: 1700 },

{ order_id: 9412, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 2300 },
{ order_id: 9412, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 4 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9413, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 1700 },
{ order_id: 9413, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 6 DAY)"),  quantity: 1, amount: 900 },

{ order_id: 9414, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 8 DAY)"),  quantity: 2, amount: 1800 },

{ order_id: 9415, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9415, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 10 DAY)"), quantity: 1, amount: 2300 },

{ order_id: 9416, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 12 DAY)"), quantity: 1, amount: 2900 },
{ order_id: 9416, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 12 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9417, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 14 DAY)"), quantity: 2, amount: 3400 },

{ order_id: 9418, publication_id: 9001, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 16 DAY)"), quantity: 1, amount: 2300 },
{ order_id: 9418, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 16 DAY)"), quantity: 2, amount: 1800 },

{ order_id: 9419, publication_id: 9004, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 18 DAY)"), quantity: 1, amount: 2900 },

{ order_id: 9420, publication_id: 9002, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 20 DAY)"), quantity: 1, amount: 1700 },
{ order_id: 9420, publication_id: 9003, created_at: Sequelize.literal("DATE_SUB(DATE_SUB(NOW(), INTERVAL 11 MONTH), INTERVAL 20 DAY)"), quantity: 2, amount: 1800 },
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
