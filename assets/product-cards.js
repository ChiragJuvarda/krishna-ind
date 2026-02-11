// product-cards.js - placeholder script for Product Cards section

// product-cards.js - script for Product Cards section

document.addEventListener('DOMContentLoaded', function () {
  // initialize Swiper instances within each product-cards section
  var containers = document.querySelectorAll('.product-cards-section .swiper-container');
  if (!containers || containers.length === 0) return;

  // if Swiper is not available, skip initialization (avoids console errors)
  if (typeof Swiper === 'undefined') return;

  containers.forEach(function (container) {
    // avoid double-init
    if (container.__productCardsSwiper) return;

    // read data attributes (strings) and convert
    var autoplayAttr = container.getAttribute('data-autoplay');
    var autoplay = autoplayAttr === 'true' || autoplayAttr === '1';
    var autoplayInterval = parseInt(container.getAttribute('data-autoplay-interval')) || 3000;
    var showDotsAttr = container.getAttribute('data-show-dots');
    var showDots = showDotsAttr === 'true' || showDotsAttr === '1';

    var paginationConfig = showDots ? { el: container.querySelector('.swiper-pagination'), clickable: true } : false;

    var swiperOptions = {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: 'auto',
      coverflowEffect: {
        rotate: 20,
        stretch: 0,
        depth: 350,
        modifier: 1,
        slideShadows: true
      },
      pagination: paginationConfig
    };

    if (autoplay) {
      swiperOptions.autoplay = { delay: autoplayInterval, disableOnInteraction: false };
    }

    try {
      var swiper = new Swiper(container, swiperOptions);
      container.__productCardsSwiper = swiper;
      // expose for debugging in dev
      container.__productCardsSwiperOptions = swiperOptions;
    } catch (e) {
      console.warn('Swiper init failed for product cards:', e);
    }
  });
});

