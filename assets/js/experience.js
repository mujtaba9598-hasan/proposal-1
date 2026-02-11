/* =========================================
   PROJECT-03: BLUEPRINT STUDIO EXPERIENCE
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    initControlBar();
    initMinimap();
    initSearchSpotlight();
    initConveyors();
    initCompareView();
    // checkRTL(); // REMOVED: English Only
    initContactForm();
    initProjectLightbox();
});

/* --- 1. CONTROL BAR & NAVIGATION --- */
function initControlBar() {
    // Create Control Bar if not present (or we can inject it via JS to save HTML edits)
    // For this task, we will assume we inject it or it's in the HTML. 
    // Let's inject it to ensure it exists without heavy HTML rewriting if possible.

    const body = document.body;

    // Check if control bar exists, if not create it
    if (!document.querySelector('.control-bar')) {
        const nav = document.createElement('nav');
        nav.className = 'control-bar';
        nav.innerHTML = `
            <a href="index.html" class="nav-link" data-module="home"><span class="nav-prefix">SYS/</span>Overview</a>
            <div class="nav-divider"></div>
            <a href="services.html" class="nav-link" data-module="services"><span class="nav-prefix">MOD/</span>Services</a>
            <a href="projects.html" class="nav-link" data-module="projects"><span class="nav-prefix">MOD/</span>Projects</a>
            <a href="about.html" class="nav-link" data-module="about"><span class="nav-prefix">DAT/</span>About</a>
            <a href="contact.html" class="nav-link" data-module="contact"><span class="nav-prefix">REQ/</span>Contact</a>
            <div class="nav-divider"></div>
            <button id="btn-search-trigger" class="btn-blueprint-secondary" style="padding:6px 12px; font-size:0.8rem;">
                <i class="fa-solid fa-magnifying-glass"></i> <span class="nav-prefix">CTRL+K</span>
            </button>
        `;
        body.prepend(nav);
    }

    // Active state based on URL
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.control-bar .nav-link');
    links.forEach(link => {
        if (link.href.includes(currentPath.split('/').pop())) {
            link.classList.add('active');
        }
    });
}


/* --- 2. INTERACTIVE MINIMAP --- */
function initMinimap() {
    const sections = document.querySelectorAll('section, header, footer');
    if (sections.length < 2) return;

    const mapContainer = document.createElement('div');
    mapContainer.className = 'blueprint-minimap';

    sections.forEach((section, index) => {
        if (!section.id) section.id = `section-${index}`;

        const node = document.createElement('div');
        node.className = 'minimap-node';
        node.title = section.id;
        node.onclick = () => {
            section.scrollIntoView({ behavior: 'smooth' });
        };
        mapContainer.appendChild(node);
    });

    document.body.appendChild(mapContainer);

    // Scroll Spy
    const nodes = document.querySelectorAll('.minimap-node');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        nodes.forEach((node, idx) => {
            node.classList.remove('active');
            if (sections[idx].id === current) {
                node.classList.add('active');
            }
        });
    });
}


/* --- 3. SEARCH SPOTLIGHT --- */
function initSearchSpotlight() {
    const backdrop = document.createElement('div');
    backdrop.className = 'search-modal-backdrop';
    backdrop.innerHTML = `
        <div class="search-modal">
            <input type="text" class="search-input" placeholder="SEARCH SYSTEM NODES..." autofocus>
            <div class="search-results" style="padding: 1rem; color: var(--muted); font-family: var(--font-mono);">
                TYPE TO NAVIGATE...
            </div>
        </div>
    `;
    document.body.appendChild(backdrop);

    const input = backdrop.querySelector('input');
    const trigger = document.getElementById('btn-search-trigger');

    function openSearch() {
        backdrop.style.display = 'grid';
        input.focus();
    }

    function closeSearch() {
        backdrop.style.display = 'none';
    }

    // Toggle on Click
    if (trigger) trigger.addEventListener('click', openSearch);

    // Close on click outside
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) closeSearch();
    });

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
        if (e.key === 'Escape') closeSearch();
    });

    // Mock Search Functionality (Navigation)
    input.addEventListener('input', (e) => {
        const val = e.target.value.toLowerCase();
        const results = backdrop.querySelector('.search-results');
        if (val.length < 2) {
            results.innerHTML = 'TYPE TO NAVIGATE...';
            return;
        }

        // Search in page links
        const links = Array.from(document.querySelectorAll('a')).filter(a => a.innerText.length > 0);
        const matches = links.filter(a => a.innerText.toLowerCase().includes(val)).slice(0, 5);

        if (matches.length > 0) {
            results.innerHTML = matches.map(a => `
                <div style="padding: 0.5rem; cursor: pointer; border-bottom: 1px solid var(--line);" 
                     onclick="window.location='${a.href}'">
                    ACCESS: ${a.innerText}
                </div>
            `).join('');
        } else {
            results.innerHTML = 'NO MODULES FOUND.';
        }
    });
}


