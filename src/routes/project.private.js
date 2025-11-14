const express = require('express');
const multer = require('multer');
const { Project, Transaction } = require('../models');
const { uploadImageToGCP } = require('../utils/gcpUpload');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// ✅ Get all projects
router.get('/', async (_req, res) => {
  try {
    const projects = await Project.findAll();
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// ✅ Get project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// ✅ Get available credits for a project
router.get('/:id/available-credits', async (req, res) => {
  try {
    const projectId = req.params.id;

    const project = await Project.findByPk(projectId);

    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }

    // Total disponibles en el proyecto
    const totalCredits = Number(project.total_credits);

    // Créditos ya usados
    const usedCredits = await Transaction.sum('credits_count', {
      where: { project_id: projectId }
    }) || 0;

    const availableCredits = totalCredits - usedCredits;

    res.json({
      project_id: Number(projectId),
      total_credits: totalCredits,
      used_credits: usedCredits,
      available_credits: availableCredits
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch available credits' });
  }
});


// ✅ Create project (con imágenes)
router.post(
  '/',
  upload.fields([
    { name: 'carousel_image_1_file', maxCount: 1 },
    { name: 'carousel_image_2_file', maxCount: 1 },
    { name: 'carousel_image_3_file', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = req.user?.id;
      const projectData = {
        ...req.body,
        created_by: userId,
        updated_by: userId,
      };

      // Subir imágenes si vienen
      if (req.files['carousel_image_1_file']) {
        projectData.carousel_image_1 = await uploadImageToGCP(req.files['carousel_image_1_file'][0]);
      }
      if (req.files['carousel_image_2_file']) {
        projectData.carousel_image_2 = await uploadImageToGCP(req.files['carousel_image_2_file'][0]);
      }
      if (req.files['carousel_image_3_file']) {
        projectData.carousel_image_3 = await uploadImageToGCP(req.files['carousel_image_3_file'][0]);
      }

      const project = await Project.create(projectData);
      res.status(201).json(project);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to create project' });
    }
  }
);

// ✅ Update project (con imágenes)
router.put(
  '/:id',
  upload.fields([
    { name: 'carousel_image_1_file', maxCount: 1 },
    { name: 'carousel_image_2_file', maxCount: 1 },
    { name: 'carousel_image_3_file', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const project = await Project.findByPk(req.params.id);
      if (!project) return res.status(404).json({ error: 'Project not found' });

      const projectData = { ...req.body };

      if (req.files['carousel_image_1_file']) {
        projectData.carousel_image_1 = await uploadImageToGCP(req.files['carousel_image_1_file'][0]);
      }
      if (req.files['carousel_image_2_file']) {
        projectData.carousel_image_2 = await uploadImageToGCP(req.files['carousel_image_2_file'][0]);
      }
      if (req.files['carousel_image_3_file']) {
        projectData.carousel_image_3 = await uploadImageToGCP(req.files['carousel_image_3_file'][0]);
      }

      await project.update(projectData);
      res.json(project);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: 'Failed to update project' });
    }
  }
);

// ✅ Delete project
router.delete('/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });
    await project.destroy();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
