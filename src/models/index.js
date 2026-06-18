const { sequelize, DataTypes } = require('../../db');

// Importa los modelos
const User = require('./user')(sequelize);
const Project = require('./project')(sequelize);
const Company = require('./company')(sequelize);
const Transaction = require('./transaction')(sequelize);
const Payment = require('./payment')(sequelize);
const PaymentItem = require('./paymentItem')(sequelize);
const ExchangeRate = require('./exchangeRate')(sequelize);

const EmissionCategory = require('./emissionCategory')(sequelize);
const EmissionSubcategory = require('./emissionSubcategory')(sequelize);
const EmissionFactor = require('./emissionFactor')(sequelize);

// 🔹 Asociaciones

// Project ↔ Transaction (1:N)
Project.hasMany(Transaction, { foreignKey: 'project_id', as: 'transactions' });
Transaction.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// Company ↔ Transaction (1:N)
Company.hasMany(Transaction, { foreignKey: 'company_id', as: 'transactions' });
Transaction.belongsTo(Company, { foreignKey: 'company_id', as: 'company' });

// Transaction ↔ User (creator / updater)
User.hasMany(Transaction, { foreignKey: 'created_by', as: 'createdTransactions' });
User.hasMany(Transaction, { foreignKey: 'updated_by', as: 'updatedTransactions' });
Transaction.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });
Transaction.belongsTo(User, { foreignKey: 'updated_by', as: 'updater' });

// Payment ↔ PaymentItem (1:N)
Payment.hasMany(PaymentItem, { foreignKey: 'payment_id', as: 'items' });
PaymentItem.belongsTo(Payment, { foreignKey: 'payment_id', as: 'payment' });

// Project ↔ PaymentItem (1:N)
Project.hasMany(PaymentItem, { foreignKey: 'project_id', as: 'payment_items' });
PaymentItem.belongsTo(Project, { foreignKey: 'project_id', as: 'project' });

// User ↔ User (creator / updater) para Project y Company si quieres
User.hasMany(Project, { foreignKey: 'created_by', as: 'createdProjects' });
User.hasMany(Project, { foreignKey: 'updated_by', as: 'updatedProjects' });
User.hasMany(Company, { foreignKey: 'created_by', as: 'createdCompanies' });
User.hasMany(Company, { foreignKey: 'updated_by', as: 'updatedCompanies' });

// Una Categoría tiene muchas Subcategorías (Ej: Transporte -> Bus, Auto)
EmissionCategory.hasMany(EmissionSubcategory, { foreignKey: 'category_id', as: 'subcategories' });
EmissionSubcategory.belongsTo(EmissionCategory, { foreignKey: 'category_id', as: 'category' });

// Una Subcategoría tiene muchos Factores (Ej: Bus -> CO2, CH4, N2O)
EmissionSubcategory.hasMany(EmissionFactor, { foreignKey: 'subcategory_id', as: 'factors' });
EmissionFactor.belongsTo(EmissionSubcategory, { foreignKey: 'subcategory_id', as: 'subcategory' });

// Exporta todo
module.exports = {
  sequelize,
  User,
  Project,
  Company,
  Transaction,
  Payment,
  PaymentItem,
  ExchangeRate,
  EmissionCategory,
  EmissionSubcategory,
  EmissionFactor
};
