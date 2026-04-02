// gallery.js
const initGallery = () => {
  const frames = document.querySelectorAll('.art-frame-container');

  const handleScroll = () => {
    frames.forEach((frame) => {
      const rect = frame.getBoundingClientRect();
      const viewHeight = window.innerHeight;

      // Calculate progress: 0 when top enters, 1 when bottom leaves
      // Since height is 300vh, we have plenty of room.
      let progress = -rect.top / (rect.height - viewHeight);
      progress = Math.max(0, Math.min(1, progress));

      const container = frame.querySelector('.image-container');
      const shadow = frame.querySelector('.shadow-person');
      const info = frame.querySelectorAll('.info-layer');

      if (progress > 0 && progress < 1) {
        // 1. The Shrink (0% to 40% of the scroll)
        const shrinkPhase = Math.min(progress / 0.4, 1);
        const scale = 1.5 - (shrinkPhase * 0.5);
        container.style.transform = `scale(${scale})`;

        info.forEach(margin => {
            margin.style.opacity = shrinkPhase;
            margin.style.transform = `translateY(${(1 - shrinkPhase) * 20}px)`;
        });

        // 3. The Shadow (20% to 90% of the scroll)
        if (progress > 0.2) {
          const shadowPhase = (progress - 0.2) / 0.7;
          // Moves from -100% to 200% across the screen
          shadow.style.left = `${-100 + (shadowPhase * 300)}%`;
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
};

// Handle Astro's view transitions if you use them
document.addEventListener('astro:page-load', initGallery);
// Or standard load
if (!window.astroTransitionEnabled) {
    initGallery();
}