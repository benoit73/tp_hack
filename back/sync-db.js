require('dotenv').config();
const db = require('./models');

async function syncDatabase() {
  try {
    // Test de connexion
    await db.sequelize.authenticate();
    console.log('✅ Connexion à la base de données établie avec succès.');

    // Synchronisation des modèles (création des tables)
    await db.sequelize.sync({ force: false }); // force: true pour recréer les tables
    console.log('✅ Base de données synchronisée avec succès.');
    
    // Afficher les modèles chargés
    console.log('📋 Modèles chargés:', Object.keys(db).filter(key => !['sequelize', 'Sequelize'].includes(key)));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erreur lors de la synchronisation:', error);
    process.exit(1);
  }
}

syncDatabase();