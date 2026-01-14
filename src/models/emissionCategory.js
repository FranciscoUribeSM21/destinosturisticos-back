const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const EmissionCategory = sequelize.define('EmissionCategory', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
  }, {
    tableName: 'emission_categories',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  });

  EmissionCategory.associate = (models) => {
    EmissionCategory.hasMany(models.EmissionSubcategory, { foreignKey: 'category_id', as: 'subcategories' });
  };

  return EmissionCategory;
};