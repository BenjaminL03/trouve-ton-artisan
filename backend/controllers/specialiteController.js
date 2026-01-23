const { Specialite, Category, Artisan } = require("../models");

// Récupérer toutes les spécialités
exports.getAllSpecialites = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      include: [
        {
          model: Category,
          as: "categorie",
          attributes: ["id", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });
    res.json(specialites);
  } catch (error) {
    console.error("Erreur lors de la récupération des spécialités:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les spécialités par catégorie
exports.getSpecialitesByCategory = async (req, res) => {
  try {
    const specialites = await Specialite.findAll({
      where: { categorie_id: req.params.categoryId },
      include: [
        {
          model: Category,
          as: "categorie",
          attributes: ["id", "nom"],
        },
      ],
      order: [["nom", "ASC"]],
    });
    res.json(specialites);
  } catch (error) {
    console.error("Erreur lors de la récupération des spécialités:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
