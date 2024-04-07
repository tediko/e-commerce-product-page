const menuButton = document.querySelector('[data-menu]');
const menuList = document.querySelector('[data-menu-list]');
const overlay = document.querySelector('[data-overlay]');
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

            menuList.removeEventListener('animationend', navClose);
            overlay.removeEventListener('click', toggleMenu);
        })
    }
}

// Event listeners
export default menuButton.addEventListener('click', toggleMenu);