const express = require('express');
const cors = require('cors');

const companyRoutes = require('./src/routes/company');
const projectRoutes = require('./src/routes/project');
const transactionRoutes = require('./src/routes/transaction');
const authRoutes = require("./src/routes/auth");
const authMiddleware = require("./src/middlewares/auth");

const app = express();
app.use(cors());
app.use(express.json());


// Routes

// Rutas públicas

app.use("/api/auth", authRoutes);
app.use('/api/companies', authMiddleware, companyRoutes);
app.use('/api/projects', authMiddleware, projectRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);

app.get('/', (req, res) => {
  res.send('<h1>API corriendo 🚀</h1>');
});

module.exports = app;
