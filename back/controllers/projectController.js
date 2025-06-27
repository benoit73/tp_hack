const { Project, Hackathon, User, Team } = require('../models');

const projectController = {
  getProjectsByHackathon: async (req, res) => {
    try {
      const { id } = req.params;
      
      const projects = await Project.findAll({
        where: { hackathon_id: id },
        include: [
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Team,
            as: 'team'
          }
        ]
      });

      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const project = await Project.findByPk(id, {
        include: [
          {
            model: Hackathon,
            as: 'hackathon'
          },
          {
            model: User,
            as: 'creator',
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Team,
            as: 'team'
          }
        ]
      });

      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createProject: async (req, res) => {
    try {
      const { title, description, hackathon_id, created_by } = req.body;

      // Vérifier que le hackathon existe
      const hackathon = await Hackathon.findByPk(hackathon_id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      // Vérifier que l'utilisateur existe
      const user = await User.findByPk(created_by);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const project = await Project.create({
        title,
        description,
        hackathon_id,
        created_by
      });

      res.status(201).json({
        message: 'Project created successfully',
        project
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateProject: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await project.update({
        title,
        description
      });

      res.status(200).json({
        message: 'Project updated successfully',
        project
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { id } = req.params;

      const project = await Project.findByPk(id);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }

      await project.destroy();
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = projectController;