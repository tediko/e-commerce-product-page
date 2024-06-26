const menuButton = document.querySelector('[data-menu]');
const menuList = document.querySelector('[data-menu-list]');
const overlay = document.querySelector('[data-overlay]');
const htmlElement = document.querySelector('html');

const mediaQuery = '(min-width: 769px)';
const mediaQueryList = window.matchMedia(mediaQuery);
let isMenuOpen = false;
let isAnimationEnd = true;
let openClass = 'open';
let closeClass = 'close';

// Toggle mobile menu
const toggleMenu = () => {
    if (!isAnimationEnd) return;

    isMenuOpen = !isMenuOpen;
    menuButton.ariaExpanded = isMenuOpen;
    isAnimationEnd = !isAnimationEnd;
    
    if (isMenuOpen) {
        overlay.classList.add(openClass);
        menuList.classList.add(openClass);
        htmlElement.style.overflowY = 'hidden';
        
        menuList.addEventListener('animationend', function navOpen() {
            isAnimationEnd = !isAnimationEnd;
            menuList.removeEventListener('animationend', navOpen);
        })
        
        overlay.addEventListener('click', toggleMenu);
    } else {
        overlay.classList.add(closeClass);
        menuList.classList.add(closeClass);
        
        menuList.addEventListener('animationend', function navClose() {
            isAnimationEnd = !isAnimationEnd;
            overlay.classList.remove(openClass, closeClass);
            menuList.classList.remove(openClass, closeClass);
            htmlElement.style.overflowY = 'unset';
            
            menuList.removeEventListener('animationend', navClose);
            overlay.removeEventListener('click', toggleMenu);
        })
    }
}

// Disable menu
const disableMenu = () => {
    isMenuOpen = false;
    isAnimationEnd = true;
    menuButton.ariaExpanded = false;
    overlay.classList.remove(openClass, closeClass);
    menuList.classList.remove(openClass, closeClass);
    htmlElement.style.overflowY = 'unset';
    overlay.removeEventListener('click', toggleMenu);
}

// Event listeners
mediaQueryList.addEventListener('change', event => {
    if (event.matches) {
        disableMenu();
    }
})
export default menuButton.addEventListener('click', toggleMenu);