const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Payment = sequelize.define('Payment', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    buy_order: { type: DataTypes.STRING(26), allowNull: false, unique: true },
    session_id: { type: DataTypes.STRING(64), allowNull: false },
    buyer_name: { type: DataTypes.STRING(180), allowNull: false },
    buyer_email: { type: DataTypes.STRING(180), allowNull: false },
    amount_usd: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    amount_clp: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    exchange_rate: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    exchange_rate_source: { type: DataTypes.STRING(80), allowNull: true },
    exchange_rate_date: { type: DataTypes.DATE, allowNull: true },
    status: {
      type: DataTypes.ENUM('PENDING', 'APPROVED', 'REJECTED', 'ERROR'),
      allowNull: false,
      defaultValue: 'PENDING',
    },
    token: { type: DataTypes.STRING(120), allowNull: true, unique: true },
    authorization_code: { type: DataTypes.STRING(50), allowNull: true },
    payment_type: { type: DataTypes.STRING(50), allowNull: true },
    provider: { type: DataTypes.STRING(50), allowNull: false, defaultValue: 'mock' },
    response_json: { type: DataTypes.JSON, allowNull: true },
  }, {
    tableName: 'payments',
    modelName: 'Payment',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  return Payment;
};
