-- ============================================
-- Script d'alimentation de la base de données
-- Projet : Trouve ton artisan
-- Données de test basées sur le fichier Excel fourni
-- ============================================

USE trouve_ton_artisan;

-- Désactiver les vérifications de clés étrangères temporairement
SET FOREIGN_KEY_CHECKS = 0;

-- Vider les tables dans le bon ordre (des enfants vers les parents)
DELETE FROM artisans;
DELETE FROM specialites;
DELETE FROM categories;

-- Réactiver les vérifications
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================
-- Insertion des CATÉGORIES
-- ============================================
INSERT INTO categories (id, nom) VALUES 
(1, 'Alimentation'),
(2, 'Bâtiment'),
(3, 'Fabrication'),
(4, 'Services');

-- ============================================
-- Insertion des SPÉCIALITÉS
-- ============================================

-- Spécialités Alimentation (categorie_id = 1)
INSERT INTO specialites (nom, categorie_id) VALUES 
('Boulanger', 1),
('Boucher', 1),
('Chocolatier', 1),
('Traiteur', 1);

-- Spécialités Bâtiment (categorie_id = 2)
INSERT INTO specialites (nom, categorie_id) VALUES 
('Charpentier', 2),
('Électricien', 2),
('Menuisier', 2),
('Plombier', 2);

-- Spécialités Fabrication (categorie_id = 3)
INSERT INTO specialites (nom, categorie_id) VALUES 
('Bijoutier', 3),
('Couturier', 3),
('Ferronnier', 3),
('Coiffeur', 3);

-- Spécialités Services (categorie_id = 4)
INSERT INTO specialites (nom, categorie_id) VALUES 
('Fleuriste', 4),
('Toiletteur', 4),
('Webdesign', 4);

-- ============================================
-- Insertion des ARTISANS
-- Données issues du fichier Excel fourni
-- ============================================

-- ALIMENTATION
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, specialite_id, top) VALUES 
('Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'aupainchaud@hotmail.com', NULL, 1, TRUE),
('Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'boucherie.dumond@gmail.com', NULL, 2, FALSE),
('Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'chocolaterie-labbe@gmail.com', 'https://chocolaterie-labbe.fr', 3, TRUE),
('Traiteur Truchon', 4.1, 'Lyon', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@truchon-traiteur.fr', 'https://truchon-traiteur.fr', 4, FALSE);

-- BÂTIMENT
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, specialite_id, top) VALUES 
('Orville Salmons', 5.0, 'Évian', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'o-salmons@live.com', NULL, 6, TRUE),
('Mont Blanc Électricité', 4.5, 'Chamonix', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@mont-blanc-electricite.com', 'https://mont-blanc-electricite.com', 6, FALSE),
('Boutot & fils', 4.7, 'Bourg-en-bresse', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'boutot-menuiserie@gmail.com', 'https://boutot-menuiserie.com', 7, FALSE),
('Vallis Bellemare', 4.0, 'Vienne', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'v.bellemare@gmail.com', 'https://plomberie-bellemare.com', 8, FALSE);

-- FABRICATION
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, specialite_id, top) VALUES 
('Claude Quinn', 4.2, 'Aix-les-bains', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'claude.quinn@gmail.com', NULL, 9, FALSE),
('Amitee Lécuyer', 4.5, 'Annecy', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'a.amitee@hotmail.com', 'https://lecuyer-couture.com', 10, FALSE),
('Ernest Carignan', 5.0, 'Le Puy-en-Velay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'e-carigan@hotmail.com', NULL, 11, FALSE),
('Royden Charbonneau', 3.8, 'Saint-Priest', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'r.charbonneau@gmail.com', NULL, 12, FALSE),
('Leala Dennis', 3.8, 'Chambéry', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'l.dennos@hotmail.fr', 'https://coiffure-leala-chambery.fr', 12, FALSE),
('C\'est sup\'hair', 4.1, 'Romans-sur-Isère', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'sup-hair@gmail.com', 'https://sup-hair.fr', 12, FALSE);

-- SERVICES
INSERT INTO artisans (nom, note, ville, a_propos, email, site_web, specialite_id, top) VALUES 
('Le monde des fleurs', 4.6, 'Annonay', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@le-monde-des-fleurs-annonay.fr', 'https://le-monde-des-fleurs-annonay.fr', 13, FALSE),
('Valérie Laderoute', 4.5, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'v-laredoute@gmail.com', NULL, 14, FALSE),
('CM Graphisme', 4.4, 'Valence', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleif', 'contact@cm-graphisme.com', 'https://cm-graphisme.com', 15, FALSE);

-- ============================================
-- Vérifications et statistiques
-- ============================================

-- Vérifier les insertions
SELECT 'Données insérées avec succès !' AS message;

-- Statistiques
SELECT 
    'Catégories' AS table_name, 
    COUNT(*) AS total 
FROM categories
UNION ALL
SELECT 
    'Spécialités' AS table_name, 
    COUNT(*) AS total 
FROM specialites
UNION ALL
SELECT 
    'Artisans' AS table_name, 
    COUNT(*) AS total 
FROM artisans;

-- Afficher les 3 artisans du mois (top = TRUE)
SELECT 
    a.nom AS artisan,
    a.note,
    s.nom AS specialite,
    c.nom AS categorie,
    a.ville
FROM artisans a
JOIN specialites s ON a.specialite_id = s.id
JOIN categories c ON s.categorie_id = c.id
WHERE a.top = TRUE
ORDER BY a.note DESC;