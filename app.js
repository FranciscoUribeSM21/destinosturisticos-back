const express = require('express');
const cors = require('cors');

const companyRoutes = require('./src/routes/company');
const projectPrivateRoutes = require('./src/routes/project.private');
const projectPublicRoutes = require('./src/routes/project.public');
const transactionRoutes = require('./src/routes/transaction');
const authRoutes = require("./src/routes/auth");
const authMiddleware = require("./src/middlewares/auth");
const emissionFactorsRouter = require('./src/routes/emissionFactors');

const app = express();
app.use(cors());
app.use(express.json());


// Routes

// Rutas públicas

app.use("/api/auth", authRoutes);
app.use('/api/public/projects', projectPublicRoutes);
// Rutas protegidas
app.use('/api/companies', authMiddleware, companyRoutes);
app.use('/api/projects', authMiddleware, projectPrivateRoutes);
app.use('/api/transactions', authMiddleware, transactionRoutes);
app.use('/api/emission-factors', authMiddleware, emissionFactorsRouter);
app.get('/', (req, res) => {
  res.send('<h1>API corriendo 🚀</h1>');
});

module.exports = app;
