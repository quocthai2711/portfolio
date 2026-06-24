document.addEventListener('DOMContentLoaded', () => {
    // ==========================================================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================================================
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ==========================================================================
    // 2. SCROLL PROGRESS BAR & SCROLLED HEADER
    // ==========================================================================
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        // Scroll progress
        const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (totalScrollHeight > 0) {
            const percentage = (window.scrollY / totalScrollHeight) * 100;
            scrollProgress.style.width = `${percentage}%`;
        }

        // Header scrolled styling
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // ==========================================================================
    // 3. ACTIVE NAV LINK ON SCROLL (INTERSECTION OBSERVER)
    // ==========================================================================
    const sections = document.querySelectorAll('section[id]');
    
    const observerOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the sweet spot
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // ==========================================================================
    // 4. SCROLL REVEAL (FADE-IN ANIMATIONS ON SCROLL)
    // ==========================================================================
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserverOptions = {
        root: null,
        rootMargin: '0px 0px -100px 0px', // Trigger slightly before coming fully into view
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it's revealed, we don't need to observe it anymore
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealObserverOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================================================
    // 5. PROJECT FILTERING
    // ==========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.style.transition = 'transform 0.4s ease, opacity 0.4s ease';
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.classList.add('hide');
                    }, 400);
                }
            });
        });
    });

    // ==========================================================================
    // 6. CONTACT FORM VALIDATION & DUMMY SUBMIT
    // ==========================================================================
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            let isValid = true;

            // Name validation
            if (nameInput.value.trim() === '') {
                nameInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                nameInput.parentElement.classList.remove('invalid');
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                emailInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                emailInput.parentElement.classList.remove('invalid');
            }

            // Message validation
            if (messageInput.value.trim() === '') {
                messageInput.parentElement.classList.add('invalid');
                isValid = false;
            } else {
                messageInput.parentElement.classList.remove('invalid');
            }

            if (isValid) {
                // Change button state
                const originalBtnContent = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>';

                // Simulate API call
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnContent;
                    
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Message sent successfully! Thank you for reaching out.';
                    
                    // Clear inputs
                    contactForm.reset();

                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, 1500);
            }
        });

        // Dynamic keyup checks to remove invalid classes when corrected
        [nameInput, emailInput, messageInput].forEach(input => {
            input.addEventListener('input', () => {
                if (input.value.trim() !== '') {
                    input.parentElement.classList.remove('invalid');
                }
            });
        });
    }
});
