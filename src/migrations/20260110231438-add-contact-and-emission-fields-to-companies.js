'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('companies', 'category', {
      type: Sequelize.STRING(50),
      allowNull: true
    });
    await queryInterface.addColumn('companies', 'contact_name', {
      type: Sequelize.STRING(150),
      allowNull: true
    });
    await queryInterface.addColumn('companies', 'contact_email', {
      type: Sequelize.STRING(150),
      allowNull: true
    });
    await queryInterface.addColumn('companies', 'contact_phone', {
      type: Sequelize.STRING(20),
      allowNull: true
    });
    await queryInterface.addColumn('companies', 'emission_unit_type', {
      type: Sequelize.STRING(50),
      allowNull: true
    });
    await queryInterface.addColumn('companies', 'emission_factor', {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('companies', 'category');
    await queryInterface.removeColumn('companies', 'contact_name');
    await queryInterface.removeColumn('companies', 'contact_email');
    await queryInterface.removeColumn('companies', 'contact_phone');
    await queryInterface.removeColumn('companies', 'emission_unit_type');
    await queryInterface.removeColumn('companies', 'emission_factor');
  }
};