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

// Smooth Scrolling Parallax Effect for Background
const canvas = document.getElementById("parallax-bg");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let scrollOffset = 0;
let parallaxY = 0;

// Function to Draw the Parallax Animation
function drawParallax() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a smooth-moving parallax effect
    for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(
            canvas.width / 5 * i + (scrollOffset * 0.05),  // Moves slightly with scroll
            canvas.height / 3 + Math.sin(scrollOffset * 0.001 + i) * 50,  // Gentle wave movement
            60,
            0,
            Math.PI * 2
        );
        ctx.fillStyle = "rgba(0, 238, 255, 0.3)"; // Cyberpunk Glow Color
        ctx.shadowBlur = 20;
        ctx.shadowColor = "#0ef";
        ctx.fill();
    }

    requestAnimationFrame(drawParallax);
}

// Update Parallax Position on Scroll
window.addEventListener("scroll", () => {
    scrollOffset = window.scrollY;
});

// Resize Canvas on Window Resize
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Start Animation
drawParallax();

