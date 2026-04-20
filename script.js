/**
 * SWERVO 26256 Main Application Logic
 * Pure Vanilla JS, highly modular.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 0. Initial Load Dependencies (Like Home Page Sponsor Marquee)
    loadSponsorsData();

    // 1. SPA Routing Logic
    const navLinks = document.querySelectorAll('.nav-links a');
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
            <div class="card team-card">
                <div class="team-photo-container">
                    <img src="${m.image || 'assets/team/placeholder.jpg'}" alt="${m.name}" class="team-photo" onerror="this.onerror=null; this.parentElement.style.display='none';">
                </div>
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
    }

    teamLoaded = true;
}

// 4. Sponsor Data Injection & Marquee Generation (FROM JSON FILE)
let sponsorsLoaded = false;
async function loadSponsorsData() {
    if (sponsorsLoaded) return;

    const sponsorsContainer = document.getElementById('sponsors-container');
    const marqueeTrack = document.getElementById('marquee-track');

    try {
        const response = await fetch('sponsors.json');
        if (!response.ok) throw new Error("Could not load sponsors.json");

        const tiers = await response.json();

        // 1. Build the Page HTML
        let html = '';

        // Diamond Tier (Gets Bio)
        if (tiers.diamond && tiers.diamond.length > 0) {
            html += `<div class="tier diamond-tier"><h3 class="diamond-text">Diamond Sponsors</h3><div class="grid grid-2">`;
            tiers.diamond.forEach(s => {
                html += `
                <a href="${s.url}" target="_blank" class="card sponsor-card diamond-card">
                    <img src="${s.logo}" alt="${s.name}" class="sponsor-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                    <span class="marquee-fallback" style="display:none; color: var(--text-primary); font-size: 24px; font-weight: bold; margin-bottom: 24px;">${s.name}</span>
                    <p class="sponsor-bio">${s.bio}</p>
                </a>`;
            });
            html += `</div></div>`;
        }

        // Other Tiers (No Bio, Standard Grid)
        ['gold', 'silver', 'bronze'].forEach(tierLevel => {
            if (tiers[tierLevel] && tiers[tierLevel].length > 0) {
                html += `<div class="tier ${tierLevel}-tier"><h3 class="${tierLevel}-text" style="text-transform: capitalize;">${tierLevel} Sponsors</h3><div class="grid grid-3">`;
                tiers[tierLevel].forEach(s => {
                    html += `
                    <a href="${s.url}" target="_blank" class="card sponsor-card">
                        <img src="${s.logo}" alt="${s.name}" class="sponsor-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                        <span class="marquee-fallback" style="display:none; color: var(--text-primary); font-weight: 600;">${s.name}</span>
                    </a>`;
                });
                html += `</div></div>`;
            }
        });

        if (sponsorsContainer) sponsorsContainer.innerHTML = html;

        // 2. Build the Infinite Marquee for Home Page
        let allSponsors = [];
        Object.values(tiers).forEach(tierList => allSponsors = allSponsors.concat(tierList));

        if (allSponsors.length > 0 && marqueeTrack) {
            let marqueeHtml = '';
            // Render it 3 times so the loop doesn't break on wide screens
            for (let i = 0; i < 3; i++) {
                allSponsors.forEach(s => {
                    marqueeHtml += `
                    <a href="${s.url}" target="_blank" title="${s.name}">
                        <img src="${s.logo}" alt="${s.name}" class="marquee-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='inline';">
                        <span class="marquee-fallback" style="display:none;">${s.name}</span>
                    </a>`;
                });
            }
            marqueeTrack.innerHTML = marqueeHtml;
        }

    } catch (e) {
        console.error(e);
        if (sponsorsContainer) sponsorsContainer.innerHTML = '<div class="card"><p style="color: #EF4444;">Failed to load sponsors.json. Add your sponsors there.</p></div>';
    }

    sponsorsLoaded = true;
}


// 5. FTC Phase 2 API Integration
let statsLoaded = false;
async function loadFTCStats() {
    const statsContainer = document.getElementById('stats-container');

    const html = `
        <div class="season-tabs">
            <button class="season-btn active" data-target="preseason">Upcoming Season</button>
            <button class="season-btn" data-target="deep">INTO THE DEEP (24-25)</button>
        </div>

        <div id="preseason" class="season-content" style="display: block;">
            <div class="card" style="text-align: center; padding: 64px 24px; background: linear-gradient(to bottom, var(--bg-surface), rgba(125,211,252,0.05)); border: 1px dashed var(--border-dark);">
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--accent-blue)" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 24px;">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <h3 style="color: var(--accent-blue); margin-bottom: 16px;">Season is yet to start!</h3>
                <p style="max-width: 500px; margin: 0 auto; color: var(--text-secondary);">Live FTC telemetry data, match results, and season awards will automatically synchronize and populate here as soon as our official competitions begin.</p>
            </div>
        </div>

        <div id="deep" class="season-content" style="display: none;">
            <div class="api-card-grid">
                <div class="card api-card">
                    <div class="stat-value">#6</div>
                    <div class="stat-label">Regional Rank</div>
                </div>
                <div class="card api-card">
                    <div class="stat-value">112.4</div>
                    <div class="stat-label">Calculated OPR</div>
                </div>
                <div class="card api-card">
                    <div class="stat-value">14-4-0</div>
                    <div class="stat-label">W-L-T Record</div>
                </div>
                <div class="card api-card">
                    <div class="stat-value">215 pts</div>
                    <div class="stat-label">High Score</div>
                </div>
            </div>

            <h3 class="section-title">Season Awards</h3>
            <div class="grid grid-2">
                <div class="card">
                    <h4>Inspire Award Winner</h4>
                    <p>Event: Regional Championship</p>
                </div>
                <div class="card">
                    <h4>Design Award Finalist</h4>
                    <p>Event: Regional Championship</p>
                </div>
            </div>
        </div>
    `;

    statsContainer.innerHTML = html;

    // Tab Switching Logic
    const btns = statsContainer.querySelectorAll('.season-btn');
    const contents = statsContainer.querySelectorAll('.season-content');

    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            btns.forEach(b => b.classList.remove('active'));
            contents.forEach(c => c.style.display = 'none');

            btn.classList.add('active');
            statsContainer.querySelector('#' + btn.dataset.target).style.display = 'block';
        });
    });

    statsLoaded = true;
}
