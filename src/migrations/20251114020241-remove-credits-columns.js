'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('projects', 'available_credits');
    await queryInterface.removeColumn('projects', 'total_project_value');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('projects', 'available_credits', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
    await queryInterface.addColumn('projects', 'total_project_value', {
      type: Sequelize.DECIMAL,
      allowNull: false,
      defaultValue: 0,
    });
  }
};
