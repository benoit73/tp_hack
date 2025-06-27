const express = require('express');
const router = express.Router();
const hackathonController = require('../controllers/hackathonController');
const projectController = require('../controllers/projectController');
const resultController = require('../controllers/resultController');

// Routes hackathons
router.get('/', hackathonController.getAllHackathons);
router.get('/:id', hackathonController.getHackathonById);
router.post('/', hackathonController.createHackathon);
router.put('/:id', hackathonController.updateHackathon);
router.delete('/:id', hackathonController.deleteHackathon);
router.post('/:id/close', hackathonController.closeHackathon);

// Routes projets liés aux hackathons
router.get('/:id/projects', projectController.getProjectsByHackathon);

// Routes résultats
router.get('/:id/results', resultController.getResults);
router.post('/:id/results/validate', resultController.validateResults);

module.exports = router;