import gsap from 'gsap';

const initGallery = () => {
  const frames = document.querySelectorAll('.art-frame-container');

  // --- NEW: Carousel Logic ---
  const carousels = document.querySelectorAll('[data-carousel]');
  carousels.forEach((carousel) => {
    const track = carousel.querySelector('.carousel-track');
    const slides = carousel.querySelectorAll('.carousel-slide');
    const nextBtn = carousel.querySelector('.next');
    const prevBtn = carousel.querySelector('.prev');
    
    if (slides.length <= 1) {
      if (nextBtn) nextBtn.style.display = 'none';
      if (prevBtn) prevBtn.style.display = 'none';
      return;
    }

    let currentIndex = 0;

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

    nextBtn?.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent interfering with other clicks
      updateCarousel('next');
    });
    
    prevBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      updateCarousel('prev');
    });
  });
  // --- End Carousel Logic ---

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
        // 1. The Shrink (0% to 40%)
        const shrinkPhase = Math.min(progress / 0.4, 1);
        const scale = 1.5 - (shrinkPhase * 0.5);
        
        // Apply scale to the container
        container.style.transform = `scale(${scale})`;

        // Fade in side info
        info.forEach(layer => {
            layer.style.opacity = shrinkPhase;
            layer.style.transform = `translateY(${(1 - shrinkPhase) * 20}px)`;
        });

        // 2. The Shadow (20% to 90%)
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