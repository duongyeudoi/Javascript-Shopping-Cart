import { getElement } from './utils.js';

const toggleNav = getElement('.toggle-nav');
const sidebarOverLay = getElement('.sidebar-overlay');
const closeBtn = getElement('.sidebar-close');

toggleNav.addEventListener('click', () => {
  sidebarOverLay.classList.add('show');
});
closeBtn.addEventListener('click', () => {
  sidebarOverLay.classList.remove('show');
});
