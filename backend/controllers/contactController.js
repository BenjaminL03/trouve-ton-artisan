const nodemailer = require("nodemailer");

// Configuration du transporteur email
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: process.env.EMAIL_PORT || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Envoyer un email de contact
exports.sendContactEmail = async (req, res) => {
  try {
    const { nom, email, objet, message, artisanEmail } = req.body;

    // Validation des données
    if (!nom || !email || !objet || !message || !artisanEmail) {
      return res.status(400).json({
        message: "Tous les champs sont requis",
      });
    }

    // Validation format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) || !emailRegex.test(artisanEmail)) {
      return res.status(400).json({
        message: "Format d'email invalide",
      });
    }

    // MODE SIMULATION pour le développement
    // On simule l'envoi sans vraiment envoyer l'email
    console.log("📧 Simulation d'envoi d'email :");
    console.log("De:", email);
    console.log("À:", artisanEmail);
    console.log("Objet:", objet);
    console.log("Message:", message);

    // Réponse de succès
    res.status(200).json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    res.status(500).json({
      success: false,
      message:
        "Erreur lors de l'envoi du message. Veuillez réessayer plus tard.",
    });
  }
};
