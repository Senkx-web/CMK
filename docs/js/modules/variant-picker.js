export const setupVariantPicker = (list) => {
  const buttons = Array.from(list.querySelectorAll('.kit'));
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      buttons.forEach((otherButton) => otherButton.classList.remove('kit_on'));
      button.classList.add('kit_on');
    });
  });
};
