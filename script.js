document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader")
  window.addEventListener("load", () => {
    preloader.style.opacity = "0"
    setTimeout(() => {
      preloader.style.display = "none"
    }, 500)
  })

  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")

  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden")
    // Accessibility
    const expanded = menuToggle.getAttribute("aria-expanded") === "true" || false
    menuToggle.setAttribute("aria-expanded", !expanded)
    menuToggle.setAttribute("aria-label", expanded ? "Abrir menú de navegación" : "Cerrar menú de navegación")
  })

  // Navbar Scroll Effect
  const navbar = document.getElementById("navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const menuIcon = document.querySelector("#menu-toggle i")
  const logo = document.querySelector("#navbar img")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.remove("bg-transparent")
      navbar.classList.add("bg-white")
      navbar.classList.add("shadow-md")

      // Change text color of nav links
      navLinks.forEach((link) => {
        link.classList.remove("text-white")
        link.classList.add("text-gray-800")
      })

      // Change menu icon color
      menuIcon.classList.remove("text-white")
      menuIcon.classList.add("text-gray-800")
    } else {
      navbar.classList.add("bg-transparent")
      navbar.classList.remove("bg-white")
      navbar.classList.remove("shadow-md")

      // Restore text color of nav links
      navLinks.forEach((link) => {
        link.classList.add("text-white")
        link.classList.remove("text-gray-800")
      })

      // Restore menu icon color
      menuIcon.classList.add("text-white")
      menuIcon.classList.remove("text-gray-800")
    }
  })

  // Initialize AOS (Animate on Scroll)
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  } else {
    console.warn("AOS is not defined. Make sure to include the AOS library.")
  }

  // Service Tabs
  const serviceTabs = document.querySelectorAll(".service-tab")
  const serviceContents = document.querySelectorAll(".service-tab-content")

  serviceTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active class from all tabs
      serviceTabs.forEach((t) => {
        t.classList.remove("active")
        t.setAttribute("aria-selected", "false")
      })

      // Add active class to clicked tab
      tab.classList.add("active")
      tab.setAttribute("aria-selected", "true")

      // Hide all content
      serviceContents.forEach((content) => content.classList.remove("active"))

      // Show content related to clicked tab
      const targetId = tab.getAttribute("data-target")
      document.getElementById(targetId).classList.add("active")
    })
  })

  // Testimonials Slider
  const testimonialsSlider = document.getElementById("testimonials-slider")
  const testimonialPrev = document.getElementById("testimonial-prev")
  const testimonialNext = document.getElementById("testimonial-next")
  const testimonialCards = document.querySelectorAll(".testimonial-card")
  let currentTestimonial = 0

  function showTestimonial(index) {
    const slideWidth = testimonialsSlider.clientWidth
    testimonialsSlider.scrollLeft = slideWidth * index
    currentTestimonial = index
  }

  testimonialPrev.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial - 1 + testimonialCards.length) % testimonialCards.length
    showTestimonial(currentTestimonial)
  })

  testimonialNext.addEventListener("click", () => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    showTestimonial(currentTestimonial)
  })

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
    showTestimonial(currentTestimonial)
  }, 5000)

  testimonialsSlider.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval)
  })

  testimonialsSlider.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonialCards.length
      showTestimonial(currentTestimonial)
    }, 5000)
  })

  // Animate Counters
  function animateCounter(element, target, duration) {
    let start = 0
    const increment = target / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      element.textContent = Math.floor(start)

      if (start >= target) {
        element.textContent = target
        clearInterval(timer)
      }
    }, 16)
  }

  // Initialize counters when they come into view
  const counters = document.querySelectorAll(".counter")
  let counted = false

  function checkCounters() {
    if (counters.length > 0 && !counted) {
      const windowHeight = window.innerHeight
      const counterSection = counters[0].parentElement.parentElement.parentElement
      const counterTop = counterSection.getBoundingClientRect().top

      if (counterTop < windowHeight - 100) {
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target, 2000)
        })
        counted = true
      }
    }
  }

  window.addEventListener("scroll", checkCounters)
  checkCounters() // Check on load

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("visible")
    } else {
      backToTopButton.classList.remove("visible")
    }
  })

  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        // Close mobile menu if open
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden")
          menuToggle.setAttribute("aria-expanded", "false")
        }

        // Scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
        })
      }
    })
  })

  // Form Submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form data
      const formData = new FormData(contactForm)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Here you would typically send the data to your server
      console.log("Form submitted with data:", formObject)

      // Show success message
      const successMessage = document.createElement("div")
      successMessage.className = "p-4 mt-4 bg-green-100 text-green-800 rounded-lg"
      successMessage.setAttribute("role", "alert")
      successMessage.innerHTML = "¡Gracias por tu mensaje! Te contactaremos pronto."

      contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling)

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove()
      }, 5000)

      // Reset form
      contactForm.reset()
    })
  }

  // Cookie Consent
  const cookieConsent = document.getElementById("cookie-consent")
  const acceptCookies = document.getElementById("accept-cookies")
  const declineCookies = document.getElementById("decline-cookies")

  // Check if user has already made a choice
  const cookieChoice = localStorage.getItem("cookieConsent")

  if (!cookieChoice) {
    // Show cookie consent after 2 seconds
    setTimeout(() => {
      cookieConsent.classList.remove("hidden")
    }, 2000)
  }

  acceptCookies.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "accepted")
    cookieConsent.classList.add("hidden")
  })

  declineCookies.addEventListener("click", () => {
    localStorage.setItem("cookieConsent", "declined")
    cookieConsent.classList.add("hidden")
  })
})
