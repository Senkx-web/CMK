import { setupMenu } from './modules/menu.js';
import { setupHeroVariants } from './modules/hero-slider.js';
import { setupVariantPicker } from './modules/variant-picker.js';
import { setupChargeSlider } from './modules/charge-slider.js';
import { setupCityPicker } from './modules/city-picker.js';
import { setupGalleryVideo } from './modules/gallery-video.js';
import { setupGallerySlider } from './modules/gallery-slider.js';
import { setupDragScroll } from './modules/drag-scroll.js';
import { setupLeadForm } from './modules/lead-form.js';

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
