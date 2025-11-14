'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('transactions', 'amount');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('transactions', 'amount', {
      type: Sequelize.DECIMAL,
      allowNull: true,
    });
  }
};
