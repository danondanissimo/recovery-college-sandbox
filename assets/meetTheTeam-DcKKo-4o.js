import"./index-BFR51xfH.js";async function m(){const e=document.getElementById("team-list"),i=document.getElementById("team-intro-text");if(!e)return;e.innerHTML=`
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;const o="https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team";try{const n=await(await fetch(o)).json();e.innerHTML="",n.length>0&&i&&n[0].team_intro&&(i.textContent=n[0].team_intro),n.forEach(t=>{if(!t.Name)return;const a=document.createElement("li");a.className="team-list-item",a.innerHTML=`
        <img src="${t.PhotoURL}" alt="${t.Name}" class="team-list-item-image" />
        <p class="team-list-item-name">${t.Name}</p>
        <p class="team-list-item-position">${t.Position}</p>
      `,e.appendChild(a)})}catch(s){console.error("Error loading team data:",s),e.innerHTML='<p class="news-error">Could not load team members.</p>'}}document.addEventListener("DOMContentLoaded",m);
