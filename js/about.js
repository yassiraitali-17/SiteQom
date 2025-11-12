// WabiAgency - About/Process Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Elements to animate on scroll
    const animationElements = document.querySelectorAll('.about-content, .value-card, .timeline-item, .collaboration-content, .tech-category, .team-member');
    if (animationElements.length > 0) {
        animationElements.forEach(element => {
            observer.observe(element);
            // Add animation classes to elements initially
            element.classList.add('fade-in');
        });
    }
    
    // Scroll to specific timeline item if hash in URL
    const hash = window.location.hash;
    if (hash && hash.startsWith('#timeline-')) {
        const targetElement = document.querySelector(hash);
        if (targetElement) {
            setTimeout(() => {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 50;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }, 500);
        }
    }
});