// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db'); // ajusta la ruta según tu proyecto

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
    field: 'id',
  },
  uuid: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
    field: 'uuid',
  },
  name: {
    type: DataTypes.STRING(150),
    allowNull: false,
    field: 'name',
  },
  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
    field: 'email',
  },
  passwordHash: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: 'password_hash',
  },
  salt: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: 'salt',
  },
  role: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'user',
    field: 'role',
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: 'is_active',
  },
  lastLogin: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'last_login',
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'created_by',
  },
  updatedBy: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'updated_by',
  },
}, {
  sequelize,
  tableName: 'users',
  modelName: 'User',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = User;
