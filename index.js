// DOM Elements
const navbar = document.querySelector('.navbar');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkElements = document.querySelectorAll('.nav-link');

// Mobile Menu Toggle
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Smooth scrolling for navigation links
navLinkElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        
        // Update active link
        navLinkElements.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Active link highlighting based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Button click handlers
document.addEventListener('DOMContentLoaded', () => {
    // Book service buttons
    const bookButtons = document.querySelectorAll('.btn-primary');
    bookButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            if (button.textContent.includes('Book')) {
                e.preventDefault();
                showBookingModal();
            }
        });
    });
    
    // Watch video button
    const watchButton = document.querySelector('.btn-secondary');
    if (watchButton && watchButton.textContent.includes('Watch')) {
        watchButton.addEventListener('click', (e) => {
            e.preventDefault();
            showVideoModal();
        });
    }
});

// Modal functions
function showBookingModal() {
    const modal = document.createElement('div');
    modal.className = 'booking-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Book Your Service</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <form class="booking-form">
                        <div class="form-group">
                            <label for="service">Service Type</label>
                            <select id="service" name="service" required>
                                <option value="">Select a service</option>
                                <option value="wash-fold">Wash & Fold</option>
                                <option value="dry-cleaning">Dry Cleaning</option>
                                <option value="express">Express Service</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="pickup-date">Preferred Pickup Date</label>
                            <input type="date" id="pickup-date" name="pickup-date" required>
                        </div>
                        <div class="form-group">
                            <label for="pickup-time">Preferred Pickup Time</label>
                            <select id="pickup-time" name="pickup-time" required>
                                <option value="">Select time</option>
                                <option value="9-12">9:00 AM - 12:00 PM</option>
                                <option value="12-3">12:00 PM - 3:00 PM</option>
                                <option value="3-6">3:00 PM - 6:00 PM</option>
                                <option value="6-9">6:00 PM - 9:00 PM</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="address">Pickup Address</label>
                            <textarea id="address" name="address" rows="3" placeholder="Enter your complete address" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="phone">Phone Number</label>
                            <input type="tel" id="phone" name="phone" placeholder="(555) 123-4567" required>
                        </div>
                        <div class="form-group">
                            <label for="notes">Special Instructions</label>
                            <textarea id="notes" name="notes" rows="2" placeholder="Any special instructions for your laundry..."></textarea>
                        </div>
                        <button type="submit" class="btn-primary">Confirm Booking</button>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    });
    
    // Form submission
    modal.querySelector('.booking-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const bookingData = Object.fromEntries(formData);
        
        // Simulate booking submission
        showNotification('Booking confirmed! We will contact you shortly.', 'success');
        document.body.removeChild(modal);
    });
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    modal.querySelector('#pickup-date').setAttribute('min', today);
}

function showVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>How FreshWash Works</h2>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="video-container">
                        <iframe 
                            width="560" 
                            height="315" 
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal handlers
    modal.querySelector('.modal-close').addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.querySelector('.modal-overlay').addEventListener('click', (e) => {
        if (e.target === modal.querySelector('.modal-overlay')) {
            document.body.removeChild(modal);
        }
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            document.body.removeChild(notification);
        }
    }, 5000);
    
    // Manual close
    notification.querySelector('.notification-close').addEventListener('click', () => {
        document.body.removeChild(notification);
    });
}

// Counter animation for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/\d/g, '');
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + suffix;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + suffix;
            }
        }, 50);
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Trigger counter animation for stats section
            if (entry.target.classList.contains('hero-stats')) {
                animateCounters();
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .testimonial-card, .step, .hero-stats');
    animateElements.forEach(el => observer.observe(el));
});

// Add modal styles dynamically
const modalStyles = `
    .booking-modal, .video-modal {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 10000;
    }
    
    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
    }
    
    .modal-content {
        background: white;
        border-radius: 12px;
        max-width: 500px;
        width: 100%;
        max-height: 90vh;
        overflow-y: auto;
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        border-bottom: 1px solid #e9ecef;
    }
    
    .modal-header h2 {
        margin: 0;
        color: var(--text-dark);
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: var(--text-muted);
    }
    
    .modal-body {
        padding: 1.5rem;
    }
    
    .form-group {
        margin-bottom: 1.5rem;
    }
    
    .form-group label {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 600;
        color: var(--text-dark);
    }
    
    .form-group input,
    .form-group select,
    .form-group textarea {
        width: 100%;
        padding: 0.8rem;
        border: 2px solid #e9ecef;
        border-radius: 8px;
        font-size: 1rem;
        transition: border-color 0.3s ease;
    }
    
    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
        outline: none;
        border-color: var(--primary-color);
    }
    
    .video-container {
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
    }
    
    .video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        z-index: 10001;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    }
    
    .notification-content {
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-success .notification-content {
        border-left: 4px solid #28a745;
    }
    
    .notification-error .notification-content {
        border-left: 4px solid #dc3545;
    }
    
    .notification-info .notification-content {
        border-left: 4px solid var(--primary-color);
    }
    
    .notification-close {
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        color: var(--text-muted);
    }
    
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .navbar.scrolled {
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
    }
    
    @media (max-width: 768px) {
        .nav-links {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            flex-direction: column;
            padding: 1rem;
            box-shadow: var(--shadow-medium);
            transform: translateY(-100%);
            transition: transform 0.3s ease;
            display: flex;
        }
        
        .nav-links.active {
            transform: translateY(0);
        }
        
        .mobile-menu-toggle.active {
            transform: rotate(90deg);
        }
        
        .modal-overlay {
            padding: 1rem;
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    console.log('FreshWash website loaded successfully!');
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (!this.classList.contains('modal-close') && !this.classList.contains('notification-close')) {
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            }
        });
    });
});
