// // ./js/mobile-menu.js
// document.addEventListener('DOMContentLoaded', () => {
//   const mobileMenu = document.querySelector('.mobile-menu');
//   const openMenuBtn = document.querySelector('#menu-button-open');
//   const closeMenuBtn = document.querySelector('.menu-button-close');

//   const toggleMenu = () => {
//     mobileMenu.classList.toggle('is-open');
//   };

//   if (openMenuBtn) {
//     openMenuBtn.addEventListener('click', toggleMenu);
//     console.log('Hello world!');
//   }

//   if (closeMenuBtn) {
//     closeMenuBtn.addEventListener('click', toggleMenu);
//   }
// });

// ./js/mobile-menu.js
export function initMobileMenu() {
  const mobileMenu = document.querySelector('.mobile-menu');
  const openMenuBtn = document.querySelector('#menu-button-open');
  const closeMenuBtn = document.querySelector('.menu-button-close');

  if (!mobileMenu) return;

  // Set initial state: closed menu should be inert (un-focusable via Tab key)
  if (!mobileMenu.classList.contains('is-open')) {
    mobileMenu.setAttribute('inert', '');
  }

  const toggleMenu = e => {
    if (e) e.preventDefault();

    const isOpen = mobileMenu.classList.toggle('is-open');

    if (isOpen) {
      mobileMenu.removeAttribute('inert'); // Enable keyboard focus when open
    } else {
      mobileMenu.setAttribute('inert', ''); // Disable keyboard focus when closed
    }
  };

  if (openMenuBtn) {
    openMenuBtn.removeEventListener('click', toggleMenu);
    openMenuBtn.addEventListener('click', toggleMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.removeEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  }
}
