import { formatPrice, getElement } from '../utils.js';

const listProducts = getElement('.list-total');
// list products on checkout form
export function addToListDOM({ id, name, price, image, amount }) {
  const productList = document.createElement('li');
  const classesToAdd = [
    'list-group-item',
    'd-flex',
    'justify-content-between',
    'lh-condensed',
  ];
  classesToAdd.forEach((classAdded) => {
    productList.classList.add(classAdded);
  });
  productList.setAttribute('data-id', id);
  productList.innerHTML = ` 
  <div>
    <h6 class="my-0">${name}</h6>
    <small class="text-muted">Brief description</small>
  </div>
  <span class="text-muted">${formatPrice(price * amount)}</span>
`;
  listProducts.prepend(productList);
}
