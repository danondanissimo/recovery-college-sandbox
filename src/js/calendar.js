
// src/js/calendar.js
import { Calendar } from 'https://esm.sh/fullcalendar@6.1.21';
import dayGridPlugin from 'https://esm.sh/@fullcalendar/daygrid@6.1.21';
import googleCalendarPlugin from 'https://esm.sh/@fullcalendar/google-calendar@6.1.21';

// Your public Google Calendar IDs (found in calendar integration settings)
 const calendarIds = {
  carlow: '6c790eb226b727c2bbdbdcd8be93bcd39fe8209257cf8bb55ebfe91db4e105da@group.calendar.google.com',
  kilkenny: '93e066ea1682599b9dfdca20a6c0da5615bb0bfe217c8d59d86565a3958c0ab3@group.calendar.google.com',
  wexford: 'b16edc477ba19b53c4345590de1347c5ed16bfcd2639709941d081fc6f044119@group.calendar.google.com',
  'south-tipperary': 'd18ed934761a64015b06803d5efa6153bc34c6a3805083d0048a2f910f166363@group.calendar.google.com',
  waterford: '2ce03a07ca8707e794ba22c45e0ffab052aa7368b028148b0833d82500a7a4dd@group.calendar.google.com',
  online: 'a416d21c7c98c7b467f129fcdc00fe63c5e99ea872fd5794916189061be7f232@group.calendar.google.com'
 };

 const calendarTitles = {
  carlow: 'Carlow',
  kilkenny: 'Kilkenny',
  wexford: 'Wexford',
  'south-tipperary': 'South Tipperary',
  waterford: 'Waterford',
  online: 'Online'
};


// export function initCalendar() {
//   const calendarEl = document.getElementById('calendar');

//   if (calendarEl) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const currentCounty = urlParams.get('county') || 'carlow';
    
//     const calendarId = countyCalendarIds[currentCounty] || countyCalendarIds.carlow;

//     const calendar = new Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       plugins: [dayGridPlugin, googleCalendarPlugin],
//       googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
//       events: {
//         googleCalendarId: calendarId
//       },
//       dayMaxEvents: 3, 
      
//       // This hook intercepts every event and forces the Google Calendar color onto it
//       eventDidMount: function(info) {
//         // Sets native tooltip for truncated titles
//         info.el.title = info.event.title;

//         // If Google Calendar provided a background color for this specific event, apply it directly
//         if (info.event.backgroundColor) {
//           info.el.style.backgroundColor = info.event.backgroundColor;
//         } else if (info.event.color) {
//           info.el.style.backgroundColor = info.event.color;
//         }
//       },

//       eventClick: function(info) {
//         if (info.event.url) {
//           window.open(info.event.url, '_blank');
//           info.jsEvent.preventDefault();
//         }
//       }
//     });
//     calendar.render();
//   }
// }

// export function initCalendar() {
//   const calendarEl = document.getElementById('calendar');

//   if (calendarEl) {
//     const urlParams = new URLSearchParams(window.location.search);
//     const currentSelection = urlParams.get('county') || 'carlow';
    
//     const calendarId = calendarIds[currentSelection] || calendarIds.carlow;

//     const calendar = new Calendar(calendarEl, {
//       initialView: 'dayGridMonth',
//       plugins: [dayGridPlugin, googleCalendarPlugin],
//       googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
//       events: {
//         googleCalendarId: calendarId
//       },
//       dayMaxEvents: 3, 
      
//       eventDidMount: function(info) {
//         info.el.title = info.event.title;

//         if (info.event.backgroundColor) {
//           info.el.style.backgroundColor = info.event.backgroundColor;
//         } else if (info.event.color) {
//           info.el.style.backgroundColor = info.event.color;
//         }
//       },

//       eventClick: function(info) {
//         if (info.event.url) {
//           window.open(info.event.url, '_blank');
//           info.jsEvent.preventDefault();
//         }
//       }
//     });
//     calendar.render();
//   }
// }

export function initCalendar() {
  const calendarEl = document.getElementById('calendar');
  const titleEl = document.getElementById('calendar-title'); // 1. Grab your heading element

  if (calendarEl) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentSelection = urlParams.get('county') || 'carlow';
    
    // 2. Update the text dynamically based on selection
    if (titleEl) {
      titleEl.textContent = `${calendarTitles[currentSelection] || 'Carlow'} Workshops`;
    }

    const calendarId = calendarIds[currentSelection] || calendarIds.carlow;

    const calendar = new Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, googleCalendarPlugin],
      googleCalendarApiKey: 'AIzaSyBLI7yESEMGFmGHwC6n8GG_DZ3V-TULNpY',
      events: {
        googleCalendarId: calendarId
      },
      dayMaxEvents: 3, 
      
      eventDidMount: function(info) {
        info.el.title = info.event.title;

        if (info.event.backgroundColor) {
          info.el.style.backgroundColor = info.event.backgroundColor;
        } else if (info.event.color) {
          info.el.style.backgroundColor = info.event.color;
        }
      },

      eventClick: function(info) {
        if (info.event.url) {
          window.open(info.event.url, '_blank');
          info.jsEvent.preventDefault();
        }
      }
    });
    calendar.render();
  }
}