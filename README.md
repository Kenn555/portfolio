# Portfolio Développeur PHP

Un portfolio moderne et stylisé pour développeur web, construit avec PHP, HTML5, CSS3 et JavaScript. Ce projet présente une interface professionnelle avec des animations fluides, un design responsive et des fonctionnalités interactives.

## 🚀 Fonctionnalités

### Caractéristiques Principales
- **Design Moderne** : Interface épurée avec des animations fluides
- **Fully Responsive** : Adapté pour tous les appareils (mobile, tablette, desktop)
- **Animations Avancées** : Effets de scroll, transitions, et interactions utilisateur
- **Navigation Intuitive** : Menu sticky avec smooth scrolling
- **Formulaire de Contact** : Validation côté client et serveur avec PHP
- **Gestion des Cookies** : Consentement conforme au RGPD
- **SEO Optimisé** : Balises meta, structured data, et URLs propres

### Sections du Portfolio
- **Hero** : Présentation accrocheuse avec call-to-action
- **À Propos** : Biographie et statistiques personnelles
- **Projets** : Galerie de projets avec filtres et animations
- **Compétences** : Barres de progression animées par catégorie
- **Parcours** : Timeline interactive des expériences
- **Contact** : Formulaire fonctionnel avec validation

## 🛠️ Technologies Utilisées

### Backend
- **PHP 8.0+** : Logique métier et traitement des formulaires
- **MySQL** : Base de données (préparation pour future implémentation)
- **Architecture MVC** : Séparation des concerns

### Frontend
- **HTML5** : Structure sémantique
- **CSS3** : Design moderne avec animations
- **JavaScript ES6+** : Interactions et animations avancées
- **GSAP** : Animations performantes (via CDN)

### Outils et Librairies
- **Font Awesome** : Icônes vectorielles
- **Google Fonts** : Typographie moderne (Inter, JetBrains Mono)
- **Custom Cursor** : Curseur personnalisé
- **Particles.js** : Arrière-plan animé
- **Intersection Observer** : Animations au scroll

## 📁 Structure du Projet

```
Portfolio/
├── index.php                 # Page d'accueil principale
├── config/
│   └── config.php            # Configuration du site
├── includes/
│   ├── header.php            # Header et navigation
│   ├── footer.php            # Footer et scripts
│   ├── functions.php         # Fonctions utilitaires
│   └── contact_handler.php  # Traitement du formulaire
├── assets/
│   ├── css/
│   │   ├── normalize.css     # Reset CSS
│   │   ├── style.css         # Styles principaux
│   │   ├── animations.css    # Animations et transitions
│   │   └── responsive.css    # Design responsive
│   ├── js/
│   │   ├── main.js           # Script principal
│   │   ├── animations.js     # Contrôleur d'animations
│   │   ├── particles.js      # Particules animées
│   │   ├── custom-cursor.js  # Curseur personnalisé
│   │   └── cookie-consent.js # Gestion des cookies
│   └── images/
│       ├── profile.jpg       # Photo de profil
│       ├── projects/         # Images des projets
│       └── favicon.ico       # Favicon
├── cache/                    # Cache système (auto-créé)
├── logs/                     # Logs d'erreurs (auto-créé)
└── README.md                 # Documentation
```

## 🚀 Installation

### Prérequis
- **PHP 8.0** ou supérieur
- **Serveur web** (Apache, Nginx, ou PHP built-in server)
- **MySQL** (optionnel pour fonctionnalités futures)

### Installation Locale

1. **Cloner le repository**
   ```bash
   git clone https://github.com/votre-username/portfolio.git
   cd portfolio
   ```

2. **Configuration**
   - Copiez `config/config.php.example` vers `config/config.php`
   - Modifiez les constantes de configuration selon vos besoins

3. **Permissions**
   ```bash
   chmod 755 cache/
   chmod 755 logs/
   ```

4. **Démarrer le serveur**
   
   **Avec PHP built-in server:**
   ```bash
   php -S localhost:8000
   ```
   
   **Avec Apache:**
   - Placez le dossier dans `htdocs/` (XAMPP) ou `www/` (WAMP)
   - Accédez via `http://localhost/portfolio`

5. **Accéder au site**
   Ouvrez `http://localhost:8000` dans votre navigateur

### Configuration

#### Variables d'Environnement
Modifiez `config/config.php` pour personnaliser:

```php
// Informations du développeur
$developer_info = [
    'name' => 'Votre Nom',
    'title' => 'Votre Titre',
    'email' => 'votre@email.com',
    // ...
];

// Configuration des projets
$projects_data = [
    // Ajoutez vos projets ici
];

// Configuration des compétences
$skills_data = [
    // Ajoutez vos compétences ici
];
```

#### Base de Données (Optionnel)
Pour activer les fonctionnalités de base de données:

1. **Créez la base de données**
   ```sql
   CREATE DATABASE portfolio;
   ```

2. **Importez la structure** (futur `database.sql`)

3. **Configurez la connexion**
   ```php
   define('DB_HOST', 'localhost');
   define('DB_NAME', 'portfolio');
   define('DB_USER', 'votre_user');
   define('DB_PASS', 'votre_password');
   ```

## 🎨 Personnalisation

### Modifier le Design

#### Couleurs
Modifiez les variables CSS dans `assets/css/style.css`:

```css
:root {
    --primary-color: #007bff;
    --secondary-color: #6c757d;
    --accent-color: #ff6b6b;
    /* ... */
}
```

