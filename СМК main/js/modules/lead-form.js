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

export const setupLeadForm = (form) => {
  const phoneInput = form.querySelector('[data-phone-input]');
  if (phoneInput) setupPhoneInput(phoneInput);

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.classList.add('is_sent');
  });
};
