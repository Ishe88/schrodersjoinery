/* ==========================================================================
   PORTFOLIO PAGE SPECIFIC JAVASCRIPT - SCHRÖDER'S JOINERY
   ========================================================================== */

(function () {
    'use strict';

    /* ==========================================
       HERO SLIDESHOW
       ========================================== */
    (function () {
        const slides = document.querySelectorAll('.pf-hero-slide');
        const dots = document.querySelectorAll('.pf-slide-dot');
        const progressBar = document.getElementById('phProgressBar');
        const DURATION = 5500;
        
        if (slides.length === 0 || !progressBar) return;
        
        let current = 0, timer = null, progTimer = null, progStart = null;

        function setDots(idx) { 
            dots.forEach((d, i) => d.classList.toggle('active', i === idx)); 
        }

        function startProgress() {
            progStart = performance.now();
            cancelAnimationFrame(progTimer);
            (function tick(now) {
                const pct = Math.min(((now - progStart) / DURATION) * 100, 100);
                progressBar.style.width = pct + '%';
                if (pct < 100) progTimer = requestAnimationFrame(tick);
            })(progStart);
        }

        function goTo(idx) {
            slides[current].classList.remove('active');
            current = (idx + slides.length) % slides.length;
            slides[current].classList.add('active');
            setDots(current);
            startProgress();
            clearTimeout(timer);
            timer = setTimeout(() => goTo(current + 1), DURATION);
        }

        dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));
        goTo(0);

        // Hero copy reveal
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                ['pfHeroKicker', 'pfHeroTitle', 'pfHeroDesc'].forEach((id, i) => {
                    setTimeout(() => {
                        const el = document.getElementById(id);
                        if (el) el.classList.add('vis');
                    }, i * 120);
                });
            });
        });
    })();

    /* ==========================================
       DYNAMIC PORTFOLIO LOADER & CONFIG
       ========================================== */
    (function () {
        // Configurations for local images matching physical directory structure and names
        const KITCHENS_CONFIG = [
            { loc: 'hurlingham', label: 'Hurlingham', count: 10, prefix: 'HURLINGHAM-', ext: 'jpeg' },
            { loc: 'jackal-creek', label: 'Jackal Creek', count: 18, prefix: 'JACKAL-', ext: 'jpeg' },
            { loc: 'paulshof', label: 'Paulshof', count: 14, prefix: 'PAULSHOF-', ext: 'jpeg' },
            { loc: 'pretoria', label: 'Pretoria', count: 4, prefix: 'PRETORIA-', ext: 'jpeg' },
            { loc: 'sandton', label: 'Sandton', count: 9, prefix: 'SANDTON-', ext: 'jpeg' },
            { loc: 'waterfall-estate', label: 'Waterfall Estate', count: 13, prefix: 'WATERFALL ESTATE-', ext: 'jpeg' }
        ];

        const CABINETRY_CONFIG = [
            { loc: '', label: '', count: 25, prefix: 'cab-', ext: 'jpeg' }
        ];

        const FURNITURE_CONFIG = [
            { loc: '', label: '', count: 16, prefix: 'furn-', ext: 'jpeg' }
        ];

        const BATHROOMS_CONFIG = [
            { loc: '', label: '', count: 4, prefix: 'bathset-1.', ext: 'jpg', startAtZero: true }
        ];

        const INTERIORS_CONFIG = [
            { loc: 'hurlingham', label: 'Hurlingham', count: 16, prefix: 'int-hur-', ext: 'jpeg' },
            { loc: 'jackal-creek', label: 'Jackal Creek', count: 11, prefix: 'int-jack-', ext: 'jpeg' },
            { loc: 'game-lodges', label: 'Game Lodges', count: 7, prefix: 'int-lodge-', ext: 'jpeg' },
            { loc: 'exhibition-stands', label: 'Exhibition Stands', count: 8, prefix: 'int-exhibition-', ext: 'jpeg' }
        ];

        const OFFICES_CONFIG = [
            { loc: '', label: '', count: 16, prefix: 'office-', ext: 'jpeg' }
        ];

        // Renders elements to the DOM using repeating sizes to establish premium asymmetric flow
        function generateGalleryItems(configList, gridId, folderName, tagLabel) {
            const grid = document.getElementById(gridId);
            if (!grid) return;
            
            let globalIndex = 0;
            const gridSizes = ['g-large', 'g-normal', 'g-normal', 'g-tall', 'g-wide', 'g-normal', 'g-normal', 'g-half', 'g-half'];

            configList.forEach(cfg => {
                for (let i = 0; i < cfg.count; i++) {
                    const num = cfg.startAtZero ? i : i + 1;
                    const numStr = cfg.startAtZero ? String(num) : String(num).padStart(2, '0');
                    let fileExt = cfg.ext;
                    if (folderName === 'cabinetry' && cfg.prefix === 'cab-' && numStr === '03') {
                        fileExt = 'png';
                    }
                    const imgPath = `portfolio/${folderName}/${cfg.prefix}${numStr}.${fileExt}`;
                    
                    const item = document.createElement('div');
                    item.className = `g-item ${gridSizes[globalIndex % gridSizes.length]}`;
                    item.setAttribute('role', 'listitem');
                    item.setAttribute('tabindex', '0');
                    item.dataset.src = imgPath;
                    
                    const locationName = cfg.label || tagLabel;
                    const displayIndex = String(globalIndex + 1).padStart(2, '0');
                    item.dataset.label = `${locationName} — ${displayIndex}`;
                    if (cfg.loc) {
                        item.dataset.location = cfg.loc;
                    }
                    
                    item.innerHTML = `
                        <img class="g-img" src="${imgPath}" alt="${locationName} Joinery Schröder's Joinery" loading="lazy">
                        <div class="g-overlay"></div>
                        <div class="g-sweep"></div>
                        <div class="g-corner tl"></div>
                        <div class="g-corner tr"></div>
                        <div class="g-corner bl"></div>
                        <div class="g-corner br"></div>
                        <div class="g-label">
                            <span class="g-label-num">${displayIndex}</span>
                            <span class="g-label-tag">${locationName}</span>
                        </div>
                    `;
                    
                    grid.appendChild(item);
                    globalIndex++;
                }
            });
        }

        // Perform dynamic data-load
        generateGalleryItems(KITCHENS_CONFIG, 'grid-kitchens', 'kitchens', 'Kitchens');
        generateGalleryItems(CABINETRY_CONFIG, 'grid-cabinetry', 'cabinetry', 'Cabinetry');
        generateGalleryItems(FURNITURE_CONFIG, 'grid-furniture', 'furniture', 'Furniture');
        generateGalleryItems(BATHROOMS_CONFIG, 'grid-bathrooms', 'bathrooms', 'Bathrooms');
        generateGalleryItems(INTERIORS_CONFIG, 'grid-interiors', 'Interiors', 'Interiors');
        generateGalleryItems(OFFICES_CONFIG, 'grid-offices', 'offices', 'Offices');

        // Wire up the location filters
        function setupFiltering(filterContainerId, gridId) {
            const container = document.getElementById(filterContainerId);
            const grid = document.getElementById(gridId);
            if (!container || !grid) return;
            
            const buttons = container.querySelectorAll('.filter-btn');
            
            buttons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const filterValue = btn.dataset.filter;
                    buttons.forEach(b => b.classList.toggle('active', b === btn));
                    
                    const items = grid.querySelectorAll('.g-item');
                    items.forEach(item => {
                        const itemLoc = item.dataset.location;
                        if (filterValue === 'all' || itemLoc === filterValue) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    });
                    
                    // Stagger entrance transitions for filtered items
                    const visibleItems = Array.from(grid.querySelectorAll('.g-item:not(.hidden)'));
                    visibleItems.forEach(item => {
                        item.classList.remove('vis');
                        item.style.transitionDelay = '';
                    });
                    
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => {
                            visibleItems.forEach((item, index) => {
                                setTimeout(() => {
                                    item.classList.add('vis');
                                }, index * 40);
                            });
                        });
                    });
                });
            });
        }

        setupFiltering('filter-kitchens', 'grid-kitchens');
        setupFiltering('filter-interiors', 'grid-interiors');
    })();

    /* ==========================================
       DISCIPLINE SWITCHER
       ========================================== */
    (function () {
        const btns = document.querySelectorAll('.disc-btn');
        const panels = document.querySelectorAll('.gallery-panel');
        const ghost = document.getElementById('galleryGhost');
        const ghostLabels = { kitchens: 'Kitchens', cabinetry: 'Cabinetry', furniture: 'Furniture', bathrooms: 'Bathrooms', interiors: 'Interiors', offices: 'Offices' };

        if (btns.length === 0) return;

        function switchTo(disc) {
            btns.forEach(b => {
                const active = b.dataset.discipline === disc;
                b.classList.toggle('active', active);
                b.setAttribute('aria-pressed', String(active));
            });
            panels.forEach(p => p.classList.remove('active'));
            const target = document.getElementById('panel-' + disc);
            if (!target) return;
            target.classList.add('active');
            if (ghost) ghost.textContent = ghostLabels[disc] || disc;

            // Trigger panel header reveal
            const header = document.getElementById('panelHeader-' + disc);
            if (header) {
                header.classList.remove('vis');
                requestAnimationFrame(() => requestAnimationFrame(() => header.classList.add('vis')));
            }
            
            // Trigger filter bar reveal
            const filterBar = target.querySelector('.portfolio-filter');
            if (filterBar) {
                filterBar.classList.remove('vis');
                requestAnimationFrame(() => requestAnimationFrame(() => filterBar.classList.add('vis')));
            }

            // Trigger gallery items reveal for only the visible items
            const items = target.querySelectorAll('.g-item:not(.hidden)');
            items.forEach(item => {
                item.classList.remove('vis');
                item.style.transitionDelay = '';
            });
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    items.forEach((item, i) => {
                        setTimeout(() => item.classList.add('vis'), i * 50);
                    });
                });
            });
        }

        btns.forEach(btn => btn.addEventListener('click', () => switchTo(btn.dataset.discipline)));

        // Parse initial discipline from URL query parameter or hash
        let initialDisc = 'kitchens';
        const urlParams = new URLSearchParams(window.location.search);
        const discParam = urlParams.get('disc') || urlParams.get('discipline');
        if (discParam && ghostLabels[discParam]) {
            initialDisc = discParam;
        } else {
            const hash = window.location.hash.replace('#', '');
            if (hash && ghostLabels[hash]) {
                initialDisc = hash;
            }
        }

        switchTo(initialDisc);

        // Listen to hash changes on the same page
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.replace('#', '');
            if (hash && ghostLabels[hash]) {
                switchTo(hash);
            }
        });
    })();

    /* ==========================================
       LIGHTBOX & INTERSECTION OBSERVER
       ========================================== */
    (function () {
        // Intersection observer for scrolled staggers
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('vis');
                        observer.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.10 });

            // Watch items as they enter viewport
            function observeItems() {
                document.querySelectorAll('.g-item').forEach(item => observer.observe(item));
            }
            setTimeout(observeItems, 200);
        } else {
            // Fallback
            setTimeout(() => {
                document.querySelectorAll('.g-item').forEach(item => item.classList.add('vis'));
            }, 200);
        }

        // Lightbox Cycle
        const lb = document.getElementById('lightbox');
        const lbImg = document.getElementById('lbImg');
        const lbCaption = document.getElementById('lbCaption');
        const lbClose = document.getElementById('lbClose');
        const lbPrev = document.getElementById('lbPrev');
        const lbNext = document.getElementById('lbNext');
        
        if (!lb || !lbImg || !lbClose) return;
        
        let currentItems = [], currentIdx = 0;

        function openLightbox(items, idx) {
            currentItems = items;
            currentIdx = idx;
            showImage(idx);
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
            lbClose.focus();
        }

        function closeLightbox() {
            lb.classList.remove('open');
            document.body.style.overflow = '';
        }

        function showImage(idx) {
            const item = currentItems[idx];
            lbImg.classList.remove('vis');
            lbImg.style.opacity = '0';
            lbImg.style.transform = 'scale(0.94)';
            setTimeout(() => {
                lbImg.src = item.dataset.src;
                lbImg.alt = item.querySelector('.g-img').alt;
                lbCaption.textContent = item.dataset.label || '';
                lbImg.style.opacity = '1';
                lbImg.style.transform = 'scale(1)';
                lbImg.style.transition = 'opacity 0.38s ease, transform 0.45s cubic-bezier(0.34,1.28,0.64,1)';
            }, 80);
            currentIdx = idx;
        }

        document.addEventListener('click', (e) => {
            const item = e.target.closest('.g-item');
            if (!item) return;
            const panel = item.closest('.gallery-panel');
            if (!panel) return;
            
            const items = Array.from(panel.querySelectorAll('.g-item:not(.hidden)'));
            openLightbox(items, items.indexOf(item));
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const item = document.activeElement?.closest?.('.g-item');
                if (item) {
                    e.preventDefault();
                    const panel = item.closest('.gallery-panel');
                    const items = Array.from(panel.querySelectorAll('.g-item:not(.hidden)'));
                    openLightbox(items, items.indexOf(item));
                }
            }
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') showImage((currentIdx - 1 + currentItems.length) % currentItems.length);
            if (e.key === 'ArrowRight') showImage((currentIdx + 1) % currentItems.length);
        });

        // Touch swipe support
        let touchStartX = 0;
        let touchStartY = 0;

        lb.addEventListener('touchstart', (e) => {
            if (e.touches.length === 1) {
                touchStartX = e.touches[0].clientX;
                touchStartY = e.touches[0].clientY;
            }
        }, { passive: true });

        lb.addEventListener('touchend', (e) => {
            if (e.changedTouches.length === 1) {
                const touchEndX = e.changedTouches[0].clientX;
                const touchEndY = e.changedTouches[0].clientY;
                
                const minSwipeDistance = 50;
                const maxSwipeDiagonal = 100;
                const diffX = touchEndX - touchStartX;
                const diffY = Math.abs(touchEndY - touchStartY);

                if (Math.abs(diffX) > minSwipeDistance && diffY < maxSwipeDiagonal) {
                    if (diffX > 0) {
                        // Swipe right -> Previous
                        showImage((currentIdx - 1 + currentItems.length) % currentItems.length);
                    } else {
                        // Swipe left -> Next
                        showImage((currentIdx + 1) % currentItems.length);
                    }
                }
            }
        }, { passive: true });

        lbClose.addEventListener('click', closeLightbox);
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
        lbPrev.addEventListener('click', () => showImage((currentIdx - 1 + currentItems.length) % currentItems.length));
        lbNext.addEventListener('click', () => showImage((currentIdx + 1) % currentItems.length));
    })();

})();
