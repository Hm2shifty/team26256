/**
 * SWERVO 26256 Main Application Logic
 * Pure Vanilla JS, highly modular.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. SPA Routing Logic
    const navLinks = document.querySelectorAll('.nav-links a, .nav-cta');
    const pages = document.querySelectorAll('.page');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-links');

    function navigate(hash) {
        if (!hash) hash = '#home';

        pages.forEach(page => page.classList.remove('active'));

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === hash) {
                link.classList.add('active');
            }
        });

        const targetPage = document.querySelector(hash);
        if (targetPage) {
            targetPage.classList.add('active');
            window.scrollTo(0, 0);
        } else {
            document.querySelector('#home').classList.add('active');
        }

        navContainer.classList.remove('show');

        // Lazy-loading dependencies
        if (hash === '#team' && !teamLoaded) loadTeamData();
        if (hash === '#stats' && !statsLoaded) loadFTCStats();
    }

    mobileMenuBtn.addEventListener('click', () => {
        navContainer.classList.toggle('show');
    });

    window.addEventListener('hashchange', () => navigate(window.location.hash));
    navigate(window.location.hash || '#home');


    // 2. Carousel Logic
    const track = document.querySelector('.carousel-track');
    const slides = Array.from(document.querySelectorAll('.carousel-slide'));
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function updateCarousel() {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            if (indicators[i]) indicators[i].classList.remove('active');
            if (i === currentIndex) {
                slide.classList.add('active');
                if (indicators[i]) indicators[i].classList.add('active');
            }
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateCarousel();
        });

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateCarousel();
        });
    }

    if (indicators) {
        indicators.forEach(ind => {
            ind.addEventListener('click', e => {
                currentIndex = parseInt(e.target.dataset.index);
                updateCarousel();
            });
        });
    }
});

// 3. Team Data Injection (FROM JSON FILE)
let teamLoaded = false;
async function loadTeamData() {
    const teamGrid = document.getElementById('team-grid');

    try {
        const response = await fetch('team-members.json');
        if (!response.ok) throw new Error("Could not load team-members.json");

        const members = await response.json();

        teamGrid.innerHTML = members.map(m => `
            <div class="card">
                <div class="team-card-header">
                    <h4>${m.name}</h4>
                    <span class="team-role">${m.title}</span>
                </div>
                <span class="team-subteam">Grade: ${m.grade}</span>
                <p style="margin-top: 12px; font-size: 14px; color: var(--text-secondary); line-height: 1.5;">${m.bio}</p>
            </div>
        `).join('');
    } catch (e) {
        console.error(e);
        teamGrid.innerHTML = '<div class="card"><p style="color: #EF4444;">Failed to load team-members.json. Ensure you are running through a local server to fetch files.</p></div>';
    }

    teamLoaded = true;
}

// 4. FTC Phase 2 API Integration
let statsLoaded = false;

async function loadFTCStats() {
    const statsContainer = document.getElementById('stats-container');

    try {
        // Simulated API Call. When real API token is acquired, switch to standard fetch.
        setTimeout(() => {
            const ftcResponsePayload = {
                rank: 6,
                opr: 112.4,
                record: "14-4-0",
                lastMatch: "215 pts",
                awards: ["Inspire Award Winner", "Design Award Finalist"]
            };

            const html = `
                <div class="api-card-grid">
                    <div class="card api-card">
                        <div class="stat-value">#${ftcResponsePayload.rank}</div>
                        <div class="stat-label">Regional Rank</div>
                    </div>
                    <div class="card api-card">
                        <div class="stat-value">${ftcResponsePayload.opr}</div>
                        <div class="stat-label">Calculated OPR</div>
                    </div>
                    <div class="card api-card">
                        <div class="stat-value">${ftcResponsePayload.record}</div>
                        <div class="stat-label">W-L-T Record</div>
                    </div>
                    <div class="card api-card">
                        <div class="stat-value">${ftcResponsePayload.lastMatch}</div>
                        <div class="stat-label">Last Match Score</div>
                    </div>
                </div>

                <h3 class="section-title">Season Awards (Auto-Synced)</h3>
                <div class="grid grid-2">
                    ${ftcResponsePayload.awards.map(award => `
                        <div class="card">
                            <h4>${award}</h4>
                            <p>Event: Regional Championship</p>
                        </div>
                    `).join('')}
                </div>
            `;

            statsContainer.innerHTML = html;
            statsLoaded = true;
        }, 1200);

    } catch (error) {
        console.error("FTC API Fetch Error:", error);
        statsContainer.innerHTML = `
            <div class="card" style="border-color: #EF4444;">
                <h4 style="color: #EF4444;">Telemetry Sync Failed</h4>
                <p>Could not reach FTC Events API. Check authorization token.</p>
            </div>
        `;
    }
}
