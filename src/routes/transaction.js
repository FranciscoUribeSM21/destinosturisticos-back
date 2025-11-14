// routes/transaction.js
const express = require('express');
const router = express.Router();

const { Transaction } = require('../models');
const { User } = require("../models");
const { Project } = require('../models');

// ✅ Get all transactions (with relations)
router.get('/', async (_req, res) => {
  try {
    const transactions = await Transaction.findAll({
      include: [
        { model: User, as: 'creator' },
        { model: User, as: 'updater' },
        { model: Project, as: 'project' }, 
      ],
    });

    // Transformar las transacciones calculando el amount
    const formatted = transactions.map(t => {
      const data = t.toJSON();

      const creditPrice = Number(data.project?.credit_price || 0);
      const creditsCount = Number(data.credits_count || 0);

      return {
        ...data,
        amount: creditPrice * creditsCount,     // 👈 cálculo aquí
      };
    });

    res.json(formatted);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch transactions' });
  }
});

// ✅ Get transaction by ID
// ✅ Get transaction by ID
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id, {
      include: [
        { model: User, as: 'creator' },
        { model: User, as: 'updater' },
        { model: Project, as: 'project' },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    const data = transaction.toJSON();

    const creditPrice = Number(data.project?.credit_price || 0);
    const creditsCount = Number(data.credits_count || 0);

    const formattedTransaction = {
      ...data,
      amount: creditPrice * creditsCount,  // 👈 cálculo aquí
    };

    res.json(formattedTransaction);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to fetch transaction' });
  }
});

// ✅ Create transaction with validation
router.post('/', async (req, res) => {
  try {
    const { project_id, credits_count } = req.body;

    // --- 1. Validar que exista el proyecto ---
    const project = await Project.findByPk(project_id);
    if (!project) {
      return res.status(400).json({ error: 'El proyecto no existe' });
    }

    const totalCredits = Number(project.total_credits);

    // --- 2. Obtener la suma de créditos ya usados ---
    const usedCredits = await Transaction.sum('credits_count', {
      where: { project_id }
    }) || 0;

    const availableCredits = totalCredits - usedCredits;

    // --- 3. Validar disponibilidad ---
    if (credits_count > availableCredits) {
      return res.status(400).json({
        error: 'No hay créditos suficientes disponibles',
        available_credits: availableCredits,
        requested: credits_count
      });
    }

    // --- 4. Crear la transacción ---
    const transaction = await Transaction.create(req.body);

    res.status(201).json({
      ...transaction.toJSON(),
      available_credits_after_purchase: availableCredits - credits_count
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Failed to create transaction' });
  }
});


// ✅ Update transaction
router.put('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.update(req.body);
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update transaction' });
  }
});

// ✅ Delete transaction
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }
    await transaction.destroy();
    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete transaction' });
  }
});

module.exports = router;
