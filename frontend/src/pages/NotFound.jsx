import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <div className="not-found-content">
        <div className="warning-icon">⚠️</div>
        <h1>Page en construction</h1>
        <p>
          Cette page est actuellement en cours de construction. Le contenu sera
          ajouté prochainement par notre équipe juridique.
        </p>
        <p className="contact-info">
          <strong>Pour toute question, vous pouvez nous contacter :</strong>
        </p>
        <div className="contact-details">
          <p>
            <strong>Région Auvergne-Rhône-Alpes</strong>
          </p>
          <p>101 cours Charlemagne</p>
          <p>CS 20033</p>
          <p>69269 LYON CEDEX 02</p>
          <p>France</p>
          <p className="phone">
            <a href="tel:+33426734000">+33(0)4 26 73 40 00</a>
          </p>
        </div>
        <Link to="/" className="btn-return">
          ← Retour à l'accueil
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
