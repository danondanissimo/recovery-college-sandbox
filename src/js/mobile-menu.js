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

  const toggleMenu = () => {
    if (mobileMenu) {
      mobileMenu.classList.toggle('is-open');
    }
  };

  if (openMenuBtn) {
    openMenuBtn.removeEventListener('click', toggleMenu); // Prevent duplicate listeners
    openMenuBtn.addEventListener('click', toggleMenu);
    console.log('Mobile menu initialized successfully!');
  } else {
    console.warn('Open menu button not found in DOM.');
  }

  if (closeMenuBtn) {
    closeMenuBtn.removeEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
  }
}
