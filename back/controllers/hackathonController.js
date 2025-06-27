const { Hackathon, User, Project } = require('../models');

const hackathonController = {
  getAllHackathons: async (req, res) => {
    try {
      const hackathons = await Hackathon.findAll();
      console.log(hackathons);
      res.status(200).json(hackathons);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getHackathonById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const hackathon = await Hackathon.findByPk(id, {
        include: [
          {
            model: User,
            as: 'organizer',
            attributes: ['id', 'first_name', 'last_name', 'email']
          },
          {
            model: Project,
            as: 'projects'
          }
        ]
      });

      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      res.status(200).json(hackathon);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  createHackathon: async (req, res) => {
    try {
      const { name, description, start_date, end_date, created_by } = req.body;

      // Vérifier que l'utilisateur existe et est organisateur
      const user = await User.findByPk(created_by);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.role !== 'organizer') {
        return res.status(403).json({ error: 'Only organizers can create hackathons' });
      }

      const hackathon = await Hackathon.create({
        name,
        description,
        start_date,
        end_date,
        created_by
      });

      res.status(201).json({
        message: 'Hackathon created successfully',
        hackathon
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateHackathon: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, start_date, end_date } = req.body;

      const hackathon = await Hackathon.findByPk(id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      await hackathon.update({
        name,
        description,
        start_date,
        end_date
      });

      res.status(200).json({
        message: 'Hackathon updated successfully',
        hackathon
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteHackathon: async (req, res) => {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findByPk(id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      await hackathon.destroy();
      res.status(200).json({ message: 'Hackathon deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  closeHackathon: async (req, res) => {
    try {
      const { id } = req.params;

      const hackathon = await Hackathon.findByPk(id);
      if (!hackathon) {
        return res.status(404).json({ error: 'Hackathon not found' });
      }

      // Mettre la date de fin à maintenant pour "fermer" le hackathon
      await hackathon.update({
        end_date: new Date()
      });

      res.status(200).json({
        message: 'Hackathon closed successfully',
        hackathon
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = hackathonController;