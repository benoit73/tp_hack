const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const teamController = require('../controllers/teamController');

// Routes projets
router.get('/:id', projectController.getProjectById);
router.post('/', projectController.createProject);
router.put('/:id', projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

// Routes équipes liées aux projets
router.get('/:projectId/team', teamController.getTeamByProject);
router.post('/:projectId/team', teamController.createTeam);

module.exports = router;