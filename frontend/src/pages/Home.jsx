import React, { useState, useEffect } from "react";
import { artisanService } from "../services/api";
import ArtisanCard from "../components/ArtisanCard";
import "./Home.scss";

const Home = () => {
  const [topArtisans, setTopArtisans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopArtisans = async () => {
      try {
        const response = await artisanService.getTop();
        setTopArtisans(response.data);
        setLoading(false);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des artisans du mois:",
          error,
        );
        setLoading(false);
      }
    };

    fetchTopArtisans();
  }, []);

  return (
    <div className="home">
      {/* Section Hero */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Trouvez le bon artisan pour vos projets
          </h1>
          <p className="hero-subtitle">
            La région Auvergne-Rhône-Alpes vous accompagne dans votre recherche
            d'artisans qualifiés
          </p>
        </div>
      </section>

      {/* Section Comment trouver mon artisan */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">Comment trouver mon artisan ?</h2>

          <div className="steps-container">
            <div className="step-card">
              <div className="step-header">
                <div className="step-number">1</div>
                <div className="step-icon">☰</div>
              </div>
              <div className="step-content">
                <p>
                  <strong>Choisir la catégorie d'artisanat dans le menu</strong>
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">2</div>
                <div className="step-icon">🔧</div>
              </div>
              <div className="step-content">
                <p>
                  <strong>Choisir un artisan</strong>
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">3</div>
                <div className="step-icon">📇</div>
              </div>
              <div className="step-content">
                <p>
                  <strong>Le contacter via le formulaire de contact</strong>
                </p>
              </div>
            </div>

            <div className="step-card">
              <div className="step-header">
                <div className="step-number">4</div>
                <div className="step-icon">⏰</div>
              </div>
              <div className="step-content">
                <p>
                  <strong>Une réponse sera apportée sous 48h</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Artisans du mois */}
      <section className="top-artisans">
        <div className="container">
          <h2 className="section-title">Les artisans du mois</h2>

          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="artisans-grid">
              {topArtisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
