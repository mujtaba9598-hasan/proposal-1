// [Company Name] - Project-01 Main Script
// Implements: GSAP ScrollTrigger, Custom Cursor, RTL Toggle, Magnetic Buttons

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- 1. GLOBAL CURSOR GLOW ---
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    Object.assign(cursor.style, {
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 70%)',
        position: 'fixed', pointerEvents: 'none', borderRadius: '50%',
        zIndex: '9999', mixBlendMode: 'screen', transform: 'translate(-50%, -50%)',
        opacity: '0', transition: 'opacity 0.5s'
    });
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, opacity: 1, duration: 0.5, ease: 'power2.out' });
    });

    // --- 2. MAGNETIC BUTTONS ---
    const magBtns = document.querySelectorAll('.btn');
    magBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3 });
        });
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, { x: 0, y: 0, duration: 0.3 });
        });
    });

    // --- 3. HORIZONTAL SCROLL (For Services Section) ---
    // Look for a container with class .h-scroll-wrapper
    const scrollContainer = document.querySelector(".h-scroll-container");
    if (scrollContainer) {
        const sections = gsap.utils.toArray(".h-scroll-item");
        if (sections.length > 0) {
            gsap.to(sections, {
                xPercent: -100 * (sections.length - 1),
                ease: "none",
                scrollTrigger: {
                    trigger: ".h-scroll-wrapper",
                    pin: true,
                    scrub: 1,
                    snap: 1 / (sections.length - 1),
                    end: "+=3000", // Scroll distance
                }
            });
        }
    }

    // --- 4. HERO PARALLAX ---
    gsap.to(".hero-bg", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        yPercent: 30,
        scale: 1.1
    });

    // --- 5. RTL TOGGLE LOGIC ---
    // Check local storage
    if (localStorage.getItem('[BRAND]-lang') === 'ar') {
        enableRTL();
    }

    window.toggleLang = function () {
        const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
        if (isRTL) {
            document.documentElement.setAttribute('dir', 'ltr');
            localStorage.setItem('[BRAND]-lang', 'en');
        } else {
            enableRTL();
        }
    };

    function enableRTL() {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('[BRAND]-lang', 'ar');
    }
});

// Mobile Menu
function toggleMenu() {
    document.getElementById('mobile-nav').classList.toggle('active');
}
