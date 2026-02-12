// Main JavaScript File
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initScrollEffects();
    initProgressBar();
    initBackToTop();
    initAnimations();
    initContactForm();
    initLoadingScreen();
    initCookieConsent();
    initCustomCursor();
    initParticles();
});

// Navigation
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.header');

    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu
                    navToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Update active link
                    updateActiveNavLink(targetId);
                }
            }
        });
    });

    // Header scroll effect
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 300) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Update active navigation link
        updateActiveNavigation();
    });
}

function updateActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const headerHeight = document.querySelector('.header').offsetHeight;
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.pageYOffset >= sectionTop && 
            window.pageYOffset < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

function updateActiveNavLink(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetId) {
            link.classList.add('active');
        }
    });
}

// Scroll Effects
function initScrollEffects() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special handling for skill bars
                if (entry.target.classList.contains('skill-progress')) {
                    const level = entry.target.getAttribute('style').match(/width:\s*(\d+)%/);
                    if (level) {
                        entry.target.style.setProperty('--skill-level', level[1] + '%');
                        entry.target.classList.add('animate');
                    }
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in, .scale-in, .stagger-item, .skill-progress, .timeline-item');
    animateElements.forEach(el => observer.observe(el));
    
    // Stagger animation for project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.classList.add('stagger-item');
        card.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Progress Bar
function initProgressBar() {
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Animations
function initAnimations() {
    // Add animation classes to elements
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroDescription = document.querySelector('.hero-description');
    const heroButtons = document.querySelector('.hero-buttons');
    const heroImage = document.querySelector('.hero-image');
    
    if (heroTitle) heroTitle.classList.add('fade-in-up');
    if (heroSubtitle) heroSubtitle.classList.add('fade-in-up');
    if (heroDescription) heroDescription.classList.add('fade-in-up');
    if (heroButtons) heroButtons.classList.add('fade-in-up');
    if (heroImage) heroImage.classList.add('fade-in-right');
    
    // Add hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.classList.add('hover-lift');
    });
    
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.classList.add('hover-scale');
    });
    
    // Typing effect for hero title (optional)
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.classList.add('typing-effect');
        
        let i = 0;
        const typeWriter = setInterval(() => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriter);
                heroTitle.classList.remove('typing-effect');
            }
        }, 100);
    }
}

// Contact Form
function initContactForm() {
    const form = document.querySelector('.form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Add CSRF token
            formData.append('csrf_token', generateCSRFToken());
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.classList.add('loading');
            
            // Send form data
            fetch('includes/contact_handler.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showNotification('success', data.message);
                    form.reset();
                } else {
                    if (data.errors) {
                        showFormErrors(data.errors);
                    } else {
                        showNotification('error', data.message);
                    }
                }
            })
            .catch(error => {
                console.error('Error:', error);
                showNotification('error', 'Une erreur est survenue. Veuillez réessayer.');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                submitBtn.classList.remove('loading');
            });
        });
        
        // Add input validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    }
}

function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let isValid = true;
    let errorMessage = '';
    
    // Remove previous error
    field.classList.remove('error');
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Validation rules
    switch (fieldName) {
        case 'name':
            if (value.length < 2) {
                isValid = false;
                errorMessage = 'Le nom doit contenir au moins 2 caractères';
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
            break;
        case 'subject':
            if (value.length < 3) {
                isValid = false;
                errorMessage = 'Le sujet doit contenir au moins 3 caractères';
            }
            break;
        case 'message':
            if (value.length < 10) {
                isValid = false;
                errorMessage = 'Le message doit contenir au moins 10 caractères';
            }
            break;
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

function showFormErrors(errors) {
    const form = document.querySelector('.form');
    
    Object.keys(errors).forEach(fieldName => {
        const field = form.querySelector(`[name="${fieldName}"]`);
        if (field) {
            field.classList.add('error');
            const existingError = field.parentNode.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errors[fieldName];
            field.parentNode.appendChild(errorDiv);
        }
    });
}

function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Loading Screen
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Hide loading screen when page is fully loaded
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }, 1000);
    });
}

// Cookie Consent
function initCookieConsent() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const rejectBtn = document.getElementById('rejectCookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        cookieConsent.classList.add('show');
    }
    
    acceptBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('show');
        // Enable analytics or other cookies here
    });
    
    rejectBtn.addEventListener('click', function() {
        localStorage.setItem('cookieConsent', 'rejected');
        cookieConsent.classList.remove('show');
        // Disable non-essential cookies here
    });
}

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('customCursor');
    const cursorDot = cursor.querySelector('.cursor-dot');
    const cursorRing = cursor.querySelector('.cursor-ring');
    
    if (cursor) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        
        document.addEventListener('mousemove', function(e) {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Smooth cursor animation
        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.1;
            cursorY += (mouseY - cursorY) * 0.1;
            
            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .project-card, .btn');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
        
        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            cursor.style.display = 'block';
        });
    }
}

// Particles Background
function initParticles() {
    const canvas = document.getElementById('particlesCanvas');
    const ctx = canvas.getContext('2d');
    
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const particles = [];
        const particleCount = 50;
        
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 2 - 1;
                this.speedY = Math.random() * 2 - 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > canvas.width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > canvas.height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = `rgba(0, 123, 255, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        // Create particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
        
        // Connect nearby particles
        function connectParticles() {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 150) {
                        ctx.strokeStyle = `rgba(0, 123, 255, ${0.2 * (1 - distance / 150)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        
        // Animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            connectParticles();
            requestAnimationFrame(animate);
        }
        
        animate();
        
        // Resize canvas on window resize
        window.addEventListener('resize', function() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
}

// Utility Functions
function generateCSRFToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Apply throttle to scroll events
window.addEventListener('scroll', throttle(function() {
    // Scroll-based animations can be added here
}, 100));
