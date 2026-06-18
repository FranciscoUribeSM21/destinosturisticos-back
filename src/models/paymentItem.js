const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const PaymentItem = sequelize.define('PaymentItem', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    payment_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    project_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    project_name: { type: DataTypes.STRING(255), allowNull: false },
    credits_count: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    tons_per_credit: { type: DataTypes.DECIMAL(12, 4), allowNull: false },
    price_per_credit_usd: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    subtotal_usd: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    compensated_tons: { type: DataTypes.DECIMAL(12, 4), allowNull: false },
  }, {
    tableName: 'payment_items',
    modelName: 'PaymentItem',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return PaymentItem;
};
