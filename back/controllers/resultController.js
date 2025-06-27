const { Hackathon, Project, Team, Score, User } = require('../models');
const { Op } = require('sequelize');

const resultController = {
  getResults: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que le hackathon existe
      const hackathon = await Hackathon.findByPk(id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      // Récupérer tous les projets du hackathon avec leurs équipes et scores
      const projects = await Project.findAll({
        where: { hackathon_id: id },
        include: [
          {
            model: Team,
            as: 'team',
            include: [
              {
                model: Score,
                as: 'scores',
                include: [
                  {
                    model: User,
                    as: 'jury',
                    attributes: ['id', 'first_name', 'last_name']
                  }
                ]
              }
            ]
          }
        ]
      });

      // Calculer les moyennes des scores pour chaque équipe
      const results = projects.map(project => {
        if (project.team && project.team.scores.length > 0) {
          const totalScore = project.team.scores.reduce((sum, score) => sum + score.score, 0);
          const averageScore = totalScore / project.team.scores.length;
          
          return {
            project: {
              id: project.id,
              title: project.title,
              description: project.description
            },
            team: {
              id: project.team.id,
              team_name: project.team.team_name
            },
            averageScore: Math.round(averageScore * 100) / 100,
            scores: project.team.scores
          };
        }
        return {
          project: {
            id: project.id,
            title: project.title,
            description: project.description
          },
          team: project.team,
          averageScore: 0,
          scores: []
        };
      });

      // Trier par score moyen décroissant
      results.sort((a, b) => b.averageScore - a.averageScore);

      res.status(200).json({
        hackathon: {
          id: hackathon.id,
          name: hackathon.name
        },
        results
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  validateResults: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que le hackathon existe
      const hackathon = await Hackathon.findByPk(id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      // Vérifier que le hackathon est terminé
      if (new Date() < new Date(hackathon.end_date)) {
        return res.status(400).json({ error: 'Cannot validate results before hackathon ends' });
      }

      // Logique de validation (par exemple, marquer le hackathon comme "terminé")
      // On pourrait ajouter un champ 'status' au modèle Hackathon
      
      res.status(200).json({
        message: 'Results validated successfully',
        hackathon_id: id,
        validated_at: new Date()
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = resultController;