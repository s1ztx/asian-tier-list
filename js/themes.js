/* File: js/themes.js */

document.addEventListener('DOMContentLoaded', () => {
    ThemeEngine.init();
});

const ThemeEngine = {
    init() {
        this.detectCurrentPageTheme();
        this.applyDynamicAtmosphereEffects();
    },

    detectCurrentPageTheme() {
        const body = document.body;
        const pageClasses = Array.from(body.classList);
        const homeWrapper = document.getElementById('home-background-wrapper');

        // Dynamically inject specific overlay components safely if they are missing
        if (body.classList.contains('page-rules')) {
            this.injectOverlayElement('rules-background-wrapper', 'digital-lines');
        } else if (body.classList.contains('page-announcements')) {
            this.injectOverlayElement('announcements-background-wrapper', 'news-glow-overlay');
        } else if (body.classList.contains('page-staff')) {
            this.injectOverlayElement('staff-background-wrapper', 'spotlight-effect');
        } else if (body.classList.contains('page-testers')) {
            this.injectOverlayElement('testers-background-wrapper', 'pvp-energy');
        } else if (body.classList.contains('page-leaderboards')) {
            this.injectOverlayElement('leaderboards-background-wrapper', 'data-streams');
        } else if (body.classList.contains('page-reviews')) {
            this.injectOverlayElement('reviews-background-wrapper', 'soft-glow-overlay');
        } else if (body.classList.contains('page-profile')) {
            this.injectOverlayElement('profile-background-wrapper', 'energy-rings');
        } else if (body.classList.contains('page-owner')) {
            this.injectOverlayElement('owner-background-wrapper', 'command-grid');
        } else if (body.classList.contains('page-application')) {
            this.injectOverlayElement('application-background-wrapper', 'recruitment-spotlight');
        }
    },

    injectOverlayElement(wrapperId, className) {
        let wrapper = document.getElementById(wrapperId);
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.id = wrapperId;
            document.body.insertBefore(wrapper, document.body.firstChild);
        }
        
        if (!wrapper.querySelector(`.${className}`)) {
            const overlay = document.createElement('div');
            overlay.className = className;
            wrapper.appendChild(overlay);
        }
    },

    applyDynamicAtmosphereEffects() {
        // High-end mouse track lighting effect across page panels for premium design feel
        document.addEventListener('mousemove', (e) => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            const moveX = (e.clientX / width) * 100;
            const moveY = (e.clientY / height) * 100;

            const aurora = document.querySelector('.aurora-effect');
            if (aurora) {
                aurora.style.background = `
                    radial-gradient(circle at ${moveX}% ${moveY}%, rgba(255, 70, 85, 0.07) 0%, transparent 50%),
                    radial-gradient(circle at ${100 - moveX}% ${100 - moveY}%, rgba(43, 192, 255, 0.07) 0%, transparent 40%)
                `;
            }

            const spotlight = document.querySelector('.spotlight-effect');
            if (spotlight) {
                const targetX = ((e.clientX / width) * 40) + 30; // Clamp between 30% and 70%
                spotlight.style.left = `${targetX}%`;
                spotlight.style.transition = 'left 0.1s ease-out';
            }
        });
    }
};
