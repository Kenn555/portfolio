// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('customCursor');
        this.cursorDot = this.cursor.querySelector('.cursor-dot');
        this.cursorRing = this.cursor.querySelector('.cursor-ring');
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.isHovering = false;
        this.isHidden = false;
        
        this.init();
    }
    
    init() {
        if (!this.cursor) return;
        
        this.bindEvents();
        this.animate();
        this.addHoverEffects();
    }
    
    bindEvents() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isHidden = false;
            this.cursor.style.display = 'block';
        });
        
        // Mouse leave/enter window
        document.addEventListener('mouseleave', () => {
            this.isHidden = true;
            this.cursor.style.display = 'none';
        });
        
        document.addEventListener('mouseenter', () => {
            this.isHidden = false;
            this.cursor.style.display = 'block';
        });
        
        // Touch devices - hide cursor
        if ('ontouchstart' in window) {
            this.cursor.style.display = 'none';
            return;
        }
        
        // Hide cursor on right click
        document.addEventListener('contextmenu', () => {
            this.cursor.style.display = 'none';
        });
        
        document.addEventListener('mousedown', () => {
            if (!this.isHidden) {
                this.cursorRing.style.transform = 'translate(-50%, -50%) scale(0.8)';
            }
        });
        
        document.addEventListener('mouseup', () => {
            if (!this.isHidden) {
                this.cursorRing.style.transform = 'translate(-50%, -50%) scale(1)';
            }
        });
    }
    
    addHoverEffects() {
        const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .nav-link, .social-link, .back-to-top');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.isHovering = true;
                this.cursor.classList.add('hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.isHovering = false;
                this.cursor.classList.remove('hover');
            });
        });
        
        // Text elements - change cursor style
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
        textElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5)';
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            });
        });
    }
    
    animate() {
        // Smooth cursor following with easing
        const easing = 0.15;
        
        this.cursorX += (this.mouseX - this.cursorX) * easing;
        this.cursorY += (this.mouseY - this.cursorY) * easing;
        
        this.cursor.style.left = this.cursorX + 'px';
        this.cursor.style.top = this.cursorY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    // Public methods for external control
    hide() {
        this.isHidden = true;
        this.cursor.style.display = 'none';
    }
    
    show() {
        this.isHidden = false;
        this.cursor.style.display = 'block';
    }
    
    setPosition(x, y) {
        this.mouseX = x;
        this.mouseY = y;
    }
}

// Initialize custom cursor
document.addEventListener('DOMContentLoaded', function() {
    // Only initialize on non-touch devices
    if (!('ontouchstart' in window)) {
        new CustomCursor();
    }
});
