# Des screens de l'applications sont dispo dans le dossier "screens du projet"

# HackaPlan - Plateforme de Gestion de Hackathons

HackaPlan est une plateforme complète pour organiser et gérer des hackathons, permettant aux organisateurs de créer des événements, aux participants de soumettre des projets et de former des équipes, et aux jurys d'évaluer les projets.

## 🚀 Fonctionnalités

- **Gestion des Hackathons** : Création, modification et suivi des hackathons
- **Soumission de Projets** : Interface pour soumettre et gérer les projets
- **Formation d'Équipes** : Système de création et de gestion des équipes
- **Évaluation par Jury** : Interface d'évaluation avec système de notation par étoiles
- **Tableau de Bord** : Vue d'ensemble des statistiques et activités
- **Gestion des Utilisateurs** : Système d'authentification avec rôles (organisateur, participant, jury)

## 🏗️ Architecture

Le projet est divisé en deux parties :
- **Frontend** : Application Angular (dossier `/front`)
- **Backend** : API Node.js/Express (dossier `/back`)

## ⚙️ Configuration

### Backend (API)

#### Variables d'environnement
Modifiez le fichier `.env` dans le dossier `/back`.


#### Installation et démarrage
```bash
# Aller dans le dossier backend
cd back

# Installer les dépendances
npm install

# Créer la base de données (PostgreSQL requis)
# Assurez-vous que PostgreSQL est installé et démarré
createdb hackathon_db

# Démarrer le serveur de développement
npm run dev

# Ou démarrer en mode production
npm start
```

Le backend sera accessible sur `http://localhost:3000`

### Frontend (Interface)

#### Variables d'environnement
Modifiez le fichier dans `/front/src/environments/`.

#### Installation et démarrage
```bash
# Aller dans le dossier frontend
cd front

# Installer les dépendances
npm install

# Démarrer le serveur de développement
ng serve

# Ou avec npm
npm start
```

Le frontend sera accessible sur `http://localhost:4200`

## 🛠️ Prérequis

- **Node.js** (version 16 ou supérieure)
- **Angular CLI** (version 15 ou supérieure)
- **PostgreSQL** (version 12 ou supérieure)
- **npm** ou **yarn**


## 📦 Démarrage rapide

1. **Cloner le repository**
   ```bash
   git clone <repository-url>
   cd tp_hack
   ```

2. **Configurer la base de données**
   ```bash
   # Créer la base de données
   createdb hackathon_db
   ```

3. **Démarrer le backend**
   ```bash
   cd back
   cp .env.example .env  # Modifier avec vos valeurs
   npm install
   npm run dev
   ```

4. **Démarrer le frontend** (dans un nouveau terminal)
   ```bash
   cd front
   npm install
   ng serve
   ```

5. **Accéder à l'application**
   - Frontend : http://localhost:4200
   - API : http://localhost:3000
   - Documentation API : http://localhost:3000/api-docs 

## 👥 Rôles utilisateurs

- **Organisateur** : Peut créer et gérer les hackathons
- **Participant** : Peut soumettre des projets et rejoindre des équipes
- **Jury** : Peut évaluer les projets soumis

## 🗄️ Base de données

Le projet utilise PostgreSQL avec Sequelize comme ORM. Les modèles incluent :
- Users (Utilisateurs)
- Hackathons
- Projects (Projets)
- Teams (Équipes)
- TeamMembers (Membres d'équipe)
- Evaluations (Évaluations)
- Scores
