// Advanced Animations and Interactions
class AnimationController {
    constructor() {
        this.observers = [];
        this.animatedElements = new Set();
        this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        this.init();
    }
    
    init() {
        if (this.isReducedMotion) {
            // Respect user's motion preferences
            document.body.classList.add('reduced-motion');
            return;
        }
        
        this.initScrollAnimations();
        this.initHoverAnimations();
        this.initCounterAnimations();
        this.initTypingAnimations();
        this.initParallaxEffects();
        this.initMagneticButtons();
        this.initStaggerAnimations();
    }
    
    initScrollAnimations() {
        const animationOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animatedElements.has(entry.target)) {
                    this.animateElement(entry.target);
                    this.animatedElements.add(entry.target);
                }
            });
        }, animationOptions);
        
        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('[data-animate], .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .slide-in-up');
        animatedElements.forEach(el => {
            scrollObserver.observe(el);
        });
        
        this.observers.push(scrollObserver);
    }
    
    animateElement(element) {
        const animationType = element.dataset.animate || this.getAnimationClass(element);
        
        switch (animationType) {
            case 'fade-in-up':
                this.fadeInUp(element);
                break;
            case 'fade-in-left':
                this.fadeInLeft(element);
                break;
            case 'fade-in-right':
                this.fadeInRight(element);
                break;
            case 'scale-in':
                this.scaleIn(element);
                break;
            case 'slide-in-up':
                this.slideInUp(element);
                break;
            case 'rotate-in':
                this.rotateIn(element);
                break;
            default:
                this.fadeInUp(element);
        }
        
        // Add animation complete callback
        element.addEventListener('animationend', () => {
            element.classList.add('animation-complete');
        }, { once: true });
    }
    
    getAnimationClass(element) {
        const classes = element.className.split(' ');
        const animationClasses = ['fade-in-up', 'fade-in-left', 'fade-in-right', 'scale-in', 'slide-in-up'];
        
        for (const cls of classes) {
            if (animationClasses.includes(cls)) {
                return cls;
            }
        }
        
        return 'fade-in-up';
    }
    
    fadeInUp(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    }
    
    fadeInLeft(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(-30px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    fadeInRight(element) {
        element.style.opacity = '0';
        element.style.transform = 'translateX(30px)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateX(0)';
        });
    }
    
    scaleIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'scale(1)';
        });
    }
    
    slideInUp(element) {
        element.style.transform = 'translateY(100%)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'translateY(0)';
        });
    }
    
    rotateIn(element) {
        element.style.opacity = '0';
        element.style.transform = 'rotate(-10deg) scale(0.8)';
        
        requestAnimationFrame(() => {
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'rotate(0) scale(1)';
        });
    }
    
    initHoverAnimations() {
        // Card hover effects
        const cards = document.querySelectorAll('.project-card, .skill-item, .timeline-item');
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.cardHoverEffect(e.currentTarget, true);
            });
            
            card.addEventListener('mouseleave', (e) => {
                this.cardHoverEffect(e.currentTarget, false);
            });
        });
        
        // Button magnetic effect
        const magneticButtons = document.querySelectorAll('.btn');
        magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                this.magneticEffect(e.currentTarget, e);
            });
            
            btn.addEventListener('mouseleave', (e) => {
                this.resetMagneticEffect(e.currentTarget);
            });
        });
    }
    
    cardHoverEffect(card, isHover) {
        if (isHover) {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        } else {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = '';
        }
    }
    
    magneticEffect(button, event) {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    }
    
    resetMagneticEffect(button) {
        button.style.transform = '';
    }
    
    initCounterAnimations() {
        const counters = document.querySelectorAll('[data-counter]');
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => counterObserver.observe(counter));
    }
    
    animateCounter(element) {
        const target = parseInt(element.dataset.counter);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };
        
        updateCounter();
    }
    
    initTypingAnimations() {
        const typingElements = document.querySelectorAll('[data-typing]');
        
        typingElements.forEach(element => {
            const text = element.dataset.typing;
            const speed = parseInt(element.dataset.speed) || 100;
            
            this.typeWriter(element, text, speed);
        });
    }
    
    typeWriter(element, text, speed) {
        let i = 0;
        element.textContent = '';
        
        const type = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        };
        
        type();
    }
    
    initParallaxEffects() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        
        if (parallaxElements.length === 0) return;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = parseFloat(element.dataset.parallax) || 0.5;
                const yPos = -(scrolled * speed);
                
                element.style.transform = `translateY(${yPos}px)`;
            });
        };
        
        // Throttle scroll events
        let ticking = false;
        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
                setTimeout(() => { ticking = false; }, 100);
            }
        };
        
        window.addEventListener('scroll', requestTick);
    }
    
    initMagneticButtons() {
        const magneticElements = document.querySelectorAll('[data-magnetic]');
        
        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.magneticMove(element, e);
            });
            
            element.addEventListener('mouseleave', () => {
                this.magneticReset(element);
            });
        });
    }
    
    magneticMove(element, event) {
        const rect = element.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        
        const strength = parseFloat(element.dataset.magnetic) || 0.3;
        
        element.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    
    magneticReset(element) {
        element.style.transform = '';
    }
    
    initStaggerAnimations() {
        const staggerContainers = document.querySelectorAll('[data-stagger]');
        
        staggerContainers.forEach(container => {
            const items = container.children;
            const delay = parseInt(container.dataset.stagger) || 100;
            
            Array.from(items).forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * delay);
            });
        });
    }
    
    // Public methods for manual control
    animateElementManually(element, animationType) {
        if (!this.animatedElements.has(element)) {
            element.dataset.animate = animationType;
            this.animateElement(element);
            this.animatedElements.add(element);
        }
    }
    
    resetAnimations() {
        this.animatedElements.clear();
        
        const animatedElements = document.querySelectorAll('[data-animate], .fade-in-up, .fade-in-left, .fade-in-right, .scale-in, .slide-in-up');
        animatedElements.forEach(el => {
            el.style.opacity = '';
            el.style.transform = '';
            el.classList.remove('animation-complete');
        });
    }
    
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.resetAnimations();
    }
}

