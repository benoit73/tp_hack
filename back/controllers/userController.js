const { User, TeamMember, Team, Project } = require('../models');
const bcrypt = require('bcrypt');

const userController = {
  getUserTeams: async (req, res) => {
    try {
      const { id } = req.params;

      // Vérifier que l'utilisateur existe
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Récupérer les équipes de l'utilisateur avec les jointures
      const userTeams = await TeamMember.findAll({
        where: { user_id: id },
        include: [
          {
            model: Team,
            as: 'team',
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
            ]
          }
        ]
      });

      // Transformer les données pour ne retourner que les équipes avec la date de participation
      const teams = userTeams.map(membership => ({
        id: membership.team.id,
        team_name: membership.team.team_name,
        project_id: membership.team.project_id,
        created_at: membership.team.created_at,
        updated_at: membership.team.updated_at,
        joined_at: membership.joined_at,
        project: membership.team.project,
        members: membership.team.members
      }));

      res.status(200).json(teams);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  createUser: async (req, res) => {
    try {
      const { email, password, first_name, last_name, role } = req.body;

      // Vérifier si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Hasher le mot de passe
      const password_hash = await bcrypt.hash(password, 10);

      // Créer l'utilisateur
      const user = await User.create({
        email,
        password_hash,
        first_name,
        last_name,
        role: role || 'participant'
      });

      // Retourner l'utilisateur sans le mot de passe
      const { password_hash: _, ...userWithoutPassword } = user.toJSON();
      res.status(201).json({
        message: 'User created successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password_hash'] },
        include: [
          {
            model: TeamMember,
            as: 'teamMemberships',
            include: [
              {
                model: Team,
                as: 'team'
              }
            ]
          }
        ]
      });

      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      
      const user = await User.findByPk(id, {
        attributes: { exclude: ['password_hash'] },
        include: [
          {
            model: TeamMember,
            as: 'teamMemberships',
            include: [
              {
                model: Team,
                as: 'team'
              }
            ]
          }
        ]
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { first_name, last_name, role } = req.body;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.update({
        first_name,
        last_name,
        role
      });

      const { password_hash: _, ...userWithoutPassword } = user.toJSON();
      res.status(200).json({
        message: 'User updated successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      await user.destroy();
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = userController;