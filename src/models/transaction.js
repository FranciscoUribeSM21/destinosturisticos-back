const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    company_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    project_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    amount: { type: DataTypes.DECIMAL(12,2), allowNull: false, defaultValue: 0 },
    credits_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 0 },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'transactions',
    modelName: 'Transaction',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      where: { is_deleted: false },
    },
  });

  return Transaction;
};
