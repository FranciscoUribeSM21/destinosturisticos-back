const express = require('express');
const cors = require('cors');

const companyRoutes = require('./src/routes/company');
const projectRoutes = require('./src/routes/project');
const transactionRoutes = require('./src/routes/transaction');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/companies', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/transactions', transactionRoutes);

app.get('/', (req, res) => {
  res.send('<h1>API corriendo 🚀</h1>');
});

module.exports = app;
