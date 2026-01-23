import React from "react";
import { Link } from "react-router-dom";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Liens légaux */}
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="/mentions-legales">Mentions légales</Link>
              </li>
              <li>
                <Link to="/donnees-personnelles">Données personnelles</Link>
              </li>
              <li>
                <Link to="/accessibilite">Accessibilité</Link>
              </li>
              <li>
                <Link to="/cookies">Cookies</Link>
              </li>
            </ul>
          </nav>

          {/* Coordonnées */}
          <div className="footer-contact">
            <h4>Contact - Antenne de Lyon</h4>
            <address>
              101 cours Charlemagne
              <br />
              CS 20033
              <br />
              69269 LYON CEDEX 02
              <br />
              France
              <br />
              <a href="tel:+33426734000">+33 (0)4 26 73 40 00</a>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Région Auvergne-Rhône-Alpes - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
