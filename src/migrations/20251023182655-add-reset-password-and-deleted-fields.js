'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 🔹 Users: reset password
    await queryInterface.addColumn('users', 'reset_password_token', {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });
    await queryInterface.addColumn('users', 'reset_password_expires', {
      type: Sequelize.DATE,
      allowNull: true,
    });

    // 🔹 Companies, Projects, Transactions: deleted
    const tables = ['companies', 'projects', 'transactions'];
    for (const table of tables) {
      await queryInterface.addColumn(table, 'deleted', {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      });
    }
  },

  async down(queryInterface, Sequelize) {
    // 🔹 Users: reset password
    await queryInterface.removeColumn('users', 'reset_password_token');
    await queryInterface.removeColumn('users', 'reset_password_expires');

    // 🔹 Companies, Projects, Transactions: deleted
    const tables = ['companies', 'projects', 'transactions'];
    for (const table of tables) {
      await queryInterface.removeColumn(table, 'deleted');
    }
  }
};
