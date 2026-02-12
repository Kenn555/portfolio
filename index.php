<?php
// Portfolio de Développeur - Page d'accueil
session_start();

// Configuration du site
define('SITE_NAME', 'Portfolio Développeur');
define('SITE_DESCRIPTION', 'Développeur Web Full Stack spécialisé en PHP, JavaScript et technologies modernes');

// Inclusion des fichiers de configuration
require_once 'config/config.php';
require_once 'includes/functions.php';

// Récupération des projets depuis la base de données
$projects = getProjects();
$skills = getSkills();
$experiences = getExperiences();

$page_title = 'Accueil - ' . SITE_NAME;
include 'includes/header.php';
?>

<main>
    <!-- Section Hero -->
    <section id="hero" class="hero">
        <div class="hero-content">
            <div class="hero-text">
                <h1 class="hero-title">
                    <?php echo htmlspecialchars($developer_info['name'] ?? 'Jean Dupont'); ?>
                </h1>
                <p class="hero-subtitle">
                    <?php echo htmlspecialchars($developer_info['title'] ?? 'Développeur Web Full Stack'); ?>
                </p>
                <p class="hero-description">
                    <?php echo htmlspecialchars($developer_info['description'] ?? 'Passionné par le développement web et la création d\'expériences utilisateur exceptionnelles.'); ?>
                </p>
                <div class="hero-buttons">
                    <a href="#projects" class="btn btn-primary">Voir mes projets</a>
                    <a href="#contact" class="btn btn-secondary">Me contacter</a>
                </div>
            </div>
            <div class="hero-image">
                <img src="assets/images/profile.jpg" alt="Photo de profil" class="profile-image">
            </div>
        </div>
        <div class="scroll-indicator">
            <span class="scroll-text">Découvrir</span>
            <div class="scroll-arrow"></div>
        </div>
    </section>

    <!-- Section À Propos -->
    <section id="about" class="about">
        <div class="container">
            <h2 class="section-title">À Propos</h2>
            <div class="about-content">
                <div class="about-text">
                    <h3>Développeur passionné et créatif</h3>
                    <p>
                        Avec plus de 5 ans d'expérience dans le développement web, je spécialise dans la création 
                        d'applications web modernes et performantes. Mon expertise couvre à la fois le frontend 
                        et le backend, me permettant de gérer des projets de bout en bout.
                    </p>
                    <p>
                        Je suis passionné par les nouvelles technologies, l'optimisation des performances et 
                        l'expérience utilisateur. Chaque projet est pour moi une opportunité d'apprendre et 
                        d'innover.
                    </p>
                    <div class="about-stats">
                        <div class="stat-item">
                            <span class="stat-number">50+</span>
                            <span class="stat-label">Projets réalisés</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">30+</span>
                            <span class="stat-label">Clients satisfaits</span>
                        </div>
                        <div class="stat-item">
                            <span class="stat-number">5+</span>
                            <span class="stat-label">Années d'expérience</span>
                        </div>
                    </div>
                </div>
                <div class="about-skills">
                    <h4>Mes compétences principales</h4>
                    <div class="skill-tags">
                        <?php foreach ($skills as $skill): ?>
                            <span class="skill-tag"><?php echo htmlspecialchars($skill['name']); ?></span>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Section Projets -->
    <section id="projects" class="projects">
        <div class="container">
            <h2 class="section-title">Mes Projets</h2>
            <div class="projects-grid">
                <?php foreach ($projects as $project): ?>
                    <div class="project-card">
                        <div class="project-image">
                            <img src="<?php echo htmlspecialchars($project['image']); ?>" alt="<?php echo htmlspecialchars($project['title']); ?>">
                        </div>
                        <div class="project-content">
                            <h3 class="project-title"><?php echo htmlspecialchars($project['title']); ?></h3>
                            <p class="project-description"><?php echo htmlspecialchars($project['description']); ?></p>
                            <div class="project-technologies">
                                <?php foreach ($project['technologies'] as $tech): ?>
                                    <span class="tech-tag"><?php echo htmlspecialchars($tech); ?></span>
                                <?php endforeach; ?>
                            </div>
                            <div class="project-links">
                                <?php if (!empty($project['demo_url'])): ?>
                                    <a href="<?php echo htmlspecialchars($project['demo_url']); ?>" class="btn btn-sm" target="_blank">Demo</a>
                                <?php endif; ?>
                                <?php if (!empty($project['github_url'])): ?>
                                    <a href="<?php echo htmlspecialchars($project['github_url']); ?>" class="btn btn-sm btn-outline" target="_blank">GitHub</a>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section Compétences -->
    <section id="skills" class="skills">
        <div class="container">
            <h2 class="section-title">Compétences Techniques</h2>
            <div class="skills-grid">
                <?php foreach ($skills as $category => $categorySkills): ?>
                    <div class="skill-category">
                        <h3><?php echo htmlspecialchars($category); ?></h3>
                        <div class="skills-list">
                            <?php foreach ($categorySkills as $skill): ?>
                                <div class="skill-item">
                                    <div class="skill-info">
                                        <span class="skill-name"><?php echo htmlspecialchars($skill['name']); ?></span>
                                        <span class="skill-level"><?php echo htmlspecialchars($skill['level']); ?>%</span>
                                    </div>
                                    <div class="skill-bar">
                                        <div class="skill-progress" style="width: <?php echo htmlspecialchars($skill['level']); ?>%"></div>
                                    </div>
                                </div>
                            <?php endforeach; ?>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section Expérience -->
    <section id="experience" class="experience">
        <div class="container">
            <h2 class="section-title">Parcours Professionnel</h2>
            <div class="timeline">
                <?php foreach ($experiences as $exp): ?>
                    <div class="timeline-item">
                        <div class="timeline-date"><?php echo htmlspecialchars($exp['period']); ?></div>
                        <div class="timeline-content">
                            <h3><?php echo htmlspecialchars($exp['position']); ?></h3>
                            <h4><?php echo htmlspecialchars($exp['company']); ?></h4>
                            <p><?php echo htmlspecialchars($exp['description']); ?></p>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Section Contact -->
    <section id="contact" class="contact">
        <div class="container">
            <h2 class="section-title">Contact</h2>
            <div class="contact-content">
                <div class="contact-info">
                    <h3>Discutons de votre projet</h3>
                    <p>Je suis toujours intéressé par de nouveaux défis et opportunités. N'hésitez pas à me contacter pour discuter de vos projets.</p>
                    <div class="contact-details">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span><?php echo htmlspecialchars($developer_info['email'] ?? 'contact@example.com'); ?></span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span><?php echo htmlspecialchars($developer_info['phone'] ?? '+33 6 00 00 00 00'); ?></span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <span><?php echo htmlspecialchars($developer_info['location'] ?? 'Paris, France'); ?></span>
                        </div>
                    </div>
                </div>
                <div class="contact-form">
                    <form action="includes/contact_handler.php" method="POST" class="form">
                        <div class="form-group">
                            <input type="text" name="name" id="name" required placeholder="Votre nom">
                        </div>
                        <div class="form-group">
                            <input type="email" name="email" id="email" required placeholder="Votre email">
                        </div>
                        <div class="form-group">
                            <input type="text" name="subject" id="subject" required placeholder="Sujet">
                        </div>
                        <div class="form-group">
                            <textarea name="message" id="message" rows="5" required placeholder="Votre message"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Envoyer le message</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
</main>

<?php include 'includes/footer.php'; ?>
<script src="assets/js/main.js"></script>
</body>
</html>
