// ===== Global Variables =====
let lastScroll = 0;

// ===== Navigation Functions =====
function initNavigation() {
    const nav = document.getElementById('mainNav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');
    const navLinkElements = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    navLinkElements.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Hide/show nav on scroll
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            nav.classList.add('nav-hidden');
        } else {
            nav.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('data-section') === sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== Hero Section Functions =====
function initHeroAnimations() {
    // Typing animation
    const typingText = document.getElementById('typingText');
    const roles = [
        'Cybersecurity Enthusiast',
        'Penetration Tester',
        'Full-Stack Developer',
        'SIEM Specialist',
        'Security Researcher'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeRole() {
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause at end
            } else {
                typingSpeed = 100;
            }
        } else {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typingSpeed = 500; // Pause before next word
            } else {
                typingSpeed = 50;
            }
        }

        setTimeout(typeRole, typingSpeed);
    }

    typeRole();

    // Animated counter for stats
    animateStats();
}

function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50;
    const isDecimal = target % 1 !== 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = isDecimal ? target.toFixed(2) : Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
        }
    }, 30);
}

// ===== Matrix Background Animation =====
function initMatrixBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const matrixBg = document.getElementById('matrixBg');

    matrixBg.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(5, 8, 18, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(drawMatrix, 50);

    // Resize canvas on window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ===== Skills Section Functions =====
function initSkillsAnimation() {
    const skillItems = document.querySelectorAll('.skill-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const level = entry.target.getAttribute('data-level');
                const progressBar = entry.target.querySelector('.skill-progress');

                setTimeout(() => {
                    progressBar.style.width = level + '%';
                }, 200);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    skillItems.forEach(item => observer.observe(item));
}

// ===== Projects Section Functions =====
function initProjectsInteractions() {
    const demoButtons = document.querySelectorAll('.demo-btn');
    const modal = document.getElementById('projectModal');
    const modalBody = document.getElementById('modalBody');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = modal.querySelector('.modal-overlay');

    const projectDetails = {
        'hids': {
            title: 'Host-Based Intrusion Detection System',
            tech: 'Python, Flask, HTML, CSS, Gmail API',
            description: 'A comprehensive security monitoring solution that provides real-time threat detection and alerting.',
            features: [
                {
                    title: 'Real-Time Process Monitoring',
                    description: 'Continuously monitors running processes to detect suspicious programs and potential threats.'
                },
                {
                    title: 'File Integrity Checking',
                    description: 'Uses SHA-256 hashing to verify file integrity and detect unauthorized modifications to critical system files.'
                },
                {
                    title: 'Log Analysis Module',
                    description: 'Analyzes system logs to identify unusual login patterns, failed authentication attempts, and potential brute-force attacks.'
                },
                {
                    title: 'Automated Email Alerts',
                    description: 'Integrates with Gmail API to send instant notifications to administrators when security events are detected.'
                },
                {
                    title: 'Web Dashboard',
                    description: 'Provides a user-friendly interface to visualize system health, view alert history, and monitor detection statistics.'
                },
                {
                    title: 'High Detection Rate',
                    description: 'Achieved 95% detection rate for simulated attacks including brute-force attempts, rootkits, and privilege escalation exploits.'
                }
            ],
            impact: 'This system significantly enhances endpoint security by providing comprehensive monitoring and rapid incident response capabilities.'
        },
        'honeypot': {
            title: 'Python-Based Honeypot',
            tech: 'Python, Socket Programming, Multithreading, JSON/CSV',
            description: 'A deception-based security tool designed to attract and analyze malicious activities.',
            features: [
                {
                    title: 'Multi-Port Simulation',
                    description: 'Simulates common service ports including SSH (22), FTP (21), HTTP (80), and HTTPS (443) to attract various types of attacks.'
                },
                {
                    title: 'Multithreaded Architecture',
                    description: 'Uses Python threading to handle multiple simultaneous connections and provide realistic server behavior.'
                },
                {
                    title: 'Attacker Profiling',
                    description: 'Captures and logs attacker IP addresses, connection timestamps, and request patterns for behavioral analysis.'
                },
                {
                    title: 'Response Mimicry',
                    description: 'Generates realistic server responses to keep attackers engaged and gather more intelligence.'
                },
                {
                    title: 'Structured Data Logging',
                    description: 'Stores all captured data in JSON and CSV formats for easy analysis and visualization.'
                },
                {
                    title: 'Intrusion Pattern Analysis',
                    description: 'Enables security researchers to study attack methodologies and develop better defense strategies.'
                }
            ],
            impact: 'Provides valuable threat intelligence by capturing real-world attack attempts and helping organizations understand their threat landscape.'
        },
        'wazuh': {
            title: 'Wazuh SIEM & Vulnerability Monitoring',
            tech: 'Linux, Wazuh, Elasticsearch, Log Analysis',
            description: 'Enterprise-grade security information and event management solution for comprehensive threat detection.',
            features: [
                {
                    title: 'Centralized Log Collection',
                    description: 'Aggregates security logs from multiple sources including system logs, application logs, and network devices.'
                },
                {
                    title: 'File Integrity Monitoring',
                    description: 'Monitors critical system files and directories for unauthorized changes, deletions, or modifications.'
                },
                {
                    title: 'Vulnerability Detection',
                    description: 'Performs continuous vulnerability scanning and correlates findings with threat intelligence feeds.'
                },
                {
                    title: 'Authentication Tracking',
                    description: 'Monitors authentication events including successful and failed login attempts across the network.'
                },
                {
                    title: 'Real-Time Alerting',
                    description: 'Generates immediate alerts for security incidents based on predefined rules and behavioral analysis.'
                },
                {
                    title: 'Compliance Reporting',
                    description: 'Helps organizations meet security compliance requirements through automated reporting and audit trails.'
                }
            ],
            impact: 'Enhances organizational security posture through proactive threat detection and comprehensive security monitoring.'
        },
        'food-app': {
            title: 'Android Food Delivery Application',
            tech: 'Java, Android Studio, XML, Firebase, API Integration',
            description: 'A full-featured mobile application for online food ordering with real-time tracking capabilities.',
            features: [
                {
                    title: 'User Authentication',
                    description: 'Secure Firebase-based authentication system with email/password and social login options.'
                },
                {
                    title: 'Real-Time Order Tracking',
                    description: 'Live updates on order status from preparation to delivery using Firebase Realtime Database.'
                },
                {
                    title: 'Interactive Menu System',
                    description: 'Browse restaurant menus with detailed dish descriptions, images, and pricing information.'
                },
                {
                    title: 'Shopping Cart',
                    description: 'User-friendly cart system with item customization and order summary features.'
                },
                {
                    title: 'Firebase Integration',
                    description: 'Backend powered by Firebase for data storage, authentication, and real-time synchronization.'
                },
                {
                    title: 'Intuitive UI/UX',
                    description: 'Clean and modern interface designed following Material Design guidelines for optimal user experience.'
                }
            ],
            impact: 'Demonstrates full-stack mobile development skills with modern Android architecture and cloud integration.'
        }
    };

    demoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const projectType = button.getAttribute('data-project');
            const project = projectDetails[projectType];

            if (project) {
                showProjectModal(project);
            }
        });
    });

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);

    function showProjectModal(project) {
        const featuresHTML = project.features.map(feature => `
            <div class="modal-feature">
                <div class="modal-feature-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <polyline points="20 6 9 17 4 12"/>
                    </svg>
                </div>
                <div class="modal-feature-content">
                    <h4>${feature.title}</h4>
                    <p>${feature.description}</p>
                </div>
            </div>
        `).join('');

        modalBody.innerHTML = `
            <div class="modal-project">
                <h2 class="modal-title">${project.title}</h2>
                <div class="modal-tech">
                    <strong>Technologies:</strong> ${project.tech}
                </div>
                <p class="modal-description">${project.description}</p>
                
                <h3 class="modal-section-title">Key Features</h3>
                <div class="modal-features-grid">
                    ${featuresHTML}
                </div>
                
                <div class="modal-impact">
                    <h3 class="modal-section-title">Impact & Significance</h3>
                    <p>${project.impact}</p>
                </div>
            </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Add modal styles dynamically
function addModalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .modal-project {
            color: var(--text-primary);
        }

        .modal-title {
            font-family: var(--font-display);
            font-size: 2rem;
            color: var(--primary-cyan);
            margin-bottom: 1rem;
            text-shadow: 0 0 20px var(--primary-cyan);
        }

        .modal-tech {
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 1.5rem;
            padding: 1rem;
            background: rgba(0, 255, 136, 0.05);
            border-left: 3px solid var(--primary-cyan);
        }

        .modal-tech strong {
            color: var(--primary-cyan);
        }

        .modal-description {
            color: var(--text-secondary);
            line-height: 1.8;
            margin-bottom: 2rem;
            font-size: 1.05rem;
        }

        .modal-section-title {
            font-family: var(--font-display);
            font-size: 1.5rem;
            color: var(--text-primary);
            margin: 2rem 0 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--border-color);
        }

        .modal-features-grid {
            display: grid;
            gap: 1.5rem;
            margin-bottom: 2rem;
        }

        .modal-feature {
            display: flex;
            gap: 1rem;
            align-items: flex-start;
            padding: 1.5rem;
            background: rgba(15, 23, 42, 0.5);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            transition: all var(--transition-normal);
        }

        .modal-feature:hover {
            transform: translateX(5px);
            border-color: var(--primary-cyan);
            box-shadow: 0 5px 20px rgba(0, 255, 136, 0.1);
        }

        .modal-feature-icon {
            width: 32px;
            height: 32px;
            padding: 0.5rem;
            background: rgba(0, 255, 136, 0.1);
            border: 1px solid var(--border-color);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .modal-feature-icon svg {
            width: 100%;
            height: 100%;
            stroke: var(--primary-cyan);
            stroke-width: 3;
        }

        .modal-feature-content h4 {
            font-family: var(--font-display);
            font-size: 1.1rem;
            color: var(--primary-cyan);
            margin-bottom: 0.5rem;
        }

        .modal-feature-content p {
            color: var(--text-secondary);
            line-height: 1.7;
            font-size: 0.95rem;
        }

        .modal-impact {
            padding: 2rem;
            background: rgba(0, 255, 136, 0.05);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-top: 2rem;
        }

        .modal-impact p {
            color: var(--text-secondary);
            line-height: 1.8;
            font-size: 1.05rem;
        }
    `;
    document.head.appendChild(style);
}

