// // src/js/calendar.js
// import { Calendar } from 'fullcalendar';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import listPlugin from '@fullcalendar/list'; // 1. Added List Plugin import

// const calendarIds = {
//   carlow:
//     '6c790eb226b727c2bbdbdcd8be93bcd39fe8209257cf8bb55ebfe91db4e105da@group.calendar.google.com',
//   kilkenny:
//     '93e066ea1682599b9dfdca20a6c0da5615bb0bfe217c8d59d86565a3958c0ab3@group.calendar.google.com',
//   wexford:
//     'b16edc477ba19b53c4345590de1347c5ed16bfcd2639709941d081fc6f044119@group.calendar.google.com',
//   'south-tipperary':
//     'd18ed934761a64015b06803d5efa6153bc34c6a3805083d0048a2f910f166363@group.calendar.google.com',
//   waterford:
//     '2ce03a07ca8707e794ba22c45e0ffab052aa7368b028148b0833d82500a7a4dd@group.calendar.google.com',
//   online:
//     'a416d21c7c98c7b467f129fcdc00fe63c5e99ea872fd5794916189061be7f232@group.calendar.google.com',
// };

// const calendarTitles = {
//   carlow: 'Carlow',
//   kilkenny: 'Kilkenny',
//   wexford: 'Wexford',
//   'south-tipperary': 'South Tipperary',
//   waterford: 'Waterford',
//   online: 'Online',
// };

// export function initCalendar() {
//   const calendarEl = document.getElementById('calendar');
//   const titleEl = document.getElementById('calendar-title');

//   if (calendarEl) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const rawCounty = urlParams.get('county');

//     // Explicitly validate county parameter, fallback safely to carlow
//     const currentSelection =
//       rawCounty && calendarIds[rawCounty] ? rawCounty : 'carlow';

//     if (titleEl) {
//       titleEl.textContent = `${calendarTitles[currentSelection]} Workshops`;
//     }

//     const calendarId = calendarIds[currentSelection];

//     // Helper check for mobile/tablet screens (< 768px)
//     const isMobile = window.innerWidth < 768;

//     const calendar = new Calendar(calendarEl, {
//       // Switches to list view on mobile/tablets, stays month grid on desktop
//       initialView: isMobile ? 'listMonth' : 'dayGridMonth',
//       plugins: [dayGridPlugin, googleCalendarPlugin, listPlugin],
//       googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
//       events: {
//         googleCalendarId: calendarId,
//       },

//       // Automatically adjusts views if a user rotates their device or resizes
//       windowResize: function (arg) {
//         if (window.innerWidth < 768 && calendar.view.type !== 'listMonth') {
//           calendar.changeView('listMonth');
//         } else if (
//           window.innerWidth >= 768 &&
//           calendar.view.type !== 'dayGridMonth'
//         ) {
//           calendar.changeView('dayGridMonth');
//         }
//       },

//       eventContent: function (info) {
//         let timeText = '';

//         if (info.event.start && !info.event.allDay) {
//           // Format Start Time
//           const startHours = String(info.event.start.getHours()).padStart(
//             2,
//             '0'
//           );
//           const startMinutes = String(info.event.start.getMinutes()).padStart(
//             2,
//             '0'
//           );

//           // Format End Time (if available)
//           if (info.event.end) {
//             const endHours = String(info.event.end.getHours()).padStart(2, '0');
//             const endMinutes = String(info.event.end.getMinutes()).padStart(
//               2,
//               '0'
//             );
//             timeText = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
//           } else {
//             timeText = `${startHours}:${startMinutes}`;
//           }
//         }

//         return {
//           html: `<div style="display: block !important; white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.35; font-weight: 600;">
//                   ${
//                     timeText
//                       ? `<span style="display: inline-block; background-color: #6b21a8; color: #ffffff; font-weight: 700; font-size: 0.85em; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px;">${timeText}</span>`
//                       : ''
//                   }
//                   <div style="color: #1e1b4b;">${info.event.title}</div>
//                  </div>`,
//         };
//       },

