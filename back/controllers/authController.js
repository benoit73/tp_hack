const { User } = require('../models');
const bcrypt = require('bcrypt');

const authController = {
  register: async (req, res) => {
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
        message: 'User registered successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Trouver l'utilisateur
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Retourner l'utilisateur sans le mot de passe
      const { password_hash: _, ...userWithoutPassword } = user.toJSON();
      res.status(200).json({ 
        message: 'User logged in successfully',
        user: userWithoutPassword
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getProfile: async (req, res) => {
    try {
      // Pour l'instant, on récupère par ID depuis les params
      // Plus tard, on utilisera le JWT pour récupérer l'ID
      const { userId } = req.params;
      
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password_hash'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = authController;