// ===== Scroll Animations =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(
        '.education-card, .project-card, .contact-card, .social-card'
    );

    elementsToAnimate.forEach(el => observer.observe(el));
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Page Load Animation =====
function initPageLoadAnimation() {
    window.addEventListener('load', () => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===== Initialize All Functions =====
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initHeroAnimations();
    initMatrixBackground();
    initSkillsAnimation();
    initProjectsInteractions();
    initScrollAnimations();
    initSmoothScroll();
    initPageLoadAnimation();
    addModalStyles();

    // Add cursor effect
    document.addEventListener('mousemove', (e) => {
        const cursor = document.createElement('div');
        cursor.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary-cyan);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            opacity: 0.5;
            animation: cursorFade 0.5s ease-out forwards;
        `;
        document.body.appendChild(cursor);
        setTimeout(() => cursor.remove(), 500);
    });

    // Add cursor fade animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cursorFade {
            0% {
                transform: scale(1);
                opacity: 0.5;
            }
            100% {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
});


// ===== Console Easter Egg =====
console.log('%c🔒 Security Notice', 'color: #00ff88; font-size: 20px; font-weight: bold;');
console.log('%cThis portfolio was built with ❤️ by Ajinkya Bhosale', 'color: #94a3b8; font-size: 14px;');
console.log('%cInterested in cybersecurity? Let\'s connect!', 'color: #00ff88; font-size: 14px;');
console.log('%cEmail: bhosaleajinkya2205@gmail.com', 'color: #94a3b8; font-size: 12px;');