import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { artisanService } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "./SearchResults.scss";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchArtisans = async () => {
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        const response = await artisanService.search(query);
        setArtisans(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
        setLoading(false);
      }
    };

    searchArtisans();
  }, [query]);

  if (loading) {
    return (
      <div className="search-results-page">
        <div className="container">
          <p className="loading">Recherche en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="search-results-page">
      <div className="container">
        {/* En-tête de recherche */}
        <div className="search-header">
          <h1>Résultats de recherche</h1>
          {query && (
            <p className="search-query">
              Recherche pour : <strong>"{query}"</strong>
            </p>
          )}
          <p className="result-count">
            {artisans.length} résultat{artisans.length > 1 ? "s" : ""} trouvé
            {artisans.length > 1 ? "s" : ""}
          </p>
        </div>

        {/* Résultats */}
        {artisans.length > 0 ? (
          <div className="artisans-grid">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🔍</div>
            <h2>Aucun résultat trouvé</h2>
            <p>Aucun artisan ne correspond à votre recherche "{query}".</p>
            <p className="suggestions">Suggestions :</p>
            <ul>
              <li>Vérifiez l'orthographe des mots-clés</li>
              <li>Essayez des mots-clés plus généraux</li>
              <li>Essayez des mots-clés différents</li>
              <li>Parcourez les catégories pour découvrir nos artisans</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
