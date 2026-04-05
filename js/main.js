/* ============================================================
   Ajinkya Bhosale — Portfolio JavaScript
   ============================================================ */

// ─── Typing Effect ────────────────────────────────────────
const roles = [
  'SOC Analyst',
  'Security Engineer',
  'Blue Team Defender',
  'Threat Hunter',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedRole');

function typeRole() {
  if (!typedEl) return;
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let delay = isDeleting ? 60 : 100;
  if (!isDeleting && charIndex === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(typeRole, delay);
}
setTimeout(typeRole, 800);

// ─── Mobile Navigation ────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ─── Scroll Fade-in Animations ────────────────────────────
const fadeTargets = document.querySelectorAll(
  '.skill-category, .project-card, .cert-card, .ctf-area-item, .stat-card, .contact-item, .edu-card'
);
fadeTargets.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, 80 * (entry.target._idx || 0));
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

// Stagger siblings
const groups = {};
fadeTargets.forEach(el => {
  const parent = el.parentElement;
  if (!groups[parent]) groups[parent] = [];
  groups[parent].push(el);
});
Object.values(groups).forEach(group => {
  group.forEach((el, idx) => { el._idx = idx; });
});
fadeTargets.forEach(el => observer.observe(el));

// ─── Active Nav Highlight ─────────────────────────────────
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => {
        a.style.color = '';
        if (a.getAttribute('href') === '#' + entry.target.id) {
          a.style.color = 'var(--text)';
        }
      });
    }
  });
}, { threshold: 0.3 });
sections.forEach(s => navObserver.observe(s));

// ─── Smooth Scroll Offset for Fixed Nav ───────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 72;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ─── Terminal Stagger Animation ───────────────────────────
const termLines = document.querySelectorAll('.terminal-body .t-line');
termLines.forEach((line, i) => {
  line.style.opacity = '0';
  setTimeout(() => {
    line.style.transition = 'opacity 0.3s ease';
    line.style.opacity = '1';
  }, 600 + i * 180);
});

// ─── Console Easter Egg ───────────────────────────────────
console.log('%c[ajinkya@portfolio ~]$ ', 'color:#4d9fff;font-family:monospace;font-weight:bold', '');
console.log('%cwhoami', 'color:#e8eaf0;font-family:monospace', '');
console.log('%cAjinkya Bhosale — Aspiring SOC Analyst & Security Engineer', 'color:#9aa3b8;font-family:monospace', '');
console.log('%c\ncat ./contact.txt', 'color:#e8eaf0;font-family:monospace', '');
console.log('%cbhosaleajinkya2205@gmail.com', 'color:#3dd68c;font-family:monospace', '');
console.log('%c\nLooking for opportunities! Reach out 👋', 'color:#4d9fff;font-family:monospace;font-size:14px', '');