/* --- 4. CONVEYOR LOGIC (Horizontal Scroll) --- */
function initConveyors() {
    const conveyors = document.querySelectorAll('.horizontal-conveyor');
    conveyors.forEach(el => {
        el.addEventListener('wheel', (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        });
    });
}


/* --- 5. COMPARE VIEW (Services) --- */
function initCompareView() {
    // Look for service grid to toggle view
    // This assumes we add a specific class to the service container
    const serviceGrid = document.querySelector('.service-grid-view'); // Placeholder class
    if (!serviceGrid) return;

    // Add logic here if we implement the Compare View specific UI
}


/* --- 6. RTL SUPPORT --- */
function checkRTL() {
    const html = document.documentElement;
    if (getComputedStyle(html).direction === 'rtl') {
        html.setAttribute('dir', 'rtl');
        document.body.classList.add('is-rtl');
    }
}

/* --- 7. CONTACT FORM LOGIC (SPRINT COMPONENT 1) --- */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const statusDiv = document.getElementById('form-status');
    const btn = document.getElementById('btn-transmit');
    const originalBtnText = btn.innerHTML;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Simulation Loading State
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> TRANSMITTING...';
        statusDiv.style.display = 'none';

        // 2. Validate (Basic)
        const name = document.getElementById('input-name').value;
        const phone = document.getElementById('input-phone').value;

        if (name.length < 2 || phone.length < 5) {
            setTimeout(() => {
                showStatus('ERROR: INVALID USER DATA provided.', 'error');
                resetBtn();
            }, 500);
            return;
        }

        // 3. Simulate API Call (2 Seconds)
        setTimeout(() => {
            // SUCCESS
            showStatus('UPLINK ESTABLISHED. DATA PACKET RECEIVED.', 'success');
            form.reset();
            resetBtn();

            // NOTE: Here is where you would add:
            // fetch('send_mail.php', { method: 'POST', body: new FormData(form) });
        }, 2000);
    });

    function showStatus(msg, type) {
        statusDiv.style.display = 'flex';
        statusDiv.className = `alert-box alert-${type}`;
        statusDiv.innerHTML = `
            <i class="fa-solid ${type === 'success' ? 'fa-check-circle' : 'fa-triangle-exclamation'}"></i>
            <span>${msg}</span>
        `;
    }

    function resetBtn() {
        btn.disabled = false;
        btn.innerHTML = originalBtnText;
    }
}

