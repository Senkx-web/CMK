export const setupGallerySlider = (root) => {
  const track = root.querySelector('[data-gallery-track]');
  const previousButton = root.querySelector('[data-gallery-prev]');
  const nextButton = root.querySelector('[data-gallery-next]');
  const dots = Array.from(root.querySelectorAll('[data-gallery-dots] .dot_button'));
  if (!track) return;

  const maxScroll = () => track.scrollWidth - track.clientWidth;

  const itemStep = () => {
    const items = track.children;
    return items[2] ? items[2].offsetLeft - items[0].offsetLeft : track.clientWidth;
  };

  const goNext = () => {
    if (track.scrollLeft >= maxScroll() - 2) {
      track.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      track.scrollTo({ left: track.scrollLeft + itemStep(), behavior: 'smooth' });
    }
  };

  const goPrev = () => {
    if (track.scrollLeft <= 2) {
      track.scrollTo({ left: maxScroll(), behavior: 'smooth' });
    } else {
      track.scrollTo({ left: track.scrollLeft - itemStep(), behavior: 'smooth' });
    }
  };

  if (nextButton) nextButton.addEventListener('click', goNext);
  if (previousButton) previousButton.addEventListener('click', goPrev);

  if (dots.length) {
    const updateDots = () => {
      const max = maxScroll();
      const progress = max > 0 ? track.scrollLeft / max : 0;
      const index = Math.min(dots.length - 1, Math.round(progress * (dots.length - 1)));
      dots.forEach((dot, dotIndex) => dot.classList.toggle('is_on', dotIndex === index));
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        track.scrollTo({ left: maxScroll() * (index / (dots.length - 1)), behavior: 'smooth' });
      });
    });

    track.addEventListener('scroll', updateDots);
  }
};
