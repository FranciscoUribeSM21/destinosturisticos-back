const express = require('express');
const { Company } = require('../models');
const router = express.Router();

// ✅ Obtener todas las empresas (Público)
// Filtrado por los campos necesarios para el quiz
router.get('/', async (req, res) => {
  try {
    const companies = await Company.findAll({
      where: { is_active: true, is_deleted: 0 }, // Solo empresas vigentes
      attributes: [
        'id',
        'name', 
        'logo_url', 
        'category', 
        'emission_unit_type', 
        'emission_factor', 
        'description'
      ]
    });
    
    res.json(companies);
  } catch (error) {
    console.error('Error fetching public companies:', error);
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
});

// ✅ Obtener empresas por categoría (Útil para filtrar en cada step del quiz)
router.get('/category/:categoryName', async (req, res) => {
  try {
    const { categoryName } = req.params;
    const companies = await Company.findAll({
      where: { 
        category: categoryName.toUpperCase(), 
        is_active: true,
        is_deleted: 0 
      },
      attributes: [
        'id',
        'name', 
        'logo_url', 
        'category', 
        'emission_unit_type', 
        'emission_factor', 
        'description'
      ]
    });
    
    res.json(companies);
  } catch (error) {
    console.error(`Error fetching companies for category ${categoryName}:`, error);
    res.status(500).json({ error: 'Failed to fetch companies by category' });
  }
});

module.exports = router;