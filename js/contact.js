/* ==========================================================================
   CONTACT PAGE SPECIFIC JAVASCRIPT - SCHRÖDER'S JOINERY
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

    // 2. Trigger floating label class for select
    const serviceSelect = document.getElementById('serviceInterested');
    if (serviceSelect) {
        serviceSelect.addEventListener('change', () => {
            if (serviceSelect.value) {
                serviceSelect.classList.add('has-value');
            } else {
                serviceSelect.classList.remove('has-value');
            }
        });
    }

    // 3. Form Validation & Success Handling
    const form = document.getElementById('premiumContactForm');
    const successCard = document.getElementById('contactSuccessCard');
    const resetBtn = document.getElementById('resetFormBtn');

    if (form && successCard) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset errors
            const groups = form.querySelectorAll('.form-group');
            groups.forEach(g => g.classList.remove('has-error'));

            let isValid = true;

            // Validate Name
            const fullName = document.getElementById('fullName');
            if (fullName && !fullName.value.trim()) {
                fullName.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Email
            const email = document.getElementById('email');
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && (!email.value.trim() || !emailPattern.test(email.value))) {
                email.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Phone (optional, but if provided must be digits)
            const phone = document.getElementById('phone');
            if (phone && phone.value.trim() && phone.value.replace(/[^0-9+]/g, '').length < 7) {
                phone.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Dropdown Selection
            const service = document.getElementById('serviceInterested');
            if (service && !service.value) {
                service.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Subject
            const subject = document.getElementById('subject');
            if (subject && !subject.value.trim()) {
                subject.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            // Validate Message
            const message = document.getElementById('message');
            if (message && !message.value.trim()) {
                message.closest('.form-group').classList.add('has-error');
                isValid = false;
            }

            if (isValid) {
                // Fade out form elements inside the form container
                form.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                form.style.opacity = '0';
                form.style.transform = 'translateY(-10px)';

                setTimeout(() => {
                    form.style.display = 'none';
                    successCard.classList.add('active');
                    successCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 400);
            }
        });

        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                successCard.classList.remove('active');
                form.reset();

                // Reset dropdown value class
                if (serviceSelect) serviceSelect.classList.remove('has-value');

                form.style.display = 'block';
                requestAnimationFrame(() => {
                    form.style.opacity = '1';
                    form.style.transform = 'translateY(0)';
                });
            });
        }
    }

})();
