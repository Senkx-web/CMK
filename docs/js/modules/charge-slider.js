export const setupChargeSlider = (root) => {
  const photo = root.querySelector('[data-slide-img]');
  const dots = Array.from(root.querySelectorAll('[data-slider-dots] .dot_button'));
  if (!photo || !dots.length) return;

  const AUTOPLAY_DELAY = 7000;
  let current = dots.findIndex((dot) => dot.classList.contains('is_on'));
  if (current < 0) current = 0;
  let timer = null;

  const goTo = (index) => {
    current = (index + dots.length) % dots.length;
    dots.forEach((dot, dotIndex) => dot.classList.toggle('is_on', dotIndex === current));
    const src = dots[current].getAttribute('data-photo');
    if (src) {
      photo.classList.add('is_changing');
      window.setTimeout(() => {
        photo.setAttribute('src', src);
        photo.classList.remove('is_changing');
      }, 150);
    }
    restartAutoplay();
  };

  const restartAutoplay = () => {
    if (timer) window.clearInterval(timer);
    timer = window.setInterval(() => goTo(current + 1), AUTOPLAY_DELAY);
  };

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goTo(index));
  });

  restartAutoplay();
};
