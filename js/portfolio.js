// WabiAgency - Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Portfolio filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                button.classList.add('active');
                
                // Get the filter value
                const filterValue = button.getAttribute('data-filter');
                
                // Filter projects
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Testimonial slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const prevButton = document.querySelector('.prev-testimonial');
    const nextButton = document.querySelector('.next-testimonial');
    const dots = document.querySelectorAll('.dot');
    
    if (testimonialSlides.length > 0) {
        let currentSlide = 0;
        
        // Hide all slides except the first one
        testimonialSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Function to show slide
        function showSlide(index) {
            // Hide all slides
            testimonialSlides.forEach(slide => {
                slide.style.display = 'none';
            });
            
            // Remove active class from all dots
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Show the selected slide
            testimonialSlides[index].style.display = 'block';
            
            // Add active class to the current dot
            dots[index].classList.add('active');
            
            // Update current slide index
            currentSlide = index;
        }
        
        // Previous button click
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                let index = currentSlide - 1;
                if (index < 0) {
                    index = testimonialSlides.length - 1;
                }
                showSlide(index);
            });
        }
        
        // Next button click
        if (nextButton) {
            nextButton.addEventListener('click', () => {
                let index = currentSlide + 1;
                if (index >= testimonialSlides.length) {
                    index = 0;
                }
                showSlide(index);
            });
        }
        
        // Dot clicks
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
            });
        });
    }
    
    // Handle smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's not a valid anchor
            if (targetId === '#' || !document.querySelector(targetId)) return;
            
            e.preventDefault();
            
            // For project showcase sections
            if (targetId.startsWith('#project')) {
                // Hide all project showcases
                document.querySelectorAll('.project-showcase').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show target project
                document.querySelector(targetId).style.display = 'block';
                
                // Scroll to top of project
                window.scrollTo({
                    top: document.querySelector(targetId).offsetTop - 80,
                    behavior: 'smooth'
                });
            } else {
                // Normal anchor scrolling
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Check URL hash on page load to show specific project
    if (window.location.hash && window.location.hash.startsWith('#project')) {
        const targetProject = document.querySelector(window.location.hash);
        if (targetProject) {
            // Hide all project showcases
            document.querySelectorAll('.project-showcase').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show target project
            targetProject.style.display = 'block';
            
            // Scroll to project after a short delay
            setTimeout(() => {
                window.scrollTo({
                    top: targetProject.offsetTop - 80,
                    behavior: 'smooth'
                });
            }, 200);
        }
    }
    
    // Add animation on scroll for project cards
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Elements to animate on scroll
    const animationElements = document.querySelectorAll('.project-card, .testimonial-content, .package-card');
    if (animationElements.length > 0) {
        animationElements.forEach(element => {
            observer.observe(element);
            // Add animation classes to elements initially
            element.classList.add('fade-in');
        });
    }
});

// CSS Animation classes (add these to your CSS file too)
document.head.insertAdjacentHTML('beforeend', `
<style>
.fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.animated {
    opacity: 1;
    transform: translateY(0);
}

.project-card:nth-child(2),
.package-card:nth-child(2) {
    transition-delay: 0.1s;
}

.project-card:nth-child(3),
.package-card:nth-child(3) {
    transition-delay: 0.2s;
}

.project-card:nth-child(4) {
    transition-delay: 0.3s;
}

.project-card:nth-child(5) {
    transition-delay: 0.4s;
}

.project-card:nth-child(6) {
    transition-delay: 0.5s;
}
</style>
`);