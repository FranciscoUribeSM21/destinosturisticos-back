'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await Promise.all([
      queryInterface.addColumn('companies', 'is_deleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        after: 'is_active',
      }),
      queryInterface.addColumn('projects', 'is_deleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        after: 'is_visible',
      }),
      queryInterface.addColumn('transactions', 'is_deleted', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        after: 'updated_by',
      }),
    ]);
  },

  async down(queryInterface) {
    await Promise.all([
      queryInterface.removeColumn('companies', 'is_deleted'),
      queryInterface.removeColumn('projects', 'is_deleted'),
      queryInterface.removeColumn('transactions', 'is_deleted'),
    ]);
  },
};
