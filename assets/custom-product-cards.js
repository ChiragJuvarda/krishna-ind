/* ==========================================
   CUSTOM PRODUCT CARDS - INTERACTIVE FEATURES
   Original JavaScript by Krishna-Ind Theme
   ========================================== */

class CustomProductCards {
  constructor() {
    this.init();
  }

  init() {
    // Initialize quick add to cart
    this.initQuickAdd();
    
    // Initialize quick view
    this.initQuickView();
    
    // Initialize image hover effects
    this.initImageHover();
    
    // Initialize accessibility features
    this.initAccessibility();
  }

  /* ==========================================
     QUICK ADD TO CART
     ========================================== */
  initQuickAdd() {
    const quickAddButtons = document.querySelectorAll('.custom-quick-action--cart');
    
    quickAddButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const variantId = button.getAttribute('data-product-id');
        
        if (!variantId) {
          console.error('No variant ID found');
          return;
        }

        // Add loading state
        button.classList.add('loading');
        button.disabled = true;
        
        try {
          const response = await fetch('/cart/add.js', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: [{
                id: variantId,
                quantity: 1
              }]
            })
          });

          if (!response.ok) {
            throw new Error('Failed to add to cart');
          }

          const result = await response.json();
          
          // Success feedback
          this.showSuccessAnimation(button);
          
          // Update cart count
          this.updateCartCount();
          
          // Trigger cart drawer if available
          this.openCartDrawer();
          
        } catch (error) {
          console.error('Error adding to cart:', error);
          this.showErrorAnimation(button);
        } finally {
          button.classList.remove('loading');
          button.disabled = false;
        }
      });
    });
  }

  /* ==========================================
     QUICK VIEW
     ========================================== */
  initQuickView() {
    const quickViewButtons = document.querySelectorAll('.custom-quick-action--view');
    
    quickViewButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const productUrl = button.getAttribute('data-product-url');
        
        if (productUrl) {
          // Redirect to product page
          window.location.href = productUrl;
        }
      });
    });
  }

  /* ==========================================
     IMAGE HOVER EFFECTS
     ========================================== */
  initImageHover() {
    const cards = document.querySelectorAll('.custom-product-card');
    
    cards.forEach(card => {
      const primaryImage = card.querySelector('.custom-product-card__image--primary');
      const secondaryImage = card.querySelector('.custom-product-card__image--secondary');
      
      if (primaryImage && secondaryImage) {
        card.addEventListener('mouseenter', () => {
          primaryImage.style.opacity = '0';
          secondaryImage.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
          primaryImage.style.opacity = '1';
          secondaryImage.style.opacity = '0';
        });
      }
    });
  }

  /* ==========================================
     ACCESSIBILITY FEATURES
     ========================================== */
  initAccessibility() {
    // Add keyboard navigation for quick actions
    const quickActions = document.querySelectorAll('.custom-quick-action');
    
    quickActions.forEach(action => {
      action.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          action.click();
        }
      });
      
      // Make buttons focusable
      if (!action.hasAttribute('tabindex')) {
        action.setAttribute('tabindex', '0');
      }
    });
  }

  /* ==========================================
     SUCCESS ANIMATION
     ========================================== */
  showSuccessAnimation(button) {
    // Create checkmark icon
    const originalContent = button.innerHTML;
    button.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M3 9l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;
    
    // Animate scale
    button.style.transform = 'scale(1.3)';
    
    // Reset after animation
    setTimeout(() => {
      button.innerHTML = originalContent;
      button.style.transform = '';
    }, 1500);
  }

  /* ==========================================
     ERROR ANIMATION
     ========================================== */
  showErrorAnimation(button) {
    button.style.animation = 'shake 0.4s ease-in-out';
    
    setTimeout(() => {
      button.style.animation = '';
    }, 400);
  }

  /* ==========================================
     UPDATE CART COUNT
     ========================================== */
  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // Update cart count in header
      const cartCountElements = document.querySelectorAll('.cart-count-bubble, [data-cart-count]');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
        
        // Show badge if items exist
        if (cart.item_count > 0) {
          element.classList.remove('hidden');
        }
      });
    } catch (error) {
      console.error('Error updating cart count:', error);
    }
  }

  /* ==========================================
     OPEN CART DRAWER
     ========================================== */
  openCartDrawer() {
    // Try to open cart drawer if theme supports it
    const cartDrawer = document.querySelector('cart-drawer');
    if (cartDrawer && typeof cartDrawer.open === 'function') {
      cartDrawer.open();
      return;
    }
    
    // Try cart notification
    const cartNotification = document.querySelector('cart-notification');
    if (cartNotification && typeof cartNotification.open === 'function') {
      cartNotification.open();
      return;
    }
    
    // Fallback: Dispatch custom event
    document.dispatchEvent(new CustomEvent('cart:updated'));
  }
}

/* ==========================================
   SHAKE ANIMATION KEYFRAMES
   ========================================== */
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .custom-quick-action.loading {
    pointer-events: none;
    opacity: 0.6;
    animation: pulse 1s infinite;
  }
`;
document.head.appendChild(style);

/* ==========================================
   INITIALIZE ON DOM READY
   ========================================== */
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new CustomProductCards();
  });
} else {
  new CustomProductCards();
}

// Re-initialize when section is loaded dynamically (theme editor)
document.addEventListener('shopify:section:load', () => {
  new CustomProductCards();
});
