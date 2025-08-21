document.addEventListener('DOMContentLoaded', () => {

  // ===== DOM Elements =====
  const header = document.querySelector('.main-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.querySelector('.back-to-top');

  // ===== Mobile Menu =====
  menuToggle?.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // Close mobile menu when a link is clicked
  navItems.forEach(link => {
    link.addEventListener('click', () => {
      if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      }
    });
  });

  // ===== Header Scroll Behavior =====
  let lastScrollTop = 0;
  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
      // Downscroll
      header.style.top = '-150px'; 
    } else {
      // Upscroll
      header.style.top = '0';
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 

    // Back to top button visibility
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
  });

  // ===== Hero Slider =====
  const slides = document.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.slider-dots');
  const nextSlideBtn = document.querySelector('.next-slide');
  const prevSlideBtn = document.querySelector('.prev-slide');
  let currentSlide = 0;

  if (slides.length > 0) {
    // Create dots
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
    const dots = document.querySelectorAll('.dot');

    function goToSlide(n) {
      slides[currentSlide].classList.remove('active');
      dots[currentSlide].classList.remove('active');
      currentSlide = (n + slides.length) % slides.length;
      slides[currentSlide].classList.add('active');
      dots[currentSlide].classList.add('active');
    }

    nextSlideBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
    prevSlideBtn.addEventListener('click', () => goToSlide(currentSlide - 1));

    // Auto-play slider
    setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }

  // ===== Testimonials Slider =====
  const testimonials = document.querySelectorAll('.testimonial');
  const testimonialDotsContainer = document.querySelector('.testimonial-dots');
  const nextTestimonialBtn = document.querySelector('.testimonial-next');
  const prevTestimonialBtn = document.querySelector('.testimonial-prev');
  let currentTestimonial = 0;

  if (testimonials.length > 0) {
    testimonials.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('testimonial-dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        testimonialDotsContainer.appendChild(dot);
    });
    const testimonialDots = document.querySelectorAll('.testimonial-dot');

    function goToTestimonial(n) {
        testimonials[currentTestimonial].classList.remove('active');
        testimonialDots[currentTestimonial].classList.remove('active');
        currentTestimonial = (n + testimonials.length) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
    }

    nextTestimonialBtn.addEventListener('click', () => goToTestimonial(currentTestimonial + 1));
    prevTestimonialBtn.addEventListener('click', () => goToTestimonial(currentTestimonial - 1));
  }

  // ===== Active Nav Link on Scroll =====
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navItems.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href').substring(1) === entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(section => {
    observer.observe(section);
  });


  // ===== Footer Year =====
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
