// import { Calendar } from 'fullcalendar';
// import dayGridPlugin from '@fullcalendar/daygrid';
// import googleCalendarPlugin from '@fullcalendar/google-calendar';
// import listPlugin from '@fullcalendar/list';

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

//     const currentSelection =
//       rawCounty && calendarIds[rawCounty] ? rawCounty : 'carlow';

//     if (titleEl) {
//       titleEl.textContent = `${calendarTitles[currentSelection]} Workshops`;
//     }

//     const calendarId = calendarIds[currentSelection];
//     const isMobile = window.innerWidth < 768;

//     const calendar = new Calendar(calendarEl, {
//       initialView: isMobile ? 'listMonth' : 'dayGridMonth',
//       plugins: [dayGridPlugin, googleCalendarPlugin, listPlugin],
//       googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
//       events: {
//         googleCalendarId: calendarId,
//       },

//       // Hybrid Click Routing: Form link if available, otherwise Google Calendar event page
//       eventClick: function (info) {
//         info.jsEvent.preventDefault();

//         const description = info.event.extendedProps.description || '';
//         const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

//         let targetUrl = '';
//         if (urlMatch && urlMatch[0]) {
//           targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
//         } else if (info.event.url) {
//           targetUrl = info.event.url;
//         }

//         if (targetUrl) {
//           window.open(targetUrl, '_blank', 'noopener,noreferrer');
//         }
//       },

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

//       // Clean visual rendering without dummy <a> tags
//       eventContent: function (info) {
//         const isListView = info.view.type.startsWith('list');

//         let timeText = '';
//         if (info.event.start && !info.event.allDay) {
//           const startHours = String(info.event.start.getHours()).padStart(
//             2,
//             '0'
//           );
//           const startMinutes = String(info.event.start.getMinutes()).padStart(
//             2,
//             '0'
//           );

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

//         if (isListView) {
//           return {
//             html: `<span class="fc-event-title" style="display: inline-block; white-space: normal; line-height: 1.35; font-weight: 600; color: #1e1b4b; cursor: pointer;">
//             ${info.event.title}
//            </span>`,
//           };
//         }

//         return {
//           html: `<div style="display: block; white-space: normal; overflow: visible; word-break: break-word; line-height: 1.35; font-weight: 600; cursor: pointer;">
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

//         // Accessibility Enhancements for Event Element
//         let startStr = '';
//         if (info.event.start) {
//           startStr = info.event.start.toLocaleTimeString([], {
//             hour: '2-digit',
//             minute: '2-digit',
//           });
//         }

//         const dateStr = info.event.start
//           ? info.event.start.toLocaleDateString([], {
//               month: 'short',
//               day: 'numeric',
//             })
//           : '';

//         const fullLabel = `${info.event.title}, ${dateStr} ${startStr ? 'at ' + startStr : ''}. Opens enrolment form in a new tab.`;

//         info.el.setAttribute('aria-label', fullLabel);
//         info.el.setAttribute('role', 'button');
//         info.el.setAttribute('tabindex', '0');

//         // Keyboard trigger support for Enter and Space keys
//         info.el.addEventListener('keydown', function (e) {
//           if (e.key === 'Enter' || e.key === ' ') {
//             e.preventDefault();
//             info.el.click();
//           }
//         });
//       },
//     });

//     calendar.render();
//   }
// }

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

// Add Google Drive PDF links mapping here
const timetableLinks = {
  carlow:
    'https://drive.google.com/file/d/1wq-xVnaguf_NJd9xkmexhExj_zEU4l8V/view?usp=sharing',
  kilkenny:
    'https://drive.google.com/file/d/1YrFVyXBpQfVmpepQxxNxmZtJYuDc5Q84/view?usp=sharing',
  wexford:
    'https://drive.google.com/file/d/1MTCkp95iLgk8wMqSxdxShNAAf1Rn264Y/view?usp=sharing',
  'south-tipperary':
    'https://drive.google.com/file/d/YOUR_SOUTH_TIPPERARY_FILE_ID/view?usp=sharing',
  waterford:
    'https://drive.google.com/file/d/1whskNGqmtPbD-ps_qh-mWQ7XpslkDbW5/view?usp=sharing',
  online:
    'https://drive.google.com/file/d/1fUma6rH0SDJfJEnA2lAzOdohenRYdTpZ/view?usp=sharing',
};

