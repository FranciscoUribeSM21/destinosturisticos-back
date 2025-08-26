// models/Product.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../db'); // 👈 ajusta la ruta según tu proyecto


const Product = sequelize.define('Product',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "products",
    modelName: "Product",
    timestamps: true,
  }
);

module.exports = Product;

