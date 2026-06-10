/* ==========================================================================
   HOMEPAGE SPECIFIC JAVASCRIPT - SCHRÖDER'S JOINERY
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================
       HERO SLIDESHOW & HERO DUST PARTICLES
       ========================================== */
    (function () {
        const slides = [
            {
                eyebrow: 'Est. in craft',
                rider: 'Woodwork is',
                main: 'Our Business',
                sub: 'Schröder\'s Joinery',
                desc: 'Three generations of hands that read timber like a language — knowing where to cut, where to leave the wood to speak for itself.'
            },
            {
                eyebrow: 'Made to measure',
                rider: 'Everything we',
                main: 'do is Custom',
                sub: 'No templates. No shortcuts.',
                desc: 'We start with your space, your life, your rhythm — then build something that fits as if it were always meant to be there.'
            },
            {
                eyebrow: 'Our standard',
                rider: 'We believe',
                main: 'in Quality',
                sub: 'Uncompromised. Always.',
                desc: 'Joinery that outlasts fashion, holds its beauty through decades — and improves with the light of every passing year.'
            }
        ];

        const sliders = [
            document.getElementById('hSlide1'),
            document.getElementById('hSlide2'),
            document.getElementById('hSlide3')
        ];
        const activeClasses = ['active-s1', 'active-s2', 'active-s3'];

        const copyEl = document.getElementById('heroCopy');
        const eyebrowEl = document.getElementById('hEyebrow');
        const riderEl = document.getElementById('hRider');
        const mainEl = document.getElementById('hTitleMain');
        const subEl = document.getElementById('hTitleSub');
        const descEl = document.getElementById('hDesc');
        const counterEl = document.getElementById('hCounterCurr');
        const dotEls = document.querySelectorAll('.h-dot');
        const progressBar = document.getElementById('heroProgressBar');

        if (!copyEl || sliders.some(el => !el)) return;

        let current = 0;
        let timer = null;
        let progTimer = null;
        const DURATION = 7000;
        let progStart = null;

        function setCopy(idx) {
            const s = slides[idx];
            copyEl.classList.remove('vis');
            eyebrowEl.textContent = s.eyebrow;
            riderEl.textContent = s.rider;
            mainEl.textContent = s.main;
            subEl.textContent = s.sub;
            descEl.textContent = s.desc;
            counterEl.textContent = String(idx + 1).padStart(2, '0');
            requestAnimationFrame(() => {
                requestAnimationFrame(() => copyEl.classList.add('vis'));
            });
        }

        function setDots(idx) {
            dotEls.forEach((d, i) => d.classList.toggle('active', i === idx));
        }

        function startProgress() {
            progStart = performance.now();
            cancelAnimationFrame(progTimer);
            function tick(now) {
                const elapsed = now - progStart;
                const pct = Math.min((elapsed / DURATION) * 100, 100);
                progressBar.style.width = pct + '%';
                if (pct < 100) progTimer = requestAnimationFrame(tick);
            }
            progTimer = requestAnimationFrame(tick);
        }

        function goTo(idx) {
            const prev = current;
            current = idx;

            sliders[prev].classList.remove(activeClasses[prev]);
            sliders[prev].classList.add('leaving-slide');
            setTimeout(() => sliders[prev].classList.remove('leaving-slide'), 1000);

            void sliders[current].offsetWidth;
            sliders[current].classList.add(activeClasses[current]);

            setCopy(current);
            setDots(current);
            startProgress();

            clearTimeout(timer);
            timer = setTimeout(() => goTo((current + 1) % slides.length), DURATION);
        }

        dotEls.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

        // Kick off
        sliders[0].classList.add('active-s1');
        setCopy(0);
        setDots(0);
        startProgress();
        timer = setTimeout(() => goTo(1), DURATION);

        // Dust particles generator
        const dustContainer = document.getElementById('heroDust');
        if (dustContainer) {
            const DUST_COUNT = 22;
            for (let i = 0; i < DUST_COUNT; i++) {
                const p = document.createElement('div');
                p.className = 'dust-p';
                const size = Math.random() * 2.2 + 0.6;
                const left = Math.random() * 100;
                const delay = Math.random() * 12;
                const dur = Math.random() * 14 + 10;
                const drift = (Math.random() - 0.5) * 80;
                p.style.cssText = `
                    width:${size}px;
                    height:${size}px;
                    left:${left}%;
                    bottom:-5%;
                    opacity:0;
                    animation-duration:${dur}s;
                    animation-delay:${delay}s;
                    --drift:${drift}px;
                `;
                dustContainer.appendChild(p);
            }
        }
    })();

    /* ==========================================
       HEX GRID HOVER PREVIEW
       ========================================== */
    (function () {
        const serviceInfo = {
            kitchens: {
                idx: '01 — 06',
                name: 'Kitchens',
                body: 'Where culinary artistry meets architectural precision. Each surface, each material, every considered detail — conceived for those who understand that a kitchen is far more than a room.'
            },
            cabinetry: {
                idx: '02 — 06',
                name: 'Cabinetry',
                body: 'Handcrafted with intent and structural mastery. Our cabinetry redefines what storage means — elevating it from utility into something that commands the room it inhabits.'
            },
            offices: {
                idx: '03 — 06',
                name: 'Offices',
                body: 'Productive environments shaped by design intelligence. Spaces that inspire clarity, command focus, and speak with the quiet authority of those who refuse to compromise.'
            },
            furniture: {
                idx: '04 — 06',
                name: 'Bespoke Furniture',
                body: 'One-of-a-kind pieces conceived for your space and your story alone. Where craftsmanship transcends function and becomes the kind of heirloom that carries meaning forward.'
            },
            bathrooms: {
                idx: '05 — 06',
                name: 'Bathrooms',
                body: 'Sanctuaries of calm, luxury, and ritual. Each element selected for its presence and purpose — a deeply considered response to the most intimate of spaces.'
            },
            interiors: {
                idx: '06 — 06',
                name: 'Interiors',
                body: 'Complete spatial narratives built from restraint, precision, and an unwavering commitment to beauty in every proportion. Spaces that feel inevitable — as if they could only ever have been this way.'
            }
        };

        const section = document.getElementById('svcSection');
        const bgDefault = document.getElementById('bgDefault');
        const descPanel = document.getElementById('descPanel');
        const descIndex = document.getElementById('descIndex');
        const descName = document.getElementById('descName');
        const descBody = document.getElementById('descBody');
        const tiles = document.querySelectorAll('.hex-unit[data-service]');

        if (!section || !bgDefault || !descPanel) return;

        let activeBg = null;
        let descTimer = null;

        function showService(service) {
            const newBg = document.getElementById('bg-' + service);
            if (!newBg || newBg === activeBg) return;

            bgDefault.classList.add('dimmed');

            if (activeBg) {
                const old = activeBg;
                old.classList.remove('entering');
                old.classList.add('leaving');
                setTimeout(() => {
                    old.classList.remove('leaving');
                    old.style.opacity = '0';
                }, 780);
            }

            newBg.style.opacity = '';
            newBg.classList.remove('leaving', 'entering');
            void newBg.offsetWidth;
            newBg.classList.add('entering');
            activeBg = newBg;

            descPanel.classList.remove('vis');
            clearTimeout(descTimer);

            const info = serviceInfo[service];
            descIndex.textContent = info.idx;
            descName.textContent = info.name;
            descBody.textContent = info.body;

            descTimer = setTimeout(() => descPanel.classList.add('vis'), 290);
        }

        function hideAll() {
            bgDefault.classList.remove('dimmed');
            if (activeBg) {
                const old = activeBg;
                old.classList.remove('entering');
                old.classList.add('leaving');
                setTimeout(() => {
                    old.classList.remove('leaving');
                    old.style.opacity = '0';
                }, 780);
                activeBg = null;
            }
            descPanel.classList.remove('vis');
            clearTimeout(descTimer);
        }

        tiles.forEach(tile => {
            tile.addEventListener('mouseenter', () => showService(tile.dataset.service));
        });
        section.addEventListener('mouseleave', hideAll);

        setTimeout(() => {
            document.querySelectorAll('.hex-unit:not(.h4)').forEach(tile => {
                tile.style.opacity = '1';
                tile.classList.add('ready');
            });
            const center = document.querySelector('.h4');
            if (center) {
                center.style.opacity = '1';
                center.classList.add('ready');
            }
        }, 2100);
    })();

    /* ==========================================
       OUR STORY BOARD DOT GRID & EMITTER
       ========================================== */
    (function () {
        const dotGrid = document.getElementById('storyDotGrid');
        if (dotGrid) {
            for (let i = 0; i < 36; i++) {
                const s = document.createElement('span');
                dotGrid.appendChild(s);
            }
        }

        const dustEl = document.getElementById('storyDust');
        if (dustEl) {
            const STORY_DUST = 18;
            for (let i = 0; i < STORY_DUST; i++) {
                const p = document.createElement('div');
                p.className = 'story-dust-p';
                const size = Math.random() * 2.4 + 0.5;
                const left = Math.random() * 100;
                const delay = Math.random() * 16;
                const dur = Math.random() * 18 + 12;
                const drift = (Math.random() - 0.5) * 120;
                const rot = (Math.random() - 0.5) * 90;
                const isSquare = Math.random() > 0.7;
                const alpha = Math.random() * 0.35 + 0.25;
                const colorR = Math.floor(Math.random() * 40 + 210);
                const colorG = Math.floor(Math.random() * 40 + 165);
                const colorB = Math.floor(Math.random() * 20 + 30);
                p.style.cssText = `
                    width:${size}px;
                    height:${size}px;
                    left:${left}%;
                    bottom:-4%;
                    border-radius:${isSquare ? '1px' : '50%'};
                    transform:${isSquare ? 'rotate(45deg)' : ''};
                    background:rgba(${colorR},${colorG},${colorB},${alpha});
                    box-shadow: 0 0 ${size * 2}px rgba(212,175,55,${alpha * 0.6});
                    animation-duration:${dur}s;
                    animation-delay:${delay}s;
                    --sdrift:${drift}px;
                    --srot:${rot}deg;
                    opacity:0;
                `;
                dustEl.appendChild(p);
            }
        }

        const storyVisTargets = [
            document.getElementById('storyEyebrow'),
            document.getElementById('storyTitle'),
            document.getElementById('storyGoldLine'),
            document.getElementById('storyTagline'),
            document.getElementById('storySentence1'),
            document.getElementById('storySentence2'),
            document.getElementById('storySentence3'),
            document.getElementById('storyStats'),
            document.getElementById('storyImgWrap'),
            document.getElementById('storyCaption'),
            document.getElementById('storyDotGrid'),
        ].filter(Boolean);

        if (storyVisTargets.length > 0 && 'IntersectionObserver' in window) {
            const storyObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('vis');
                    }
                });
            }, {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.12
            });
            storyVisTargets.forEach(el => storyObs.observe(el));
        } else {
            storyVisTargets.forEach(el => el.classList.add('vis'));
        }
    })();

    /* ==========================================
       PORTFOLIO TEASER SCROLL REVEALS
       ========================================== */
    (function () {
        const pfScrollEls = [
            document.getElementById('pfEyebrow'),
            document.getElementById('pfTitle'),
            document.getElementById('pfRule'),
            document.getElementById('pfIntro'),
            document.getElementById('pfLink'),
            document.getElementById('pfRail'),
        ].filter(Boolean);

        const pfCards = [
            document.getElementById('pfC1'),
            document.getElementById('pfC2'),
            document.getElementById('pfC3'),
        ].filter(Boolean);

        if (pfScrollEls.length === 0 && pfCards.length === 0) return;

        if ('IntersectionObserver' in window) {
            const pfHeaderObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('vis');
                        pfHeaderObs.unobserve(entry.target);
                    }
                });
            }, {
                rootMargin: '0px 0px -10% 0px',
                threshold: 0.12
            });

            pfScrollEls.forEach(el => pfHeaderObs.observe(el));

            const pfCardObs = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const card = entry.target;
                        card.classList.add('vis');
                        setTimeout(() => {
                            card.classList.add('pf-ready');
                        }, 1600);
                        pfCardObs.unobserve(card);
                    }
                });
            }, {
                rootMargin: '0px 0px -8% 0px',
                threshold: 0.18
            });

            pfCards.forEach(card => pfCardObs.observe(card));
        } else {
            pfScrollEls.forEach(el => el.classList.add('vis'));
            pfCards.forEach(card => {
                card.classList.add('vis', 'pf-ready');
            });
        }
    })();

})();
