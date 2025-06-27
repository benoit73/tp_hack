const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const teamMemberController = require('../controllers/teamMemberController');
const scoreController = require('../controllers/scoreController');

// Routes équipes
router.get('/', teamController.getAllTeams);
router.put('/:id', teamController.updateTeam);
router.delete('/:id', teamController.deleteTeam);

// Routes membres d'équipe
router.post('/:teamId/join', teamMemberController.joinTeam);
router.get('/:teamId/members', teamMemberController.getTeamMembers);
router.delete('/:teamId/members/:userId', teamMemberController.removeMember);

// Routes scores liés aux équipes
router.get('/:id/scores', scoreController.getScoresByTeam);

module.exports = router;