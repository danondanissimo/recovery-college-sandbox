// // // src/js/calendar.js
// import { Calendar } from 'fullcalendar';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';

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

//     const calendar = new Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       plugins: [dayGridPlugin, googleCalendarPlugin],
//       googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
//       events: {
//         googleCalendarId: calendarId,
//       },

//       // Overrides FullCalendar's internal rendering to force multi-line text wrapping
//       eventContent: function (info) {
//         return {
//           html: `<div style="white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.2; font-weight: 600;">${info.event.title}</div>`,
//         };
//       },

//       eventDidMount: function (info) {
//         if (info.event.backgroundColor) {
//           info.el.style.backgroundColor = info.event.backgroundColor;
//         } else if (info.event.color) {
//           info.el.style.backgroundColor = info.event.color;
//         }
//       },

//       eventClick: function (info) {
//         info.jsEvent.preventDefault(); // Stop default calendar behavior

//         // Extract description text from extendedProps
//         const description = info.event.extendedProps.description || '';

//         // Find the first URL inside the description text (your Google Form link)
//         const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

//         if (urlMatch && urlMatch[0]) {
//           // Open the extracted Google Form link in a new tab
//           window.open(urlMatch[0], '_blank');
//         } else {
//           // Fallback just in case
//           window.open(info.event.url, '_blank');
//         }
//       },
//     });
//     calendar.render();
//   }
// }

// src/js/calendar.js// src/js/calendar.js
// src/js/calendar.js
import { Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

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

    const calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth',import { Calendar } from 'fullcalendar';
import dayGridPlugin from '@fullcalendar/daygrid';
import googleCalendarPlugin from '@fullcalendar/google-calendar';

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

    const calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, googleCalendarPlugin],
      googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
      events: {
        googleCalendarId: calendarId,
      },

      // Overrides FullCalendar's rendering to include the start time and force text wrapping
      eventContent: function (info) {
        let timeText = '';

        if (info.event.start && !info.event.allDay) {
          const hours = info.event.start.getHours();
          const minutes = info.event.start.getMinutes();

          const formattedHours = String(hours).padStart(2, '0');
          const formattedMinutes = String(minutes).padStart(2, '0');
          timeText = `${formattedHours}:${formattedMinutes} `;
        }

        return {
          html: `<div style="white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.2; font-weight: 600;">
                  <span style="font-weight: 700; margin-right: 4px;">${timeText}</span>${info.event.title}
                 </div>`,
        };
      },

      eventDidMount: function (info) {
        if (info.event.backgroundColor) {
          info.el.style.backgroundColor = info.event.backgroundColor;
        } else if (info.event.color) {
          info.el.style.backgroundColor = info.event.color;
        }

        // Intercept clicks to prevent Google's default behavior and open the link from description
        info.el.addEventListener(
          'click',
          function (e) {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();

            let targetUrl = null;

            // Extract the first URL found inside the event description text box
            const description = info.event.extendedProps.description || '';
            const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

            if (urlMatch && urlMatch[0]) {
              // Clean up any trailing HTML tags if Google Rich Text editor injected them
              targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
            }

            if (targetUrl) {
              window.open(targetUrl, '_blank');
            } else {
              // Ultimate fallback if no URL is present in the description
              if (info.event.url) {
                window.open(info.event.url, '_blank');
              }
            }
          },
          true
        );
      },
    });
    calendar.render();
  }
}

      plugins: [dayGridPlugin, googleCalendarPlugin],
      googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
      events: {
        googleCalendarId: calendarId,
      },

      // Overrides FullCalendar's rendering to include the start time and force text wrapping
      eventContent: function (info) {
        let timeText = '';
        
        if (info.event.start && !info.event.allDay) {
          const hours = info.event.start.getHours();
          const minutes = info.event.start.getMinutes();
          
          const formattedHours = String(hours).padStart(2, '0');
          const formattedMinutes = String(minutes).padStart(2, '0');
          timeText = `${formattedHours}:${formattedMinutes} `;
        }

        return {
          html: `<div style="white-space: normal !important; overflow: visible !important; word-break: break-word; line-height: 1.2; font-weight: 600;">
                  <span style="font-weight: 700; margin-right: 4px;">${timeText}</span>${info.event.title}
                 </div>`,
        };
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

        // 2. Override the element's href so hovering and clicking go straight to your link
        if (targetUrl) {
          info.el.href = targetUrl;
          info.el.setAttribute('target', '_blank');
        }
      },
    });
    calendar.render();
  }
}