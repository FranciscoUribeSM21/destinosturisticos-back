'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('companies', 'external_company_id', {
      type: Sequelize.STRING(100),
      allowNull: true,
    });

    await queryInterface.addColumn('companies', 'emission_year', {
      type: Sequelize.INTEGER,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('companies', 'emission_year');
    await queryInterface.removeColumn('companies', 'external_company_id');
  },
};
