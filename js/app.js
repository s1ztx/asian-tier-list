/* File: js/app.js */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Core Modules and Interactivity
    App.init();
});

const App = {
    init() {
        this.initMockAuth();
        this.setupCardInteractivity();
        this.setupGlowEffects();
    },

    initMockAuth() {
        // Default session state if not set
        if (!localStorage.getItem('atl_user_session')) {
            const defaultSession = {
                isLoggedIn: false,
                viewMode: 'Guest', // Options: Guest, Member, Tester, Owner
                username: 'GuestPlayer',
                discriminator: '0000',
                nickname: 'Guest',
                avatarUrl: '',
                roles: [],
                roleBadges: [],
                tierBadges: []
            };
            localStorage.setItem('atl_user_session', JSON.stringify(defaultSession));
        }

        // Bind events to the Discord Login Button across the application
        const loginButtons = document.querySelectorAll('.discord-login-btn');
        loginButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.simulateDiscordLogin();
            });
        });

        this.updateAuthUI();
    },

    simulateDiscordLogin() {
        const currentSession = JSON.parse(localStorage.getItem('atl_user_session'));
        
        if (!currentSession.isLoggedIn) {
            // Cycle through mock states for demonstration/testing purposes on frontend
            const mockUsers = [
                {
                    isLoggedIn: true,
                    viewMode: 'Member',
                    username: 'XenonPvP',
                    discriminator: '1337',
                    nickname: 'Xenon',
                    avatarUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%230f1923"/><text x="50" y="55" font-family="sans-serif" font-size="20" fill="white" text-anchor="middle">ME</text></svg>',
                    roles: ['Member'],
                    roleBadges: ['⚔️'],
                    tierBadges: ['Tier III']
                },
                {
                    isLoggedIn: true,
                    viewMode: 'Tester',
                    username: 'Krup',
                    discriminator: '4421',
                    nickname: 'Krup',
                    avatarUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%23ff4655"/><text x="50" y="55" font-family="sans-serif" font-size="20" fill="white" text-anchor="middle">TE</text></svg>',
                    roles: ['Moderator', 'Official Tester'],
                    roleBadges: ['🛡️', '🧪'],
                    tierBadges: ['Tier I']
                },
                {
                    isLoggedIn: true,
                    viewMode: 'Owner',
                    username: 's1ztx',
                    discriminator: '0001',
                    nickname: 's1ztx',
                    avatarUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" fill="%232bc0ff"/><text x="50" y="55" font-family="sans-serif" font-size="20" fill="white" text-anchor="middle">OW</text></svg>',
                    roles: ['Owner', 'Founder', 'Developer'],
                    roleBadges: ['👑', '💻', '🔮'],
                    tierBadges: ['God Tier']
                }
            ];

            // For simplicity, select standard Member on initial click or cycle through them
            const currentModeIndex = localStorage.getItem('atl_mock_index') || 0;
            const nextUser = mockUsers[currentModeIndex % mockUsers.length];
            
            localStorage.setItem('atl_user_session', JSON.stringify(nextUser));
            localStorage.setItem('atl_mock_index', parseInt(currentModeIndex) + 1);
        } else {
            // Log out state
            const guestSession = {
                isLoggedIn: false,
                viewMode: 'Guest',
                username: 'GuestPlayer',
                discriminator: '0000',
                nickname: 'Guest',
                avatarUrl: '',
                roles: [],
                roleBadges: [],
                tierBadges: []
            };
            localStorage.setItem('atl_user_session', JSON.stringify(guestSession));
        }

        this.updateAuthUI();
        window.location.reload();
    },

    updateAuthUI() {
        const session = JSON.parse(localStorage.getItem('atl_user_session'));
        const authContainer = document.querySelector('.auth-container');
        
        if (session && session.isLoggedIn && authContainer) {
            authContainer.innerHTML = `
                <div class="user-profile-display" style="display: flex; align-items: center; gap: 1rem; background: rgba(255,255,255,0.05); padding: 0.5rem 1rem; border-radius: 4px; border: 1px solid var(--glass-border);">
                    <img src="${session.avatarUrl}" alt="Avatar" style="width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--accent-blue-light);">
                    <div style="display: flex; flex-direction: column; align-items: flex-start;">
                        <span style="font-size: 0.85rem; font-weight: 700; color: white;">${session.nickname}</span>
                        <span style="font-size: 0.7rem; color: var(--text-muted); text-transform: uppercase; font-weight: 600;">${session.viewMode}</span>
                    </div>
                    <button class="logout-trigger" style="color: var(--accent-red); font-size: 0.8rem; margin-left: 0.5rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Exit</button>
                </div>
            `;

            const logoutTrigger = authContainer.querySelector('.logout-trigger');
            if (logoutTrigger) {
                logoutTrigger.addEventListener('click', () => this.simulateDiscordLogin());
            }
        }
    },

    setupCardInteractivity() {
        const cards = document.querySelectorAll('.gamemode-card-inner, .glassmorphism');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                card.style.setProperty('--mouse-x', `${x}px`);
                card.style.setProperty('--mouse-y', `${y}px`);
            });
        });
    },

    setupGlowEffects() {
        // Dynamic custom glow assignment for premium lighting properties on widgets
        const activeElements = document.querySelectorAll('.animated-glow');
        activeElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                element.style.transition = 'all var(--transition-fast)';
            });
        });
    }
};
