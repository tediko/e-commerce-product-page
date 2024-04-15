const cartButton = document.querySelector('[data-cart-button]');
const cartContainer = document.querySelector('[data-cart-container]');

let isCartOpen = false;
let isAnimationEnd = true;
const openClass = 'open';
const closeClass = 'close';
let KEYCODE_TAB = 9;

let focusableElements = cartContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
let firstFocusableEl = focusableElements[0];
let lastFocusableEl = focusableElements[focusableElements.length - 1];
let focusedElementBeforeCartOpen;

const handleKeyDown = (e) => {
    focusableElements = cartContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
    firstFocusableEl = focusableElements[0];
    lastFocusableEl = focusableElements[focusableElements.length - 1];

    let isTabPressed = (e.key === 'tab' || e.keyCode === KEYCODE_TAB);
    if (!isTabPressed) return;

    if (e.shiftKey) {
        if (document.activeElement === firstFocusableEl) {
            lastFocusableEl.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusableEl) {
            firstFocusableEl.focus();
            e.preventDefault();
        }
    }
}

// Traps focus within cart container
export const focusTrap = () => {
    firstFocusableEl.focus();
    cartContainer.addEventListener('keydown', handleKeyDown)
}

function closeCartOnEscape(event) {
    let KEYCODE_ESC = 27;
    if (event.keyCode === KEYCODE_ESC) {
        toggleCart();
    }
}

// Displays or hides a cart container
const toggleCart = () => {
    if (!isAnimationEnd) return;

    isCartOpen = !isCartOpen;
    cartButton.ariaExpanded = isCartOpen;
    isAnimationEnd = !isAnimationEnd;

    const cartCloseButton = document.querySelector('[data-cart-close]');
    cartCloseButton.addEventListener('click', toggleCart);
    
    if (isCartOpen) {
        cartContainer.classList.add(openClass);
        focusedElementBeforeCartOpen = document.activeElement;
        focusTrap();

        cartContainer.addEventListener('keydown', closeCartOnEscape);
        cartContainer.addEventListener('animationend', function cartOpen() {
            isAnimationEnd = !isAnimationEnd;
            cartContainer.removeEventListener('animationend', cartOpen);
        })
    } else {
        cartContainer.classList.add(closeClass);
        
        cartContainer.addEventListener('animationend', function cartClose() {
            isAnimationEnd = !isAnimationEnd;
            cartContainer.classList.remove(openClass, closeClass);
            focusedElementBeforeCartOpen.focus();

            cartContainer.removeEventListener('animationend', cartClose);
            cartCloseButton.removeEventListener('click', toggleCart);
            cartContainer.removeEventListener('keydown', closeCartOnEscape);
            cartContainer.removeEventListener('keydown', handleKeyDown);
        })
    }
}

// Event listeners
export default cartButton.addEventListener('click', toggleCart);