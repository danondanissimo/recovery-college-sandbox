// // No npm/bundler imports needed here anymore!

// function getYouTubeEmbedUrl(url) {
//   if (!url) return '';
//   const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
//   const match = url.trim().match(regExp);
//   return match ? `https://www.youtube.com/embed/${match[1]}` : '';
// }

// (async function initAboutSection() {
//   const aboutSection = document.querySelector('.about');
//   const videoContainer = document.getElementById('about-video-container');
//   const textEl = document.getElementById('about-text');
//   const sliderContainer = document.querySelector('.about-slider');

//   if (!aboutSection) return;

//   // 1. Show a clean global spinner centered in the section while fetching
//   if (videoContainer) videoContainer.style.display = 'none';
//   if (textEl) textEl.style.display = 'none';
//   if (sliderContainer) sliderContainer.style.display = 'none';

//   let loaderWrapper = document.createElement('div');
//   loaderWrapper.className = 'about-loader-wrapper';
//   loaderWrapper.innerHTML = `
//     <div class="news-spinner-container">
//       <div class="news-spinner"></div>
//     </div>
//   `;
//   aboutSection.appendChild(loaderWrapper);

//   const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=AboutUs';

//   try {
//     const response = await fetch(sheetApiUrl);
//     const rows = await response.json();

//     const data = {};
//     rows.forEach(row => {
//       if (row.Key && row.Value) {
//         const cleanKey = String(row.Key).toLowerCase().replace(/[\s\r\n]+/g, '');
//         const cleanVal = String(row.Value).trim();
//         data[cleanKey] = cleanVal;
//       }
//     });

//     // Remove the loader once data arrives
//     loaderWrapper.remove();

//     // 2. Populate and show YouTube Video if available
//     const embedUrl = getYouTubeEmbedUrl(data['youtube_link']);
//     if (videoContainer && embedUrl) {
//       videoContainer.style.display = 'block';
//       videoContainer.innerHTML = `<iframe src="${embedUrl}" title="About Us Video" allowfullscreen></iframe>`;
//     }

//     // 3. Populate and show Text Paragraph if available
//     if (textEl && data['description_text']) {
//       textEl.style.display = 'block';
//       textEl.textContent = data['description_text'];
//     }

//     // 4. Collect dynamic photo keys & handle Swiper
//     const photoUrls = [];
//     Object.keys(data).forEach(key => {
//       if (key.startsWith('photo_') && data[key]) {
//         photoUrls.push(data[key]);
//       }
//     });

//     const sliderWrapper = document.getElementById('about-slider-wrapper');

//     if (sliderWrapper && sliderContainer && photoUrls.length > 0) {
//       sliderContainer.style.display = 'block';
//       sliderWrapper.innerHTML = photoUrls.map(url => `
//         <div class="swiper-slide">
//           <img src="${url}" alt="About Us photo">
//         </div>
//       `).join('');

//       // Uses the global Swiper bundle loaded via CDN script tag
//       new Swiper(sliderContainer, {
//         loop: true,
//         navigation: {
//           nextEl: '.swiper-button-next',
//           prevEl: '.swiper-button-prev',
//         },
//         observer: true,
//         observeParents: true,
//       });
//     }

//   } catch (error) {
//     console.error('Failed to load About Us content:', error);
//     loaderWrapper.innerHTML = '<p class="news-error">Could not load About Us section.</p>';
//   }
// })();

// No npm/bundler imports needed here anymore!

function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const regExp =
    /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.trim().match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

(async function initAboutSection() {
  const aboutSection = document.querySelector('.about');
  const videoContainer = document.getElementById('about-video-container');
  const textEl = document.getElementById('about-text');
  const sliderContainer = document.querySelector('.about-slider');

  if (!aboutSection) return;

  const sheetApiUrl =
    'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=AboutUs';
  const cacheKey = 'recovery_college_about_us_cache';

  // Helper function to render the data into the DOM
  function renderContent(data) {
    // 1. Populate and show YouTube Video if available
    const embedUrl = getYouTubeEmbedUrl(data['youtube_link']);
    if (videoContainer && embedUrl) {
      videoContainer.style.display = 'block';
      // Only rebuild iframe if source changed to avoid restarting video playback on background updates
      const currentIframe = videoContainer.querySelector('iframe');
      if (!currentIframe || currentIframe.src !== embedUrl) {
        videoContainer.innerHTML = `<iframe src="${embedUrl}" title="About Us Video" allowfullscreen></iframe>`;
      }
    }

    // 2. Populate and show Text Paragraph if available
    if (textEl && data['description_text']) {
      textEl.style.display = 'block';
      textEl.textContent = data['description_text'];
    }

    // 3. Collect dynamic photo keys & handle Swiper
    const photoUrls = [];
    Object.keys(data).forEach(key => {
      if (key.startsWith('photo_') && data[key]) {
        photoUrls.push(data[key]);
      }
    });

    const sliderWrapper = document.getElementById('about-slider-wrapper');
    if (sliderWrapper && sliderContainer && photoUrls.length > 0) {
      sliderContainer.style.display = 'block';
      sliderWrapper.innerHTML = photoUrls
        .map(
          url => `
        <div class="swiper-slide">
          <img src="${url}" alt="About Us photo">
        </div>
      `
        )
        .join('');

      // Initialize or update Swiper
      if (!sliderContainer.swiper) {
        new Swiper(sliderContainer, {
          loop: true,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          observer: true,
          observeParents: true,
        });
      } else {
        sliderContainer.swiper.update();
      }
    }
  }

  // Check if we have cached data to display *instantly*
  const cachedData = localStorage.getItem(cacheKey);
  let hasDisplayedCache = false;

  let loaderWrapper = document.createElement('div');
  loaderWrapper.className = 'about-loader-wrapper';
  loaderWrapper.innerHTML = `
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;

  if (cachedData) {
    try {
      const parsedCache = JSON.parse(cachedData);
      renderContent(parsedCache);
      hasDisplayedCache = true;
    } catch (e) {
      console.error('Failed to parse About Us cache:', e);
    }
  }

  // If we don't have a cache yet, show the loading spinner
  if (!hasDisplayedCache) {
    if (videoContainer) videoContainer.style.display = 'none';
    if (textEl) textEl.style.display = 'none';
    if (sliderContainer) sliderContainer.style.display = 'none';
    aboutSection.appendChild(loaderWrapper);
  }

  // Fetch fresh data in the background (or foreground if no cache existed)
  try {
    const response = await fetch(sheetApiUrl);
    const rows = await response.json();

    const data = {};
    rows.forEach(row => {
      if (row.Key && row.Value) {
        const cleanKey = String(row.Key)
          .toLowerCase()
          .replace(/[\s\r\n]+/g, '');
        const cleanVal = String(row.Value).trim();
        data[cleanKey] = cleanVal;
      }
    });

    // Save fresh data to localStorage for next time
    localStorage.setItem(cacheKey, JSON.stringify(data));

    // Remove loader if it was showing
    if (!hasDisplayedCache) {
      loaderWrapper.remove();
    }

    // Render the fresh data (updates UI seamlessly if anything changed)
    renderContent(data);
  } catch (error) {
    console.error('Failed to load fresh About Us content:', error);
    // Only show error if we didn't have a cache to fall back on
    if (!hasDisplayedCache) {
      loaderWrapper.innerHTML =
        '<p class="news-error">Could not load About Us section.</p>';
    }
  }
})();
