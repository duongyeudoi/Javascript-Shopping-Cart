// specific imports
import '../toggleSidebar.js';

import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { addToListDOM } from '../checkoutCart/addToListDOM.js';
import { addToCheckoutDOM } from '../checkoutCart/addToCheckoutDOM.js';
let cart = getStorageItem('cart');

const formsValidate = getElement('.needs-validation');

const cartTable = getElement('.checkout-container');
const totalPrice = getElement('.total-price');
const multiStepForm = getElement('.multi-step-form');
const totalListPrice = getElement('.total-listPrice');
const formSteps = [...multiStepForm.querySelectorAll('[data-step]')];
let currentStep = parseInt(
  formSteps.findIndex((step) => {
    return step.classList.contains('active');
  })
);
if (currentStep < 0) {
  currentStep = 0;
  formSteps[currentStep].classList.add('active');
}
multiStepForm.addEventListener('click', (e) => {
  if (e.target.matches('[data-next]')) {
    currentStep += 1;
  } else if (e.target.matches('[data-previous]')) {
    currentStep -= 1;
  }
  showCurrentStep();
});
const showCurrentStep = () => {
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });
};

const displayTotal = () => {
  let total = cart.reduce((total, cartItem) => {
    return (total += cartItem.price * cartItem.amount);
  }, 0);
  totalPrice.textContent = `Total : ${formatPrice(total)} `;
  totalListPrice.textContent = `${formatPrice(total)}`;
};
function displayCheckoutDOM() {
  if (cart.length < 1) {
    const btnPayment = getElement('.btn-payment');
    btnPayment.disabled = true;
  }
  cart.forEach((product) => {
    addToCheckoutDOM(product);
    addToListDOM(product);
  });
}
function removeItem(id) {
  cart = cart.filter((cartItem) => cartItem.id !== id);
}
function increaseAmount(id) {
  let newAmount, newPrice;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount + 1;
      cartItem = { ...cartItem, amount: newAmount };
      newPrice = formatPrice(cartItem.price * cartItem.amount);
    }
    return cartItem;
  });
  return { newAmount, newPrice };
}
function decreaseAmount(id) {
  let newAmount, newPrice;
  cart = cart.map((cartItem) => {
    if (cartItem.id === id) {
      newAmount = cartItem.amount - 1;
      cartItem = { ...cartItem, amount: newAmount };
      newPrice = formatPrice(cartItem.price * cartItem.amount);
    }
    return cartItem;
  });
  return { newAmount, newPrice };
}

function setupCartFunctionality() {
  cartTable.addEventListener('click', (e) => {
    const element = e.target;
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    // remove
    if (parent.classList.contains('checkout-remove')) {
      if (confirm('Bạn chắc chắn muốn xoá không?')) {
        removeItem(id);
        parent.parentElement.remove();
      }
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      const { newAmount, newPrice } = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
      parent.parentElement.nextElementSibling.textContent = `${newPrice}`;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const { newAmount, newPrice } = decreaseAmount(parentID);
      if (newAmount === 0) {
        if (confirm('Bạn chắc chắn muốn xoá không?')) {
          removeItem(parentID);
          parent.parentElement.parentElement.remove();
        } else newAmount = increaseAmount(parentID);
      } else {
        parent.previousElementSibling.textContent = newAmount;
        parent.parentElement.nextElementSibling.textContent = `${newPrice}`;
      }
    }
    displayTotal();
    setStorageItem('cart', cart);
  });
}
formsValidate.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!formsValidate.checkValidity()) {
    event.stopPropagation();
  } else {
    alert('Thanh toán thành công');
    window.location.replace('index.html');
  }
  const bill = {
    name: formsValidate.firstName.value + formsValidate.lastName.value,
    email: formsValidate.email.value,
    address: formsValidate.address.value,
    zip: formsValidate.zip.value,
    payment: formsValidate.paymentMethod.value,
    cardName: formsValidate.cardName.value,
    creditNumber: formsValidate.creditNumber.value,
    products: cart,
  };
  setStorageItem('bill', bill);
  setStorageItem('cart', []);
  formsValidate.classList.add('was-validated');
});
const init = () => {
  displayCheckoutDOM();
  displayTotal();
  setupCartFunctionality();
};

init();
