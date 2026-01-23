import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import des composants
import Header from "./components/Header";
import Footer from "./components/Footer";

// Import des pages
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ArtisanDetail from "./pages/ArtisanDetail";
import NotFound from "./pages/NotFound";
import LegalPage from "./pages/LegalPage";
import SearchResults from "./pages/SearchResults";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main className="main-content">
          <Routes>
            {/* Page d'accueil */}
            <Route path="/" element={<Home />} />

            {/* Page catégorie */}
            <Route path="/categorie/:id" element={<CategoryPage />} />

            {/* Page détail artisan */}
            <Route path="/artisan/:id" element={<ArtisanDetail />} />

            {/* Page résultats de recherche */}
            <Route path="/recherche" element={<SearchResults />} />

            {/* Pages légales */}
            <Route path="/mentions-legales" element={<LegalPage />} />
            <Route path="/donnees-personnelles" element={<LegalPage />} />
            <Route path="/accessibilite" element={<LegalPage />} />
            <Route path="/cookies" element={<LegalPage />} />

            {/* Page 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
