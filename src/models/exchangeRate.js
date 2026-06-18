const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const ExchangeRate = sequelize.define('ExchangeRate', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    currency_from: { type: DataTypes.STRING(3), allowNull: false },
    currency_to: { type: DataTypes.STRING(3), allowNull: false },
    rate: { type: DataTypes.DECIMAL(12, 4), allowNull: false },
    source: { type: DataTypes.STRING(80), allowNull: false },
    source_date: { type: DataTypes.DATE, allowNull: true },
  }, {
    tableName: 'exchange_rates',
    modelName: 'ExchangeRate',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return ExchangeRate;
};
