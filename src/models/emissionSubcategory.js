const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmissionSubcategory = sequelize.define('EmissionSubcategory', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    category_id: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false },
    name: { type: DataTypes.STRING(150), allowNull: false },
  }, {
    tableName: 'emission_subcategories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  EmissionSubcategory.associate = (models) => {
    EmissionSubcategory.belongsTo(models.EmissionCategory, { foreignKey: 'category_id' });
    EmissionSubcategory.hasMany(models.EmissionFactor, { foreignKey: 'subcategory_id', as: 'factors' });
  };

  return EmissionSubcategory;
};