import"./index-h2ZGVmL9.js";async function h(){const a=document.getElementById("team-list"),i=document.getElementById("team-intro-text");if(!a)return;const s="recovery_college_team_cache",l="https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Meet%20the%20Team";function n(e){a.innerHTML="",a.removeAttribute("role"),a.removeAttribute("aria-live"),e.length>0&&i&&e[0].team_intro&&(i.textContent=e[0].team_intro),e.forEach(t=>{if(!t.Name)return;const o=document.createElement("li");o.className="team-list-item";const m=t.Position?`Photo of ${t.Name}, ${t.Position}`:`Photo of ${t.Name}`;o.innerHTML=`
        <img 
          src="${t.PhotoURL||"./images/icons/avatar-placeholder.png"}" 
          alt="${m}" 
          class="team-list-item-image"
          onerror="this.onerror=null; this.src='./images/icons/avatar-placeholder.png';"
        />
        <p class="team-list-item-name">${t.Name}</p>
        <p class="team-list-item-position">${t.Position||""}</p>
      `,a.appendChild(o)})}const c=localStorage.getItem(s);let r=!1;if(c)try{const e=JSON.parse(c);n(e),r=!0}catch(e){console.error("Failed to parse team cache:",e)}r||(a.setAttribute("role","status"),a.setAttribute("aria-live","polite"),a.innerHTML=`
      <div class="news-spinner-container">
        <div class="news-spinner" aria-label="Loading team members"></div>
      </div>
    `);try{const t=await(await fetch(l)).json();try{localStorage.setItem(s,JSON.stringify(t))}catch(o){console.warn("Team data too large for localStorage cache:",o)}n(t)}catch(e){console.error("Error loading team data:",e),r||(a.setAttribute("role","alert"),a.innerHTML='<p class="news-error">Could not load team members. Please try refreshing the page.</p>')}}document.addEventListener("DOMContentLoaded",h);
