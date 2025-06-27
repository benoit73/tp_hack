const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Routes utilisateurs
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

// Nouvelle route pour récupérer les équipes d'un utilisateur
router.get('/:id/teams', userController.getUserTeams);

module.exports = router;