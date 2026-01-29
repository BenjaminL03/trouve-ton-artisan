# Trouve ton artisan

Plateforme web permettant de mettre en relation des particuliers avec des artisans qualifiés de la région Auvergne-Rhône-Alpes.

# Description

Application full-stack développée pour la région Auvergne-Rhône-Alpes permettant aux utilisateurs de :

- Rechercher des artisans par catégorie (Bâtiment, Alimentation, Fabrication, Services)
- Consulter les profils détaillés des artisans
- Contacter directement les artisans via un formulaire
- Découvrir les "artisans du mois" mis en avant

# Technologies utilisées

# Frontend

- **React.js** - Framework JavaScript
- **Bootstrap 5** - Framework CSS
- **Sass** - Préprocesseur CSS
- **React Router** - Navigation
- **Axios** - Requêtes HTTP

# Backend

- **Node.js** - Environnement d'exécution JavaScript
- **Express.js** - Framework web
- **Sequelize** - ORM pour MySQL
- **MySQL** - Base de données relationnelle
- **Nodemailer** - Envoi d'emails
- **Helmet.js** - Sécurité HTTP
- **Express Rate Limit** - Limitation de requêtes
- **CORS** - Gestion des origines croisées

# Base de données

- **MySQL 8** hébergée sur **Aiven Cloud**

# Outils de développement

- **Git & GitHub** - Versionning
- **Figma** - Maquettage
- **VS Code** - Éditeur de code

# Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (v18 ou supérieur) : [https://nodejs.org](https://nodejs.org)
- **npm** (inclus avec Node.js)
- **Git** : [https://git-scm.com](https://git-scm.com)

# Installation

# 1. Cloner le repository

```bash
git clone https://github.com/BenjaminL03/trouve-ton-artisan.git
cd trouve-ton-artisan
```

# 2. Installer les dépendances du backend

```bash
cd backend
npm install
```

# 3. Installer les dépendances du frontend

```bash
cd ../frontend
npm install
```

# Configuration

# Backend

Créez un fichier `.env` dans le dossier `backend/` avec les variables suivantes :

```env
# Serveur
PORT=5000
NODE_ENV=development

# Base de données (MySQL Cloud - Aiven)
DB_HOST=votre-host.aivencloud.com
DB_PORT=15939
DB_NAME=trouve_ton_artisan
DB_USER=avnadmin
DB_PASSWORD=votre-mot-de-passe

# SSL
DB_SSL=true

# CORS
FRONTEND_URL=http://localhost:3000
```

# Base de données

Les scripts SQL sont fournis dans `backend/database/` :

```bash
# Créer les tables
mysql -h votre-host -P 15939 -u avnadmin -p --ssl-mode=REQUIRED trouve_ton_artisan < backend/database/create_db.sql

# Insérer les données de test
mysql -h votre-host -P 15939 -u avnadmin -p --ssl-mode=REQUIRED trouve_ton_artisan < backend/database/seed_db.sql
```

# Lancement de l'application

# Démarrer le backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur **http://localhost:5000**

# Démarrer le frontend

Dans un nouveau terminal :

```bash
cd frontend
npm start
```

L'application s'ouvre sur **http://localhost:3000**

# Structure du projet

```
trouve-ton-artisan/
├── backend/
│   ├── config/
│   │   └── database.js          # Configuration Sequelize
│   ├── controllers/             # Logique métier
│   ├── database/
│   │   ├── create_db.sql        # Script de création des tables
│   │   └── seed_db.sql          # Script d'insertion des données
│   ├── models/                  # Modèles Sequelize
│   ├── routes/                  # Routes API
│   ├── .env                     # Variables d'environnement
│   ├── server.js                # Point d'entrée du serveur
│   └── package.json
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/              # Images et ressources
│   │   ├── components/          # Composants React réutilisables
│   │   ├── pages/               # Pages de l'application
│   │   ├── services/            # Services API
│   │   ├── App.js               # Composant principal
│   │   └── index.js             # Point d'entrée React
│   └── package.json
│
├── fichiers-a-joindre-au-devoir/
│   ├── maquettes-figma/         # Captures d'écran des maquettes
│   ├── data.xlsx                # Données de test
│   └── diagrammeMCD:MLD.pdf     # Schéma de la base de données
│
└── README.md
```

# Fonctionnalités

# Pages

1. **Page d'accueil** - Présentation et artisans du mois
2. **Liste des artisans par catégorie** - Filtrage par catégorie
3. **Fiche artisan** - Détails complets et formulaire de contact
4. **Page 404** - Gestion des erreurs de navigation
5. **Pages légales** - Mentions légales, RGPD, Accessibilité, Cookies

# Fonctionnalités principales

- ✅ Recherche d'artisans par nom, ville ou spécialité
- ✅ Filtrage par catégorie (Bâtiment, Alimentation, Fabrication, Services)
- ✅ Affichage des "artisans du mois" (top 3 par note)
- ✅ Formulaire de contact avec envoi d'email
- ✅ Design responsive (Mobile, Tablette, Desktop)
- ✅ Navigation intuitive avec breadcrumbs
- ✅ Sécurité renforcée (Helmet, Rate Limiting, CORS)

# API Endpoints

# Catégories

```
GET /api/categories          # Récupérer toutes les catégories
GET /api/categories/:id      # Récupérer une catégorie par ID
```

# Spécialités

```
GET /api/specialites                    # Récupérer toutes les spécialités
GET /api/specialites/categorie/:id      # Spécialités par catégorie
```

# Artisans

```
GET /api/artisans                       # Récupérer tous les artisans
GET /api/artisans/top                   # Top 3 artisans
GET /api/artisans/:id                   # Artisan par ID
GET /api/artisans/categorie/:id         # Artisans par catégorie
GET /api/artisans/search?q=terme        # Recherche d'artisans
```

# Contact

```
POST /api/contact            # Envoyer un email à un artisan
```

# Sécurité

- **Helmet.js** - Protection des headers HTTP
- **CORS** - Configuration sécurisée des origines
- **Rate Limiting** - Limitation à 100 requêtes/15min par IP
- **Rate Limiting Contact** - Limitation à 5 emails/heure
- **Validation des entrées** - Validation côté serveur
- **SSL/TLS** - Connexion sécurisée à la base de données

# Maquettes Figma

Les maquettes complètes sont disponibles dans le dossier `fichiers-a-joindre-au-devoir/maquettes-figma/`

# Auteur

**Benjamin LEOCADIE**

- GitHub: [@BenjaminL03](https://github.com/BenjaminL03)
- Projet: Développeur Web - Centre Européen de Formation

# Licence

Ce projet a été réalisé dans le cadre d'un devoir de formation au titre professionnel "Développeur Web".
