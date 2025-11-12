// WabiAgency - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.navbar')) {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
      }
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

        // Close mobile menu after clicking
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.1 });

  // Elements to animate on scroll
  const animationElements = document.querySelectorAll('.service-card, .portfolio-item, .feature, .process-step');
  animationElements.forEach(element => {
    observer.observe(element);
  });

  // Add animation classes to elements initially
  animationElements.forEach(element => {
    element.classList.add('fade-in');
  });

  // Active navigation highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
});

// Form validation for contact form (will be used on the contact page)
function validateContactForm() {
  const form = document.getElementById('contact-form');

  if (form) {
    form.addEventListener('submit', function (e) {
      let valid = true;
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');

      // Reset error messages
      document.querySelectorAll('.error-message').forEach(el => el.remove());

      // Validate name
      if (!name.value.trim()) {
        showError(name, 'Name is required');
        valid = false;
      }

      // Validate email
      if (!email.value.trim()) {
        showError(email, 'Email is required');
        valid = false;
      } else if (!isValidEmail(email.value)) {
        showError(email, 'Please enter a valid email address');
        valid = false;
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, 'Message is required');
        valid = false;
      }

      if (!valid) {
        e.preventDefault();
      }
    });
  }
}

// Helper function to show error messages
function showError(input, message) {
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.textContent = message;
  errorDiv.style.color = 'red';
  errorDiv.style.fontSize = '0.8rem';
  errorDiv.style.marginTop = '5px';

  input.parentNode.appendChild(errorDiv);
  input.style.borderColor = 'red';
}

// Helper function to validate email format
function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Call form validation function
validateContactForm();
//Preloader
document.addEventListener('DOMContentLoaded', function () {
  // Hide preloader when page is loaded
  const preloader = document.querySelector('.preloader');
  if (preloader) {
    window.addEventListener('load', function () {
      setTimeout(function () {
        preloader.classList.add('hidden');
        // Remove from DOM after transition completes
        setTimeout(function () {
          preloader.style.display = 'none';
        }, 500);
      }, 500); // Delay hiding preloader for better effect
    });
  }
});

// Back to top button functionality
function handleBackToTop() {
  const backToTopButton = document.querySelector('.back-to-top');

  if (backToTopButton) {
    // Show button when page is scrolled down 300px
    window.addEventListener('scroll', function () {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });

    // Smooth scroll to top when button is clicked
    backToTopButton.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

// Call the function
document.addEventListener('DOMContentLoaded', function () {
  handleBackToTop();
});
// Cookie consent functionality
function handleCookieConsent() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptButton = document.querySelector('.cookie-accept');
  const declineButton = document.querySelector('.cookie-decline');

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem('cookieChoice');

  if (!cookieChoice && cookieConsent) {
    // Show cookie banner after a short delay
    setTimeout(function () {
      cookieConsent.style.display = 'block';
    }, 1000);

    // Handle accept button
    if (acceptButton) {
      acceptButton.addEventListener('click', function () {
        localStorage.setItem('cookieChoice', 'accepted');
        cookieConsent.style.display = 'none';

        // Here you could initialize analytics or other cookie-dependent scripts
        // initializeAnalytics();
      });
    }

    // Handle decline button
    if (declineButton) {
      declineButton.addEventListener('click', function () {
        localStorage.setItem('cookieChoice', 'declined');
        cookieConsent.style.display = 'none';
      });
    }
  }
}

// Call the function
document.addEventListener('DOMContentLoaded', function () {
  handleCookieConsent();
});

//Modal Page//

document.addEventListener('DOMContentLoaded', function() {
  // Project data - add your project details here
  const projectData = {
    'car-rental': {
      title: 'Car Rental Service',
      description: 'A modern, user-friendly car rental platform designed for ease of use and quick bookings. Features include vehicle filtering, date selection, and secure checkout process.',
      image: 'img/Mockup_Pics/Project1.png',
      client: 'Auto World Rentals',
      services: 'Web Development, UI/UX Design, Booking System',
      date: 'March 2025',
      link: 'https://rentcar-service.netlify.app'
    },
    'house-burger': {
      title: 'House Burger',
      description: 'A vibrant, appetizing restaurant website showcasing menu items, special offers, and online ordering capabilities. The design focuses on highlighting food photography and easy navigation.',
      image: 'img/Mockup_Pics/project2.png',
      client: 'House Burger Restaurant',
      services: 'Web Design, Restaurant Menu, Online Ordering',
      date: 'February 2025',
      link: 'https://houseburger-platform.netlify.app/'
    },
    
    // Add more projects as needed
  };

  // Get modal elements
  const modal = document.getElementById('portfolio-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalClient = document.getElementById('modal-client');
  const modalServices = document.getElementById('modal-services');
  const modalDate = document.getElementById('modal-date');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');

  // Only proceed with modal functionality if the required elements exist on this page
  if (modal) {
    // Add click event to all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
      item.addEventListener('click', function() {
        const projectId = this.getAttribute('data-project-id');
        const project = projectData[projectId];
        
        if (project) {
          // Populate modal with project data
          if (modalTitle) modalTitle.textContent = project.title;
          if (modalImage) {
            modalImage.src = project.image;
            modalImage.alt = project.title;
          }
          if (modalDescription) modalDescription.textContent = project.description;
          if (modalClient) modalClient.textContent = project.client;
          if (modalServices) modalServices.textContent = project.services;
          if (modalDate) modalDate.textContent = project.date;
          if (modalLink) modalLink.href = project.link;
          
          // Show the modal
          modal.style.display = 'block';
          document.body.style.overflow = 'hidden'; // Prevent scrolling while modal is open
        }
      });
    });

    // Close modal when clicking the X
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });
  }
});

