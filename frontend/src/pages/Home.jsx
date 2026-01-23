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
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Trouvez le bon artisan pour vos projets</h1>
          <p className="subtitle">
            La région Auvergne-Rhône-Alpes vous accompagne dans votre recherche
            d'artisans qualifiés
          </p>
        </div>
      </section>

      {/* Section "Comment ça marche" */}
      <section className="how-it-works">
        <div className="container">
          <h2>Comment trouver mon artisan ?</h2>

          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Choisir la catégorie d'artisanat</h3>
              <p>
                Sélectionnez dans le menu la catégorie qui correspond à vos
                besoins : Bâtiment, Services, Fabrication ou Alimentation.
              </p>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <h3>Choisir un artisan</h3>
              <p>
                Parcourez la liste des artisans disponibles et consultez leurs
                profils, notes et spécialités.
              </p>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <h3>Le contacter via le formulaire de contact</h3>
              <p>
                Remplissez le formulaire sur la page de l'artisan pour lui
                envoyer directement votre demande.
              </p>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <h3>Une réponse sera apportée sous 48h</h3>
              <p>
                L'artisan vous contactera dans les 48 heures pour discuter de
                votre projet et établir un devis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section "Artisans du mois" */}
      <section className="top-artisans">
        <div className="container">
          <h2>Les artisans du mois</h2>

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
