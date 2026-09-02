import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';



function getYouTubeEmbedUrl(url) {
  if (!url) return '';
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
  const match = url.trim().match(regExp);
  return match ? `https://www.youtube.com/embed/${match[1]}` : '';
}

(async function initAboutSection() {
  const aboutSection = document.querySelector('.about');
  const videoContainer = document.getElementById('about-video-container');
  const textEl = document.getElementById('about-text');
  const sliderContainer = document.querySelector('.about-slider');
  
  if (!aboutSection) return;

  // 1. Show a clean global spinner centered in the section while fetching
  if (videoContainer) videoContainer.style.display = 'none';
  if (textEl) textEl.style.display = 'none';
  if (sliderContainer) sliderContainer.style.display = 'none';

  let loaderWrapper = document.createElement('div');
  loaderWrapper.className = 'about-loader-wrapper';
  loaderWrapper.innerHTML = `
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;
  aboutSection.appendChild(loaderWrapper);

  const sheetApiUrl = 'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=AboutUs';

  try {
    const response = await fetch(sheetApiUrl);
    const rows = await response.json();

    const data = {};
    rows.forEach(row => {
      if (row.Key && row.Value) {
        const cleanKey = String(row.Key).toLowerCase().replace(/[\s\r\n]+/g, '');
        const cleanVal = String(row.Value).trim();
        data[cleanKey] = cleanVal;
      }
    });

    // Remove the loader once data arrives
    loaderWrapper.remove();

    // 2. Populate and show YouTube Video if available
    const embedUrl = getYouTubeEmbedUrl(data['youtube_link']);
    if (videoContainer && embedUrl) {
      videoContainer.style.display = 'block';
      videoContainer.innerHTML = `<iframe src="${embedUrl}" title="About Us Video" allowfullscreen></iframe>`;
    }

    // 3. Populate and show Text Paragraph if available
    if (textEl && data['description_text']) {
      textEl.style.display = 'block';
      textEl.textContent = data['description_text'];
    }

    // 4. Collect dynamic photo keys & handle Swiper
    const photoUrls = [];
    Object.keys(data).forEach(key => {
      if (key.startsWith('photo_') && data[key]) {
        photoUrls.push(data[key]);
      }
    });

    const sliderWrapper = document.getElementById('about-slider-wrapper');

    if (sliderWrapper && sliderContainer && photoUrls.length > 0) {
      sliderContainer.style.display = 'block';
      sliderWrapper.innerHTML = photoUrls.map(url => `
        <div class="swiper-slide">
          <img src="${url}" alt="About Us photo">
        </div>
      `).join('');

      new Swiper(sliderContainer, {
        modules: [Navigation],
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        observer: true,
        observeParents: true,
      });
    }

  } catch (error) {
    console.error('Failed to load About Us content:', error);
    loaderWrapper.innerHTML = '<p class="news-error">Could not load About Us section.</p>';
  }
})();
