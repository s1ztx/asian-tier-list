/* File: js/particles.js */

document.addEventListener('DOMContentLoaded', () => {
    ParticlesEngine.init();
});

const ParticlesEngine = {
    canvas: null,
    ctx: null,
    particlesArray: [],
    maxParticles: 60,
    colors: [
        'rgba(255, 70, 85, 0.4)',  /* Accent Red */
        'rgba(43, 192, 255, 0.4)', /* Accent Blue Light */
        'rgba(255, 255, 255, 0.2)' /* White Muted */
    ],

    init() {
        this.canvas = document.getElementById('particles-canvas');
        if (!this.canvas) return;

        this.ctx = this.canvas.getContext('2d');
        this.resizeCanvas();
        this.createParticles();

        window.addEventListener('resize', () => this.resizeCanvas());
        this.animate();
    },

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Re-initialize particles on major resize to redistribute evenly
        if (this.particlesArray.length > 0) {
            this.createParticles();
        }
    },

    classParticle: class {
        constructor(canvas, colors) {
            this.canvas = canvas;
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() * 0.4) - 0.2;
            this.speedY = -(Math.random() * 0.5 + 0.1); // Move upwards steadily
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Reset condition if particles drift out of view bounds
            if (this.y < 0) {
                this.y = this.canvas.height;
                this.x = Math.random() * this.canvas.width;
            }
            if (this.x < 0 || this.x > this.canvas.width) {
                this.speedX = -this.speedX;
            }
        }

        draw(ctx) {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    },

    createParticles() {
        this.particlesArray = [];
        for (let i = 0; i < this.maxParticles; i++) {
            this.particlesArray.push(new this.classParticle(this.canvas, this.colors));
        }
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particlesArray.length; i++) {
            this.particlesArray[i].update();
            this.particlesArray[i].draw(this.ctx);
        }

        // Connect particles with faint lines if they are close enough
        this.drawLines();

        requestAnimationFrame(() => this.animate());
    },

    drawLines() {
        const distThreshold = 120;
        for (let i = 0; i < this.particlesArray.length; i++) {
            for (let j = i + 1; j < this.particlesArray.length; j++) {
                const dx = this.particlesArray[i].x - this.particlesArray[j].x;
                const dy = this.particlesArray[i].y - this.particlesArray[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < distThreshold) {
                    // Calculate opacity based on distance proximities
                    const opacity = (1 - (distance / distThreshold)) * 0.08;
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particlesArray[i].x, this.particlesArray[i].y);
                    this.ctx.lineTo(this.particlesArray[j].x, this.particlesArray[j].y);
                    this.ctx.stroke();
                    this.ctx.closePath();
                }
            }
        }
    }
};
