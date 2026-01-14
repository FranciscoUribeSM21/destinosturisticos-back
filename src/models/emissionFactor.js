const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmissionFactor = sequelize.define('EmissionFactor', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    subcategory_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    gas_type: { type: DataTypes.ENUM('CO2', 'CH4', 'N2O'), allowNull: false },
    factor_value: { type: DataTypes.DECIMAL(12, 6), allowNull: false },
    unit: { type: DataTypes.STRING(50), defaultValue: 'Toneladas' },
  }, {
    tableName: 'emission_factors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  EmissionFactor.associate = (models) => {
    EmissionFactor.belongsTo(models.EmissionSubcategory, { foreignKey: 'subcategory_id' });
  };

  return EmissionFactor;
};