export function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const titleEl = document.getElementById('calendar-title');
  const timetableLinkEl = document.getElementById('timetable-download-link'); // Target the link

  if (calendarEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const rawCounty = urlParams.get('county');

    const currentSelection =
      rawCounty && calendarIds[rawCounty] ? rawCounty : 'carlow';

    if (titleEl) {
      titleEl.textContent = `${calendarTitles[currentSelection]} Workshops`;
    }

    // Set dynamic PDF download link & accessibility label
    if (timetableLinkEl && timetableLinks[currentSelection]) {
      timetableLinkEl.href = timetableLinks[currentSelection];
      timetableLinkEl.setAttribute(
        'aria-label',
        `Download ${calendarTitles[currentSelection]} PDF timetable (opens in a new tab)`
      );
      timetableLinkEl.style.display = 'inline-block';
    } else if (timetableLinkEl) {
      timetableLinkEl.style.display = 'none';
    }

    const calendarId = calendarIds[currentSelection];
    const isMobile = window.innerWidth < 768;

    const calendar = new Calendar(calendarEl, {
      initialView: isMobile ? 'listMonth' : 'dayGridMonth',
      plugins: [dayGridPlugin, googleCalendarPlugin, listPlugin],
      googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
      events: {
        googleCalendarId: calendarId,
      },

      // Hybrid Click Routing: Form link if available, otherwise Google Calendar event page
      eventClick: function (info) {
        info.jsEvent.preventDefault();

        const description = info.event.extendedProps.description || '';
        const urlMatch = description.match(/(https?:\/\/[^\s]+)/);

        let targetUrl = '';
        if (urlMatch && urlMatch[0]) {
          targetUrl = urlMatch[0].replace(/["'<>\)]/g, '');
        } else if (info.event.url) {
          targetUrl = info.event.url;
        }

        if (targetUrl) {
          window.open(targetUrl, '_blank', 'noopener,noreferrer');
        }
      },

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

      // Clean visual rendering without dummy <a> tags
      eventContent: function (info) {
        const isListView = info.view.type.startsWith('list');

        let timeText = '';
        if (info.event.start && !info.event.allDay) {
          const startHours = String(info.event.start.getHours()).padStart(
            2,
            '0'
          );
          const startMinutes = String(info.event.start.getMinutes()).padStart(
            2,
            '0'
          );

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

        if (isListView) {
          return {
            html: `<span class="fc-event-title" style="display: inline-block; white-space: normal; line-height: 1.35; font-weight: 600; color: #1e1b4b; cursor: pointer;">
            ${info.event.title}
           </span>`,
          };
        }

        return {
          html: `<div style="display: block; white-space: normal; overflow: visible; word-break: break-word; line-height: 1.35; font-weight: 600; cursor: pointer;">
                  ${
                    timeText
                      ? `<span style="display: inline-block; background-color: #6b21a8; color: #ffffff; font-weight: 700; font-size: 0.85em; padding: 2px 6px; border-radius: 4px; margin-bottom: 4px;">${timeText}</span>`
                      : ''
                  }
                  <div style="color: #1e1b4b;">${info.event.title}</div>
                 </div>`,
        };
      },

      eventDidMount: function (info) {
        if (info.event.backgroundColor) {
          info.el.style.backgroundColor = info.event.backgroundColor;
        } else if (info.event.color) {
          info.el.style.backgroundColor = info.event.color;
        }

        // Accessibility Enhancements for Event Element
        let startStr = '';
        if (info.event.start) {
          startStr = info.event.start.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          });
        }

        const dateStr = info.event.start
          ? info.event.start.toLocaleDateString([], {
              month: 'short',
              day: 'numeric',
            })
          : '';

        const fullLabel = `${info.event.title}, ${dateStr} ${startStr ? 'at ' + startStr : ''}. Opens enrolment form in a new tab.`;

        info.el.setAttribute('aria-label', fullLabel);
        info.el.setAttribute('role', 'button');
        info.el.setAttribute('tabindex', '0');

        // Keyboard trigger support for Enter and Space keys
        info.el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            info.el.click();
          }
        });
      },
    });

    calendar.render();
  }
}
