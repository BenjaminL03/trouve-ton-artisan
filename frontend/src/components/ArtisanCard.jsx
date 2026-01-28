import React from "react";
import { Link } from "react-router-dom";
import "./ArtisanCard.scss";

const ArtisanCard = ({ artisan }) => {
  // Fonction pour afficher les étoiles
  const renderStars = (note) => {
    const stars = [];
    const fullStars = Math.floor(note);
    const hasHalfStar = note % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <span key={i} className="star filled">
          ★
        </span>,
      );
    }

    if (hasHalfStar) {
      stars.push(
        <span key="half" className="star half">
          ★
        </span>,
      );
    }

    const emptyStars = 5 - Math.ceil(note);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <span key={`empty-${i}`} className="star empty">
          ★
        </span>,
      );
    }

    return stars;
  };

  return (
    <Link to={`/artisan/${artisan.id}`} className="artisan-card">
      <div className="card-content">
        {/* Badge "Top" si artisan du mois */}
        {artisan.top && <div className="badge-top">⭐ Artisan du mois</div>}

        {/* Nom de l'artisan */}
        <h3 className="artisan-name">{artisan.nom}</h3>

        {/* Note */}
        <div className="artisan-rating">
          <div className="stars">{renderStars(parseFloat(artisan.note))}</div>
          <span className="note-value">{artisan.note}/5</span>
        </div>

        {/* Spécialité */}
        <p className="artisan-specialty">{artisan.specialite?.nom}</p>
      </div>
      {/* Localisation + Bouton */}
      <div className="card-footer">
        <div className="artisan-location">
          <span className="location-icon">📍</span>
          {artisan.ville}
        </div>

        <Link to={`/artisan/${artisan.id}`} className="btn-profile">
          Voir le profil
        </Link>
      </div>
    </Link>
  );
};

export default ArtisanCard;
