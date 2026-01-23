// Configuration de la connexion à la base de données
const { Sequelize } = require("sequelize");
require("dotenv").config();

// Création de l'instance Sequelize
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false, // Désactive les logs SQL (mettre console.log pour débugger)
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true, // Active created_at et updated_at
      underscored: true, // Utilise snake_case (created_at au lieu de createdAt)
    },
  },
);

// Test de la connexion
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connexion à la base de données réussie !");
  } catch (error) {
    console.error("❌ Erreur de connexion à la base de données:", error);
  }
};

module.exports = { sequelize, testConnection };
