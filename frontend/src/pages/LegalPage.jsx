import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./LegalPage.scss";

const LegalPage = () => {
  const location = useLocation();

  // Déterminer le titre en fonction de l'URL
  const getTitleFromPath = () => {
    const path = location.pathname;

    if (path.includes("mentions-legales")) return "Mentions légales";
    if (path.includes("donnees-personnelles")) return "Données personnelles";
    if (path.includes("accessibilite")) return "Accessibilité";
    if (path.includes("cookies")) return "Gestion des cookies";

    return "Information légale";
  };

  return (
    <div className="legal-page">
      <div className="container">
        <div className="legal-content">
          <h1>{getTitleFromPath()}</h1>

          <div className="construction-message">
            <div className="icon">⚠️</div>
            <h2>Page en construction</h2>
            <p>
              Cette page est actuellement en cours de construction. Le contenu
              sera ajouté prochainement par notre équipe juridique.
            </p>
            <p className="contact-info">
              Pour toute question, vous pouvez nous contacter :
            </p>
            <div className="contact-details">
              <p>
                <strong>Région Auvergne-Rhône-Alpes</strong>
                <br />
                101 cours Charlemagne
                <br />
                CS 20033
                <br />
                69269 LYON CEDEX 02
                <br />
                France
              </p>
              <p>
                <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
              </p>
            </div>

            {/* Bouton retour à l'accueil */}
            <Link to="/" className="btn btn-primary btn-back">
              ← Retour à l'accueil
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
