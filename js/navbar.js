// File: js/navbar.js

/**
 * Asian Tier List (ATL) - Responsive Navigation Framework
 * Operates UI layer view state parameters for mobile navigation layers.
 */

document.addEventListener('DOMContentLoaded', () => {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const mainNav = document.querySelector('.main-navigation');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            // Toggle active visual structures across viewports
            mobileToggle.classList.toggle('open');
            navMenu.classList.toggle('active');
            
            if (mainNav) {
                mainNav.classList.toggle('menu-expanded');
            }
        });
    }

    // Window resize observer pattern to clean layout debris safely
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            if (mobileToggle && mobileToggle.classList.contains('open')) {
                mobileToggle.classList.remove('open');
                navMenu.classList.remove('active');
                if (mainNav) mainNav.classList.remove('menu-expanded');
            }
        }
    });
});
