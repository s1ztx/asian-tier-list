/* File: js/navbar.js */

document.addEventListener('DOMContentLoaded', () => {
    Navbar.init();
});

const Navbar = {
    init() {
        this.nav = document.querySelector('.main-navigation');
        this.toggleBtn = document.querySelector('.mobile-menu-toggle');
        this.menu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.bindEvents();
        this.checkScroll();
        this.setActivePage();
    },

    bindEvents() {
        if (this.toggleBtn) {
            this.toggleBtn.addEventListener('click', () => this.toggleMobileMenu());
        }

        window.addEventListener('scroll', () => this.checkScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Close mobile menu when a link is clicked
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.menu.classList.contains('mobile-active')) {
                    this.toggleMobileMenu();
                }
            });
        });
    },

    toggleMobileMenu() {
        this.menu.classList.toggle('mobile-active');
        this.toggleBtn.classList.toggle('open');
        
        // Premium overlay effect injection for mobile open state
        if (this.menu.classList.contains('mobile-active')) {
            this.menu.style.display = 'flex';
            this.menu.style.flexDirection = 'column';
            this.menu.style.position = 'absolute';
            this.menu.style.top = 'var(--nav-height)';
            this.menu.style.left = '0';
            this.menu.style.width = '100%';
            this.menu.style.background = 'rgba(5, 5, 8, 0.95)';
            this.menu.style.backdropFilter = 'var(--glass-blur)';
            this.menu.style.padding = '2rem';
            this.menu.style.borderBottom = '1px solid var(--glass-border)';
            this.menu.style.gap = '1.5rem';
            this.menu.style.zIndex = 'var(--z-nav)';
            
            // Animate spans of toggle button to forms an X
            const spans = this.toggleBtn.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -5px)';
            }
        } else {
            this.menu.removeAttribute('style');
            const spans = this.toggleBtn.querySelectorAll('span');
            if (spans.length === 3) {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    },

    checkScroll() {
        if (!this.nav) return;
        
        if (window.scrollY > 20) {
            this.nav.style.background = 'rgba(5, 5, 8, 0.85)';
            this.nav.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            this.nav.style.height = '70px';
        } else {
            this.nav.style.background = 'var(--glass-bg)';
            this.nav.style.boxShadow = 'none';
            this.nav.style.height = 'var(--nav-height)';
        }
    },

    handleResize() {
        if (window.innerWidth > 1024 && this.menu.classList.contains('mobile-active')) {
            this.toggleMobileMenu();
            this.menu.removeAttribute('style');
        }
    },

    setActivePage() {
        const currentPath = window.location.pathname.split('/').pop();
        
        this.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (currentPath === href || (currentPath === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
};
