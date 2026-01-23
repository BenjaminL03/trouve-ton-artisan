const express = require("express");
const router = express.Router();
const artisanController = require("../controllers/artisanController");

// GET /api/artisans/top - Les 3 artisans du mois (AVANT /:id)
router.get("/top", artisanController.getTopArtisans);

// GET /api/artisans/search?q= - Recherche par nom
router.get("/search", artisanController.searchArtisans);

// GET /api/artisans/category/:categoryId - Artisans par catégorie
router.get("/category/:categoryId", artisanController.getArtisansByCategory);

// GET /api/artisans - Tous les artisans
router.get("/", artisanController.getAllArtisans);

// GET /api/artisans/:id - Un artisan par ID
router.get("/:id", artisanController.getArtisanById);

module.exports = router;
