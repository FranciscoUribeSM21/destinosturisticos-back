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
    
    // --- NUEVOS ATRIBUTOS AGREGADOS ---
    category: { type: DataTypes.STRING(50), allowNull: true },
    contact_name: { type: DataTypes.STRING(150), allowNull: true },
    contact_email: { type: DataTypes.STRING(150), allowNull: true },
    contact_phone: { type: DataTypes.STRING(20), allowNull: true },
    emission_unit_type: { type: DataTypes.STRING(50), allowNull: true },
    emission_factor: { type: DataTypes.DECIMAL(10, 2), allowNull: true },
    // ----------------------------------

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