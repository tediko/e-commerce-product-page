import Glide from '@glidejs/glide'
const LIGHTBOX_CONTAINER_SELECTOR = document.querySelector('[data-lightbox]');
const LIGHTBOX_SLIDER_SELECTOR = document.querySelector('[data-glide="lightbox"]');
const CLOSE_BUTTON_SELECTOR = document.querySelector('[data-lightbox-close]');
const MAIN_SLIDER_SELECTOR = document.querySelector('[data-glide]');
const MAIN_SLIDER_TRACK_SELECTOR = document.querySelector('[data-main-slider-track]');
const OVERLAY_SELECTOR = document.querySelector('[data-overlay]');

let mediaQuery = '(min-width: 769px)';
let mediaQueryList = window.matchMedia(mediaQuery);
let isInitialized = false;

// Initialize a Glide
let glide = new Glide(LIGHTBOX_SLIDER_SELECTOR, {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    gap: 10,
    keyboard: true,
    animationDuration: 600,
});

// Adds a custom listener before first mounting begins and updates startAt option.
glide.on('mount.before', () => {
    glide.update({startAt: MAIN_SLIDER_SELECTOR.dataset.glideIdx})
})


// Shows lightbox visually and mounts a Glide
const showLightbox = () => {
    isInitialized ? null : glide = new Glide(LIGHTBOX_SLIDER_SELECTOR, {
        type: 'carousel',
        startAt: MAIN_SLIDER_SELECTOR.dataset.glideIdx,
        perView: 1,
        gap: 10,
        keyboard: true,
        animationDuration: 600,
    });
    LIGHTBOX_CONTAINER_SELECTOR.style.display = 'flex';
    OVERLAY_SELECTOR.classList.add('open');    
    isInitialized ? null : glide.mount();
    isInitialized = true;
}

// Hides lightbox visually and removes event listener
const removeLightbox = () => {
    hideLightbox();
    MAIN_SLIDER_TRACK_SELECTOR.removeEventListener('click', showLightbox);
    glide.destroy();
}
// Hides lightbox visually
const hideLightbox = () => {
    LIGHTBOX_CONTAINER_SELECTOR.style.display = "none";
    OVERLAY_SELECTOR.classList.remove('open', 'close');
}

// Adds event listener on initialization if mediaQuery matches
// mediaQueryList.matches ? MAIN_SLIDER_TRACK_SELECTOR.addEventListener('click', showLightbox) : null;
if (mediaQueryList.matches) {
    MAIN_SLIDER_TRACK_SELECTOR.addEventListener('click', showLightbox);
}

// Event listeners
mediaQueryList.addEventListener('change', event => {
        if (event.matches) {
            MAIN_SLIDER_TRACK_SELECTOR.addEventListener('click', showLightbox)
            isInitialized = false;
        } else {
            removeLightbox();
            isInitialized = false;
        }
})
CLOSE_BUTTON_SELECTOR.addEventListener('click', hideLightbox);
OVERLAY_SELECTOR.addEventListener('click', hideLightbox);

export default glide;