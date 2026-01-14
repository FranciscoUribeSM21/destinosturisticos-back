'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Tabla de Categorías (Aéreo, Terrestre, etc.)
    await queryInterface.createTable('emission_categories', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 2. Tabla de Subcategorías (Bus, Auto, Viaje Corto Económico, etc.)
    await queryInterface.createTable('emission_subcategories', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      category_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'emission_categories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });

    // 3. Tabla de Factores de Emisión (CO2, CH4, N2O)
    await queryInterface.createTable('emission_factors', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      subcategory_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'emission_subcategories', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      gas_type: {
        type: Sequelize.ENUM('CO2', 'CH4', 'N2O'),
        allowNull: false
      },
      factor_value: {
        type: Sequelize.DECIMAL(12, 6), // Soporta hasta 6 decimales para factores pequeños
        allowNull: false
      },
      unit: {
        type: Sequelize.STRING(50),
        defaultValue: 'Toneladas'
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    // Eliminación en orden inverso para respetar restricciones de integridad
    await queryInterface.dropTable('emission_factors');
    await queryInterface.dropTable('emission_subcategories');
    await queryInterface.dropTable('emission_categories');
  }
};