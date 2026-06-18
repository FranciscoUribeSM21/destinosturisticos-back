'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('payments', 'exchange_rate_source', {
      type: Sequelize.STRING(80),
      allowNull: true,
    });

    await queryInterface.addColumn('payments', 'exchange_rate_date', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('payments', 'exchange_rate_date');
    await queryInterface.removeColumn('payments', 'exchange_rate_source');
  },
};
