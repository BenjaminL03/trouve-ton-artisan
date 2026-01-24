const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const { sequelize, testConnection } = require("./config/database");

// Initialisation de l'application
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares de sécurité
app.use(helmet()); // Protection des headers HTTP

// Configuration CORS sécurisée
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));

// Parsing des données
app.use(express.json({ limit: "10mb" })); // Limite la taille des requêtes JSON
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Rate limiting - limitation du nombre de requêtes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limite à 100 requêtes par IP
  message: "Trop de requêtes depuis cette IP, veuillez réessayer plus tard.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Appliquer le rate limiting à toutes les routes API
app.use("/api/", limiter);

// Rate limiting spécifique pour le formulaire de contact (plus strict)
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // Maximum 5 emails par heure
  message: "Trop de messages envoyés. Veuillez réessayer dans une heure.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Appliquer uniquement à la route contact
app.use("/api/contact", contactLimiter);

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

// Gestion globale des erreurs
app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err.stack);
  res.status(500).json({
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

// Démarrage du serveur
const startServer = async () => {
  try {
    // Test de la connexion à la base de données
    await testConnection();

    // Démarrage du serveur
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
      console.log(`🔒 Sécurité activée : Helmet + Rate Limiting`);
    });
  } catch (error) {
    console.error("❌ Erreur au démarrage du serveur:", error);
    process.exit(1);
  }
};

startServer();
