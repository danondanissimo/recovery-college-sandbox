import"./index-DHp4KCYe.js";async function m(){const a=document.getElementById("team-list"),c=document.getElementById("team-intro-text");if(!a)return;const r="recovery_college_team_cache",l="https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team";function s(e){a.innerHTML="",e.length>0&&c&&e[0].team_intro&&(c.textContent=e[0].team_intro),e.forEach(t=>{if(!t.Name)return;const n=document.createElement("li");n.className="team-list-item",n.innerHTML=`
        <img src="${t.PhotoURL}" alt="${t.Name}" class="team-list-item-image" />
        <p class="team-list-item-name">${t.Name}</p>
        <p class="team-list-item-position">${t.Position}</p>
      `,a.appendChild(n)})}const i=localStorage.getItem(r);let o=!1;if(i)try{const e=JSON.parse(i);s(e),o=!0}catch(e){console.error("Failed to parse team cache:",e)}o||(a.innerHTML=`
      <div class="news-spinner-container">
        <div class="news-spinner"></div>
      </div>
    `);try{const t=await(await fetch(l)).json();try{localStorage.setItem(r,JSON.stringify(t))}catch(n){console.warn("Team data too large for localStorage cache:",n)}s(t)}catch(e){console.error("Error loading team data:",e),o||(a.innerHTML='<p class="news-error">Could not load team members.</p>')}}document.addEventListener("DOMContentLoaded",m);
