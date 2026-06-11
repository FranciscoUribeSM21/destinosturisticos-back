'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('companies', 'emission_factor', {
      type: Sequelize.DECIMAL(14, 2),
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('companies', 'emission_factor', {
      type: Sequelize.DECIMAL(14, 8),
      allowNull: true,
    });
  },
};