// Reveal on Scroll Animation
class RevealOnScroll {
    constructor() {
        this.elements = document.querySelectorAll('.reveal');
        this.init();
    }
    
    init() {
        if (this.elements.length === 0) return;
        
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);
        
        this.elements.forEach(el => observer.observe(el));
    }
}

// Text Gradient Animation
class TextGradient {
    constructor() {
        this.gradientElements = document.querySelectorAll('.gradient-text');
        this.init();
    }
    
    init() {
        if (this.gradientElements.length === 0) return;
        
        this.gradientElements.forEach(element => {
            this.animateGradient(element);
        });
    }
    
    animateGradient(element) {
        let hue = 0;
        
        const animate = () => {
            hue = (hue + 1) % 360;
            element.style.background = `linear-gradient(${hue}deg, #007bff, #66b3ff, #ff6b6b)`;
            element.style.webkitBackgroundClip = 'text';
            element.style.webkitTextFillColor = 'transparent';
            element.style.backgroundClip = 'text';
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Floating Animation
class FloatingAnimation {
    constructor() {
        this.floatingElements = document.querySelectorAll('[data-float]');
        this.init();
    }
    
    init() {
        if (this.floatingElements.length === 0) return;
        
        this.floatingElements.forEach(element => {
            this.addFloatingAnimation(element);
        });
    }
    
    addFloatingAnimation(element) {
        const amplitude = parseFloat(element.dataset.float) || 10;
        const frequency = parseFloat(element.dataset.frequency) || 0.01;
        
        let startTime = Date.now();
        
        const animate = () => {
            const elapsed = (Date.now() - startTime) * frequency;
            const y = Math.sin(elapsed) * amplitude;
            
            element.style.transform = `translateY(${y}px)`;
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }
}

// Initialize all animations
document.addEventListener('DOMContentLoaded', function() {
    const animationController = new AnimationController();
    const revealOnScroll = new RevealOnScroll();
    const textGradient = new TextGradient();
    const floatingAnimation = new FloatingAnimation();
    
    // Make animation controller available globally
    window.animations = animationController;
});

// Cleanup on page unload
window.addEventListener('beforeunload', function() {
    if (window.animations) {
        window.animations.destroy();
    }
});
