'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    await queryInterface.bulkDelete('emission_factors', null, {});
    await queryInterface.bulkDelete('emission_subcategories', null, {});
    await queryInterface.bulkDelete('emission_categories', null, {});

    // 1. CATEGORÍAS
    await queryInterface.bulkInsert('emission_categories', [
      { id: 1, name: 'Transporte', created_at: now, updated_at: now },
      { id: 2, name: 'Alojamiento', created_at: now, updated_at: now },
      { id: 3, name: 'Alimentación', created_at: now, updated_at: now },
      { id: 4, name: 'Agencias de Viaje', created_at: now, updated_at: now },
      { id: 5, name: 'Eventos', created_at: now, updated_at: now },
      { id: 6, name: 'Empresas de Transporte', created_at: now, updated_at: now }
    ]);

    // 2. SUBCATEGORÍAS
    await queryInterface.bulkInsert('emission_subcategories', [
      { id: 1, category_id: 1, name: 'turista', created_at: now, updated_at: now },
      { id: 2, category_id: 1, name: 'business', created_at: now, updated_at: now },
      { id: 3, category_id: 1, name: 'bus', created_at: now, updated_at: now },
      { id: 4, category_id: 1, name: 'auto', created_at: now, updated_at: now },
      { id: 5, category_id: 1, name: 'tren', created_at: now, updated_at: now },
      { id: 6, category_id: 1, name: 'camioneta', created_at: now, updated_at: now },
      { id: 7, category_id: 2, name: 'noche de alojamiento', created_at: now, updated_at: now },
      { id: 8, category_id: 3, name: 'plato de comida', created_at: now, updated_at: now },
      { id: 9, category_id: 4, name: 'gestión de viaje', created_at: now, updated_at: now },
      { id: 10, category_id: 5, name: 'asistencia a evento', created_at: now, updated_at: now },
      { id: 11, category_id: 6, name: 'gestión de viaje', created_at: now, updated_at: now }
    ]);

    // 3. FACTORES DIFERENCIADOS (tCO2e)
    await queryInterface.bulkInsert('emission_factors', [
      // AVIÓN TURISTA (id: 1) - Moderado
      { subcategory_id: 1, gas_type: 'CO2', factor_value: 0.000150, created_at: now, updated_at: now },
      { subcategory_id: 1, gas_type: 'CH4', factor_value: 0.000001, created_at: now, updated_at: now },
      { subcategory_id: 1, gas_type: 'N2O', factor_value: 0.000002, created_at: now, updated_at: now },

      // AVIÓN BUSINESS (id: 2) - Alto (3x espacio)
      { subcategory_id: 2, gas_type: 'CO2', factor_value: 0.000450, created_at: now, updated_at: now },
      { subcategory_id: 2, gas_type: 'CH4', factor_value: 0.000001, created_at: now, updated_at: now },
      { subcategory_id: 2, gas_type: 'N2O', factor_value: 0.000002, created_at: now, updated_at: now },

      // BUS (id: 3) - Muy bajo por pasajero
      { subcategory_id: 3, gas_type: 'CO2', factor_value: 0.000027, created_at: now, updated_at: now },
      { subcategory_id: 3, gas_type: 'CH4', factor_value: 0.0000001, created_at: now, updated_at: now },
      { subcategory_id: 3, gas_type: 'N2O', factor_value: 0.0000005, created_at: now, updated_at: now },

      // AUTO (id: 4) - Medio (Combustión fósil)
      { subcategory_id: 4, gas_type: 'CO2', factor_value: 0.000170, created_at: now, updated_at: now },
      { subcategory_id: 4, gas_type: 'CH4', factor_value: 0.000003, created_at: now, updated_at: now },
      { subcategory_id: 4, gas_type: 'N2O', factor_value: 0.000004, created_at: now, updated_at: now },

      // CAMIONETA (id: 4) - Medio (Combustión fósil)
      { subcategory_id: 5, gas_type: 'CO2', factor_value: 0.000170, created_at: now, updated_at: now },
      { subcategory_id: 5, gas_type: 'CH4', factor_value: 0.000003, created_at: now, updated_at: now },
      { subcategory_id: 5, gas_type: 'N2O', factor_value: 0.000004, created_at: now, updated_at: now },

    // TREN (id: 4) - Medio (Combustión fósil)
      { subcategory_id: 6, gas_type: 'CO2', factor_value: 0.000170, created_at: now, updated_at: now },
      { subcategory_id: 6, gas_type: 'CH4', factor_value: 0.000003, created_at: now, updated_at: now },
      { subcategory_id: 6, gas_type: 'N2O', factor_value: 0.000004, created_at: now, updated_at: now },

      // ALOJAMIENTO (id: 7) - Por noche
      { subcategory_id: 7, gas_type: 'CO2', factor_value: 0.012500, created_at: now, updated_at: now },
      { subcategory_id: 7, gas_type: 'CH4', factor_value: 0.000150, created_at: now, updated_at: now },
      { subcategory_id: 7, gas_type: 'N2O', factor_value: 0.000100, created_at: now, updated_at: now },

      // ALIMENTACIÓN (id: 8) - Por plato
      { subcategory_id: 8, gas_type: 'CO2', factor_value: 0.002100, created_at: now, updated_at: now },
      { subcategory_id: 8, gas_type: 'CH4', factor_value: 0.000500, created_at: now, updated_at: now },
      { subcategory_id: 8, gas_type: 'N2O', factor_value: 0.000200, created_at: now, updated_at: now },

      // GESTIÓN AGENCIA (id: 9) - Operativo oficina
      { subcategory_id: 9, gas_type: 'CO2', factor_value: 0.000500, created_at: now, updated_at: now },
      { subcategory_id: 9, gas_type: 'CH4', factor_value: 0.000010, created_at: now, updated_at: now },
      { subcategory_id: 9, gas_type: 'N2O', factor_value: 0.000010, created_at: now, updated_at: now },

      // EVENTOS (id: 10) - Por asistente
      { subcategory_id: 10, gas_type: 'CO2', factor_value: 0.003500, created_at: now, updated_at: now },
      { subcategory_id: 10, gas_type: 'CH4', factor_value: 0.000200, created_at: now, updated_at: now },
      { subcategory_id: 10, gas_type: 'N2O', factor_value: 0.000200, created_at: now, updated_at: now },

      // Empresas de trasporte (id: 11) - 
      { subcategory_id: 11, gas_type: 'CO2', factor_value: 0.003500, created_at: now, updated_at: now },
      { subcategory_id: 11, gas_type: 'CH4', factor_value: 0.000200, created_at: now, updated_at: now },
      { subcategory_id: 11, gas_type: 'N2O', factor_value: 0.000200, created_at: now, updated_at: now }

    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('emission_factors', null, {});
    await queryInterface.bulkDelete('emission_subcategories', null, {});
    await queryInterface.bulkDelete('emission_categories', null, {});
  }
};