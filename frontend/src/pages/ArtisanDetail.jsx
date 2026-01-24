import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { artisanService, contactService } from "../services/api";
import "./ArtisanDetail.scss";

const ArtisanDetail = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    objet: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);

  useEffect(() => {
    const fetchArtisan = async () => {
      try {
        const response = await artisanService.getById(id);
        setArtisan(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'artisan:", error);
        setLoading(false);
      }
    };

    fetchArtisan();
  }, [id]);

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

  // Gestion du formulaire - CHANGEMENT DES CHAMPS
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      // Préparer les données à envoyer
      const contactData = {
        ...formData,
        artisanEmail: artisan.email, // Email de l'artisan
      };

      // Appel API
      const response = await contactService.send(contactData);

      if (response.data.success) {
        setFormStatus("success");
        setFormData({ nom: "", email: "", objet: "", message: "" });

        // Réinitialiser le message après 5 secondes
        setTimeout(() => setFormStatus(null), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus(null), 5000);
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi du formulaire:", error);
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 5000);
    }
  };

  if (loading) {
    return (
      <div className="artisan-detail">
        <div className="container">
          <p>Chargement...</p>
        </div>
      </div>
    );
  }

  if (!artisan) {
    return (
      <div className="artisan-detail">
        <div className="container">
          <p>Artisan non trouvé.</p>
          <Link to="/" className="btn btn-primary">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="artisan-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Accueil</Link>
          <span className="separator">›</span>
          <Link to={`/categorie/${artisan.specialite?.categorie?.id}`}>
            {artisan.specialite?.categorie?.nom}
          </Link>
          <span className="separator">›</span>
          <span>{artisan.nom}</span>
        </nav>

        <div className="artisan-content">
          {/* Carte d'information */}
          <div className="artisan-info-card">
            {/* Badge artisan du mois */}
            {artisan.top && <div className="badge-top">⭐ Artisan du mois</div>}

            {/* Image placeholder */}
            <div className="artisan-image">
              <div className="image-placeholder">
                <span className="icon">👤</span>
              </div>
            </div>

            {/* Nom */}
            <h1 className="artisan-name">{artisan.nom}</h1>

            {/* Note */}
            <div className="artisan-rating">
              <div className="stars">
                {renderStars(parseFloat(artisan.note))}
              </div>
              <span className="note-value">{artisan.note}/5</span>
            </div>

            {/* Spécialité */}
            <div className="info-item">
              <strong>Spécialité :</strong>
              <span>{artisan.specialite?.nom}</span>
            </div>

            {/* Localisation */}
            <div className="info-item">
              <strong>Localisation :</strong>
              <span>📍 {artisan.ville}</span>
            </div>

            {/* Email */}
            <div className="info-item">
              <strong>Email :</strong>
              <a href={`mailto:${artisan.email}`}>{artisan.email}</a>
            </div>

            {/* Site web */}
            {artisan.site_web && (
              <div className="info-item">
                <strong>Site web :</strong>
                <a
                  href={artisan.site_web}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visiter le site →
                </a>
              </div>
            )}
            {/* À propos */}
            {artisan.a_propos && (
              <div className="about-section">
                <h3>À propos</h3>
                <p>{artisan.a_propos}</p>
              </div>
            )}
          </div>

          {/* Formulaire de contact */}
          <div className="contact-form-card">
            <h2>Contactez {artisan.nom}</h2>
            <p className="form-description">
              Remplissez le formulaire ci-dessous pour envoyer un message à cet
              artisan. Vous recevrez une réponse sous 48h.
            </p>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="nom">Votre nom *</label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  required
                  placeholder="Jean Dupont"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Votre email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="jean.dupont@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="objet">Objet *</label>
                <input
                  type="text"
                  id="objet"
                  name="objet"
                  value={formData.objet}
                  onChange={handleInputChange}
                  required
                  placeholder="Demande de devis"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Votre message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="6"
                  placeholder="Décrivez votre projet..."
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                disabled={formStatus === "sending"}
              >
                {formStatus === "sending"
                  ? "Envoi en cours..."
                  : "Envoyer le message"}
              </button>

              {formStatus === "success" && (
                <div className="alert alert-success">
                  ✓ Message envoyé avec succès ! L'artisan vous répondra sous
                  48h.
                </div>
              )}

              {formStatus === "error" && (
                <div className="alert alert-error">
                  ✗ Erreur lors de l'envoi. Veuillez réessayer.
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtisanDetail;
