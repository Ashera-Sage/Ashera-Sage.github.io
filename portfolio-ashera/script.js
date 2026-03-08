// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle logic
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('ion-icon');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('name', 'close-outline');
            } else {
                icon.setAttribute('name', 'menu-outline');
            }
        });
    }

    // Close mobile menu when a nav link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.querySelector('ion-icon').setAttribute('name', 'menu-outline');
            }
        });
    });

    // Intersection Observer for Scroll Reveal Animations
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Slight offset before triggering
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // Animate only once per load
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.animate-hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    // --- Particle Background Animation (Neural Network Style) ---
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height, particles;

        function init() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            particles = [];
            
            // Adjust particle count based on screen size for performance
            const particleCount = Math.floor((width * height) / 10000); // Increased density

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.7, // slightly faster
                    vy: (Math.random() - 0.5) * 0.7,
                    size: Math.random() * 2.5 + 1 // Increased particle size
                });
            }
        }

        function draw() {
            ctx.clearRect(0, 0, width, height);
            
            ctx.fillStyle = 'rgba(129, 140, 248, 0.8)'; // More opaque particles
            ctx.beginPath();
            
            particles.forEach((p, index) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off edges
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                // Draw Particle
                ctx.moveTo(p.x, p.y);
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

                // Connect particles to form "neural" links
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) { // Increased connection distance
                        ctx.strokeStyle = `rgba(129, 140, 248, ${0.4 - dist / 375})`; // More opaque lines
                        ctx.lineWidth = 1; // Thicker lines
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            
            ctx.fill();
            requestAnimationFrame(draw);
        }

        window.addEventListener('resize', init);
        init();
        draw();
    }
});
