const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Project = sequelize.define('Project', {
    id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.TEXT, allowNull: false },
    carousel_image_1: { type: DataTypes.TEXT, allowNull: false },
    carousel_image_2: { type: DataTypes.TEXT, allowNull: true },
    carousel_image_3: { type: DataTypes.TEXT, allowNull: true },
    region: { type: DataTypes.TEXT, allowNull: false },
    methodology: { type: DataTypes.TEXT, allowNull: true },
    area: { type: DataTypes.DECIMAL, allowNull: true },
    is_open_for_purchase: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_visible: { type: DataTypes.BOOLEAN, defaultValue: true },
    credit_price: { type: DataTypes.DECIMAL, allowNull: false },
    total_project_value: { type: DataTypes.DECIMAL, allowNull: false },
    total_credits: { type: DataTypes.INTEGER, allowNull: false },
    available_credits: { type: DataTypes.INTEGER, allowNull: false },
    tons_per_credit: { type: DataTypes.DECIMAL, allowNull: true },
    content_block_1: { type: DataTypes.TEXT, allowNull: false },
    content_block_2: { type: DataTypes.TEXT, allowNull: true },
    content_block_3: { type: DataTypes.TEXT, allowNull: true },
    created_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    updated_by: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true },
    is_deleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  }, {
    tableName: 'projects',
    modelName: 'Project',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    defaultScope: {
      where: { is_deleted: false },
    },
  });

  return Project;
};
