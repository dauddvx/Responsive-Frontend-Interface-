/**
 * script.js
 * Main JavaScript file for interactive elements
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // NAVBAR LOGIC
    // ==========================================
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.main-nav__toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.main-nav__link, .main-nav__cta');

    /**
     * Sticky Navbar Shadow
     * Adds a class when the user scrolls down to show a subtle shadow.
     */
    const handleScroll = () => {
        if (window.scrollY > 20) {
            header.classList.add('is-scrolled');
        } else {
            header.classList.remove('is-scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });

    /**
     * Mobile Hamburger Menu Toggle
     */
    if (navToggle && navMenu) {
        const toggleMenu = () => {
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            
            // Toggle ARIA state and menu class
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('is-active');
            
            // Prevent body scroll when menu is open on mobile
            if (!isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        };

        navToggle.addEventListener('click', toggleMenu);

        // Close the mobile menu automatically when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
        });
        
        // Optional: Close menu when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('is-active') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                toggleMenu();
            }
        });
    }

    // ==========================================
    // SMOOTH SCROLLING
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return; // Ignore empty hashes
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                // Offset calculation (height of sticky header)
                const headerHeight = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // NUMBER COUNTER ANIMATION
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const counterSection = document.getElementById('counter-section');
    let animated = false;

    if (counters.length > 0 && counterSection) {
        // IntersectionObserver to start animation when visible
        const counterObserver = new IntersectionObserver((entries, observer) => {
            const [entry] = entries;
            
            if (entry.isIntersecting && !animated) {
                animated = true; // Prevent re-animating
                
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const startTimestamp = performance.now();
                    
                    const step = (timestamp) => {
                        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                        // Ease out quad formula for smooth deceleration
                        const easeProgress = progress * (2 - progress); 
                        
                        const currentValue = Math.floor(easeProgress * target);
                        
                        // Add commas to large numbers automatically
                        counter.innerText = currentValue.toLocaleString();
                        
                        if (progress < 1) {
                            window.requestAnimationFrame(step);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };
                    
                    window.requestAnimationFrame(step);
                });
                
                // Unobserve after animating once to save resources
                observer.unobserve(counterSection);
            }
        }, {
            root: null,
            threshold: 0.5 // Start when section is 50% visible
        });
        
        counterObserver.observe(counterSection);
    }

    // ==========================================
    // TESTIMONIALS SLIDER
    // ==========================================
    const track = document.getElementById('testimonial-track');
    const prevBtn = document.getElementById('testi-prev');
    const nextBtn = document.getElementById('testi-next');
    const dotsContainer = document.getElementById('testi-dots');

    if (track && prevBtn && nextBtn && dotsContainer) {
        const slides = Array.from(track.children);
        let currentIndex = 0;

        // Create dots dynamically based on number of slides
        slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            if (index === 0) dot.classList.add('is-active');
            
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        const dots = Array.from(dotsContainer.children);

        const updateSlider = () => {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('is-active'));
            dots[currentIndex].classList.add('is-active');
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateSlider();
        };

        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
            updateSlider();
        });

        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
            updateSlider();
        });

        // Auto-play functionality
        let slideInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);

        // Pause on hover for better UX
        const sliderContainer = document.querySelector('.testimonials__slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    nextBtn.click();
                }, 5000);
            });
        }
    }

    // ==========================================
    // FAQ ACCORDION LOGIC
    // ==========================================
    const faqToggles = document.querySelectorAll('.faq-item__toggle');

    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            
            // Optional UX: Close all other open accordions
            faqToggles.forEach(otherToggle => {
                if (otherToggle !== toggle && otherToggle.getAttribute('aria-expanded') === 'true') {
                    otherToggle.setAttribute('aria-expanded', 'false');
                }
            });

            // Toggle the clicked accordion
            toggle.setAttribute('aria-expanded', !isExpanded);
        });
    });

    // ==========================================
    // CONTACT FORM VALIDATION & SUBMISSION
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const alertBox = document.getElementById('form-alert');
        const submitBtn = document.getElementById('submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Regex patterns for validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[\d\s\-\+\(\)]+$/; // Basic phone validation allowing + - ( )

        const validateField = (input, errorEl, condition) => {
            if (condition) {
                input.classList.remove('is-invalid');
                errorEl.hidden = true;
                return true;
            } else {
                input.classList.add('is-invalid');
                errorEl.hidden = false;
                return false;
            }
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Reset alert state
            alertBox.hidden = true;
            alertBox.className = 'form__alert';

            // Get form fields
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            const messageInput = document.getElementById('message');

            // Get error text elements
            const nameError = document.getElementById('name-error');
            const emailError = document.getElementById('email-error');
            const phoneError = document.getElementById('phone-error');
            const messageError = document.getElementById('message-error');

            // Execute Validation
            const isNameValid = validateField(nameInput, nameError, nameInput.value.trim() !== '');
            const isEmailValid = validateField(emailInput, emailError, emailPattern.test(emailInput.value.trim()));
            const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim() !== '');
            
            // Phone is optional but if filled, must be valid
            let isPhoneValid = true;
            if (phoneInput.value.trim() !== '') {
                isPhoneValid = validateField(phoneInput, phoneError, phonePattern.test(phoneInput.value.trim()));
            } else {
                phoneInput.classList.remove('is-invalid');
                phoneError.hidden = true;
            }

            if (isNameValid && isEmailValid && isMessageValid && isPhoneValid) {
                // Simulated Form Submission (Network Request)
                submitBtn.disabled = true;
                btnText.hidden = true;
                btnLoader.hidden = false;

                setTimeout(() => {
                    // Success State Callback
                    submitBtn.disabled = false;
                    btnText.hidden = false;
                    btnLoader.hidden = true;

                    contactForm.reset();

                    alertBox.textContent = 'Thank you! Your message has been successfully sent. We will get back to you shortly.';
                    alertBox.classList.add('form__alert--success');
                    alertBox.hidden = false;
                    
                }, 1500); // Simulate 1.5s network delay
            } else {
                // Global Error State
                alertBox.textContent = 'Please fix the highlighted errors in the form before submitting.';
                alertBox.classList.add('form__alert--error');
                alertBox.hidden = false;
            }
        });

        // Real-time validation UX improvement (remove errors as user types)
        const inputs = contactForm.querySelectorAll('.form__input, .form__textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid')) {
                    input.classList.remove('is-invalid');
                    const errorEl = document.getElementById(`${input.id}-error`);
                    if(errorEl) errorEl.hidden = true;
                }
            });
        });
    }

    // ==========================================
    // STICKY HEADER & SCROLL SHADOW
    // ==========================================
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('is-scrolled');
            } else {
                header.classList.remove('is-scrolled');
            }
        }, { passive: true });
    }

    // ==========================================
    // ENTRANCE ANIMATIONS (INTERSECTION OBSERVER)
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Stop observing once revealed for performance
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px 0px -50px 0px', // Trigger slightly before it enters fully
            threshold: 0.15
        });

        revealElements.forEach(el => revealObserver.observe(el));
    }

});
