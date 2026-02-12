<!DOCTYPE html>
<html lang="<?php echo $site_config['lang'] ?? 'fr'; ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?php echo $page_title ?? $site_config['description']; ?>">
    <meta name="keywords" content="<?php echo $site_config['keywords']; ?>">
    <meta name="author" content="<?php echo $site_config['author']; ?>">
    <title><?php echo $page_title ?? $site_config['name']; ?></title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="assets/images/favicon.ico">
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    
    <!-- Font Awesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    
    <!-- CSS -->
    <link rel="stylesheet" href="assets/css/normalize.css">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="stylesheet" href="assets/css/animations.css">
    <link rel="stylesheet" href="assets/css/responsive.css">
    
    <!-- Open Graph Meta Tags -->
    <meta property="og:title" content="<?php echo $page_title ?? $site_config['name']; ?>">
    <meta property="og:description" content="<?php echo $site_config['description']; ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?php echo $site_config['url']; ?>">
    <meta property="og:image" content="<?php echo $site_config['url']; ?>/assets/images/og-image.jpg">
    
    <!-- Twitter Card Meta Tags -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?php echo $page_title ?? $site_config['name']; ?>">
    <meta name="twitter:description" content="<?php echo $site_config['description']; ?>">
    <meta name="twitter:image" content="<?php echo $site_config['url']; ?>/assets/images/og-image.jpg">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "<?php echo $developer_info['name']; ?>",
        "jobTitle": "<?php echo $developer_info['title']; ?>",
        "email": "<?php echo $developer_info['email']; ?>",
        "telephone": "<?php echo $developer_info['phone']; ?>",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "<?php echo $developer_info['location']; ?>"
        },
        "url": "<?php echo $site_config['url']; ?>",
        "sameAs": [
            "<?php echo $developer_info['github']; ?>",
            "<?php echo $developer_info['linkedin']; ?>",
            "<?php echo $developer_info['twitter']; ?>"
        ]
    }
    </script>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <nav class="navbar">
            <div class="container">
                <div class="nav-brand">
                    <a href="index.php" class="brand">
                        <span class="brand-text">JD</span>
                        <span class="brand-full">Portfolio</span>
                    </a>
                </div>
                
                <div class="nav-menu" id="navMenu">
                    <ul class="nav-list">
                        <li class="nav-item">
                            <a href="#home" class="nav-link active" data-section="home">
                                <i class="fas fa-home"></i>
                                <span>Accueil</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#about" class="nav-link" data-section="about">
                                <i class="fas fa-user"></i>
                                <span>À propos</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#projects" class="nav-link" data-section="projects">
                                <i class="fas fa-briefcase"></i>
                                <span>Projets</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#skills" class="nav-link" data-section="skills">
                                <i class="fas fa-code"></i>
                                <span>Compétences</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#experience" class="nav-link" data-section="experience">
                                <i class="fas fa-briefcase"></i>
                                <span>Parcours</span>
                            </a>
                        </li>
                        <li class="nav-item">
                            <a href="#contact" class="nav-link" data-section="contact">
                                <i class="fas fa-envelope"></i>
                                <span>Contact</span>
                            </a>
                        </li>
                    </ul>
                </div>
                
                <div class="nav-toggle" id="navToggle">
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                    <span class="hamburger"></span>
                </div>
            </div>
        </nav>
    </header>

    <!-- Progress Bar -->
    <div class="progress-bar" id="progressBar"></div>

    <!-- Back to Top Button -->
    <button class="back-to-top" id="backToTop" aria-label="Retour en haut">
        <i class="fas fa-arrow-up"></i>
    </button>

    <!-- Loading Screen -->
    <div class="loading-screen" id="loadingScreen">
        <div class="loading-content">
            <div class="loading-spinner"></div>
            <p>Chargement...</p>
        </div>
    </div>
