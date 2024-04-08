import Glide from '@glidejs/glide'

export default new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 10,
    keyboard: true,
    animationDuration: 600,
  }).mount();