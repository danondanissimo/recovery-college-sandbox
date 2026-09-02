import"./index-C0YL6EoF.js";async function o(){const e=document.getElementById("team-list");if(!e)return;e.innerHTML=`
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;const n="https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team";try{const i=await(await fetch(n)).json();e.innerHTML="",i.forEach(t=>{const s=document.createElement("li");s.className="team-list-item",s.innerHTML=`
        <img src="${t.PhotoURL}" alt="${t.Name}" class="team-list-item-image" />
        <p class="team-list-item-name">${t.Name}</p>
        <p class="team-list-item-position">${t.Position}</p>
      `,e.appendChild(s)})}catch(a){console.error("Error loading team data:",a),e.innerHTML='<p class="news-error">Could not load team members.</p>'}}document.addEventListener("DOMContentLoaded",o);
