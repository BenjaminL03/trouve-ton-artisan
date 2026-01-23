import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { categoryService } from "../services/api";
import "./Header.scss";

const Header = () => {
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Récupérer les catégories au chargement
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryService.getAll();
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Gestion de la recherche
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recherche?q=${searchQuery}`);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
          <Link to="/" className="logo">
            <img
              src="/logo.png"
              alt="Trouve ton artisan - Région Auvergne-Rhône-Alpes"
            />
          </Link>

          {/* Navigation */}
          <nav className="main-nav">
            <ul>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link to={`/categorie/${category.id}`}>{category.nom}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Rechercher un artisan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              🔍
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
