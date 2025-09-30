// models/Transaction.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db'); // ajusta la ruta según tu proyecto
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
      allowNull: false, // normalmente una transacción debe tener compañía
      references: {
        model: Company,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL', // si borran la compañía, dejar null
    },
    project_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false, // normalmente una transacción debe tener proyecto
      references: {
        model: Project,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    amount: {
      type: DataTypes.DECIMAL(12, 2),
      allowNull: false,
      defaultValue: 0,
    },
    credits_count: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    updated_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
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
