/* ==========================================================================
   GLOBAL JAVASCRIPT - SCHRÖDER'S JOINERY
   ========================================================================== */

(function () {
    'use strict';

    // 1. Copyright Footer Year
    const yearEl = document.getElementById('footerYear');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // 2. Cursor Glow tracker
    const glowEl = document.getElementById('cursorGlow');
    if (glowEl) {
        window.addEventListener('mousemove', (e) => {
            glowEl.style.left = e.clientX + 'px';
            glowEl.style.top = e.clientY + 'px';
        }, { passive: true });
    }

    // 3. Sticky Logo Button scroll visibility
    const stickyLogo = document.getElementById('stickyLogo');
    const heroSection = document.getElementById('heroSection') || document.getElementById('pfHero');
    if (stickyLogo && heroSection) {
        const updateLogo = () => {
            const scrolled = window.scrollY;
            const threshold = heroSection.offsetHeight * 0.70;
            if (scrolled > threshold) {
                stickyLogo.classList.add('visible');
            } else {
                stickyLogo.classList.remove('visible');
            }
        };
        window.addEventListener('scroll', updateLogo, { passive: true });
        updateLogo();
    }

    // 4. Back To Top Button
    const btt = document.getElementById('bttBtn');
    if (btt) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > window.innerHeight * 0.5) {
                btt.classList.add('visible');
            } else {
                btt.classList.remove('visible');
            }
        }, { passive: true });
        btt.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 5. Mobile Navigation
    const mobileToggle = document.getElementById('heroMobileToggle');
    const mobileNav = document.getElementById('heroMobileNav');
    const mobileNavBackdrop = mobileNav ? mobileNav.querySelector('[data-mobile-nav-close]') : null;
    const mobileNavLinks = mobileNav ? mobileNav.querySelectorAll('.hero-mobile-link') : [];
    let mobileNavTimer = null;

    function setMobileNavState(isOpen) {
        if (!mobileToggle) return;
        mobileToggle.setAttribute('aria-expanded', String(isOpen));
        mobileToggle.setAttribute('aria-label', isOpen ? 'Close site navigation' : 'Open site navigation');
        document.body.classList.toggle('mobile-nav-open', isOpen);
    }

    function openMobileNav() {
        if (!mobileToggle || !mobileNav) return;
        clearTimeout(mobileNavTimer);
        mobileNav.hidden = false;
        setMobileNavState(true);
        requestAnimationFrame(() => {
            mobileNav.classList.add('is-open');
        });
    }

    function closeMobileNav(options = {}) {
        if (!mobileToggle || !mobileNav) return;
        const { restoreFocus = true } = options;
        setMobileNavState(false);
        mobileNav.classList.remove('is-open');
        clearTimeout(mobileNavTimer);
        mobileNavTimer = setTimeout(() => {
            mobileNav.hidden = true;
        }, 360);
        if (restoreFocus) {
            mobileToggle.focus({ preventScroll: true });
        }
    }

    if (mobileToggle && mobileNav) {
        mobileToggle.addEventListener('click', () => {
            const isOpen = mobileToggle.getAttribute('aria-expanded') === 'true';
            if (isOpen) {
                closeMobileNav();
            } else {
                openMobileNav();
            }
        });

        if (mobileNavBackdrop) {
            mobileNavBackdrop.addEventListener('click', () => closeMobileNav());
        }

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                const href = link.getAttribute('href');
                if (!href) return;

                // Check if link is a hash on the current page
                const isHashOnly = href.startsWith('#');
                const currentPath = window.location.pathname;
                const linkPath = link.pathname;
                const isSamePageHash = isHashOnly || (linkPath === currentPath && link.hash);

                if (isSamePageHash) {
                    const hash = isHashOnly ? href : link.hash;
                    const targetEl = document.querySelector(hash);
                    if (targetEl) {
                        event.preventDefault();
                        closeMobileNav({ restoreFocus: false });
                        setTimeout(() => {
                            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }, 90);
                        return;
                    }
                }
                closeMobileNav({ restoreFocus: false });
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && mobileToggle.getAttribute('aria-expanded') === 'true') {
                closeMobileNav();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 700 && mobileToggle.getAttribute('aria-expanded') === 'true') {
                closeMobileNav({ restoreFocus: false });
            }
        });
    }

    // 6. Scroll-reveal intersections for high-end text/footer transitions
    const revealTargets = document.querySelectorAll('.sv-reveal, .sv-reveal-left, .sv-reveal-right, .svc-gold-rule, .site-footer');
    if ('IntersectionObserver' in window && revealTargets.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('vis');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });
        revealTargets.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        revealTargets.forEach(el => el.classList.add('vis'));
    }

})();
