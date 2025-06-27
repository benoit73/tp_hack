const { Score, User, Team } = require('../models');

const scoreController = {
  createScore: async (req, res) => {
    try {
      const { jury_id, team_id, score, comment } = req.body;

      // Vérifier que le jury existe et a le bon rôle
      const jury = await User.findByPk(jury_id);
      if (!jury) {
        return res.status(404).json({ error: 'Jury not found' });
      }
      if (jury.role !== 'jury') {
        return res.status(403).json({ error: 'Only jury members can give scores' });
      }

      // Vérifier que l'équipe existe
      const team = await Team.findByPk(team_id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      // Vérifier qu'il n'y a pas déjà une note de ce jury pour cette équipe
      const existingScore = await Score.findOne({
        where: { jury_id, team_id }
      });
      if (existingScore) {
        return res.status(400).json({ error: 'Score already exists for this jury and team' });
      }

      const newScore = await Score.create({
        jury_id,
        team_id,
        score,
        comment
      });

      res.status(201).json({
        message: 'Score created successfully',
        score: newScore
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateScore: async (req, res) => {
    try {
      const { id } = req.params;
      const { score, comment } = req.body;

      const existingScore = await Score.findByPk(id);
      if (!existingScore) {
        return res.status(404).json({ error: 'Score not found' });
      }

      await existingScore.update({
        score,
        comment
      });

      res.status(200).json({
        message: 'Score updated successfully',
        score: existingScore
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllScores: async (req, res) => {
    try {
      const scores = await Score.findAll({
        include: [
          {
            model: User,
            as: 'jury',
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Team,
            as: 'team'
          }
        ]
      });

      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getScoresByTeam: async (req, res) => {
    try {
      const { id } = req.params;
      
      const scores = await Score.findAll({
        where: { team_id: id },
        include: [
          {
            model: User,
            as: 'jury',
            attributes: ['id', 'first_name', 'last_name', 'email']
          }
        ]
      });

      res.status(200).json(scores);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = scoreController;