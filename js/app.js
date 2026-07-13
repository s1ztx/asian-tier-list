// File: js/app.js

/**
 * Asian Tier List (ATL) - Central Front-end Coordination Script
 * Manages basic mock structures, local feedback triggers, and event listeners.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log("ATL Framework initialized safely under [1.8+] configuration layers.");

    // Simple interaction handling for login triggers
    const loginButtons = document.querySelectorAll('.discord-login-btn');
    loginButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            console.log("Redirecting network authentication route to Discord OAuth api endpoint...");
            // Real systems would window.location.href = OAuth2URL here
        });
    });

    // Handle form logging within Tester Control Panel safely
    const testerForm = document.querySelector('.page-tester form, .tester-card button');
    if (testerForm) {
        testerForm.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON' || e.target.type === 'submit') {
                alert("Log entry submitted locally! Verification database hook simulation complete.");
            }
        });
    }

    // Handle dynamic queue claim state animations inside Tester Panel
    const claimButtons = document.querySelectorAll('.btn-claim');
    claimButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const queueItem = e.target.closest('.queue-item');
            if (queueItem) {
                btn.textContent = "Claimed";
                btn.style.background = "rgba(0, 255, 136, 0.15)";
                btn.style.color = "#00ff88";
                btn.style.borderColor = "rgba(0, 255, 136, 0.3)";
                setTimeout(() => {
                    queueItem.style.opacity = '0';
                    setTimeout(() => queueItem.remove(), 300);
                }, 800);
            }
        });
    });
});
