// Particles Background Animation
class ParticlesBackground {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.connectionDistance = 150;
        this.mouseX = 0;
        this.mouseY = 0;
        this.isMouseOver = false;
        
        this.init();
    }
    
    init() {
        if (!this.canvas) return;
        
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(new Particle(this.canvas));
        }
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            this.isMouseOver = true;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.isMouseOver = false;
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        this.particles.forEach(particle => {
            particle.update(this.canvas);
            particle.draw(this.ctx);
            
            // Mouse interaction
            if (this.isMouseOver) {
                const dx = this.mouseX - particle.x;
                const dy = this.mouseY - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    const force = (100 - distance) / 100;
                    particle.x -= (dx / distance) * force * 2;
                    particle.y -= (dy / distance) * force * 2;
                }
            }
        });
        
        // Connect particles
        this.connectParticles();
        
        requestAnimationFrame(() => this.animate());
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    const opacity = 0.2 * (1 - distance / this.connectionDistance);
                    this.ctx.strokeStyle = `rgba(0, 123, 255, ${opacity})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
}

class Particle {
    constructor(canvas) {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 2;
        this.speedY = (Math.random() - 0.5) * 2;
        this.opacity = Math.random() * 0.5 + 0.2;
        this.color = 'rgba(0, 123, 255, ';
    }
    
    update(canvas) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bounce off walls
        if (this.x > canvas.width || this.x < 0) {
            this.speedX = -this.speedX;
        }
        
        if (this.y > canvas.height || this.y < 0) {
            this.speedY = -this.speedY;
        }
        
        // Keep particles within bounds
        this.x = Math.max(0, Math.min(canvas.width, this.x));
        this.y = Math.max(0, Math.min(canvas.height, this.y));
    }
    
    draw(ctx) {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Initialize particles when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new ParticlesBackground('particlesCanvas');
});
