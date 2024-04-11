import Glide from '@glidejs/glide'
const SLIDER_SELECTOR = document.querySelector('[data-glide]');

let glide = new Glide(SLIDER_SELECTOR, {
  type: 'carousel',
  startAt: 2,
  perView: 1,
  gap: 10,
  keyboard: true,
  animationDuration: 600,
})

glide.on(['mount.before', 'run'], function() {
  SLIDER_SELECTOR.dataset.glideIdx = glide._i;
})

export default glide.mount();