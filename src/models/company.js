const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Company = sequelize.define('Company', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    logo_url: { type: DataTypes.TEXT, allowNull: false },
    annual_emissions: { type: DataTypes.DECIMAL, allowNull: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    email: { type: DataTypes.TEXT, allowNull: true },
    region: { type: DataTypes.TEXT, allowNull: true },
    dashboard_url: { type: DataTypes.TEXT, allowNull: true },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'companies',
    modelName: 'Company',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      where: { is_deleted: false },
    },
  });

  return Company;
};
