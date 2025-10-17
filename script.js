// Modern JavaScript for elegant interactions
class KylueskyApp {
    constructor() {
        this.isMenuOpen = false;
        this.init();
    }

    init() {
        console.log('🚀 Kyluesky Website Initialized');
        this.setupBurgerMenu();
        this.setupSmoothScrolling();
        this.setupAnimations();
        this.setupNavigation();
        this.setupParallax();
    }

    setupBurgerMenu() {
        const burgerBtn = document.getElementById('burgerBtn');
        const navMenu = document.getElementById('navMenu');
        const mobileOverlay = document.getElementById('mobileOverlay');

        const toggleMenu = () => {
            this.isMenuOpen = !this.isMenuOpen;
            burgerBtn.classList.toggle('active', this.isMenuOpen);
            navMenu.classList.toggle('active', this.isMenuOpen);
            mobileOverlay.classList.toggle('active', this.isMenuOpen);
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        };

        burgerBtn.addEventListener('click', toggleMenu);
        mobileOverlay.addEventListener('click', toggleMenu);

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    toggleMenu();
                }
            });
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                toggleMenu();
            }
        });
    }

    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for animation
        document.querySelectorAll('section, .service-card, .about-item').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s ease-out';
            observer.observe(el);
        });
    }

    setupNavigation() {
        // Update active nav link on scroll
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        const updateActiveNav = () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id') || 'home';
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').includes(current)) {
                    link.classList.add('active');
                }
            });
        };

        window.addEventListener('scroll', updateActiveNav);
    }

    setupParallax() {
        // Simple parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const shapes = document.querySelectorAll('.shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KylueskyApp();
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});
