const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/scoreController');

// Routes scores
router.post('/', scoreController.createScore);
router.put('/:id', scoreController.updateScore);
router.get('/', scoreController.getAllScores);

module.exports = router;