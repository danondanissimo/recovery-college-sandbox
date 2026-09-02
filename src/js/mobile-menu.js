// ./js/mobile-menu.js
document.addEventListener('DOMContentLoaded', () => {
  const mobileMenu = document.querySelector('.mobile-menu');
  const openMenuBtn = document.querySelector('#menu-button-open'); 
  const closeMenuBtn = document.querySelector('.menu-button-close');

  const toggleMenu = () => {
      mobileMenu.classList.toggle('is-open');
  };

  if (openMenuBtn) {
    openMenuBtn.addEventListener('click', toggleMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', toggleMenu);
  }
    
    
});

