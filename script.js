document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 5;
        loaderProgress.style.width = `${progress}%`;
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        }
    }, 100);
  
    // Header Scroll Effect
    const header = document.getElementById('header');
    const logoSpan = document.querySelector('.logo span');
    const navLinks = document.querySelectorAll('.nav-link');
    const navToggle = document.querySelector('.nav-toggle');
    const navToggleSpans = document.querySelectorAll('.nav-toggle span');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
  
    // Mobile Navigation
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileNav.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });
    
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
    });
  
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
  
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollY = window.pageYOffset;
        const headerHeight = header.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
  
    // Services Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            tabBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Hide all panels
            tabPanels.forEach(panel => panel.classList.remove('active'));
            
            // Show the corresponding panel
            const tabId = btn.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
  
    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filter === 'all' || item.classList.contains(`filter-${filter}`)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
  
    // Load More Gallery Items
    const loadMoreBtn = document.getElementById('load-more-btn');
    let currentItems = 8;
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const galleryItems = document.querySelectorAll('.gallery-item');
            const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');
            
            let visibleItems = 0;
            
            for (let i = 0; i < galleryItems.length; i++) {
                if ((activeFilter === 'all' || galleryItems[i].classList.contains(`filter-${activeFilter}`)) && 
                    i >= currentItems && visibleItems < 4) {
                    galleryItems[i].style.display = 'block';
                    visibleItems++;
                }
            }
            
            currentItems += visibleItems;
            
            // Hide load more button if all items are visible
            if (currentItems >= galleryItems.length) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }
  
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll('.stat-number');
    let counted = false;
    
    function animateCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start);
            
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 16);
    }
    
    function checkCounters() {
        if (statNumbers.length > 0 && !counted) {
            const windowHeight = window.innerHeight;
            const statsSection = document.querySelector('.stats-section');
            const statsTop = statsSection.getBoundingClientRect().top;
            
            if (statsTop < windowHeight - 100) {
                statNumbers.forEach(number => {
                    const target = parseInt(number.getAttribute('data-count'));
                    animateCounter(number, target, 2000);
                });
                counted = true;
            }
        }
    }
    
    window.addEventListener('scroll', checkCounters);
    checkCounters(); // Check on load
  
    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
  
    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Here you would typically send the data to your server
            console.log('Form submitted with data:', formObject);
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'form-success';
            successMessage.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                <div class="success-text">
                    <h4>¡Mensaje Enviado!</h4>
                    <p>Gracias por contactarnos. Te responderemos a la brevedad.</p>
                </div>
            `;
            
            contactForm.innerHTML = '';
            contactForm.appendChild(successMessage);
        });
    }
  
    // Cookie Consent
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');
    
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');
    
    if (!cookieChoice) {
        // Show cookie consent after 2 seconds
        setTimeout(() => {
            cookieConsent.style.display = 'block';
        }, 2000);
    }
    
    acceptCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.style.display = 'none';
    });
    
    declineCookies.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.style.display = 'none';
    });
  
    // Current Year in Footer
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
  
    // Image Gallery Lightbox
    const galleryItemImages = document.querySelectorAll('.gallery-item img');
    
    if (galleryItemImages.length > 0) {
        galleryItemImages.forEach(item => {
            item.addEventListener('click', () => {
                const lightbox = document.createElement('div');
                lightbox.className = 'lightbox';
                
                const lightboxContent = document.createElement('div');
                lightboxContent.className = 'lightbox-content';
                
                const lightboxImg = document.createElement('img');
                lightboxImg.src = item.src;
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'lightbox-close';
                closeBtn.innerHTML = '&times;';
                
                lightboxContent.appendChild(lightboxImg);
                lightboxContent.appendChild(closeBtn);
                lightbox.appendChild(lightboxContent);
                document.body.appendChild(lightbox);
                
                // Prevent scrolling when lightbox is open
                document.body.style.overflow = 'hidden';
                
                // Close lightbox when clicking on close button or outside the image
                lightbox.addEventListener('click', (e) => {
                    if (e.target === lightbox || e.target === closeBtn) {
                        document.body.removeChild(lightbox);
                        document.body.style.overflow = 'auto';
                    }
                });
            });
        });
    }
  
    // AOS Animation Initialization (if AOS is included)
    let AOS;
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
  });