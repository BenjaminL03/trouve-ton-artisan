const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// POST /api/contact - Envoyer un email de contact
router.post("/", contactController.sendContactEmail);

module.exports = router;
