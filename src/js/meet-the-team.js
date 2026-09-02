async function loadTeam() {
  const listElement = document.getElementById('team-list');
  if (!listElement) return;

  // Reusing your global spinner classes
  listElement.innerHTML = `
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;

  const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team';

  try {
    const response = await fetch(sheetApiUrl);
    const data = await response.json();

    listElement.innerHTML = '';

    data.forEach(person => {
      const li = document.createElement('li');
      li.className = 'team-list-item';
      li.innerHTML = `
        <img src="${person.PhotoURL}" alt="${person.Name}" class="team-list-item-image" />
        <p class="team-list-item-name">${person.Name}</p>
        <p class="team-list-item-position">${person.Position}</p>
      `;
      listElement.appendChild(li);
    });
  } catch (error) {
    console.error("Error loading team data:", error);
    listElement.innerHTML = '<p class="news-error">Could not load team members.</p>';
  }
}

document.addEventListener('DOMContentLoaded', loadTeam);