#### Typographie
Changez les fonts dans `includes/header.php`:

```html
<link href="https://fonts.googleapis.com/css2?family=VotreFont:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

#### Animations
Personnalisez les animations dans `assets/css/animations.css` ou `assets/js/animations.js`.

### Ajouter des Projets

1. **Via configuration** (simple):
   ```php
   $projects_data[] = [
       'id' => 5,
       'title' => 'Nouveau Projet',
       'description' => 'Description du projet',
       'image' => 'assets/images/projects/nouveau.jpg',
       'technologies' => ['PHP', 'JavaScript'],
       'demo_url' => 'https://demo.example.com',
       'github_url' => 'https://github.com/user/project'
   ];
   ```

2. **Via base de données** (recommandé pour production):
   ```sql
   INSERT INTO projects (title, description, image, technologies, demo_url, github_url, featured)
   VALUES ('Nouveau Projet', 'Description...', 'image.jpg', 'PHP,JavaScript', 'https://demo...', 'https://github...', 1);
   ```

### Personnaliser les Compétences

```php
$skills_data = [
    'Backend' => [
        ['name' => 'PHP', 'level' => 90],
        ['name' => 'MySQL', 'level' => 85],
        // Ajoutez vos compétences
    ],
    'Frontend' => [
        ['name' => 'HTML5', 'level' => 95],
        // ...
    ]
];
```

## 📱 Responsive Design

Le portfolio est optimisé pour:

- **Mobile** (< 480px) : Navigation hamburger, layout simplifié
- **Tablette** (768px - 1024px) : Grid adaptative, animations réduites
- **Desktop** (> 1024px) : Expérience complète avec toutes les animations

### Points de Rupture
```css
/* Mobile */
@media (max-width: 480px) { }

/* Tablette */
@media (max-width: 768px) { }

/* Desktop */
@media (max-width: 1024px) { }
```

## 🔧 Fonctionnalités Techniques

### Animations
- **Scroll Animations** : Elements apparaissent au scroll avec Intersection Observer
- **Hover Effects** : Interactions sur les cartes et boutons
- **Loading States** : Écrans de chargement et transitions
- **Micro-interactions** : Curseur personnalisé, particules, etc.

### Performance
- **Lazy Loading** : Images chargées au besoin
- **Minification** : CSS et JS optimisés (en production)
- **Caching** : Système de cache simple
- **Optimized Images** : Formats modernes et compression

### Sécurité
- **CSRF Protection** : Tokens pour les formulaires
- **Input Validation** : Validation côté client et serveur
- **XSS Prevention** : Échappement des données
- **SQL Injection** : Requêtes préparées

### SEO
- **Meta Tags** : Open Graph, Twitter Cards
- **Structured Data** : Schema.org pour les personnes
- **Semantic HTML** : Structure sémantique correcte
- **URLs Propres** : Structure d'URL optimisée

## 🚀 Déploiement

### Production

1. **Configuration**
   ```php
   define('DEBUG_MODE', false);
   error_reporting(0);
   ```

2. **Optimisation**
   - Minifiez les fichiers CSS/JS
   - Activez la compression GZIP
   - Configurez le cache navigateur

3. **HTTPS**
   - Installez un certificat SSL
   - Mettez à jour les URLs en HTTPS

### Hébergement Recommandé

- **Shared Hosting** : Hostinger, Bluehost, OVH
- **VPS** : DigitalOcean, Vultr, Linode
- **Cloud** : Heroku, AWS, Google Cloud

## 🤝 Contribution

1. Fork le projet
2. Créer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## 📝 License

Ce projet est sous license MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## 🐛 Dépannage

### Problèmes Communs

**Erreur 500 / Page blanche**
- Vérifiez les logs d'erreurs PHP
- Activez `DEBUG_MODE` dans `config.php`
- Vérifiez les permissions des dossiers

**Formulaire de contact ne fonctionne pas**
- Vérifiez la configuration PHP mail()
- Testez avec `mail()` directement
- Vérifiez les logs dans `logs/errors.log`

**Animations ne fonctionnent pas**
- Vérifiez la console JavaScript
- Désactivez `prefers-reduced-motion` dans les préférences navigateur
- Vérifiez que les fichiers JS sont chargés

**Images ne s'affichent pas**
- Vérifiez les chemins des fichiers
- Vérifiez les permissions des dossiers images
- Assurez-vous que les images existent

### Support

Pour toute question ou problème:

1. Consultez la documentation
2. Vérifiez les issues GitHub
3. Créez une nouvelle issue avec détails

## 🔄 Mises à Jour

### Version 1.0.0
- Version initiale avec toutes les fonctionnalités de base
- Design responsive et animations
- Formulaire de contact fonctionnel
- Gestion des cookies RGPD

### Roadmap
- [ ] Panneau d'administration
- [ ] Blog intégré
- [ ] Système de commentaires
- [ ] Multi-langues
- [ ] Thèmes multiples

## 📊 Performance

### Metrics
- **Lighthouse Score** : 95+ (Performance, Accessibility, Best Practices, SEO)
- **Page Load** : < 2s sur connexion 3G
- **First Contentful Paint** : < 1.5s
- **Time to Interactive** : < 3s

### Optimisations
- Images WebP avec fallback
- CSS/JS minifié et compressé
- Cache navigateur configuré
- CDN pour les assets statiques

---

**Développé avec ❤️ par [Votre Nom]**

Si ce projet vous a été utile, n'hésitez pas à ⭐ le repository !
