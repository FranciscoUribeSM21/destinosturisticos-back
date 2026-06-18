'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payments', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      buy_order: {
        type: Sequelize.STRING(26),
        allowNull: false,
        unique: true,
      },
      session_id: {
        type: Sequelize.STRING(64),
        allowNull: false,
      },
      buyer_name: {
        type: Sequelize.STRING(180),
        allowNull: false,
      },
      buyer_email: {
        type: Sequelize.STRING(180),
        allowNull: false,
      },
      amount_usd: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      amount_clp: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      exchange_rate: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('PENDING', 'APPROVED', 'REJECTED', 'ERROR'),
        allowNull: false,
        defaultValue: 'PENDING',
      },
      token: {
        type: Sequelize.STRING(120),
        allowNull: true,
        unique: true,
      },
      authorization_code: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      payment_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
      },
      provider: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'mock',
      },
      response_json: {
        type: Sequelize.JSON,
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
  },

  async down(queryInterface) {
    await queryInterface.dropTable('payments');
  },
};
