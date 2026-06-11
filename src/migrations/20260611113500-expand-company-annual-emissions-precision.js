'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('companies', 'annual_emissions', {
      type: Sequelize.DECIMAL(14, 2),
      allowNull: false,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('companies', 'annual_emissions', {
      type: Sequelize.DECIMAL,
      allowNull: false,
    });
  },
};
