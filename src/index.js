
// import './js/modal.js';
// import './js/menu.js';
// import './js/checkbox-order.js';
// import './js/menu-close.js';
// import './js/scroll.js';

// src/index.js
// src/index.js
import './js/mobile-menu.js';
import { initCalendar } from './js/calendar.js';
import mapSvgUrl from './images/ie.svg';

document.addEventListener('DOMContentLoaded', () => {
  initCalendar();
});

document.addEventListener('DOMContentLoaded', () => {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  
  // Selects links in both main navigation and mobile menu
  document.querySelectorAll('header nav a, .header a, .mobile-menu-item-link').forEach(link => {
    const linkPath = link.getAttribute('href')?.split('/').pop();
    if (linkPath === currentPath) {
      link.classList.add('is-active');
    }
  });
});



const mapElement = document.getElementById('ireland-map');
if (mapElement) {
  mapElement.data = mapSvgUrl;
}