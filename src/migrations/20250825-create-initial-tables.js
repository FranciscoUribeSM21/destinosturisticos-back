'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // ======================================
    // 1️⃣ Users
    // ======================================
    await queryInterface.createTable('users', {
      id: { 
        type: Sequelize.INTEGER.UNSIGNED, 
        autoIncrement: true, 
        primaryKey: true 
      },
      uuid: { 
        type: Sequelize.STRING(255), 
        allowNull: false, 
        unique: true 
      },
      name: { type: Sequelize.STRING(150), allowNull: false },
      email: { type: Sequelize.STRING(150), allowNull: false, unique: true },
      password_hash: { type: Sequelize.STRING(255), allowNull: false },
      salt: { type: Sequelize.STRING(255), allowNull: true },
      role: { type: Sequelize.STRING(50), allowNull: false, defaultValue: 'user' },
      isActive: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
      lastLogin: { type: Sequelize.DATE, allowNull: true },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    // ======================================
    // 2️⃣ Companies
    // ======================================
    await queryInterface.createTable('companies', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      logo_url: { type: Sequelize.TEXT, allowNull: false },
      annual_emissions: { type: Sequelize.DECIMAL, allowNull: false },
      is_active: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true },
      description: { type: Sequelize.TEXT, allowNull: true },
      email: { type: Sequelize.TEXT, allowNull: true },
      region: { type: Sequelize.TEXT, allowNull: true },
      dashboard_url: { type: Sequelize.TEXT, allowNull: true },
      created_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    // ======================================
    // 3️⃣ Projects
    // ======================================
    await queryInterface.createTable('projects', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.TEXT, allowNull: false },
      carousel_image_1: { type: Sequelize.TEXT, allowNull: false },
      carousel_image_2: { type: Sequelize.TEXT, allowNull: true },
      carousel_image_3: { type: Sequelize.TEXT, allowNull: true },
      region: { type: Sequelize.TEXT, allowNull: false },
      methodology: { type: Sequelize.TEXT, allowNull: true },
      area: { type: Sequelize.DECIMAL, allowNull: true },
      is_open_for_purchase: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: false },
      is_visible: { type: Sequelize.BOOLEAN, allowNull: true, defaultValue: true },
      credit_price: { type: Sequelize.DECIMAL, allowNull: false },
      total_project_value: { type: Sequelize.DECIMAL, allowNull: false },
      total_credits: { type: Sequelize.INTEGER, allowNull: false },
      available_credits: { type: Sequelize.INTEGER, allowNull: false },
      tons_per_credit: { type: Sequelize.DECIMAL, allowNull: true },
      content_block_1: { type: Sequelize.TEXT, allowNull: false },
      content_block_2: { type: Sequelize.TEXT, allowNull: true },
      content_block_3: { type: Sequelize.TEXT, allowNull: true },
      created_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    // ======================================
    // 4️⃣ Transactions
    // ======================================
    await queryInterface.createTable('transactions', {
      id: { type: Sequelize.STRING, primaryKey: true },
      company_id: { 
        type: Sequelize.INTEGER.UNSIGNED, 
        references: { model: 'companies', key: 'id' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      project_id: { 
        type: Sequelize.INTEGER.UNSIGNED, 
        references: { model: 'projects', key: 'id' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      user_id: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT'
      },
      amount: { type: Sequelize.DECIMAL, allowNull: true },
      credits_count: { type: Sequelize.INTEGER, allowNull: true },
      created_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      updated_by: { 
        type: Sequelize.STRING, 
        references: { model: 'users', key: 'uuid' }, 
        allowNull: true,
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    // ======================================
    // 5️⃣ Products: eliminar tabla
    // ======================================
    await queryInterface.dropTable('products');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: { type: Sequelize.STRING, primaryKey: true },
      name: { type: Sequelize.STRING(150), allowNull: false },
      category: { type: Sequelize.STRING(100), allowNull: false },
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.fn('NOW') },
    });

    await queryInterface.dropTable('transactions');
    await queryInterface.dropTable('projects');
    await queryInterface.dropTable('companies');
    await queryInterface.dropTable('users');
  }
};
