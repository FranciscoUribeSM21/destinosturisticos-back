'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('exchange_rates', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      currency_from: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      currency_to: {
        type: Sequelize.STRING(3),
        allowNull: false,
      },
      rate: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: false,
      },
      source: {
        type: Sequelize.STRING(80),
        allowNull: false,
      },
      source_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });

    await queryInterface.addIndex('exchange_rates', ['currency_from', 'currency_to', 'created_at'], {
      name: 'exchange_rates_currency_created_at_idx',
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('exchange_rates');
  },
};
