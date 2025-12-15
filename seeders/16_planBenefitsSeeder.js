'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkInsert(
        'plan_benefits',
        [
          // =====================
          // PLAN 1 - BÁSICA
          // =====================
          {
            plan_id: 1,
            max_publications: 15,
            can_add_stock: false,
            commerce_listing_visibility: false,
            access_reports: false,
            manage_employees_roles: false,
            better_search_position: false,
            exclusive_promotions: false,
            created_at: new Date(),
          },

          // =====================
          // PLAN 2 - ESTÁNDAR
          // =====================
          {
            plan_id: 2,
            max_publications: 35,
            can_add_stock: true,
            commerce_listing_visibility: false,
            access_reports: true,
            manage_employees_roles: true,
            better_search_position: false,
            exclusive_promotions: false,
            created_at: new Date(),
          },

          // =====================
          // PLAN 3 - PREMIUM
          // =====================
          {
            plan_id: 3,
            max_publications: null, // NULL = ilimitadas
            can_add_stock: true,
            commerce_listing_visibility: true,
            access_reports: true,
            manage_employees_roles: true,
            better_search_position: true,
            exclusive_promotions: true,
            created_at: new Date(),
          },
        ],
        {}
      );
    } catch (error) {
      console.error('Error executing seeder (plan_benefits):', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('plan_benefits', null, {});
  },
};
