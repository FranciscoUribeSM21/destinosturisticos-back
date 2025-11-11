const express = require('express');
const { Project } = require('../models');
const { Company }= require('../models');
const { Transaction } = require('../models');
const router = express.Router();

// ✅ Get all projects
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.findAll();
    
    res.json(projects);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// ✅ Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id, {
      include: [
        {
          model: Transaction,
          as: 'transactions',
          required: false,
          include: [{ model: Company, as: 'company',  required: false, }]
        }
      ]
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

module.exports = router;
