const cartButton = document.querySelector('[data-cart-button]');
const cartCounter = document.querySelector('[data-cart-counter]');
const cartWrapper = document.querySelector('[data-cart-wrapper]');
const formElement = document.querySelector('[data-product-form]');
const operatorButtons = document.querySelectorAll('[data-product-button]');
const inputElement = document.querySelector('[data-product-input]');

const activeClass = 'active';
let orders;

const products = [
    {
        name: 'Fall Limited Edition Sneakers',
        price: 125.00,
        imgSrc: '/shared/image-product-1.jpg'
    }
];

// Add data item to Storage object
const setLocalStorageItem = () => {
    localStorage.setItem("orders", JSON.stringify(orders));
}

// Receive data item from Storage object
const getLocalStorageItem = () => {
    return JSON.parse(localStorage.getItem("orders"));
}

// Add new item to orders array,
// save it to localStorage
// and display in cart container
const addItem = (newOrder) => {
    orders.push({...products[0], ...newOrder});
    setLocalStorageItem();
    displayOrdersInCart();
}

// Remove item from orders array with given index,
// save it to localStorage
// and display in cart container
const deleteItem = (itemIndex) => {
    orders.splice(itemIndex, 1);
    setLocalStorageItem();
    displayOrdersInCart();
}

// Show quantity of orders and display them on cartCounter element
const showCartCounter = (hasItems) => {
    if (hasItems) {
        cartButton.classList.add(activeClass);
        cartCounter.innerHTML = orders.length;
    } else {
        cartButton.classList.remove(activeClass);
    }
}

// Display orders items in cartWrapper element
const displayOrdersInCart = () => {
    if (orders.length == 0) {
        cartWrapper.innerHTML = `<p class="cart__info text text--700">Your cart is empty.</p>`;
        showCartCounter(false)
        return;
    }

    showCartCounter(true)
    cartWrapper.innerHTML = orders.map((order, index) => {
        return `
        <ul class="cart__list">
            <li class="cart__item">
                <img class="cart__item-image" src="${order.imgSrc}" alt="">
                <div class="cart__item-wrapper">
                    <h3 class="cart__item-title text">Fall Limited Edition Sneakers</h3>
                    <p class="cart__item-price text">$${order.price.toFixed(2)} x ${order.quantity} <span class="text--700 text--black">$${order.totalValue.toFixed(2)}</span></p>
                </div>
                <button class="cart__delete-btn" type="button" aria-label="delete item" data-product-delete="${index}">
                <img src="/shared/icon-delete.svg" alt="" aria-hidden="true">
                </button>
            </li>
        </ul>
        `
    }).join('') + `<button class="cart__checkout-btn button" type="button">Checkout</button>`

    const deleteButtons = document.querySelectorAll('[data-product-delete]');
    deleteButtons.forEach(button => button.addEventListener('click', () => {
        const itemIndex = button.dataset.productDelete;
        deleteItem(itemIndex);
    }))
}

// Increment or decrement input value depending which operator was used
const handleOperators = (operator) => {
    const operatorFunction = operator.target.dataset.productButton;

    if (operatorFunction === 'increment') {
        inputElement.value = +inputElement.value + 1;
    } else if (operatorFunction === 'decrement' && +inputElement.value > 0) {
        inputElement.value = +inputElement.value - 1;
    }
}

// Handle submit event
const handleSubmit = (event) => {
    event.preventDefault();
    const inputValue = +inputElement.value;
    if (inputValue === 0) return;

    let newOrder = {
        quantity: +inputValue,
        totalValue: +inputValue * +products[0].price
    };

    addItem(newOrder);
    inputElement.value = 0;
    newOrder = {};
}

// Initializes the orders array and displays orders in cart
const init = () => {
    orders = getLocalStorageItem() || [];
    displayOrdersInCart();
}

// Event listeners
formElement.addEventListener('submit', handleSubmit)
operatorButtons.forEach(operator => operator.addEventListener('click', handleOperators));
export default init();