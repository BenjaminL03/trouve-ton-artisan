const express = require("express");
const router = express.Router();
const specialiteController = require("../controllers/specialiteController");

// GET /api/specialites - Toutes les spécialités
router.get("/", specialiteController.getAllSpecialites);

// GET /api/specialites/category/:categoryId - Spécialités par catégorie
router.get(
  "/category/:categoryId",
  specialiteController.getSpecialitesByCategory,
);

module.exports = router;
