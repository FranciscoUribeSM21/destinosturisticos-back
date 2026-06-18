'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_items', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      payment_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'payments', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      project_id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'projects', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      project_name: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      credits_count: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
      },
      tons_per_credit: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: false,
      },
      price_per_credit_usd: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      subtotal_usd: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: false,
      },
      compensated_tons: {
        type: Sequelize.DECIMAL(12, 4),
        allowNull: false,
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
    await queryInterface.dropTable('payment_items');
  },
};
