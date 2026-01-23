import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { artisanService, categoryService } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "./CategoryPage.scss";

const CategoryPage = () => {
  const { id } = useParams();
  const [artisans, setArtisans] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer la catégorie
        const categoryResponse = await categoryService.getById(id);
        setCategory(categoryResponse.data);

        // Récupérer les artisans de cette catégorie
        const artisansResponse = await artisanService.getByCategory(id);
        setArtisans(artisansResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="category-page">
        <div className="container">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="container">
        {/* En-tête de la catégorie */}
        <div className="category-header">
          <h1>{category?.nom}</h1>
          <p className="artisan-count">
            {artisans.length} artisan{artisans.length > 1 ? "s" : ""} disponible
            {artisans.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Grille des artisans */}
        {artisans.length > 0 ? (
          <div className="artisans-grid">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <p>Aucun artisan trouvé dans cette catégorie.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
