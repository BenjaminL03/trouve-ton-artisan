const { Artisan, Specialite, Category } = require("../models");
const { Op } = require("sequelize");

// Récupérer tous les artisans
exports.getAllArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          include: [
            {
              model: Category,
              as: "categorie",
              attributes: ["id", "nom"],
            },
          ],
        },
      ],
      order: [["nom", "ASC"]],
    });
    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors de la récupération des artisans:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les 3 artisans du mois (top = true)
exports.getTopArtisans = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      where: { top: true },
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          include: [
            {
              model: Category,
              as: "categorie",
              attributes: ["id", "nom"],
            },
          ],
        },
      ],
      order: [["note", "DESC"]],
      limit: 3,
    });
    res.json(artisans);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artisans du mois:",
      error,
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un artisan par ID
exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          include: [
            {
              model: Category,
              as: "categorie",
              attributes: ["id", "nom"],
            },
          ],
        },
      ],
    });

    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }

    res.json(artisan);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'artisan:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer les artisans par catégorie
exports.getArtisansByCategory = async (req, res) => {
  try {
    const artisans = await Artisan.findAll({
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          where: { categorie_id: req.params.categoryId },
          include: [
            {
              model: Category,
              as: "categorie",
              attributes: ["id", "nom"],
            },
          ],
        },
      ],
      order: [["nom", "ASC"]],
    });
    res.json(artisans);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des artisans par catégorie:",
      error,
    );
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Rechercher des artisans par nom, ville ou spécialité
exports.searchArtisans = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim() === "") {
      return res
        .status(400)
        .json({ message: "Paramètre de recherche manquant" });
    }

    const artisans = await Artisan.findAll({
      where: {
        [Op.or]: [
          // Chercher dans le nom de l'artisan
          {
            nom: {
              [Op.like]: `%${q}%`,
            },
          },
          // Chercher dans la ville
          {
            ville: {
              [Op.like]: `%${q}%`,
            },
          },
          // Chercher dans la spécialité
          {
            "$specialite.nom$": {
              [Op.like]: `%${q}%`,
            },
          },
        ],
      },
      include: [
        {
          model: Specialite,
          as: "specialite",
          attributes: ["id", "nom"],
          include: [
            {
              model: Category,
              as: "categorie",
              attributes: ["id", "nom"],
            },
          ],
        },
      ],
      order: [["nom", "ASC"]],
    });

    res.json(artisans);
  } catch (error) {
    console.error("Erreur lors de la recherche d'artisans:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
