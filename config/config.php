<?php
// Configuration du portfolio
define('DB_HOST', 'localhost');
define('DB_NAME', 'portfolio');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configuration du développeur
$developer_info = [
    'name' => 'Jean Dupont',
    'title' => 'Développeur Web Full Stack',
    'description' => 'Passionné par le développement web et la création d\'expériences utilisateur exceptionnelles. Spécialisé en PHP, JavaScript et technologies modernes.',
    'email' => 'contact@jeandupont.fr',
    'phone' => '+33 6 12 34 56 78',
    'location' => 'Paris, France',
    'github' => 'https://github.com/jeandupont',
    'linkedin' => 'https://linkedin.com/in/jeandupont',
    'twitter' => 'https://twitter.com/jeandupont'
];

// Configuration des réseaux sociaux
$social_links = [
    'github' => $developer_info['github'],
    'linkedin' => $developer_info['linkedin'],
    'twitter' => $developer_info['twitter'],
    'email' => 'mailto:' . $developer_info['email']
];

// Configuration des projets (temporaire, sera remplacé par BDD)
$projects_data = [
    [
        'id' => 1,
        'title' => 'E-commerce Platform',
        'description' => 'Plateforme e-commerce complète avec panier, paiement et gestion des stocks',
        'image' => 'assets/images/projects/ecommerce.jpg',
        'technologies' => ['PHP', 'MySQL', 'JavaScript', 'Bootstrap'],
        'demo_url' => 'https://demo-ecommerce.example.com',
        'github_url' => 'https://github.com/jeandupont/ecommerce-platform',
        'featured' => true
    ],
    [
        'id' => 2,
        'title' => 'Task Management App',
        'description' => 'Application de gestion de tâches avec interface moderne et temps réel',
        'image' => 'assets/images/projects/taskapp.jpg',
        'technologies' => ['PHP', 'Vue.js', 'WebSocket', 'MySQL'],
        'demo_url' => 'https://demo-taskapp.example.com',
        'github_url' => 'https://github.com/jeandupont/task-management',
        'featured' => true
    ],
    [
        'id' => 3,
        'title' => 'Blog Platform',
        'description' => 'Plateforme de blogging avec système de commentaires et gestion des articles',
        'image' => 'assets/images/projects/blog.jpg',
        'technologies' => ['PHP', 'MySQL', 'Ajax', 'CSS3'],
        'demo_url' => 'https://demo-blog.example.com',
        'github_url' => 'https://github.com/jeandupont/blog-platform',
        'featured' => false
    ],
    [
        'id' => 4,
        'title' => 'Weather Dashboard',
        'description' => 'Tableau de bord météo avec prévisions et visualisation des données',
        'image' => 'assets/images/projects/weather.jpg',
        'technologies' => ['PHP', 'API REST', 'Chart.js', 'CSS3'],
        'demo_url' => 'https://demo-weather.example.com',
        'github_url' => 'https://github.com/jeandupont/weather-dashboard',
        'featured' => false
    ]
];

// Configuration des compétences
$skills_data = [
    'Backend' => [
        ['name' => 'PHP', 'level' => 90],
        ['name' => 'MySQL', 'level' => 85],
        ['name' => 'JavaScript', 'level' => 80],
        ['name' => 'Node.js', 'level' => 75],
        ['name' => 'Python', 'level' => 70]
    ],
    'Frontend' => [
        ['name' => 'HTML5', 'level' => 95],
        ['name' => 'CSS3', 'level' => 90],
        ['name' => 'JavaScript', 'level' => 80],
        ['name' => 'Vue.js', 'level' => 75],
        ['name' => 'Bootstrap', 'level' => 85]
    ],
    'Outils' => [
        ['name' => 'Git', 'level' => 85],
        ['name' => 'Docker', 'level' => 70],
        ['name' => 'Webpack', 'level' => 75],
        ['name' => 'Linux', 'level' => 80]
    ]
];

// Configuration des expériences
$experiences_data = [
    [
        'position' => 'Développeur Web Senior',
        'company' => 'Tech Solutions',
        'period' => '2021 - Présent',
        'description' => 'Développement d\'applications web complexes pour des clients enterprise. Gestion d\'équipe et architecture technique.'
    ],
    [
        'position' => 'Développeur Full Stack',
        'company' => 'Digital Agency',
        'period' => '2019 - 2021',
        'description' => 'Création de sites web et applications pour divers clients. Travail sur des projets variés du e-commerce aux plateformes SaaS.'
    ],
    [
        'position' => 'Développeur Junior',
        'company' => 'StartUp Innovation',
        'period' => '2018 - 2019',
        'description' => 'Développement frontend et participation à des projets innovants. Formation continue et apprentissage des meilleures pratiques.'
    ]
];

// Configuration du site
$site_config = [
    'name' => 'Portfolio Développeur',
    'description' => 'Portfolio de Jean Dupont - Développeur Web Full Stack',
    'keywords' => 'développeur web, PHP, JavaScript, portfolio, full stack',
    'author' => 'Jean Dupont',
    'url' => 'https://portfolio.jeandupont.fr',
    'lang' => 'fr'
];

// Configuration des emails
$email_config = [
    'from_email' => 'noreply@jeandupont.fr',
    'from_name' => 'Portfolio Jean Dupont',
    'to_email' => $developer_info['email'],
    'subject_prefix' => '[Portfolio] '
];

// Configuration de sécurité
$security_config = [
    'csrf_token_lifetime' => 3600, // 1 heure
    'max_upload_size' => 5 * 1024 * 1024, // 5MB
    'allowed_file_types' => ['jpg', 'jpeg', 'png', 'gif', 'pdf']
];

// Messages d'erreur et de succès
$messages = [
    'contact_success' => 'Votre message a été envoyé avec succès. Je vous répondrai dans les plus brefs délais.',
    'contact_error' => 'Une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.',
    'validation_error' => 'Veuillez corriger les erreurs dans le formulaire.',
    'file_upload_error' => 'Le fichier n\'a pas pu être téléchargé. Vérifiez le format et la taille.'
];

// Configuration du mode debug (à désactiver en production)
define('DEBUG_MODE', true);
define('ERROR_LOG', 'logs/errors.log');

if (DEBUG_MODE) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
}
?>