/* --- 8. PROJECT LIGHTBOX (3D "PREMIUM INSPECTOR" EDITION) --- */
function initProjectLightbox() {
    // 1. Create Modal HTML Structure if not exists
    if (!document.querySelector('.lightbox-overlay')) {
        const modal = document.createElement('div');
        modal.className = 'lightbox-overlay';
        modal.innerHTML = `
            <div class="lightbox-close"><i class="fa-solid fa-xmark"></i></div>
            <div class="lightbox-3d-perspective">
                <!-- Main Stage -->
                <div class="lightbox-main-stage">
                    <img src="" class="lightbox-main-img" alt="Main View">
                    <div class="lightbox-counter">
                        <i class="fa-solid fa-layer-group"></i> 
                        <span id="lb-current">1</span> / <span id="lb-total">1</span>
                    </div>
                </div>
                <!-- 3.5D Side Stack -->
                <div class="lightbox-card-stack" id="lightbox-stack">
                    <!-- JS fills this -->
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    const modal = document.querySelector('.lightbox-overlay');
    const mainImg = modal.querySelector('.lightbox-main-img');
    const stackContainer = document.querySelector('#lightbox-stack');
    const closeBtn = modal.querySelector('.lightbox-close');
    const counterCurrent = modal.querySelector('#lb-current');
    const counterTotal = modal.querySelector('#lb-total');
    const counterEl = modal.querySelector('.lightbox-counter');

    // 2. Open Logic (Public Function)
    window.open3DLightbox = function (mainSrc, stackImages = []) {
        mainImg.src = mainSrc;
        stackContainer.innerHTML = ''; // Clear previous

        // Normalize: If no stack provided, just show main (fallback)
        if (!stackImages.length) {
            stackImages = [mainSrc];
        }

        // Set Total Count
        counterTotal.innerText = stackImages.length;

        let currentIndex = 0; // State tracking

        // Helper: Render Stack
        function renderStack() {
            stackContainer.innerHTML = '';
            stackImages.forEach((src, index) => {
                const card = document.createElement('div');
                card.className = `lightbox-mini-card ${index === currentIndex ? 'active' : ''}`;
                card.innerHTML = `<img src="${src}" alt="Detail ${index}">`;

                // Interaction: Click to Jump
                card.addEventListener('click', (e) => {
                    e.stopPropagation();
                    updateView(index);
                });

                stackContainer.appendChild(card);
            });
        }

        // Helper: Update View (Image Swapping)
        function updateView(index) {
            if (index < 0) index = stackImages.length - 1;
            if (index >= stackImages.length) index = 0;

            currentIndex = index;

            // UPDATE COUNTER
            if (counterCurrent) counterCurrent.innerText = currentIndex + 1;

            const src = stackImages[currentIndex];

            // 1. Update Stack UI
            document.querySelectorAll('.lightbox-mini-card').forEach((c, i) => {
                c.classList.toggle('active', i === currentIndex);
            });

            // 2. Scroll Stack to Keep Active in View
            const activeCard = stackContainer.children[currentIndex];
            if (activeCard) {
                activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            }

            // 3. Swap Main Image
            if (mainImg.src !== src) {
                gsap.to(mainImg, {
                    opacity: 0, duration: 0.2, onComplete: () => {
                        mainImg.src = src;
                        gsap.to(mainImg, { opacity: 1, duration: 0.2 });
                    }
                });
            }
        }

        // Render Initial
        renderStack();
        updateView(0); // Set first as active

        // Show Modal
        modal.classList.add('active');

        // Animate Entrance
        gsap.fromTo(".lightbox-main-stage",
            { rotationY: -10, opacity: 0, x: -50 },
            { rotationY: 0, opacity: 1, x: 0, duration: 0.8, ease: "power4.out" }
        );
        gsap.fromTo(".lightbox-mini-card",
            { x: 100, opacity: 0, rotationY: -45 },
            { x: 0, opacity: 1, rotationY: 0, duration: 0.6, stagger: 0.1, delay: 0.2 }
        );
        // Animate Counter
        gsap.to(counterEl, { opacity: 1, y: 0, delay: 0.5, duration: 0.5 });

        // --- NAVIGATION HANDLERS ---
        // 1. Keyboard
        const keyHandler = (e) => {
            if (!modal.classList.contains('active')) return;
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                updateView(currentIndex + 1);
            }
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                updateView(currentIndex - 1);
            }
            if (e.key === 'Escape') closeModal();
        };
        document.addEventListener('keydown', keyHandler);

        // 2. Mouse Wheel
        const wheelHandler = (e) => {
            if (!modal.classList.contains('active')) return;
            e.preventDefault(); // Stop page scroll
            if (e.deltaY > 0) updateView(currentIndex + 1);
            else updateView(currentIndex - 1);
        };
        modal.addEventListener('wheel', wheelHandler, { passive: false });

        // CLEANUP on Close
        window._lightboxCleanup = () => {
            document.removeEventListener('keydown', keyHandler);
            modal.removeEventListener('wheel', wheelHandler);
        };
    };

    // 3. Close Logic
    function closeModal() {
        if (window._lightboxCleanup) window._lightboxCleanup();
        modal.classList.remove('active');
        setTimeout(() => { mainImg.src = ''; }, 300);
    }

    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('lightbox-3d-perspective')) closeModal();
    });
}
