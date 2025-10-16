const { sequelize, DataTypes } = require('../../db');

// Importa los modelos
const User = require('./user')(sequelize);
const Project = require('./project')(sequelize);
const Company = require('./company')(sequelize);
const Transaction = require('./transaction')(sequelize);

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

// User ↔ User (creator / updater) para Project y Company si quieres
User.hasMany(Project, { foreignKey: 'created_by', as: 'createdProjects' });
User.hasMany(Project, { foreignKey: 'updated_by', as: 'updatedProjects' });
User.hasMany(Company, { foreignKey: 'created_by', as: 'createdCompanies' });
User.hasMany(Company, { foreignKey: 'updated_by', as: 'updatedCompanies' });

// Exporta todo
module.exports = {
  sequelize,
  User,
  Project,
  Company,
  Transaction,
};
