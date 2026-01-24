const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { sequelize, testConnection } = require("./config/database");

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors()); // Autorise les requêtes du frontend
app.use(express.json()); // Parse les requêtes JSON
app.use(express.urlencoded({ extended: true })); // Parse les données de formulaire

// Route de test
app.get("/", (req, res) => {
  res.json({
    message: "🎉 API Trouve ton artisan - Serveur fonctionnel !",
    version: "1.0.0",
  });
});

// Routes API
app.use("/api/categories", require("./routes/categories"));
app.use("/api/specialites", require("./routes/specialites"));
app.use("/api/artisans", require("./routes/artisans"));
app.use("/api/contact", require("./routes/contact"));

// Gestion des erreurs 404
app.use((req, res) => {
  res.status(404).json({ message: "Route non trouvée" });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    // Test de la connexion à la base de données
    await testConnection();

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Erreur au démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
