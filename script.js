// Smooth Scroll to Section
function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: "smooth"
    });
}

// Typing Animation
const typedText = document.querySelector('.typing');
const words = ["Sanjoy Dev", "a Lecturer", "a Researcher", "a Software Engineer"];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    let currentWord = words[wordIndex];
    if (isDeleting) {
        typedText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 1000);
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, isDeleting ? 50 : 100);
    }
}

document.addEventListener("DOMContentLoaded", type);

// Adding Scroll Animation
const sections = document.querySelectorAll(".fade-in");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    observer.observe(section);
});

//
//
//
//
//

// Cyberpunk Background Effect
const canvas = document.getElementById("cyberpunk-effect");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
let lines = [];

function Particle(x, y, size, speedX, speedY, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speedX = speedX;
    this.speedY = speedY;
    this.color = color;

    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
    };

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.fill();
    };
}

// Create Random Particles
function initParticles() {
    for (let i = 0; i < 40; i++) {
        let size = Math.random() * 3 + 1;
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let speedX = (Math.random() - 0.5) * 2;
        let speedY = (Math.random() - 0.5) * 2;
        let color = ["#0ef", "#ff0066", "#00ffea"][Math.floor(Math.random() * 3)];
        particles.push(new Particle(x, y, size, speedX, speedY, color));
    }
}

// Create Moving Grid Lines
function Line(x, y, length, speed, color) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.speed = speed;
    this.color = color;

    this.update = function() {
        this.y += this.speed;
        if (this.y > canvas.height) {
            this.y = -10;
            this.x = Math.random() * canvas.width;
        }
    };

    this.draw = function() {
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.length, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.shadowBlur = 5;
        ctx.shadowColor = this.color;
        ctx.stroke();
    };
}

// Create Random Grid Lines
function initLines() {
    for (let i = 0; i < 20; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let length = Math.random() * 100 + 50;
        let speed = Math.random() * 2 + 0.5;
        let color = "#0ef";
        lines.push(new Line(x, y, length, speed, color));
    }
}

// Animation Loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    lines.forEach(line => {
        line.update();
        line.draw();
    });

    requestAnimationFrame(animate);
}

// Resize Canvas on Window Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    particles = [];
    lines = [];
    initParticles();
    initLines();
});

// Initialize Effects
initParticles();
initLines();
animate();




