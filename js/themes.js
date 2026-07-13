// File: js/themes.js

/**
 * Asian Tier List (ATL) - Theme Management Engine
 * Handles persistent state switching between dark, light, and premium neon viewports.
 */

document.addEventListener('DOMContentLoaded', () => {
    const themeStorageKey = 'atl-theme-preference';
    const bodyElement = document.body;

    // Retrieve initial state from client configuration storage
    const cachedTheme = localStorage.getItem(themeStorageKey);
    
    if (cachedTheme) {
        setTheme(cachedTheme);
    } else {
        // Default structural system fallback
        setTheme('dark-theme');
    }

    /**
     * Set explicit network viewport theme classes safely
     * @param {string} themeName 
     */
    function setTheme(themeName) {
        // Enforce removal of all standard template configurations
        bodyElement.classList.remove('dark-theme', 'light-theme', 'neon-premium-theme');
        bodyElement.classList.add(themeName);
        localStorage.setItem(themeStorageKey, themeName);
    }

    // Expose utility globally for administration panel integrations
    window.ATL_ThemeEngine = {
        setTheme: setTheme,
        getTheme: () => localStorage.getItem(themeStorageKey) || 'dark-theme'
    };
});