// Filter //
document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.portfolio-filter button');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      // Show/hide items based on category
      portfolioItems.forEach(item => {
        if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
});
// Moda Pge//
//////////// Modal Page/////////
document.addEventListener('DOMContentLoaded', function() {
  // Project data - details for each project
  const projectData = {
    'car-rental': {
      title: 'Car Rental Service',
      description: 'A modern, user-friendly car rental platform designed for ease of use and quick bookings. The responsive design ensures a seamless experience across all devices.',
      image: 'img/Mockup_Pics/Project1.png',
      client: 'Drive Morocco',
      services: 'Web Development, UI/UX Design, Booking System',
      date: 'March 2025',
      link: 'https://rentcar-service.netlify.app'
    },
    'house-burger': {
      title: 'House Burger',
      description: 'A vibrant restaurant website showcasing menu items and online ordering capabilities. The design focuses on highlighting food photography and easy navigation.',
      image: 'portfolio/Burger_House_06-03-24-main/Project2_pic.png',
      client: 'House Burger Restaurant',
      services: 'Web Design, Menu Management',
      date: 'February 2025',
      link: 'https://houseburger-platform.netlify.app/'
    },
    'Employees-Tracker': {
      title: 'Employees Tracker SaaS',
      description: 'An intuitive employee bonus tracking system that streamlines performance management. The interface provides real-time metrics visualization, detailed employee profiles, and comprehensive reporting tools for efficient workforce incentive administration.',
      image: 'img/Mockup_Pics/projrct3.png',
      client: 'Yassir',
      services: 'Web Design, SaaS Platform',
      date: 'January 2025',
      link: 'https://employeestrackersaas.netlify.app/'
    },
    'Travel-Agency': {
      title: 'Travel/Toursim Agency',
      image: 'img/Mockup_Pics/projrct4.png',
      description: ' comprehensive travel agency website that showcases Moroccan tourism experiences while providing seamless booking capabilities.',
      client: 'Yassir',
      services: 'Web Design, Travel/Toursim agency ',
      date: 'March 2025',
      link: 'https://merrakechytours.netlify.app/'
    },
    // Add more projects as needed
  };

  // Get modal elements
  const modal = document.getElementById('project-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');
  const modalClient = document.getElementById('modal-client');
  const modalServices = document.getElementById('modal-services');
  const modalDate = document.getElementById('modal-date');
  const modalLink = document.getElementById('modal-link');
  const closeModal = document.querySelector('.close-modal');

  // Only proceed if the modal exists on this page
  if (modal) {
    // Add click event to all project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
      projectCards.forEach(card => {
        card.addEventListener('click', function() {
          const projectId = this.getAttribute('data-project-id');
          const project = projectData[projectId];
          
          if (project) {
            // Populate modal with project data - with null checks
            if (modalTitle) modalTitle.textContent = project.title;
            if (modalImage) {
              modalImage.src = project.image;
              modalImage.alt = project.title;
            }
            if (modalDescription) modalDescription.textContent = project.description;
            if (modalClient) modalClient.textContent = project.client;
            if (modalServices) modalServices.textContent = project.services;
            if (modalDate) modalDate.textContent = project.date;
            if (modalLink) modalLink.href = project.link;
            
            // Show the modal
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Prevent scrolling
          }
        });
      });
    }

    // Close modal when clicking the X
    if (closeModal) {
      closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      });
    }

    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
      if (event.target == modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });

    // Close modal when pressing ESC key
    document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
      }
    });
  }
});

// Floating Contact Button Functionality
document.addEventListener('DOMContentLoaded', function() {
  const floatingBtn = document.getElementById('floatingContactBtn');
  const toggleMain = document.querySelector('.contact-toggle-main');
  
  if (floatingBtn && toggleMain) {
    toggleMain.addEventListener('click', function(e) {
      e.stopPropagation();
      floatingBtn.classList.toggle('active');
    });
    
    document.addEventListener('click', function(e) {
      if (!floatingBtn.contains(e.target)) {
        floatingBtn.classList.remove('active');
      }
    });
    
    const contactOptions = document.querySelectorAll('.contact-option');
    contactOptions.forEach(option => {
      option.addEventListener('click', function() {
        floatingBtn.classList.remove('active');
      });
    });
  }
});
