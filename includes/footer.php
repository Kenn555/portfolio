<!-- Footer -->
<footer class="footer">
    <div class="container">
        <div class="footer-content">
            <div class="footer-section">
                <h3 class="footer-title">À Propos</h3>
                <p class="footer-text">
                    Développeur Web Full Stack passionné par la création d'applications modernes et performantes. 
                    Spécialisé en PHP, JavaScript et technologies web.
                </p>
            </div>
            
            <div class="footer-section">
                <h3 class="footer-title">Liens Rapides</h3>
                <ul class="footer-links">
                    <li><a href="#home">Accueil</a></li>
                    <li><a href="#about">À propos</a></li>
                    <li><a href="#projects">Projets</a></li>
                    <li><a href="#skills">Compétences</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3 class="footer-title">Services</h3>
                <ul class="footer-links">
                    <li>Développement Web</li>
                    <li>Applications PHP</li>
                    <li>Design Responsive</li>
                    <li>Optimisation SEO</li>
                    <li>Maintenance Web</li>
                </ul>
            </div>
            
            <div class="footer-section">
                <h3 class="footer-title">Contact</h3>
                <div class="footer-contact">
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <a href="mailto:<?php echo $developer_info['email']; ?>">
                            <?php echo $developer_info['email']; ?>
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-phone"></i>
                        <a href="tel:<?php echo str_replace(' ', '', $developer_info['phone']); ?>">
                            <?php echo $developer_info['phone']; ?>
                        </a>
                    </div>
                    <div class="contact-item">
                        <i class="fas fa-map-marker-alt"></i>
                        <span><?php echo $developer_info['location']; ?></span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="footer-bottom">
            <div class="footer-social">
                <h4>Suivez-moi</h4>
                <div class="social-links">
                    <?php foreach ($social_links as $platform => $url): ?>
                        <?php if ($platform !== 'email'): ?>
                            <a href="<?php echo $url; ?>" class="social-link" target="_blank" rel="noopener noreferrer" aria-label="<?php echo ucfirst($platform); ?>">
                                <i class="fab fa-<?php echo $platform; ?>"></i>
                            </a>
                        <?php endif; ?>
                    <?php endforeach; ?>
                </div>
            </div>
            
            <div class="footer-copyright">
                <p>&copy; <?php echo date('Y'); ?> <?php echo $developer_info['name']; ?>. 
                   Tous droits réservés. | 
                   <a href="mentions-legales.php">Mentions légales</a> | 
                   <a href="politique-confidentialite.php">Politique de confidentialité</a>
                </p>
            </div>
        </div>
    </div>
</footer>

<!-- Cookie Consent -->
<div class="cookie-consent" id="cookieConsent">
    <div class="cookie-content">
        <p>
            Ce site utilise des cookies pour améliorer votre expérience. 
            En continuant à naviguer, vous acceptez notre 
            <a href="politique-confidentialite.php">politique de confidentialité</a>.
        </p>
        <div class="cookie-buttons">
            <button class="btn btn-primary" id="acceptCookies">Accepter</button>
            <button class="btn btn-outline" id="rejectCookies">Refuser</button>
        </div>
    </div>
</div>

<!-- Custom Cursor -->
<div class="custom-cursor" id="customCursor">
    <div class="cursor-dot"></div>
    <div class="cursor-ring"></div>
</div>

<!-- Particles Background -->
<canvas id="particlesCanvas" class="particles-canvas"></canvas>

<!-- Scripts -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
<script src="assets/js/particles.js"></script>
<script src="assets/js/custom-cursor.js"></script>
<script src="assets/js/cookie-consent.js"></script>
<script src="assets/js/animations.js"></script>

</body>
</html>
