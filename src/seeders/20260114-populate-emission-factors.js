'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // --- 1. CATEGORÍAS ---
    await queryInterface.bulkInsert('emission_categories', [
      { id: 1, name: 'Transporte', created_at: now, updated_at: now },
      { id: 2, name: 'Alojamiento', created_at: now, updated_at: now },
      { id: 3, name: 'Alimentación', created_at: now, updated_at: now }
    ]);

    // --- 2. SUBCATEGORÍAS ---
    await queryInterface.bulkInsert('emission_subcategories', [
      // Transporte (ID: 1)
      { id: 1, category_id: 1, name: 'Viaje Corto - Económico', created_at: now, updated_at: now },
      { id: 2, category_id: 1, name: 'Viaje Largo - Económico', created_at: now, updated_at: now },
      { id: 3, category_id: 1, name: 'Bus', created_at: now, updated_at: now },
      { id: 4, category_id: 1, name: 'Auto', created_at: now, updated_at: now },
      // Alojamiento (ID: 2)
      { id: 5, category_id: 2, name: 'Noche de Alojamiento', created_at: now, updated_at: now },
      // Alimentación (ID: 3)
      { id: 6, category_id: 3, name: 'Plato de comida', created_at: now, updated_at: now }
    ]);

    // --- 3. FACTORES DE EMISIÓN (Datos de la imagen) ---
    await queryInterface.bulkInsert('emission_factors', [
      // Viaje Corto Económico
        { subcategory_id: 1, gas_type: 'CO2', factor_value: 0.000400, created_at: now, updated_at: now },
        { subcategory_id: 1, gas_type: 'CH4', factor_value: 0.034300, created_at: now, updated_at: now },
        { subcategory_id: 1, gas_type: 'N2O', factor_value: 0.042400, created_at: now, updated_at: now },
        
        // Viaje Largo Económico
        { subcategory_id: 2, gas_type: 'CO2', factor_value: 0.002300, created_at: now, updated_at: now },
        { subcategory_id: 2, gas_type: 'CH4', factor_value: 0.432200, created_at: now, updated_at: now },
        { subcategory_id: 2, gas_type: 'N2O', factor_value: 0.043200, created_at: now, updated_at: now },

        // Bus
        { subcategory_id: 3, gas_type: 'CO2', factor_value: 0.000400, created_at: now, updated_at: now },
        { subcategory_id: 3, gas_type: 'CH4', factor_value: 0.034300, created_at: now, updated_at: now },
        { subcategory_id: 3, gas_type: 'N2O', factor_value: 0.042400, created_at: now, updated_at: now },

            // Auto (Subcategoría ID 4)
        { subcategory_id: 4, gas_type: 'CO2', factor_value: 0.002300, created_at: now, updated_at: now },
        { subcategory_id: 4, gas_type: 'CH4', factor_value: 0.432200, created_at: now, updated_at: now },
        { subcategory_id: 4, gas_type: 'N2O', factor_value: 0.043200, created_at: now, updated_at: now },

        // Noche de Alojamiento
        { subcategory_id: 5, gas_type: 'CO2', factor_value: 0.000400, created_at: now, updated_at: now },
        { subcategory_id: 5, gas_type: 'CH4', factor_value: 0.034300, created_at: now, updated_at: now },
        { subcategory_id: 5, gas_type: 'N2O', factor_value: 0.042400, created_at: now, updated_at: now },

        // Plato de comida (Subcategoría ID 6)
        { subcategory_id: 6, gas_type: 'CO2', factor_value: 0.000400, created_at: now, updated_at: now },
        { subcategory_id: 6, gas_type: 'CH4', factor_value: 0.034300, created_at: now, updated_at: now },
        { subcategory_id: 6, gas_type: 'N2O', factor_value: 0.042400, created_at: now, updated_at: now }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('emission_factors', null, {});
    await queryInterface.bulkDelete('emission_subcategories', null, {});
    await queryInterface.bulkDelete('emission_categories', null, {});
  }
};