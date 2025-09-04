// models/Company.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db'); // 👈 ajusta la ruta según tu proyecto

const Company = sequelize.define(
  'Company',
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT, // Nombre
      allowNull: false,
    },
    logo_url: {
      type: DataTypes.TEXT, // Puede ser URL o bytea si usas PostgreSQL
      allowNull: false,
    },
    annual_emissions: {
      type: DataTypes.DECIMAL, // numeric
      allowNull: false,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    email: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    region: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    dashboard_url: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'users', // 👈 tabla users
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
    tableName: 'companies',
    modelName: 'Company',
    timestamps: true, // crea createdAt y updatedAt automáticamente
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

module.exports = Company;
