const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware pour parser le JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:4200', // URL de votre frontend Angular
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
// Import des routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const hackathonRoutes = require('./routes/hackathons');
const projectRoutes = require('./routes/projects');
const teamRoutes = require('./routes/teams');
const scoreRoutes = require('./routes/scores');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Utilisation des routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/hackathons', hackathonRoutes);
app.use('/projects', projectRoutes);
app.use('/teams', teamRoutes);
app.use('/scores', scoreRoutes);

// Route de base
app.get('/', (req, res) => {
  res.send('HackaPlan API - Gestion de Hackathons');
});

app.listen(port, () => {
  console.log(`HackaPlan API listening on port ${port}`);
});
