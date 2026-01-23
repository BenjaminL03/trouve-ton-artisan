-- ============================================
-- Script de création de la base de données
-- Projet : Trouve ton artisan
-- Base de données : MySQL 8.0+
-- ============================================

-- Suppression de la base si elle existe déjà
DROP DATABASE IF EXISTS trouve_ton_artisan;

-- Création de la base de données avec encodage UTF-8
CREATE DATABASE trouve_ton_artisan 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Utilisation de la base de données
USE trouve_ton_artisan;

-- ============================================
-- Table : categories
-- Description : Les 4 catégories principales d'artisanat
-- ============================================
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table : specialites
-- Description : Spécialités rattachées à une catégorie
-- ============================================
CREATE TABLE specialites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clé étrangère vers categories
    CONSTRAINT fk_specialite_categorie 
        FOREIGN KEY (categorie_id) 
        REFERENCES categories(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Index pour optimiser les recherches
    INDEX idx_categorie (categorie_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Table : artisans
-- Description : Informations complètes sur chaque artisan
-- ============================================
CREATE TABLE artisans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT,
    email VARCHAR(200) NOT NULL,
    site_web VARCHAR(255),
    specialite_id INT NOT NULL,
    top BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Clé étrangère vers specialites
    CONSTRAINT fk_artisan_specialite 
        FOREIGN KEY (specialite_id) 
        REFERENCES specialites(id) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
    
    -- Index pour optimiser les recherches
    INDEX idx_specialite (specialite_id),
    INDEX idx_top (top),
    INDEX idx_nom (nom),
    INDEX idx_ville (ville)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Confirmation de la création
-- ============================================
SELECT 'Base de données créée avec succès !' AS message;
SHOW TABLES;