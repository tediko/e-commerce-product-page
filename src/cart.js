const cartButton = document.querySelector('[data-cart-button]');
const cartContainer = document.querySelector('[data-cart-container]');

let isCartOpen = false;
let isAnimationEnd = true;
const openClass = 'open';
const closeClass = 'close';

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

        cartContainer.addEventListener('animationend', function cartOpen() {
            isAnimationEnd = !isAnimationEnd;
            cartContainer.removeEventListener('animationend', cartOpen);
        })
    } else {
        cartContainer.classList.add(closeClass);
        
        cartContainer.addEventListener('animationend', function cartClose() {
            isAnimationEnd = !isAnimationEnd;
            cartContainer.classList.remove(openClass, closeClass);

            cartContainer.removeEventListener('animationend', cartClose);
            cartCloseButton.removeEventListener('click', toggleCart);
        })
    }
}

// Event listeners
export default cartButton.addEventListener('click', toggleCart);