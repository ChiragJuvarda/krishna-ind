/**
 * Batman Theme Animations & Loading Screen
 * Clean, error-free JavaScript
 */

(function() {
  'use strict';

  // ========================================
  // LOADING SCREEN
  // ========================================
  function initLoadingScreen() {
    const loader = document.getElementById('batman-loading-screen');
    const pageContent = document.getElementById('batman-page-content');
    
    if (!loader || !pageContent) return;

    // Simulate loading time (2.5 seconds to match animation)
    setTimeout(function() {
      loader.classList.add('hidden');
      pageContent.classList.add('visible');
      
      // Remove loader from DOM after animation completes
      setTimeout(function() {
        if (loader && loader.parentNode) {
          loader.parentNode.removeChild(loader);
        }
      }, 600);
      
      // Initialize animations after page is visible
      initScrollAnimations();
      initQuoteRotation();
    }, 2500);
  }

  // ========================================
  // SCROLL ANIMATIONS
  // ========================================
  function initScrollAnimations() {
    const fadeInElements = document.querySelectorAll('[data-batman-fade-in]');
    const slideUpElements = document.querySelectorAll('[data-batman-slide-up]');
    
    function checkVisibility() {
      const windowHeight = window.innerHeight;
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowBottom = windowTop + windowHeight;

      // Fade in elements
      fadeInElements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top + windowTop;
        const elementBottom = elementTop + element.offsetHeight;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;

        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          setTimeout(function() {
            element.classList.add('animate');
          }, delay);
        }
      });

      // Slide up elements (stats)
      slideUpElements.forEach(function(element) {
        const elementTop = element.getBoundingClientRect().top + windowTop;
        const elementBottom = elementTop + element.offsetHeight;
        const delay = parseInt(element.getAttribute('data-delay')) || 0;

        if (elementBottom >= windowTop && elementTop <= windowBottom) {
          setTimeout(function() {
            element.classList.add('animate');
          }, delay);
        }
      });
    }

    // Initial check
    checkVisibility();

    // Check on scroll
    let scrollTimeout;
    window.addEventListener('scroll', function() {
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      scrollTimeout = setTimeout(checkVisibility, 50);
    });

    // Check on resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
      if (resizeTimeout) {
        clearTimeout(resizeTimeout);
      }
      resizeTimeout = setTimeout(checkVisibility, 50);
    });
  }

  // ========================================
  // QUOTE ROTATION
  // ========================================
  function initQuoteRotation() {
    const quotesContainer = document.querySelector('.batman-hero__quotes');
    const quotes = document.querySelectorAll('.batman-quote');
    
    if (!quotesContainer || quotes.length === 0) return;

    let currentQuoteIndex = 0;
    const rotationInterval = 5000; // 5 seconds

    function showNextQuote() {
      // Remove active class from current quote
      quotes[currentQuoteIndex].classList.remove('active');
      
      // Move to next quote
      currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
      
      // Add active class to next quote
      quotes[currentQuoteIndex].classList.add('active');
    }

    // Start rotation
    setInterval(showNextQuote, rotationInterval);
  }

  // ========================================
  // PARALLAX EFFECT (Optional enhancement)
  // ========================================
  function initParallax() {
    const bgGif = document.querySelector('.batman-hero__bg-gif');
    
    if (!bgGif) return;

    let ticking = false;

    function updateParallax() {
      const scrolled = window.pageYOffset || document.documentElement.scrollTop;
      const parallaxSpeed = 0.5;
      
      if (bgGif) {
        bgGif.style.transform = 'translateY(' + (scrolled * parallaxSpeed) + 'px)';
      }
      
      ticking = false;
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(updateParallax);
        ticking = true;
      }
    });
  }

  // ========================================
  // STATS COUNTER ANIMATION
  // ========================================
  function initStatsCounter() {
    const stats = document.querySelectorAll('.batman-stat');
    let hasAnimated = false;

    function animateStats() {
      if (hasAnimated) return;

      const windowHeight = window.innerHeight;
      const windowTop = window.pageYOffset || document.documentElement.scrollTop;
      
      stats.forEach(function(stat) {
        const statTop = stat.getBoundingClientRect().top + windowTop;
        
        if (statTop < windowTop + windowHeight) {
          hasAnimated = true;
          
          // Add a subtle entrance animation
          stat.style.animation = 'batmanPulse 0.6s ease-out';
        }
      });
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on load
  }

  // ========================================
  // HOVER EFFECTS FOR ENHANCED INTERACTION
  // ========================================
  function initHoverEffects() {
    const stats = document.querySelectorAll('.batman-stat');
    
    stats.forEach(function(stat) {
      stat.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
      });
    });

    // Button hover sound effect (optional - commented out by default)
    const buttons = document.querySelectorAll('.batman-btn');
    buttons.forEach(function(button) {
      button.addEventListener('mouseenter', function() {
        // Optionally add sound effect here
        // const audio = new Audio('path-to-batman-sound.mp3');
        // audio.play();
      });
    });
  }

  // ========================================
  // KEYBOARD NAVIGATION ENHANCEMENT
  // ========================================
  function initKeyboardNav() {
    const quotes = document.querySelectorAll('.batman-quote');
    let currentIndex = 0;

    document.addEventListener('keydown', function(e) {
      // Arrow keys to navigate quotes
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        
        quotes[currentIndex].classList.remove('active');
        
        if (e.key === 'ArrowRight') {
          currentIndex = (currentIndex + 1) % quotes.length;
        } else {
          currentIndex = (currentIndex - 1 + quotes.length) % quotes.length;
        }
        
        quotes[currentIndex].classList.add('active');
      }
    });
  }

  // ========================================
  // INITIALIZE ALL FEATURES
  // ========================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        initLoadingScreen();
        initParallax();
        initStatsCounter();
        initHoverEffects();
        initKeyboardNav();
      });
    } else {
      initLoadingScreen();
      initParallax();
      initStatsCounter();
      initHoverEffects();
      initKeyboardNav();
    }
  }

  // ========================================
  // ERROR HANDLING
  // ========================================
  window.addEventListener('error', function(e) {
    console.warn('Batman Theme: Minor error occurred, but page will continue functioning:', e.message);
  });

  // Start initialization
  init();

})();
