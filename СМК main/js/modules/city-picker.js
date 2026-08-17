export const setupCityPicker = (root) => {
  const toggle = root.querySelector('[data-city-toggle]');
  const list = root.querySelector('[data-city-list]');
  const label = root.querySelector('[data-city-label]');
  const options = Array.from(root.querySelectorAll('[data-city-option]'));
  if (!toggle || !list || !label) return;

  const open = () => {
    list.hidden = false;
    root.classList.add('is_open');
    toggle.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    list.hidden = true;
    root.classList.remove('is_open');
    toggle.setAttribute('aria-expanded', 'false');
  };

  toggle.addEventListener('click', () => {
    if (list.hidden) open(); else close();
  });

  options.forEach((option) => {
    option.addEventListener('click', () => {
      label.textContent = option.textContent;
      options.forEach((otherOption) => otherOption.classList.remove('is_on'));
      option.classList.add('is_on');
      close();
    });
  });

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !list.hidden) close();
  });
};
