// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 50,
      delay: 100,
    })
  
    // Preloader
    const preloader = document.getElementById("preloader")
    const loaderProgress = document.querySelector(".loader-progress")
  
    window.addEventListener("load", () => {
      // Animate loader progress
      loaderProgress.style.width = "100%"
  
      // Ensure the loader animation completes
      setTimeout(() => {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
  
          // Trigger animations after preloader is gone
          document.querySelectorAll(".hero-title, .hero-subtitle, .hero-buttons, .hero-graphic").forEach((el) => {
            el.style.opacity = "1"
            el.style.transform = "translateY(0)"
          })
        }, 500)
      }, 1000)
    })
  
    // Header scroll effect
    const header = document.getElementById("header")
    const scrollThreshold = 100
  
    function handleHeaderScroll() {
      if (window.scrollY > scrollThreshold) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  
    window.addEventListener("scroll", handleHeaderScroll)
    handleHeaderScroll() // Initial check
  
    // Mobile Navigation Toggle
    const navToggle = document.querySelector(".nav-toggle")
    const mobileNav = document.querySelector(".mobile-nav")
    const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
    const body = document.body
  
    navToggle.addEventListener("click", function () {
      this.classList.toggle("active")
      mobileNav.classList.toggle("active")
      body.classList.toggle("no-scroll")
    })
  
    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active")
        mobileNav.classList.remove("active")
        body.classList.remove("no-scroll")
      })
    })
  
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - header.offsetHeight
  
          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Active navigation link on scroll
    const sections = document.querySelectorAll("section[id]")
  
    function highlightNavOnScroll() {
      const scrollPosition = window.scrollY + header.offsetHeight + 100
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")
  
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll(".nav-link").forEach((link) => {
            link.classList.remove("active")
            if (link.getAttribute("href") === "#" + sectionId) {
              link.classList.add("active")
            }
          })
        }
      })
    }
  
    window.addEventListener("scroll", highlightNavOnScroll)
    highlightNavOnScroll() // Initial check
  
    // Services Tabs
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanels = document.querySelectorAll(".tab-panel")
  
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons and panels
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabPanels.forEach((panel) => panel.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        // Show corresponding panel with animation
        const tabId = this.getAttribute("data-tab")
        const targetPanel = document.getElementById(tabId)
  
        // Apply fade-in animation
        targetPanel.style.opacity = "0"
        targetPanel.classList.add("active")
  
        setTimeout(() => {
          targetPanel.style.opacity = "1"
        }, 50)
      })
    })
  
    // Gallery Filter
    const filterButtons = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    filterButtons.forEach((button) => {
      button.addEventListener("click", function () {
        // Remove active class from all buttons
        filterButtons.forEach((btn) => btn.classList.remove("active"))
  
        // Add active class to clicked button
        this.classList.add("active")
  
        const filterValue = this.getAttribute("data-filter")
  
        galleryItems.forEach((item) => {
          // Add fade-out animation
          item.style.opacity = "0"
          item.style.transform = "scale(0.95)"
  
          setTimeout(() => {
            if (filterValue === "all" || item.classList.contains("filter-" + filterValue)) {
              item.style.display = "block"
              // Add fade-in animation
              setTimeout(() => {
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
              }, 50)
            } else {
              item.style.display = "none"
            }
          }, 300)
        })
      })
    })
  
    // Load More Gallery Items
    const loadMoreBtn = document.getElementById("load-more-btn")
    let currentItems = 8
  
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        const galleryItems = document.querySelectorAll(".gallery-item")
        const visibleItems = Array.from(galleryItems).filter((item) => item.style.display !== "none")
  
        for (let i = currentItems; i < currentItems + 4; i++) {
          if (visibleItems[i]) {
            visibleItems[i].style.opacity = "0"
            visibleItems[i].style.transform = "scale(0.95)"
            visibleItems[i].style.display = "block"
  
            // Use closure to capture the current item
            ;((item) => {
              setTimeout(
                () => {
                  item.style.opacity = "1"
                  item.style.transform = "scale(1)"
                },
                50 * (i - currentItems),
              )
            })(visibleItems[i])
          }
        }
  
        currentItems += 4
  
        // Hide load more button if all items are visible
        if (currentItems >= visibleItems.length) {
          loadMoreBtn.style.opacity = "0"
          setTimeout(() => {
            loadMoreBtn.style.display = "none"
          }, 300)
        }
      })
    }
  
    // Stats Counter Animation
    const statNumbers = document.querySelectorAll(".stat-number")
    let statsAnimated = false
  
    function animateStats() {
      if (statsAnimated) return
  
      const statsSection = document.querySelector(".stats-section")
      const statsSectionTop = statsSection.offsetTop
      const statsSectionHeight = statsSection.offsetHeight
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY
  
      if (scrollPosition > statsSectionTop - windowHeight + 200) {
        statNumbers.forEach((stat) => {
          const target = Number.parseInt(stat.getAttribute("data-count"))
          const duration = 2000 // 2 seconds
          const increment = target / (duration / 16) // 60fps
  
          let current = 0
          const timer = setInterval(() => {
            current += increment
            stat.textContent = Math.floor(current)
  
            if (current >= target) {
              stat.textContent = target
              clearInterval(timer)
            }
          }, 16)
        })
  
        statsAnimated = true
      }
    }
  
    window.addEventListener("scroll", animateStats)
    animateStats() // Initial check
  
    // Back to Top Button
    const backToTopBtn = document.getElementById("back-to-top")
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add("active")
      } else {
        backToTopBtn.classList.remove("active")
      }
    })
  
    backToTopBtn.addEventListener("click", (e) => {
      e.preventDefault()
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })
    })
  
    // WhatsApp Float Button
    const whatsappFloat = document.querySelector(".whatsapp-float")
    const contactForm = document.getElementById("contact-form")
  
    whatsappFloat.addEventListener("click", (e) => {
      e.preventDefault()
  
      // Get form data if available
      let message = "Hola, estoy interesado en sus servicios. "
  
      if (contactForm) {
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const phone = document.getElementById("phone").value
        const service = document.getElementById("service").value
        const userMessage = document.getElementById("message").value
  
        if (name || email || phone || service || userMessage) {
          message = `*Consulta desde MCG Latinoamérica*\n\n*Nombre:* ${name || "[Nombre]"}\n*Email:* ${email || "[Email]"}\n*Teléfono:* ${phone || "[Teléfono]"}\n*Servicio de interés:* ${service || "[No especificado]"}\n*Mensaje:* ${userMessage || "[No especificado]"}`
        }
      }
  
      // Encode the message for WhatsApp URL
      const encodedMessage = encodeURIComponent(message)
  
      // Open WhatsApp with the pre-filled message
      window.open(`https://wa.me/573001234567?text=${encodedMessage}`, "_blank")
    })
  
    // Contact Form Submission with animation
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const formData = {
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          phone: document.getElementById("phone").value,
          service: document.getElementById("service").value,
          message: document.getElementById("message").value,
        }
  
        // Here you would typically send the form data to a server
        // For demonstration, we'll just show a success message
  
        // Create success message with animation
        const successMessage = document.createElement("div")
        successMessage.className = "form-success"
        successMessage.style.opacity = "0"
        successMessage.style.transform = "translateY(20px)"
        successMessage.innerHTML = `
                  <div class="success-icon">
                      <i class="fas fa-check-circle"></i>
                  </div>
                  <h3>¡Mensaje Enviado!</h3>
                  <p>Gracias ${formData.name}, hemos recibido tu mensaje. Nos pondremos en contacto contigo pronto.</p>
              `
  
        // Replace form with success message
        contactForm.innerHTML = ""
        contactForm.appendChild(successMessage)
  
        // Animate success message
        setTimeout(() => {
          successMessage.style.opacity = "1"
          successMessage.style.transform = "translateY(0)"
        }, 100)
      })
    }
  
    // Cookie Consent with animation
    const cookieConsent = document.getElementById("cookie-consent")
    const acceptCookiesBtn = document.getElementById("accept-cookies")
    const declineCookiesBtn = document.getElementById("decline-cookies")
  
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieChoice")
  
    if (!cookieChoice) {
      // Show cookie consent after a delay
      setTimeout(() => {
        cookieConsent.classList.add("active")
      }, 2000)
    }
  
    acceptCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("cookieChoice", "accepted")
      cookieConsent.classList.remove("active")
    })
  
    declineCookiesBtn.addEventListener("click", () => {
      localStorage.setItem("cookieChoice", "declined")
      cookieConsent.classList.remove("active")
    })
  
    // Update copyright year
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear()
    }
  
    // Add parallax effect to hero section
    const heroSection = document.querySelector(".hero-section")
    const heroBackground = document.querySelector(".hero-background")
  
    if (heroSection && heroBackground) {
      window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY
        const translateY = scrollPosition * 0.3
  
        heroBackground.style.transform = `translateY(${translateY}px)`
      })
    }
  
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll(".project-card")
  
    projectCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const image = this.querySelector(".project-image img")
        image.style.transform = "scale(1.1)"
      })
  
      card.addEventListener("mouseleave", function () {
        const image = this.querySelector(".project-image img")
        image.style.transform = "scale(1)"
      })
    })
  
    // Add animation to value cards
    const valueCards = document.querySelectorAll(".value-card")
  
    valueCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`
    })
  
    // Add animation to feature items
    const featureItems = document.querySelectorAll(".feature-item")
  
    featureItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.1}s`
    })
  
    // Add animation to client items
    const clientItems = document.querySelectorAll(".client-item")
  
    clientItems.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`
    })
  
    // Add animation to gallery items
    const galleryItemsAll = document.querySelectorAll(".gallery-item")
  
    galleryItemsAll.forEach((item, index) => {
      item.style.transitionDelay = `${index * 0.05}s`
    })
  
    // Add animation to form inputs
    const formInputs = document.querySelectorAll("input, select, textarea")
  
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement.classList.add("focused")
      })
  
      input.addEventListener("blur", function () {
        this.parentElement.classList.remove("focused")
      })
    })
  })
  