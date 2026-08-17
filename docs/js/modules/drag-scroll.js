export const setupDragScroll = (element) => {
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
