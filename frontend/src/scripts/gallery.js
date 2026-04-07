import gsap from 'gsap';

const initGallery = () => {
  const frames = document.querySelectorAll('.art-frame-container');
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;

    const updateCarousel = (direction) => {
      if (direction === 'next') {
        currentIndex = (currentIndex + 1) % slides.length;
      } else {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      }

      gsap.to(track, {
        xPercent: -100 * currentIndex,
        duration: 0.8,
        ease: "power3.inOut"
      });
    };

    // Helper to process the movement
    const processSwipe = (endX) => {
      const swipeThreshold = 50;
      if (startX - endX > swipeThreshold) {
        updateCarousel('next');
      } else if (endX - startX > swipeThreshold) {
        updateCarousel('prev');
      }
    };

    // --- BUTTON LISTENERS ---
    nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); updateCarousel('next'); });
    prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); updateCarousel('prev'); });

    // --- MOUSE LISTENERS (Desktop Drag) ---
    carousel.addEventListener('mousedown', (e) => {
      // Prevent browser from dragging the image file itself
      if (e.target.tagName === 'IMG') e.preventDefault(); 
      isDragging = true;
      startX = e.pageX;
      carousel.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', (e) => {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.cursor = 'grab';
      processSwipe(e.pageX);
    });

    // --- TOUCH LISTENERS (Mobile Swipe) ---
    carousel.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      processSwipe(e.changedTouches[0].screenX);
    }, { passive: true });
  });

  // --- SCROLL ANIMATION LOGIC ---
  const handleScroll = () => {
    frames.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      const viewHeight = window.innerHeight;
      const scrollHeight = rect.height - viewHeight;

      let progress = -rect.top / scrollHeight;
      progress = Math.max(0, Math.min(1, progress));

      const container = frame.querySelector('.image-container');
      const shadow = frame.querySelector('.shadow-person');
      const info = frame.querySelectorAll('.info-layer');

      if (rect.top < viewHeight && rect.bottom > 0) {
        const shrinkPhase = Math.min(progress / 0.4, 1);
        const scale = 1.5 - (shrinkPhase * 0.5);
        
        container.style.transform = `scale(${scale})`;

        info.forEach(layer => {
            layer.style.opacity = shrinkPhase;
            layer.style.transform = `translateY(${(1 - shrinkPhase) * 20}px)`;
        });

        if (progress > 0.2) {
          const shadowPhase = (progress - 0.2) / 0.7;
          shadow.style.left = `${-100 + (shadowPhase * 300)}%`;
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); 
};

document.addEventListener('astro:page-load', initGallery);
if (!window.astroTransitionEnabled) {
    initGallery();
}