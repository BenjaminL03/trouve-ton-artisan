import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          {/* Image/Illustration 404 */}
          <div className="error-illustration">
            <span className="error-code">404</span>
          </div>

          {/* Message d'erreur */}
          <h1>Page non trouvée</h1>
          <p className="error-message">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>

          {/* Bouton retour */}
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