//       eventContent: function (info) {
//         // Check if we are currently rendering a List View
//         const isListView = info.view.type.startsWith('list');

//         let timeText = '';

//         if (info.event.start && !info.event.allDay) {
//           // Format Start Time
//           const startHours = String(info.event.start.getHours()).padStart(
//             2,
//             '0'
//           );
//           const startMinutes = String(info.event.start.getMinutes()).padStart(
//             2,
//             '0'
//           );

//           // Format End Time (if available)
//           if (info.event.end) {
//             const endHours = String(info.event.end.getHours()).padStart(2, '0');
//             const endMinutes = String(info.event.end.getMinutes()).padStart(
//               2,
//               '0'
//             );
//             timeText = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
//           } else {
//             timeText = `${startHours}:${startMinutes}`;
//           }
//         }

//         // On List View: Don't show the purple time badge (FullCalendar lists time on the left)
//         if (isListView) {
//           return {
//             html: `<div style="display: block !important; white-space: normal !important; line-height: 1.35; font-weight: 600; color: #1e1b4b;">
//                     ${info.event.title}
//                    </div>`,
//           };
//         }

//         // On Grid View (Desktop): Keep the purple time pill
//         return {
//           html: `<div style="display: block !important; white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.35; font-weight: 600;">
//                   ${
//                     timeText
//                       ? `<span style="display: inline-block; background-color: #6b21a8; color: #ffffff; font-weight: 700; font-size: 0.85em; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px;">${timeText}</span>`
//                       : ''
//                   }
//                   <div style="color: #1e1b4b;">${info.event.title}</div>
//                  </div>`,
//         };
//       },

//       eventDidMount: function (info) {
//         if (info.event.backgroundColor) {
//           info.el.style.backgroundColor = info.event.backgroundColor;
//         } else if (info.event.color) {
//           info.el.style.backgroundColor = info.event.color;
//         }

//         // 1. Extract the URL from the event description
//         let targetUrl = null;
//         const description = info.event.extendedProps.description || '';
//         const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

//         if (urlMatch && urlMatch[0]) {
//           targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
//         }

//         // 2. Override the element's href so hovering and clicking go straight to your link
//         if (targetUrl) {
//           info.el.href = targetUrl;
//           info.el.setAttribute('target', '_blank');
//         }
//       },
//     });
//     calendar.render();
//   }
// }

