// Declare AOS if it's not already declared
if (typeof AOS === "undefined") {
    var AOS = {
      init: () => {},
    }
  }
  
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", () => {
    // Initialize AOS (Animate On Scroll) with reduced settings for mobile
    const isMobile = window.innerWidth < 768
  
    AOS.init({
      duration: isMobile ? 400 : 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: isMobile ? 30 : 50,
      delay: isMobile ? 0 : 100,
      disable: "mobile", // Desactivar en móviles para mejor rendimiento
    })
  
    // Preloader - Optimizado
    const preloader = document.getElementById("preloader")
    const loaderProgress = document.querySelector(".loader-progress")
  
    // Función para ocultar el preloader
    function hidePreloader() {
      if (preloader) {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
          document.body.classList.remove("no-scroll") // Asegurar que el scroll esté habilitado
        }, 300)
      }
    }
  
    // Establecer un tiempo máximo para el preloader (5 segundos)
    const preloaderTimeout = setTimeout(hidePreloader, 5000)
  
    window.addEventListener("load", () => {
      // Cancelar el timeout ya que la página cargó antes
      clearTimeout(preloaderTimeout)
  
      // Animar la barra de progreso rápidamente
      if (loaderProgress) {
        loaderProgress.style.width = "100%"
      }
  
      // Ocultar el preloader después de un breve retraso
      setTimeout(hidePreloader, 500)
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
  
    // Smooth scrolling for navigation links - optimizado
    const navLinks = document.querySelectorAll(".nav-link, .mobile-nav-link")
  
    navLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        e.preventDefault()
  
        const targetId = this.getAttribute("href")
        const targetSection = document.querySelector(targetId)
  
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - (header ? header.offsetHeight : 0)
  
          window.scrollTo({
            top: offsetTop,
            behavior: isMobile ? "auto" : "smooth", // Más rápido en móviles
          })
        }
      })
    })
  
    // Active navigation link on scroll - optimizado con throttling
    const sections = document.querySelectorAll("section[id]")
    let isScrolling = false
  
    function highlightNavOnScroll() {
      if (isScrolling) return
  
      isScrolling = true
  
      setTimeout(() => {
        const scrollPosition = window.scrollY + (header ? header.offsetHeight : 0) + 100
  
        sections.forEach((section) => {
          if (!section) return
  
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
  
        isScrolling = false
      }, 100) // Throttle a 100ms
    }
  
    window.addEventListener("scroll", highlightNavOnScroll)
    // Ejecutar después de que la página esté completamente cargada
    window.addEventListener("load", highlightNavOnScroll)
  
    // Services Tabs - optimizado
    const tabButtons = document.querySelectorAll(".tab-btn")
    const tabPanels = document.querySelectorAll(".tab-panel")
  
    if (tabButtons.length && tabPanels.length) {
      tabButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons and panels
          tabButtons.forEach((btn) => btn.classList.remove("active"))
          tabPanels.forEach((panel) => {
            panel.classList.remove("active")
            panel.style.opacity = "0"
          })
  
          // Add active class to clicked button
          this.classList.add("active")
  
          // Show corresponding panel with animation
          const tabId = this.getAttribute("data-tab")
          const targetPanel = document.getElementById(tabId)
  
          if (targetPanel) {
            targetPanel.classList.add("active")
  
            // Aplicar la animación después de un pequeño retraso
            requestAnimationFrame(() => {
              targetPanel.style.opacity = "1"
            })
          }
        })
      })
    }
  
    // Gallery Filter - optimizado
    const filterButtons = document.querySelectorAll(".filter-btn")
    const galleryItems = document.querySelectorAll(".gallery-item")
  
    if (filterButtons.length && galleryItems.length) {
      filterButtons.forEach((button) => {
        button.addEventListener("click", function () {
          // Remove active class from all buttons
          filterButtons.forEach((btn) => btn.classList.remove("active"))
  
          // Add active class to clicked button
          this.classList.add("active")
  
          const filterValue = this.getAttribute("data-filter")
  
          galleryItems.forEach((item) => {
            if (filterValue === "all" || item.classList.contains("filter-" + filterValue)) {
              item.style.display = "block"
              // Usar requestAnimationFrame para mejor rendimiento
              requestAnimationFrame(() => {
                item.style.opacity = "1"
                item.style.transform = "scale(1)"
              })
            } else {
              item.style.opacity = "0"
              item.style.transform = "scale(0.95)"
  
              // Ocultar después de la transición
              setTimeout(() => {
                item.style.display = "none"
              }, 300)
            }
          })
        })
      })
    }
  
    // Load More Gallery Items - optimizado
    const loadMoreBtn = document.getElementById("load-more-btn")
    let currentItems = 8
  
    if (loadMoreBtn && galleryItems.length) {
      loadMoreBtn.addEventListener("click", () => {
        const visibleItems = Array.from(galleryItems).filter((item) => getComputedStyle(item).display !== "none")
  
        // Mostrar solo 4 elementos más a la vez
        const itemsToShow = Math.min(4, visibleItems.length - currentItems)
  
        if (itemsToShow <= 0) {
          loadMoreBtn.style.display = "none"
          return
        }
  
        for (let i = 0; i < itemsToShow; i++) {
          const item = visibleItems[currentItems + i]
          if (item) {
            item.style.display = "block"
  
            // Usar setTimeout escalonado para no bloquear el hilo principal
            setTimeout(() => {
              item.style.opacity = "1"
              item.style.transform = "scale(1)"
            }, i * 50)
          }
        }
  
        currentItems += itemsToShow
  
        // Ocultar botón si no hay más elementos
        if (currentItems >= visibleItems.length) {
          loadMoreBtn.style.opacity = "0"
          setTimeout(() => {
            loadMoreBtn.style.display = "none"
          }, 300)
        }
      })
    }
  
    // Stats Counter Animation - optimizado con IntersectionObserver
    const statNumbers = document.querySelectorAll(".stat-number")
  
    if (statNumbers.length) {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const statsSection = entry.target
              const statElements = statsSection.querySelectorAll(".stat-number")
  
              statElements.forEach((stat) => {
                const target = Number.parseInt(stat.getAttribute("data-count") || "0")
                const duration = isMobile ? 1000 : 2000 // Más rápido en móviles
                const increment = target / (duration / 16)
  
                let current = 0
                const timer = setInterval(() => {
                  current += increment
                  stat.textContent = Math.floor(current).toString()
  
                  if (current >= target) {
                    stat.textContent = target.toString()
                    clearInterval(timer)
                  }
                }, 16)
              })
  
              // Dejar de observar después de animar
              statsObserver.unobserve(statsSection)
            }
          })
        },
        {
          threshold: 0.1,
        },
      )
  
      const statsSection = document.querySelector(".stats-section")
      if (statsSection) {
        statsObserver.observe(statsSection)
      }
    }
  
    // Back to Top Button - optimizado con throttling
    const backToTopBtn = document.getElementById("back-to-top")
    let isScrollingTop = false
  
    if (backToTopBtn) {
      window.addEventListener("scroll", () => {
        if (!isScrollingTop) {
          isScrollingTop = true
  
          setTimeout(() => {
            if (window.scrollY > 300) {
              backToTopBtn.classList.add("active")
            } else {
              backToTopBtn.classList.remove("active")
            }
  
            isScrollingTop = false
          }, 100)
        }
      })
  
      backToTopBtn.addEventListener("click", (e) => {
        e.preventDefault()
        window.scrollTo({
          top: 0,
          behavior: isMobile ? "auto" : "smooth", // Más rápido en móviles
        })
      })
    }
  
    // WhatsApp Float Button
    const whatsappFloat = document.querySelector(".whatsapp-float")
    const contactForm = document.getElementById("contact-form")
  
    if (whatsappFloat) {
      whatsappFloat.addEventListener("click", (e) => {
        e.preventDefault()
  
        // Get form data if available
        let message = "Hola, estoy interesado en sus servicios. "
  
        if (contactForm) {
          const name = document.getElementById("name")?.value || ""
          const email = document.getElementById("email")?.value || ""
          const phone = document.getElementById("phone")?.value || ""
          const service = document.getElementById("service")?.value || ""
          const userMessage = document.getElementById("message")?.value || ""
  
          if (name || email || phone || service || userMessage) {
            message = `*Consulta desde MCG Latinoamérica*\n\n*Nombre:* ${name || "[Nombre]"}\n*Email:* ${email || "[Email]"}\n*Teléfono:* ${phone || "[Teléfono]"}\n*Servicio de interés:* ${service || "[No especificado]"}\n*Mensaje:* ${userMessage || "[No especificado]"}`
          }
        }
  
        // Encode the message for WhatsApp URL
        const encodedMessage = encodeURIComponent(message)
  
        // Open WhatsApp with the pre-filled message
        window.open(`https://wa.me/573001234567?text=${encodedMessage}`, "_blank")
      })
    }
  
    // Contact Form Submission with animation
    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const formData = {
          name: document.getElementById("name")?.value || "",
          email: document.getElementById("email")?.value || "",
          phone: document.getElementById("phone")?.value || "",
          service: document.getElementById("service")?.value || "",
          message: document.getElementById("message")?.value || "",
        }
  
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
        requestAnimationFrame(() => {
          successMessage.style.opacity = "1"
          successMessage.style.transform = "translateY(0)"
        })
      })
    }
  
    // Cookie Consent with animation
    const cookieConsent = document.getElementById("cookie-consent")
    const acceptCookiesBtn = document.getElementById("accept-cookies")
    const declineCookiesBtn = document.getElementById("decline-cookies")
  
    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem("cookieChoice")
  
    if (cookieConsent && !cookieChoice) {
      // Show cookie consent after a delay - más corto en móviles
      setTimeout(
        () => {
          cookieConsent.classList.add("active")
        },
        isMobile ? 1000 : 2000,
      )
    }
  
    if (acceptCookiesBtn) {
      acceptCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieChoice", "accepted")
        cookieConsent?.classList.remove("active")
      })
    }
  
    if (declineCookiesBtn) {
      declineCookiesBtn.addEventListener("click", () => {
        localStorage.setItem("cookieChoice", "declined")
        cookieConsent?.classList.remove("active")
      })
    }
  
    // Update copyright year
    const currentYearElement = document.getElementById("current-year")
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString()
    }
  
    // Add parallax effect to hero section - desactivado en móviles
    if (!isMobile) {
      const heroSection = document.querySelector(".hero-section")
      const heroBackground = document.querySelector(".hero-background")
  
      if (heroSection && heroBackground) {
        let ticking = false
  
        window.addEventListener("scroll", () => {
          if (!ticking) {
            window.requestAnimationFrame(() => {
              const scrollPosition = window.scrollY
              const translateY = scrollPosition * 0.3
  
              heroBackground.style.transform = `translateY(${translateY}px)`
              ticking = false
            })
  
            ticking = true
          }
        })
      }
    }
  
    // Optimizar animaciones y efectos para móviles
    if (isMobile) {
      // Reducir o eliminar animaciones en móviles
      document
        .querySelectorAll(".graphic-element, .value-card, .feature-item, .client-item, .gallery-item")
        .forEach((el) => {
          el.style.transitionDelay = "0s"
        })
    } else {
      // Add hover effects to project cards
      const projectCards = document.querySelectorAll(".project-card")
  
      projectCards.forEach((card) => {
        card.addEventListener("mouseenter", function () {
          const image = this.querySelector(".project-image img")
          if (image) image.style.transform = "scale(1.1)"
        })
  
        card.addEventListener("mouseleave", function () {
          const image = this.querySelector(".project-image img")
          if (image) image.style.transform = "scale(1)"
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
    }
  
    // Add animation to form inputs - simplificado
    const formInputs = document.querySelectorAll("input, select, textarea")
  
    formInputs.forEach((input) => {
      input.addEventListener("focus", function () {
        this.parentElement?.classList.add("focused")
      })
  
      input.addEventListener("blur", function () {
        this.parentElement?.classList.remove("focused")
      })
    })
  })
  