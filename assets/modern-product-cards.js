/**
 * Modern Product Cards - Interactive Features
 * Handles quick add, quick view, and other card interactions
 */

class ModernProductCards {
  constructor() {
    this.cards = document.querySelectorAll('.modern-product-card');
    this.init();
  }

  init() {
    if (!this.cards.length) return;

    this.setupQuickAdd();
    this.setupQuickView();
    this.setupColorSwatches();
    this.setupLazyLoading();
    this.setupAnimations();
  }

  /**
   * Setup Quick Add functionality
   */
  setupQuickAdd() {
    const quickAddButtons = document.querySelectorAll('.modern-quick-btn--add');
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = button.closest('.modern-product-card');
        const productId = card.dataset.productId;
        
        if (!productId) return;

        // Add loading state
        button.classList.add('is-loading');
        button.disabled = true;

        // Call add to cart
        this.addToCart(productId, button);
      });
    });
  }

  /**
   * Add product to cart
   */
  async addToCart(productId, button) {
    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          id: productId,
          quantity: 1
        })
      });

      if (!response.ok) throw new Error('Failed to add to cart');

      const data = await response.json();
      
      // Show success feedback
      this.showSuccessFeedback(button);
      
      // Update cart count if cart drawer exists
      this.updateCartCount();
      
      // Trigger cart drawer if available
      this.triggerCartDrawer();

    } catch (error) {
      console.error('Error adding to cart:', error);
      this.showErrorFeedback(button);
    } finally {
      button.classList.remove('is-loading');
      button.disabled = false;
    }
  }

  /**
   * Setup Quick View functionality
   */
  setupQuickView() {
    const quickViewButtons = document.querySelectorAll('.modern-quick-btn--view');
    
    quickViewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = button.closest('.modern-product-card');
        const productLink = card.querySelector('.modern-product-card__title-link');
        
        if (!productLink) return;

        // For now, navigate to product page
        // Can be enhanced with modal quick view
        const productUrl = productLink.href;
        this.openQuickView(productUrl);
      });
    });
  }

  /**
   * Open quick view modal
   */
  openQuickView(productUrl) {
    // Check if quick view modal exists in theme
    const modalElement = document.querySelector('product-modal');
    
    if (modalElement) {
      // Use existing product modal
      modalElement.loadContent(productUrl);
    } else {
      // Fallback: open in new tab or current page
      window.location.href = productUrl;
    }
  }

  /**
   * Setup color swatch interactions
   */
  setupColorSwatches() {
    const swatches = document.querySelectorAll('.modern-color-swatch');
    
    swatches.forEach(swatch => {
      swatch.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const card = swatch.closest('.modern-product-card');
        const colorName = swatch.getAttribute('title');
        
        // Update product image based on color selection
        this.updateProductImage(card, colorName);
        
        // Update active state
        const allSwatches = card.querySelectorAll('.modern-color-swatch');
        allSwatches.forEach(s => s.classList.remove('active'));
        swatch.classList.add('active');
      });
    });
  }

  /**
   * Update product image based on color selection
   */
  updateProductImage(card, colorName) {
    // This would require variant images data
    // For now, just add visual feedback
    const image = card.querySelector('.modern-product-card__image');
    if (image) {
      image.style.opacity = '0.6';
      setTimeout(() => {
        image.style.opacity = '1';
      }, 200);
    }
  }

  /**
   * Setup lazy loading for images
   */
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const image = entry.target;
            if (image.dataset.src) {
              image.src = image.dataset.src;
              image.removeAttribute('data-src');
            }
            image.classList.add('loaded');
            observer.unobserve(image);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });

      const lazyImages = document.querySelectorAll('.modern-product-card__image[data-src]');
      lazyImages.forEach(image => imageObserver.observe(image));
    }
  }

  /**
   * Setup scroll animations
   */
  setupAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });

      this.cards.forEach(card => {
        card.classList.add('will-animate');
        animationObserver.observe(card);
      });
    }
  }

  /**
   * Show success feedback
   */
  showSuccessFeedback(button) {
    const originalHTML = button.innerHTML;
    button.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    button.style.background = '#10b981';
    button.style.color = 'white';
    
    setTimeout(() => {
      button.innerHTML = originalHTML;
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }

  /**
   * Show error feedback
   */
  showErrorFeedback(button) {
    button.style.background = '#ef4444';
    button.style.color = 'white';
    
    setTimeout(() => {
      button.style.background = '';
      button.style.color = '';
    }, 2000);
  }

  /**
   * Update cart count
   */
  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      const cartCountElements = document.querySelectorAll('[data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
      
      // Dispatch custom event for cart update
      document.dispatchEvent(new CustomEvent('cart:updated', { detail: cart }));
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  /**
   * Trigger cart drawer
   */
  triggerCartDrawer() {
    const cartDrawer = document.querySelector('cart-drawer');
    const cartNotification = document.querySelector('cart-notification');
    
    if (cartDrawer && typeof cartDrawer.open === 'function') {
      cartDrawer.open();
    } else if (cartNotification && typeof cartNotification.open === 'function') {
      cartNotification.open();
    }
  }
}

/**
 * Product Rating Component
 */
class ProductRating {
  constructor() {
    this.renderRatings();
  }

  renderRatings() {
    const ratingContainers = document.querySelectorAll('.modern-product-card__rating[data-rating]');
    
    ratingContainers.forEach(container => {
      const rating = parseFloat(container.dataset.rating);
      const count = parseInt(container.dataset.count) || 0;
      
      if (rating > 0) {
        container.innerHTML = this.generateStars(rating) + 
          (count > 0 ? ` <span class="rating-count">(${count})</span>` : '');
      }
    });
  }

  generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      starsHTML += '<span class="star star--full">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
      starsHTML += '<span class="star star--half">★</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
      starsHTML += '<span class="star star--empty">☆</span>';
    }
    
    return starsHTML;
  }
}

/**
 * Performance Utilities
 */
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Initialize on DOM ready
 */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initModernProductCards);
} else {
  initModernProductCards();
}

function initModernProductCards() {
  new ModernProductCards();
  new ProductRating();
}

/**
 * Shopify Theme Editor Support
 */
if (Shopify && Shopify.designMode) {
  document.addEventListener('shopify:section:load', () => {
    initModernProductCards();
  });
  
  document.addEventListener('shopify:section:reorder', () => {
    initModernProductCards();
  });
}

/**
 * Export for use in other scripts
 */
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { ModernProductCards, ProductRating };
}