// src/js/calendar.js
import { Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import listPlugin from '@fullcalendar/list';

const calendarIds = {
  carlow:
    '6c790eb226b727c2bbdbdcd8be93bcd39fe8209257cf8bb55ebfe91db4e105da@group.calendar.google.com',
  kilkenny:
    '93e066ea1682599b9dfdca20a6c0da5615bb0bfe217c8d59d86565a3958c0ab3@group.calendar.google.com',
  wexford:
    'b16edc477ba19b53c4345590de1347c5ed16bfcd2639709941d081fc6f044119@group.calendar.google.com',
  'south-tipperary':
    'd18ed934761a64015b06803d5efa6153bc34c6a3805083d0048a2f910f166363@group.calendar.google.com',
  waterford:
    '2ce03a07ca8707e794ba22c45e0ffab052aa7368b028148b0833d82500a7a4dd@group.calendar.google.com',
  online:
    'a416d21c7c98c7b467f129fcdc00fe63c5e99ea872fd5794916189061be7f232@group.calendar.google.com',
};

const calendarTitles = {
  carlow: 'Carlow',
  kilkenny: 'Kilkenny',
  wexford: 'Wexford',
  'south-tipperary': 'South Tipperary',
  waterford: 'Waterford',
  online: 'Online',
};

export function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const titleEl = document.getElementById('calendar-title');

  if (calendarEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const rawCounty = urlParams.get('county');

    // Explicitly validate county parameter, fallback safely to carlow
    const currentSelection =
      rawCounty && calendarIds[rawCounty] ? rawCounty : 'carlow';

    if (titleEl) {
      titleEl.textContent = `${calendarTitles[currentSelection]} Workshops`;
    }

    const calendarId = calendarIds[currentSelection];

    // Helper check for mobile/tablet screens (< 768px)
    const isMobile = window.innerWidth < 768;

    const calendar = new Calendar(calendarEl, {
      // Switches to list view on mobile/tablets, stays month grid on desktop
      initialView: isMobile ? 'listMonth' : 'dayGridMonth',
      plugins: [dayGridPlugin, googleCalendarPlugin, listPlugin],
      googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
      events: {
        googleCalendarId: calendarId,
      },

      // Automatically adjusts views if a user rotates their device or resizes
      windowResize: function (arg) {
        if (window.innerWidth < 768 && calendar.view.type !== 'listMonth') {
          calendar.changeView('listMonth');
        } else if (
          window.innerWidth >= 768 &&
          calendar.view.type !== 'dayGridMonth'
        ) {
          calendar.changeView('dayGridMonth');
        }
      },

      eventContent: function (info) {
        // Check if we are currently rendering a List View
        const isListView = info.view.type.startsWith('list');

        let timeText = '';

        if (info.event.start && !info.event.allDay) {
          // Format Start Time
          const startHours = String(info.event.start.getHours()).padStart(
            2,
            '0'
          );
          const startMinutes = String(info.event.start.getMinutes()).padStart(
            2,
            '0'
          );

          // Format End Time (if available)
          if (info.event.end) {
            const endHours = String(info.event.end.getHours()).padStart(2, '0');
            const endMinutes = String(info.event.end.getMinutes()).padStart(
              2,
              '0'
            );
            timeText = `${startHours}:${startMinutes}-${endHours}:${endMinutes}`;
          } else {
            timeText = `${startHours}:${startMinutes}`;
          }
        }

        // On List View: Don't show the purple time badge (FullCalendar lists time on the left)
        if (isListView) {
          return {
            html: `<div style="display: block !important; white-space: normal !important; line-height: 1.35; font-weight: 600; color: #1e1b4b;">
                    ${info.event.title}
                   </div>`,
          };
        }

        // On Grid View (Desktop): Keep the purple time pill
        return {
          html: `<div style="display: block !important; white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.35; font-weight: 600;">
                  ${
                    timeText
                      ? `<span style="display: inline-block; background-color: #6b21a8; color: #ffffff; font-weight: 700; font-size: 0.85em; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px;">${timeText}</span>`
                      : ''
                  }
                  <div style="color: #1e1b4b;">${info.event.title}</div>
                 </div>`,
        };
      },

      // Fix for Mobile/List view click crash
      eventClick: function (info) {
        const description = info.event.extendedProps.description || '';
        const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

        if (urlMatch && urlMatch[0]) {
          const targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
          window.open(targetUrl, '_blank');

          // Prevents FullCalendar's internal default click handler from looking for href on non-A tags
          info.jsEvent.preventDefault();
        }
      },

      eventDidMount: function (info) {
        if (info.event.backgroundColor) {
          info.el.style.backgroundColor = info.event.backgroundColor;
        } else if (info.event.color) {
          info.el.style.backgroundColor = info.event.color;
        }

        // 1. Extract the URL from the event description
        let targetUrl = null;
        const description = info.event.extendedProps.description || '';
        const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

        if (urlMatch && urlMatch[0]) {
          targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
        }

        // 2. Apply targetUrl safely depending on element type
        if (targetUrl) {
          if (info.el.tagName === 'A') {
            info.el.href = targetUrl;
            info.el.setAttribute('target', '_blank');
          } else {
            // For List View rows (<tr> or <div>), make sure mouse/tap indicates clickability
            info.el.style.cursor = 'pointer';
          }
        }
      },
    });
    calendar.render();
  }
}
