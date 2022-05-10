// specific imports
import '../toggleSidebar.js';

import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';

import { addToCheckoutDOM } from '../checkoutCart/addToCheckoutDOM.js';
let cart = getStorageItem('cart');
const cartTable = getElement('.checkout-container');
const totalPrice = getElement('.total-price');

const displayTotal = () => {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  totalPrice.textContent = `Total : ${formatPrice(total)} `;
};
function displayCheckoutDOM() {
  cart.forEach((product) => {
    addToCheckoutDOM(product);
  });
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
    }
    return cartItem;
  });
  return newAmount;
}
function setupCartFunctionality() {
  cartTable.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    console.log(element, parent, id, parentID);
    // remove
    if (parent.classList.contains('checkout-remove')) {
      removeItem(id);
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        removeItem(parentID);
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayTotal();
    setStorageItem('cart', cart);
  });
}
const init = () => {
  displayCheckoutDOM();
  displayTotal();
  setupCartFunctionality();
};

init();
