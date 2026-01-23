const Category = require("./Category");
const Specialite = require("./Specialite");
const Artisan = require("./Artisan");

// Définition des relations

// Une catégorie a plusieurs spécialités
Category.hasMany(Specialite, {
  foreignKey: "categorie_id",
  as: "specialites",
});

// Une spécialité appartient à une catégorie
Specialite.belongsTo(Category, {
  foreignKey: "categorie_id",
  as: "categorie",
});

// Une spécialité a plusieurs artisans
Specialite.hasMany(Artisan, {
  foreignKey: "specialite_id",
  as: "artisans",
});

// Un artisan appartient à une spécialité
Artisan.belongsTo(Specialite, {
  foreignKey: "specialite_id",
  as: "specialite",
});

module.exports = {
  Category,
  Specialite,
  Artisan,
};
