export const setupGalleryVideo = () => {
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
