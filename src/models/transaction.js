// models/Transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db'); // 👈 ajusta la ruta según tu proyecto
const User = require('./user');
const Company = require('./company');
const Project = require('./project');

const Transaction = sequelize.define(
  'Transaction',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    company_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'companies',
        key: 'id',
      },
    },
    project_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'projects',
        key: 'id',
      },
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    credits_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    updated_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'transactions',
    modelName: 'Transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// 🔹 Associations
Transaction.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });
Transaction.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });
Transaction.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Transaction.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

module.exports = Transaction;
