// import './js/modal.js';
// import './js/menu.js';
// import './js/checkbox-order.js';
// import './js/menu-close.js';
// import './js/scroll.js';

// src/index.js
// src/index.js
// import './js/mobile-menu.js';
// import { initCalendar } from './js/calendar.js';
// import mapSvgUrl from './images/icons/ie.svg';

// document.addEventListener('DOMContentLoaded', () => {
//   initCalendar();
// });

// document.addEventListener('DOMContentLoaded', () => {
//   const currentPath = window.location.pathname.split('/').pop() || 'index.html';

//   // Selects links in both main navigation and mobile menu
//   document.querySelectorAll('header nav a, .header a, .mobile-menu-item-link').forEach(link => {
//     const linkPath = link.getAttribute('href')?.split('/').pop();
//     if (linkPath === currentPath) {
//       link.classList.add('is-active');
//     }
//   });
// });

// const mapElement = document.getElementById('ireland-map');
// if (mapElement) {
//   mapElement.data = mapSvgUrl;
// }

import { initMobileMenu } from './js/mobile-menu.js';
import { initCalendar } from './js/calendar.js';
import mapSvgUrl from './images/icons/ie.svg';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize mobile menu
  initMobileMenu();

  // 2. Initialize calendar (if on calendar page)
  initCalendar();

  // 3. Highlight active menu links
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document
    .querySelectorAll('header nav a, .header a, .mobile-menu-item-link')
    .forEach(link => {
      const linkPath = link.getAttribute('href')?.split('/').pop();
      if (linkPath === currentPath) {
        link.classList.add('is-active');
      }
    });

  // 4. Safely load SVG map if element exists on current page
  const mapElement = document.getElementById('ireland-map');
  if (mapElement) {
    mapElement.data = mapSvgUrl;
  }
});
