/* =============================================
   EMINBE — script.js
   ============================================= */

// ----- Navbar scroll effect -----
const navbar = document.getElementById('mainNavbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ----- Scroll reveal animation -----
const revealElements = document.querySelectorAll(
  '.product-card, .stat-card, .testimonial-card, .pricing-card, .ai-demo-card, .section-title, .section-tag'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (i % 4));
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

// ----- Category chip active toggle -----
const catChips = document.querySelectorAll('.cat-chip');
catChips.forEach(chip => {
  chip.addEventListener('click', (e) => {
    e.preventDefault();
    catChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  });
});

// ----- AI prompt bar animation -----
const promptTexts = [
  '"Gün batımında mor gökyüzü altında modern bir şehir silueti"',
  '"Soyut geometrik sanat, mavi ve altın renklerle"',
  '"Ormanın içinde büyülü bir kütüphane, mistik ışıklar"',
  '"Fütüristik araba tasarımı, neon renkler, karanlık fon"',
  '"Deniz feneri, fırtınalı gece, dramatik ışıklandırma"',
];
const promptEl = document.querySelector('.ai-prompt-text');
if (promptEl) {
  let currentIdx = 0;
  setInterval(() => {
    currentIdx = (currentIdx + 1) % promptTexts.length;
    promptEl.style.opacity = '0';
    promptEl.style.transform = 'translateY(-6px)';
    setTimeout(() => {
      promptEl.textContent = promptTexts[currentIdx];
      promptEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      promptEl.style.opacity = '1';
      promptEl.style.transform = 'translateY(0)';
    }, 320);
  }, 3000);
}

// ----- Smooth scroll for anchor links -----
document.querySelectorAll('a[href="#"]').forEach(a => {
  a.addEventListener('click', e => e.preventDefault());
});

// ----- Counter animation on stats -----
function animateCounter(el, target, suffix, durationMs) {
  let start = 0;
  const step = target / (durationMs / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const raw = el.dataset.count;
      const suffix = el.dataset.suffix || '';
      if (raw) animateCounter(el, parseInt(raw), suffix, 1400);
      statsObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-count]').forEach(el => {
  statsObserver.observe(el);
});
