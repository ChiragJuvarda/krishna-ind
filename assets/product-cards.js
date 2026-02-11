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

    var swiper = new Swiper(container, {
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
      pagination: {
        el: container.querySelector('.swiper-pagination'),
        clickable: true
      }
    });

    container.__productCardsSwiper = swiper;
  });
});

