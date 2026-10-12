// async function loadTeam() {
//   const listElement = document.getElementById('team-list');
//   const introElement = document.getElementById('team-intro-text');
//   if (!listElement) return;

//   listElement.innerHTML = `
//     <div class="news-spinner-container">
//       <div class="news-spinner"></div>
//     </div>
//   `;

//   const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team';

//   try {
//     const response = await fetch(sheetApiUrl);
//     const data = await response.json();

//     listElement.innerHTML = '';

//     // Set the intro text from column D (using the first row's value)
//     if (data.length > 0 && introElement && data[0].team_intro) {
//       introElement.textContent = data[0].team_intro;
//     }

//     data.forEach(person => {
//       // Skip empty rows if any exist
//       if (!person.Name) return;

//       const li = document.createElement('li');
//       li.className = 'team-list-item';
//       li.innerHTML = `
//         <img src="${person.PhotoURL}" alt="${person.Name}" class="team-list-item-image" />
//         <p class="team-list-item-name">${person.Name}</p>
//         <p class="team-list-item-position">${person.Position}</p>
//       `;
//       listElement.appendChild(li);
//     });
//   } catch (error) {
//     console.error("Error loading team data:", error);
//     listElement.innerHTML = '<p class="news-error">Could not load team members.</p>';
//   }
// }

// document.addEventListener('DOMContentLoaded', loadTeam);

async function loadTeam() {
  const listElement = document.getElementById('team-list');
  const introElement = document.getElementById('team-intro-text');
  if (!listElement) return;

  const cacheKey = 'recovery_college_team_cache';
  const sheetApiUrl =
    'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team';

  // Helper function to render data into the DOM
  function renderTeam(data) {
    listElement.innerHTML = '';

    // Set the intro text from column D (using the first row's value)
    if (data.length > 0 && introElement && data[0].team_intro) {
      introElement.textContent = data[0].team_intro;
    }

    data.forEach(person => {
      // Skip empty rows if any exist
      if (!person.Name) return;

      const li = document.createElement('li');
      li.className = 'team-list-item';
      li.innerHTML = `
        <img src="${person.PhotoURL}" alt="${person.Name}" class="team-list-item-image" />
        <p class="team-list-item-name">${person.Name}</p>
        <p class="team-list-item-position">${person.Position}</p>
      `;
      listElement.appendChild(li);
    });
  }

  // Check if we have cached data to display *instantly*
  const cachedData = localStorage.getItem(cacheKey);
  let hasDisplayedCache = false;

  if (cachedData) {
    try {
      const parsedCache = JSON.parse(cachedData);
      renderTeam(parsedCache);
      hasDisplayedCache = true;
    } catch (e) {
      console.error('Failed to parse team cache:', e);
    }
  }

  // If no cache exists yet, show the loading spinner
  if (!hasDisplayedCache) {
    listElement.innerHTML = `
      <div class="news-spinner-container">
        <div class="news-spinner"></div>
      </div>
    `;
  }

  // Fetch fresh data in the background (or foreground if no cache was found)
  try {
    const response = await fetch(sheetApiUrl);
    const data = await response.json();

    // Safely save to localStorage with quota error handling
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (storageError) {
      console.warn('Team data too large for localStorage cache:', storageError);
    }

    // Render the fresh data to keep the view updated
    renderTeam(data);
  } catch (error) {
    console.error('Error loading team data:', error);
    // Only show the error state if we didn't have a cache to fall back on
    if (!hasDisplayedCache) {
      listElement.innerHTML =
        '<p class="news-error">Could not load team members.</p>';
    }
  }
}

document.addEventListener('DOMContentLoaded', loadTeam);
