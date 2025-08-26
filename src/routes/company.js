const express = require('express');
const Company = require('../models/company');

const router = express.Router();

// ✅ Get all companies
router.get('/', async (_req, res) => {
  try {
    const companies = await Company.findAll();
    console.log("eaaaaaa")
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
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
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
    await company.destroy();
    res.json({ message: 'Company deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
});

module.exports = router;
