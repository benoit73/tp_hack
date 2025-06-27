const { Team, Project, TeamMember, User, Score } = require('../models');

const teamController = {
  getAllTeams: async (req, res) => {
    try {
      const teams = await Team.findAll({
        include: [
          {
            model: Project,
            as: 'project',
            attributes: ['id', 'title', 'description', 'hackathon_id']
          },
          {
            model: TeamMember,
            as: 'members',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'email', 'role']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });

      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTeamByProject: async (req, res) => {
    try {
      const { projectId } = req.params;
      
      const team = await Team.findOne({
        where: { project_id: projectId },
        include: [
          {
            model: Project,
            as: 'project'
          },
          {
            model: TeamMember,
            as: 'members',
            include: [
              {
                model: User,
                as: 'user',
                attributes: ['id', 'first_name', 'last_name', 'email']
              }
            ]
          }
        ]
      });

      if (!team) {
        return res.status(404).json({ error: 'Team not found for this project' });
      }

      res.status(200).json(team);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createTeam: async (req, res) => {
    try {
      const { projectId } = req.params;
      const { team_name } = req.body;

      // Vérifier que le projet existe
      const project = await Project.findByPk(projectId);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      // Vérifier qu'il n'y a pas déjà une équipe pour ce projet
      const existingTeam = await Team.findOne({ where: { project_id: projectId } });
      if (existingTeam) {
        return res.status(400).json({ error: 'Team already exists for this project' });
      }

      const team = await Team.create({
        project_id: projectId,
        team_name
      });

      res.status(201).json({
        message: 'Team created successfully',
        team
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateTeam: async (req, res) => {
    try {
      const { id } = req.params;
      const { team_name } = req.body;

      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      await team.update({ team_name });

      res.status(200).json({
        message: 'Team updated successfully',
        team
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteTeam: async (req, res) => {
    try {
      const { id } = req.params;

      const team = await Team.findByPk(id);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      await team.destroy();
      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = teamController;