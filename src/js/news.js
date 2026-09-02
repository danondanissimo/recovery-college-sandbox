async function loadNoticeboard() {
  const newsListContainer = document.querySelector('.news-list');
  if (!newsListContainer) return;

  // Show the loading spinner before fetching
  newsListContainer.innerHTML = `
    <div class="news-spinner-container">
      <div class="news-spinner"></div>
    </div>
  `;

  try {
    const endpointUrl = 'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Noticeboard';
    
    const response = await fetch(endpointUrl); 
    const data = await response.json();

    newsListContainer.innerHTML = ''; 

    data.forEach(row => {
      const li = document.createElement('li');
      li.className = 'news-list-item';

      const article = document.createElement('article');
      article.className = 'news-list-item-article';

      // 1. Clean up Date Format
      let formattedDate = row.publication_date;
      if (formattedDate) {
        const dateObj = new Date(formattedDate);
        if (!isNaN(dateObj)) {
          formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      }

      // 2. Build Header
      const headerDiv = document.createElement('div');
      headerDiv.className = 'news-list-item-article-head';
      
      const h2 = document.createElement('h2');
      h2.className = 'news-list-item-article-head-header';
      h2.textContent = row.title;

      const dateP = document.createElement('p');
      dateP.className = 'news-list-item-article-head-date';
      dateP.innerHTML = `Published on: <time datetime="${row.publication_date}">${formattedDate || ''}</time>`;

      headerDiv.appendChild(h2);
      headerDiv.appendChild(dateP);
      article.appendChild(headerDiv);

      // 3. Optional Main Poster
      if (row.poster) {
        const posterImg = document.createElement('img');
        posterImg.src = row.poster;
        posterImg.alt = '';
        posterImg.className = 'news-list-item-article-poster';
        article.appendChild(posterImg);
      }

      // 4. Gather all valid photos
      const photos = [];
      Object.keys(row).forEach(key => {
        if (key.startsWith('photo_') && row[key]) {
          photos.push(row[key]);
        }
      });

      // 5. Intelligent Text Distribution
      let allParagraphs = row.text ? row.text.split(/\r?\n\s*\r?\n/) : [];
      if (allParagraphs.length <= 1 && row.text) {
        allParagraphs = row.text.match(/[^.!?]+[.!?]+/g) || [row.text];
      }

      let paragraphIndex = 0;
      const chunksCount = photos.length > 0 ? photos.length + 1 : 1;
      const chunkSize = Math.max(1, Math.ceil(allParagraphs.length / chunksCount));

      if (allParagraphs.length > 0) {
        const initialChunk = allParagraphs.slice(0, chunkSize).join(' ');
        if (initialChunk.trim()) {
          const p = document.createElement('p');
          p.className = 'news-list-item-article-text';
          p.textContent = initialChunk;
          article.appendChild(p);
        }
        paragraphIndex = chunkSize;
      }

      photos.forEach((photoUrl, index) => {
        const img = document.createElement('img');
        img.src = photoUrl.trim();
        img.alt = '';
        
        applySmartImageStyling(img, index);
        article.appendChild(img);

        const nextChunk = allParagraphs.slice(paragraphIndex, paragraphIndex + chunkSize).join(' ');
        paragraphIndex += chunkSize;

        if (nextChunk.trim()) {
          const p = document.createElement('p');
          p.className = 'news-list-item-article-text';
          p.textContent = nextChunk;
          article.appendChild(p);
        }
      });

      if (paragraphIndex < allParagraphs.length) {
        const remainingChunk = allParagraphs.slice(paragraphIndex).join(' ');
        if (remainingChunk.trim()) {
          const p = document.createElement('p');
          p.className = 'news-list-item-article-text';
          p.textContent = remainingChunk;
          article.appendChild(p);
        }
      }

      li.appendChild(article);
      newsListContainer.appendChild(li);
    });

  } catch (error) {
    console.error('Error loading noticeboard data:', error);
    newsListContainer.innerHTML = '<p class="news-error">Noticeboard temporarily unavailable.</p>';
  }
}

function applySmartImageStyling(img, index) {
  if (!img.getAttribute('alt')) {
    img.setAttribute('alt', 'Noticeboard graphic');
  }

  img.onload = () => {
    const aspectRatio = img.naturalWidth / img.naturalHeight;
    
    if (aspectRatio < 0.5 || aspectRatio > 2.0) {
      img.className = 'news-list-item-article-photo is-divider';
    } else if (index % 2 === 1) {
      img.className = 'news-list-item-article-photo is-right';
    } else {
      img.className = 'news-list-item-article-photo';
    }
  };
  
  img.className = 'news-list-item-article-photo';
}

loadNoticeboard();