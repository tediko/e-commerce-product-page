const cartButton = document.querySelector('[data-cart-button]');
const cartContainer = document.querySelector('[data-cart-container]');

let isCartOpen = false;
let isAnimationEnd = true;
const openClass = 'open';
const closeClass = 'close';
let focusedElementBeforeCartOpen;

// Traps focus within cart container
const focusTrap = () => {
    focusedElementBeforeCartOpen = document.activeElement;
    let focusableElements = cartContainer.querySelectorAll('a[href]:not([disabled]), button:not([disabled])');
    let firstFocusableEl = focusableElements[0];
    let lastFocusableEl = focusableElements[focusableElements.length - 1];
    firstFocusableEl.focus();

    let KEYCODE_TAB = 9;

    cartContainer.addEventListener('keydown', (e) => {
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
    })
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
        focusTrap();

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
        })
    }
}

// Event listeners
export default cartButton.addEventListener('click', toggleCart);