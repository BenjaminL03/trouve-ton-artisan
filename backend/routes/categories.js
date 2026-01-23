const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// GET /api/categories - Toutes les catégories
router.get("/", categoryController.getAllCategories);

// GET /api/categories/:id - Une catégorie par ID
router.get("/:id", categoryController.getCategoryById);

module.exports = router;
