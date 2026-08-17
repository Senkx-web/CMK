const setupMenu = () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is_open');
    toggle.classList.toggle('is_open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('is_open');
      toggle.classList.remove('is_open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
};

const setupHeroVariants = (root) => {
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

const setupVariantPicker = (list) => {
  const buttons = Array.from(list.querySelectorAll('.kit'));
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((otherButton) => otherButton.classList.remove('kit_on'));
      button.classList.add('kit_on');
    });
  });
};

const setupChargeSlider = (root) => {
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

const setupCityPicker = (root) => {
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

const setupGalleryVideo = () => {
  const modal = document.querySelector('[data-video-modal]');
  const buttons = document.querySelectorAll('[data-video-src]');
  if (!modal || !buttons.length) return;

  const player = modal.querySelector('[data-video-modal-player]');
  const closers = modal.querySelectorAll('[data-video-modal-close]');

  const open = (src) => {
    player.setAttribute('src', src);
    modal.hidden = false;
    player.play();
  };

  const close = () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
    modal.hidden = true;
  };

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const src = button.getAttribute('data-video-src');
      if (!src) return;
      open(src);
    });
  });

  closers.forEach((closeButton) => closeButton.addEventListener('click', close));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) close();
  });
};

const setupGallerySlider = (root) => {
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

const setupDragScroll = (element) => {
  let isDown = false;
  let startY = 0;
  let startScroll = 0;

  element.addEventListener('mousedown', (event) => {
    isDown = true;
    startY = event.clientY;
    startScroll = element.scrollTop;
  });

  window.addEventListener('mouseup', () => {
    isDown = false;
  });

  window.addEventListener('mousemove', (event) => {
    if (!isDown) return;
    event.preventDefault();
    element.scrollTop = startScroll - (event.clientY - startY);
  });
};

const setupPhoneInput = (input) => {
  input.addEventListener('input', () => {
    const digits = input.value.replace(/\D/g, '').replace(/^7/, '').slice(0, 10);
    let value = '+7';
    if (digits.length > 0) value += ' (' + digits.slice(0, 3);
    if (digits.length >= 3) value += ') ' + digits.slice(3, 6);
    if (digits.length >= 6) value += '-' + digits.slice(6, 8);
    if (digits.length >= 8) value += '-' + digits.slice(8, 10);
    input.value = value;
  });
};

const setupLeadForm = (form) => {
  const phoneInput = form.querySelector('[data-phone-input]');
  if (phoneInput) setupPhoneInput(phoneInput);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is_sent');
  });
};

document.addEventListener('DOMContentLoaded', () => {
  setupMenu();

  const heroSection = document.querySelector('.hero');
  if (heroSection) setupHeroVariants(heroSection);

  const speedKitList = document.querySelector('.speed .kit_list');
  if (speedKitList) setupVariantPicker(speedKitList);

  const chargeSlider = document.querySelector('[data-charge-slider]');
  if (chargeSlider) setupChargeSlider(chargeSlider);

  setupGalleryVideo();

  const gallerySlider = document.querySelector('[data-gallery-slider]');
  if (gallerySlider) setupGallerySlider(gallerySlider);

  const cityPicker = document.querySelector('[data-city-picker]');
  if (cityPicker) setupCityPicker(cityPicker);

  const reviewList = document.querySelector('[data-scroll-list]');
  if (reviewList) setupDragScroll(reviewList);

  const leadForm = document.querySelector('[data-lead-form]');
  if (leadForm) setupLeadForm(leadForm);
});
