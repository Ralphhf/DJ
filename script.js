// Navbar scroll effect
window.addEventListener('scroll', function () {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Smooth scrolling with offset awareness (sections use scroll-margin-top in CSS)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (!href || href === '#') return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Create floating particles
function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  const particleCount = 50;

  const frag = document.createDocumentFragment();
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (15 + Math.random() * 10) + 's';
    frag.appendChild(particle);
  }
  particlesContainer.appendChild(frag);
}
createParticles();

// Add hover effect to track cards only on hover-capable devices (prevents sticky hover on iOS)
if (window.matchMedia && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.track-card').forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    card.addEventListener('mouseleave', function () {
      this.style.transform = 'scale(1) rotate(0deg)';
    });
  });
}

// Animate elements on scroll (feature-detect IntersectionObserver)
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

function reveal(el) {
  el.style.animation = 'fadeInUp 0.8s ease forwards';
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        reveal(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.track-card, .event-card, .stat-card').forEach(el => observer.observe(el));
} else {
  // Fallback: reveal immediately
  document.querySelectorAll('.track-card, .event-card, .stat-card').forEach(reveal);
}
