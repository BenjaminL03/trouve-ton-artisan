# 🔒 MESURES DE SÉCURITÉ - Trouve ton artisan

## 📋 Liste des mesures implémentées

### 1. Variables d'environnement (.env)

**Mise en œuvre :**

- Fichier `.env` séparé du code source
- Exclusion du `.gitignore` pour ne pas exposer les credentials
- Stockage des informations sensibles (DB credentials, email config)

**Intérêt :**

- Protège les informations sensibles (mots de passe, clés API)
- Permet une configuration différente par environnement (dev/prod)
- Évite l'exposition accidentelle de credentials sur GitHub

**Fichiers concernés :**

- `backend/.env`
- `.gitignore`

---

### 2. Helmet.js - Protection des headers HTTP

**Mise en œuvre :**

```javascript
const helmet = require("helmet");
app.use(helmet());
```

**Intérêt :**

- Sécurise les headers HTTP de l'application
- Protection contre les attaques XSS (Cross-Site Scripting)
- Protection contre le clickjacking
- Désactive l'en-tête X-Powered-By qui révèle la technologie utilisée
- Configure Content-Security-Policy

**Protection contre :**

- XSS (Cross-Site Scripting)
- Clickjacking
- MIME type sniffing

---

### 3. CORS (Cross-Origin Resource Sharing)

**Mise en œuvre :**

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
```

**Intérêt :**

- Autorise uniquement le frontend légitime à accéder à l'API
- Empêche les requêtes depuis des domaines non autorisés
- Protection contre les attaques CSRF

**Protection contre :**

- Requêtes cross-origin malveillantes
- Vol de données par des sites tiers

---

### 4. Rate Limiting - Limitation des requêtes

**Mise en œuvre :**

**Rate limiting général :**

```javascript
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // 100 requêtes max
});
app.use("/api/", limiter);
```

**Rate limiting contact (plus strict) :**

```javascript
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 5, // 5 emails max
});
app.use("/api/contact", contactLimiter);
```

**Intérêt :**

- Protection contre les attaques par force brute
- Protection contre le spam sur le formulaire de contact
- Réduit les risques de DDoS

**Protection contre :**

- Attaques DDoS
- Spam de formulaire
- Abus de l'API

---

### 5. Validation des données - Formulaire de contact

**Mise en œuvre :**

```javascript
// Validation des champs requis
if (!nom || !email || !objet || !message) {
  return res.status(400).json({ message: "Tous les champs sont requis" });
}

// Validation format email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Format d'email invalide" });
}
```

**Intérêt :**

- Empêche l'injection de données malveillantes
- Garantit l'intégrité des données
- Validation côté serveur

**Protection contre :**

- Injection de données malveillantes
- Spam

---

### 6. Protection SQL Injection - Sequelize ORM

**Mise en œuvre :**

- Utilisation de Sequelize comme ORM
- Requêtes paramétrées automatiquement
- Échappement automatique des caractères spéciaux

**Intérêt :**

- Protection contre les injections SQL
- Pas de concaténation directe dans les requêtes

**Protection contre :**

- SQL Injection

---

### 7. Limitation de la taille des requêtes

**Mise en œuvre :**

```javascript
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
```

**Intérêt :**

- Empêche les attaques par payload trop volumineux
- Protection contre les attaques DDoS par surcharge mémoire

**Protection contre :**

- Attaques par payload excessif
- DDoS

---

### 8. Gestion des erreurs

**Mise en œuvre :**

```javascript
app.use((err, req, res, next) => {
  console.error("Erreur serveur:", err.stack);
  res.status(500).json({
    message: "Erreur interne du serveur",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});
```

**Intérêt :**

- Ne pas exposer les détails techniques en production
- Masquer la stack trace en production

**Protection contre :**

- Fuite d'informations sensibles

---

## 🔍 VEILLE SUR LES VULNÉRABILITÉS

### OWASP Top 10 (2021)

**1. Broken Access Control**

- Mitigation : CORS configuré, rate limiting

**2. Cryptographic Failures**

- Mitigation : Variables d'environnement, HTTPS en production

**3. Injection**

- Mitigation : Sequelize ORM, validation des entrées

**4. Security Misconfiguration**

- Mitigation : Helmet.js, headers sécurisés

**5. Vulnerable and Outdated Components**

- Mitigation : Packages npm à jour, audit régulier

---

## ✅ Checklist de sécurité

- [x] Variables d'environnement (.env)
- [x] Helmet.js configuré
- [x] CORS configuré
- [x] Rate limiting général
- [x] Rate limiting formulaire contact
- [x] Validation des données
- [x] Protection SQL Injection (Sequelize)
- [x] Limitation taille requêtes
- [x] Gestion des erreurs
- [ ] HTTPS en production (à configurer au déploiement)

---

**Projet :** Trouve ton artisan - Région Auvergne-Rhône-Alpes  
**Date :** Janvier 2026
