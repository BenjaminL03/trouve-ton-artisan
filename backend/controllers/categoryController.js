const { Category, Specialite } = require("../models");

// Récupérer toutes les catégories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.findAll({
      order: [["nom", "ASC"]],
    });
    res.json(categories);
  } catch (error) {
    console.error("Erreur lors de la récupération des catégories:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer une catégorie par ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [
        {
          model: Specialite,
          as: "specialites",
        },
      ],
    });

    if (!category) {
      return res.status(404).json({ message: "Catégorie non trouvée" });
    }

    res.json(category);
  } catch (error) {
    console.error("Erreur lors de la récupération de la catégorie:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
