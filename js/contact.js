// WabiAgency - Contact Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Flatpickr date picker
    const datePicker = document.querySelector('.datepicker');
    if (datePicker) {
        flatpickr(datePicker, {
            minDate: "today",
            maxDate: new Date().fp_incr(60), // 60 days from now
            dateFormat: "Y-m-d",
            disable: [
                function(date) {
                    // Disable weekends (Saturday and Sunday)
                    return (date.getDay() === 0 || date.getDay() === 6);
                }
            ],
            locale: {
                firstDayOfWeek: 1 // Monday as first day of the week
            }
        });
    }
    
    // Email form validation and submission
    const emailForm = document.getElementById('email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            // This is just additional client-side validation
            // FormSubmit.co will handle the actual form submission
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('name');
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            const email = document.getElementById('email');
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validate message
            const message = document.getElementById('message');
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else {
                removeError(message);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Booking form validation and submission
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validate name
            const name = document.getElementById('booking-name');
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            } else {
                removeError(name);
            }
            
            // Validate email
            const email = document.getElementById('booking-email');
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            } else {
                removeError(email);
            }
            
            // Validate phone
            const phone = document.getElementById('booking-phone');
            if (!phone.value.trim()) {
                showError(phone, 'Phone number is required');
                isValid = false;
            } else {
                removeError(phone);
            }
            
            // Validate date
            const date = document.getElementById('booking-date');
            if (!date.value.trim()) {
                showError(date, 'Date is required');
                isValid = false;
            } else {
                removeError(date);
            }
            
            // Validate time
            const time = document.getElementById('booking-time');
            if (!time.value.trim()) {
                showError(time, 'Time is required');
                isValid = false;
            } else {
                removeError(time);
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                // Toggle current item
                item.classList.toggle('active');
                
                // Update the icon
                const icon = question.querySelector('.faq-toggle i');
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                    }
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Elements to animate on scroll
    const animationElements = document.querySelectorAll('.option-card, .contact-form, .contact-info, .booking-info, .booking-calendar');
    if (animationElements.length > 0) {
        animationElements.forEach(element => {
            observer.observe(element);
            // Add animation classes to elements initially
            element.classList.add('fade-in');
        });
    }
});

// Helper Functions
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.classList.add('error');
    
    const errorMessage = formGroup.querySelector('.error-message') || document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.innerText = message;
    
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(errorMessage);
    }
}

function removeError(input) {
    const formGroup = input.parentElement;
    formGroup.classList.remove('error');
    
    const errorMessage = formGroup.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
// For local testing only - simulate form submission and redirect
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        const contactForm = document.getElementById('email-form');
        const bookingForm = document.getElementById('booking-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent actual form submission
                
                // Simulate form processing
                const submitBtn = document.getElementById('contact-submit-btn');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                    submitBtn.disabled = true;
                }
                
                // Simulate delay and redirect
                setTimeout(function() {
                    window.location.href = 'thank-you.html';
                }, 1500);
            });
        }
        
        if (bookingForm) {
            bookingForm.addEventListener('submit', function(e) {
                e.preventDefault(); // Prevent actual form submission
                
                // Simulate form processing
                const submitBtn = document.getElementById('booking-submit-btn');
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Booking...';
                    submitBtn.disabled = true;
                }
                
                // Simulate delay and redirect
                setTimeout(function() {
                    window.location.href = 'booking-confirmed.html';
                }, 1500);
            });
        }
    }
});