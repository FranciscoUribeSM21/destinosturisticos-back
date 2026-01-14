const express = require('express');
const { EmissionCategory, EmissionSubcategory, EmissionFactor } = require('../models');
const router = express.Router();

// ✅ Obtener toda la estructura (Categorías > Subcategorías > Factores)
// Ideal para cargar el mantenedor de una sola vez
router.get('/structure', async (req, res) => {
  try {
    const structure = await EmissionCategory.findAll({
      include: [{
        model: EmissionSubcategory,
        as: 'subcategories',
        include: [{
          model: EmissionFactor,
          as: 'factors'
        }]
      }]
    });
    res.json(structure);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch emission structure' });
  }
});

// ✅ Actualizar un factor específico
router.put('/factors/:id', async (req, res) => {
  try {
    const factor = await EmissionFactor.findByPk(req.params.id);
    if (!factor) return res.status(404).json({ error: 'Factor not found' });
    
    await factor.update(req.body);
    res.json(factor);
  } catch (error) {
    res.status(400).json({ error: 'Failed to update factor' });
  }
});

module.exports = router;