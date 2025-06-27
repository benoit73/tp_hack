const { TeamMember, Team, User } = require('../models');

const teamMemberController = {
  joinTeam: async (req, res) => {
    try {
      const { teamId } = req.params;
      const { user_id } = req.body;

      // Vérifier que l'équipe existe
      const team = await Team.findByPk(teamId);
      if (!team) {
        return res.status(404).json({ error: 'Team not found' });
      }

      // Vérifier que l'utilisateur existe et est participant
      const user = await User.findByPk(user_id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      if (user.role !== 'participant') {
        return res.status(403).json({ error: 'Only participants can join teams' });
      }

      // Vérifier que l'utilisateur n'est pas déjà dans l'équipe
      const existingMember = await TeamMember.findOne({
        where: { user_id, team_id: teamId }
      });
      if (existingMember) {
        return res.status(400).json({ error: 'User is already a member of this team' });
      }

      const teamMember = await TeamMember.create({
        user_id,
        team_id: teamId,
        joined_at: new Date()
      });

      res.status(201).json({
        message: 'Member joined team successfully',
        teamMember
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getTeamMembers: async (req, res) => {
    try {
      const { teamId } = req.params;
      
      const teamMembers = await TeamMember.findAll({
        where: { team_id: teamId },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'first_name', 'last_name', 'email', 'role']
          }
        ]
      });

      res.status(200).json(teamMembers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  removeMember: async (req, res) => {
    try {
      const { teamId, userId } = req.params;

      const teamMember = await TeamMember.findOne({
        where: { user_id: userId, team_id: teamId }
      });

      if (!teamMember) {
        return res.status(404).json({ error: 'Team member not found' });
      }

      await teamMember.destroy();
      res.status(200).json({ message: 'Member removed from team successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = teamMemberController;