export const setupHeroVariants = (root) => {
  const slider = root.querySelector('[data-slider]');
  const kitList = root.querySelector('[data-kit-list]');
  if (!slider || !kitList) return;

  const image = slider.querySelector('[data-slider-track] img');
  const previousButton = slider.querySelector('[data-slider-prev]');
  const nextButton = slider.querySelector('[data-slider-next]');
  const kits = Array.from(kitList.querySelectorAll('.kit'));
  if (!image || !kits.length) return;

  let current = kits.findIndex((kit) => kit.classList.contains('kit_on'));
  if (current < 0) current = 0;

  const render = () => {
    kits.forEach((kit, index) => {
      kit.classList.toggle('kit_on', index === current);
    });
    const photo = kits[current].getAttribute('data-kit-photo');
    if (!photo) return;
    image.classList.add('is_changing');
    window.setTimeout(() => {
      image.setAttribute('src', photo);
      image.classList.remove('is_changing');
    }, 150);
  };

  const goTo = (index) => {
    current = (index + kits.length) % kits.length;
    render();
  };

  kits.forEach((kit, index) => {
    kit.addEventListener('click', () => goTo(index));
  });

  if (previousButton) previousButton.addEventListener('click', () => goTo(current - 1));
  if (nextButton) nextButton.addEventListener('click', () => goTo(current + 1));
};
