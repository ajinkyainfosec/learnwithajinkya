// Small behavior: nav toggle, smooth scroll, contact form handling, dynamic year
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const nav = document.querySelector('.nav-links');
        const expanded = nav.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', expanded);
    });
}

document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
});

document.getElementById('year').textContent = new Date().getFullYear();

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const msg = document.getElementById('formMsg');
        const form = e.target;
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        if (!name || !email || !message) { msg.textContent = 'Please complete all fields.'; return; }
        const mailto = `mailto:your.email@example.com?subject=${encodeURIComponent('Portfolio contact from ' + name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + name + ' <' + email + '>')}`;
        window.location.href = mailto;
        msg.textContent = 'Opening your email client...';
    });
}