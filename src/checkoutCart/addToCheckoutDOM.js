import { formatPrice, getElement } from '../utils.js';
const cartTable = getElement('.checkout-container');

export function addToCheckoutDOM({ id, name, price, image, amount }) {
  const productElement = document.createElement('div');
  productElement.classList.add('checkout-cart');
  productElement.setAttribute('data-id', id);
  productElement.innerHTML = `<div class="checkout-specific checkout-productHeader">
  <div class="checkout-img">
    <img
      src="${image}"
      alt=""
    />
  </div>

  <h4 class="checkout-desc">
   ${name}
  </h4>
</div>
<p class="checkout-price checkout-heading">${formatPrice(price)}</p>
<div class="checkout-amount checkout-heading">
  <button class="cart-item-increase-btn" data-id="${id}">
    <i class="fas fa-chevron-up"></i>
  </button>
  <p class="cart-item-amount" data-id="${id}">${amount}</p>
  <button class="cart-item-decrease-btn" data-id="${id}">
    <i class="fas fa-chevron-down"></i>
  </button>
</div>
<p class="checkout-totalPrice checkout-heading">${formatPrice(
    price * amount
  )}</p>
<div class="checkout-remove checkout-heading">
  <p data-id="${id}">Remove</p>
</div>`;
  cartTable.appendChild(productElement);
}
