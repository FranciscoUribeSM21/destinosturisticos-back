const express = require('express');
const { Company }= require('../models');

const router = express.Router();

// ✅ Get all companies
router.get('/', async (_req, res) => {
  try {
    const companies = await Company.findAll();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// ✅ Get company by ID
router.get('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch company' });
  }
});

// ✅ Create company
router.post('/', async (req, res) => {
  try {
     const userId = req.user?.id; 
     const companyData = {
       ...req.body,
       created_by: userId,
       updated_by: userId,
     };
    const company = await Company.create(companyData);
    res.status(201).json(company);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: 'Failed to create company' });
  }
});

// ✅ Update company
router.put('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }
    await company.update(req.body);
    res.json(company);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update company' });
  }
});

// ✅ Delete company
router.delete('/:id', async (req, res) => {
  try {
    const company = await Company.findByPk(req.params.id);

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    // Soft delete: marcar como eliminado en vez de borrar
    company.is_deleted = true;
    await company.save();

    res.json({ message: 'Company marked as deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to mark company as deleted' });
  }
});


module.exports = router;
