/* ==========================================================================
   SERVICES PAGE SPECIFIC JAVASCRIPT - SCHRÖDER'S JOINERY
   ========================================================================== */

(function () {
    'use strict';

    // 1. Page Hero Particle Dust generator (matches index.html style)
    const dustContainer = document.getElementById('heroDust');
    if (dustContainer) {
        const DUST_COUNT = 15;
        for (let i = 0; i < DUST_COUNT; i++) {
            const p = document.createElement('div');
            p.className = 'ph-dust-p';
            const size = Math.random() * 2.2 + 0.6;
            const left = Math.random() * 100;
            const delay = Math.random() * 12;
            const dur = Math.random() * 14 + 10;
            const drift = (Math.random() - 0.5) * 80;
            p.style.cssText = `
                width: ${size}px;
                height: ${size}px;
                left: ${left}%;
                bottom: -5%;
                opacity: 0;
                animation-duration: ${dur}s;
                animation-delay: ${delay}s;
                --drift: ${drift}px;
            `;
            dustContainer.appendChild(p);
        }
    }

    // 2. Artisan Materials Panel Switcher
    const matButtons = document.querySelectorAll('.svc-material-btn');
    const matCards = document.querySelectorAll('.svc-material-card');
    const matBgs = document.querySelectorAll('.svc-material-display-bg');

    if (matButtons.length > 0) {
        matButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedMat = btn.dataset.material;

                // Toggle Button State
                matButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle Background State
                matBgs.forEach(bg => {
                    bg.classList.remove('active');
                    if (bg.classList.contains('mat-bg-' + selectedMat)) {
                        bg.classList.add('active');
                    }
                });

                // Toggle Card State
                matCards.forEach(card => {
                    card.classList.remove('active');
                    if (card.id === 'mat-' + selectedMat) {
                        card.classList.add('active');
                        // Triggers Janka fill bar load transition
                        const fill = card.querySelector('.svc-janka-fill');
                        if (fill) {
                            const initialWidth = fill.style.width;
                            fill.style.width = '0';
                            requestAnimationFrame(() => {
                                fill.style.width = initialWidth;
                            });
                        }
                    }
                });
            });
        });

        // Trigger Janka progress load on the initial active item
        setTimeout(() => {
            const activeFill = document.querySelector('.svc-material-card.active .svc-janka-fill');
            if (activeFill) {
                const initW = activeFill.style.width;
                activeFill.style.width = '0';
                requestAnimationFrame(() => {
                    activeFill.style.width = initW;
                });
            }
        }, 600);
    }

    // 3. FAQ Accordion Toggles
    const faqItems = document.querySelectorAll('.svc-faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const trigger = item.querySelector('.svc-faq-q');
            if (trigger) {
                trigger.addEventListener('click', () => {
                    const isOpen = item.classList.contains('open');

                    // Close all
                    faqItems.forEach(i => {
                        i.classList.remove('open');
                        const q = i.querySelector('.svc-faq-q');
                        if (q) q.setAttribute('aria-expanded', 'false');
                    });

                    // Toggle current
                    if (!isOpen) {
                        item.classList.add('open');
                        trigger.setAttribute('aria-expanded', 'true');
                    }
                });
            }
        });
    }

})();
