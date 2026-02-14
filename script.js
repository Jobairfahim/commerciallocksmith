// Mobile Navigation Toggle - Performance Optimized
(function() {
    'use strict';
    
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const navbar = document.getElementById('navbar');
    
    if (!mobileToggle || !navMenu) return;
    
    // Use touch events for mobile where available
    const clickEvent = 'ontouchstart' in window ? 'touchend' : 'click';
    
    // Toggle menu with passive listener
    mobileToggle.addEventListener(clickEvent, (e) => {
        e.preventDefault();
        const isActive = navMenu.classList.toggle('active');
        mobileToggle.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    }, { passive: false });
    
    // Close menu when clicking nav links - event delegation
    navMenu.addEventListener(clickEvent, (e) => {
        const link = e.target.closest('.nav-link, .nav-cta');
        if (link) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }, { passive: true });
    
    // Close on outside click
    document.addEventListener(clickEvent, (e) => {
        if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        }
    }, { passive: true });
    
    // Throttled scroll handler for navbar
    let ticking = false;
    function updateNavbar() {
        if (window.scrollY > 100) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
    
    // Smooth scroll for anchor links with IntersectionObserver
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener(clickEvent, function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }, { passive: false });
    });
    
    // Preload critical resources hint
    if ('IntersectionObserver' in window) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { rootMargin: '50px' });
        
        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }
})();
