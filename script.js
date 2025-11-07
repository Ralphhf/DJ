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

// --- Mobile menu toggle ---
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const panel  = document.getElementById('mobileMenu');

  if (!toggle || !panel) return;

  function openMenu() {
    panel.hidden = false;
    // force reflow to enable transition when unhiding
    // eslint-disable-next-line no-unused-expressions
    panel.offsetHeight;
    panel.classList.add('is-open');
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
  }

  function closeMenu() {
    panel.classList.remove('is-open');
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    // after transition, hide for a11y + pointer events
    panel.addEventListener('transitionend', function handler() {
      if (!panel.classList.contains('is-open')) panel.hidden = true;
      panel.removeEventListener('transitionend', handler);
    });
  }

  toggle.addEventListener('click', () => {
    const open = toggle.classList.contains('is-open');
    open ? closeMenu() : openMenu();
  });

  // Close when a mobile link is tapped (and smooth-scroll still works)
  panel.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => closeMenu());
  });

  // Close on Escape
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('is-open')) closeMenu();
  });

  // Close if window resized up to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && toggle.classList.contains('is-open')) closeMenu();
  });
})();
