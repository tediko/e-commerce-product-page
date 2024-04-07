const menuButton = document.querySelector('[data-menu]');
const menuList = document.querySelector('[data-menu-list]');
const overlay = document.querySelector('[data-overlay]');
let isMenuOpen = false;
let isAnimationEnd = true;

// Toggle mobile menu
const toggleMenu = () => {
    if (!isAnimationEnd) return;

    isMenuOpen = !isMenuOpen;
    menuButton.ariaExpanded = isMenuOpen;
    isAnimationEnd = !isAnimationEnd;
    
    if (isMenuOpen) {
        overlay.classList.add('open');
        menuList.classList.add('open');

        menuList.addEventListener('animationend', function navOpen() {
            isAnimationEnd = !isAnimationEnd;
            menuList.removeEventListener('animationend', navOpen);
        })

        overlay.addEventListener('click', toggleMenu);
    } else {
        overlay.classList.add('close');
        menuList.classList.add('close');

        menuList.addEventListener('animationend', function navClose() {
            isAnimationEnd = !isAnimationEnd;
            overlay.classList.remove('open', 'close');
            menuList.classList.remove('open', 'close');

            menuList.removeEventListener('animationend', navClose);
            overlay.removeEventListener('click', toggleMenu);
        })
    }
}

// Event listeners
export default menuButton.addEventListener('click', toggleMenu);