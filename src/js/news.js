// // src/js/news.js

// async function loadNoticeboard() {
//   const newsListContainer = document.querySelector('.news-list');
//   if (!newsListContainer) return;

//   const cacheKey = 'recovery_college_noticeboard_cache';
//   const endpointUrl =
//     'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Noticeboard';

//   // Helper function to safely escape HTML special characters
//   function escapeHtml(text) {
//     const div = document.createElement('div');
//     div.textContent = text;
//     return div.innerHTML;
//   }

//   function linkifyText(text) {
//     // 1. Clean non-breaking spaces
//     let cleanText = text.replace(/\u00A0/g, ' ');

//     // 2. Fix URLs broken by cell wrapping spaces (e.g. "https://maps. app. goo. gl/...")
//     cleanText = cleanText.replace(
//       /(https?:\/\/[^\s]+?)(?=\s+(?:app|goo|gl|com|org|net|io|co|uk|ie|link|page|page\.link)\b)/gi,
//       '$1'
//     );

//     // Specifically repair maps.app.goo.gl fragments broken by spaces
//     cleanText = cleanText.replace(
//       /https?:\/\/\s*maps\.\s*app\.\s*goo\.\s*gl\/([^\s]+)/gi,
//       'https://maps.app.goo.gl/$1'
//     );

//     // 3. Escape HTML
//     const escapedText = escapeHtml(cleanText);

//     // 4. Match full http/https URLs accurately
//     const urlRegex = /(https?:\/\/[^\s<]+?)(?=[.,!?:;]?(?:\s|$|<))/g;

//     return escapedText.replace(
//       urlRegex,
//       url =>
//         `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
//     );
//   }

//   // Helper function to create text paragraphs with active links
//   function createParagraph(text) {
//     const p = document.createElement('p');
//     p.className = 'news-list-item-article-text';
//     p.innerHTML = linkifyText(text);
//     return p;
//   }

//   // Helper function to render data into the DOM
//   function renderNoticeboard(data) {
//     newsListContainer.innerHTML = '';

//     data.forEach(row => {
//       const li = document.createElement('li');
//       li.className = 'news-list-item';

//       const article = document.createElement('article');
//       article.className = 'news-list-item-article';

//       // 1. Clean up Date Format
//       let formattedDate = row.publication_date;
//       if (formattedDate) {
//         const dateObj = new Date(formattedDate);
//         if (!isNaN(dateObj)) {
//           formattedDate = dateObj.toLocaleDateString('en-US', {
//             year: 'numeric',
//             month: 'long',
//             day: 'numeric',
//           });
//         }
//       }

//       // 2. Build Header
//       const headerDiv = document.createElement('div');
//       headerDiv.className = 'news-list-item-article-head';

//       const h2 = document.createElement('h2');
//       h2.className = 'news-list-item-article-head-header';
//       h2.textContent = row.title;

//       const dateP = document.createElement('p');
//       dateP.className = 'news-list-item-article-head-date';
//       dateP.innerHTML = `Published on: <time datetime="${row.publication_date}">${formattedDate || ''}</time>`;

//       headerDiv.appendChild(h2);
//       headerDiv.appendChild(dateP);
//       article.appendChild(headerDiv);

//       // 3. Optional Main Poster
//       if (row.poster) {
//         const posterImg = document.createElement('img');
//         posterImg.src = row.poster;
//         posterImg.alt = '';
//         posterImg.className = 'news-list-item-article-poster';
//         article.appendChild(posterImg);
//       }

//       // 4. Gather all valid photos
//       const photos = [];
//       Object.keys(row).forEach(key => {
//         if (key.startsWith('photo_') && row[key]) {
//           photos.push(row[key]);
//         }
//       });

//       // 5. Intelligent Text Distribution (URL-Safe)
//       let rawText = row.text ? row.text.replace(/\r/g, '') : '';

//       let allParagraphs = rawText ? rawText.split(/\n\s*\n/) : [];

//       // If no double newlines, split by sentence endings while protecting URLs
//       if (allParagraphs.length <= 1 && rawText) {
//         // Regex splits on punctuation ONLY followed by a space and uppercase letter/emoji (prevents splitting domain names)
//         allParagraphs = rawText.match(
//           /(?:[^.!?]|\.(?!\s+[A-Z\u00C0-\u024F\u1F60-\u1F64]))+[.!?]*/g
//         ) || [rawText];
//       }

//       let paragraphIndex = 0;
//       const chunksCount = photos.length > 0 ? photos.length + 1 : 1;
//       const chunkSize = Math.max(
//         1,
//         Math.ceil(allParagraphs.length / chunksCount)
//       );

//       if (allParagraphs.length > 0) {
//         const initialChunk = allParagraphs.slice(0, chunkSize).join(' ');
//         if (initialChunk.trim()) {
//           article.appendChild(createParagraph(initialChunk));
//         }
//         paragraphIndex = chunkSize;
//       }

//       photos.forEach((photoUrl, index) => {
//         const img = document.createElement('img');
//         img.src = photoUrl.trim();
//         img.alt = '';

//         applySmartImageStyling(img, index);
//         article.appendChild(img);

//         const nextChunk = allParagraphs
//           .slice(paragraphIndex, paragraphIndex + chunkSize)
//           .join(' ');
//         paragraphIndex += chunkSize;

//         if (nextChunk.trim()) {
//           article.appendChild(createParagraph(nextChunk));
//         }
//       });

//       if (paragraphIndex < allParagraphs.length) {
//         const remainingChunk = allParagraphs.slice(paragraphIndex).join(' ');
//         if (remainingChunk.trim()) {
//           article.appendChild(createParagraph(remainingChunk));
//         }
//       }

//       li.appendChild(article);
//       newsListContainer.appendChild(li);
//     });
//   }

//   // Check if we have cached data to display *instantly*
//   const cachedData = localStorage.getItem(cacheKey);
//   let hasDisplayedCache = false;

//   if (cachedData) {
//     try {
//       const parsedCache = JSON.parse(cachedData);
//       renderNoticeboard(parsedCache);
//       hasDisplayedCache = true;
//     } catch (e) {
//       console.error('Failed to parse noticeboard cache:', e);
//     }
//   }

//   // If no cache exists yet, show the loading spinner
//   if (!hasDisplayedCache) {
//     newsListContainer.innerHTML = `
//       <div class="news-spinner-container">
//         <div class="news-spinner"></div>
//       </div>
//     `;
//   }

//   // Fetch fresh data in the background (or foreground if no cache was found)
//   try {
//     const response = await fetch(endpointUrl);
//     const data = await response.json();

//     // Safely save to localStorage with quota error handling
//     try {
//       localStorage.setItem(cacheKey, JSON.stringify(data));
//     } catch (storageError) {
//       console.warn(
//         'Noticeboard data too large for localStorage cache:',
//         storageError
//       );
//     }

//     // Render the fresh data to keep the view updated
//     renderNoticeboard(data);
//   } catch (error) {
//     console.error('Error loading noticeboard data:', error);
//     // Only show the error state if we didn't have a cache to fall back on
//     if (!hasDisplayedCache) {
//       newsListContainer.innerHTML =
//         '<p class="news-error">Noticeboard temporarily unavailable.</p>';
//     }
//   }
// }

// function applySmartImageStyling(img, index) {
//   if (!img.getAttribute('alt')) {
//     img.setAttribute('alt', 'Noticeboard graphic');
//   }

//   img.onload = () => {
//     const aspectRatio = img.naturalWidth / img.naturalHeight;

//     if (aspectRatio < 0.5 || aspectRatio > 2.0) {
//       img.className = 'news-list-item-article-photo is-divider';
//     } else if (index % 2 === 1) {
//       img.className = 'news-list-item-article-photo is-right';
//     } else {
//       img.className = 'news-list-item-article-photo';
//     }
//   };

//   img.className = 'news-list-item-article-photo';
// }

// loadNoticeboard();

// src/js/news.js

async function loadNoticeboard() {
  const newsListContainer = document.querySelector('.news-list');
  if (!newsListContainer) return;

  const cacheKey = 'recovery_college_noticeboard_cache';
  const endpointUrl =
    'https://script.google.com/macros/s/AKfycbz6HRX3T88PGyl9mqBhTzElrcfVh-tEKD0a4eTZZmvZzfHfJkSOqhWiFaEQ9dTTzFbMfA/exec?sheet=Noticeboard';

  // Helper function to safely escape HTML special characters
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function linkifyText(text) {
    // 1. Clean non-breaking spaces
    let cleanText = text.replace(/\u00A0/g, ' ');

    // 2. Fix URLs broken by cell wrapping spaces (e.g. "https://maps. app. goo. gl/...")
    cleanText = cleanText.replace(
      /(https?:\/\/[^\s]+?)(?=\s+(?:app|goo|gl|com|org|net|io|co|uk|ie|link|page|page\.link)\b)/gi,
      '$1'
    );

    // Specifically repair maps.app.goo.gl fragments broken by spaces
    cleanText = cleanText.replace(
      /https?:\/\/\s*maps\.\s*app\.\s*goo\.\s*gl\/([^\s]+)/gi,
      'https://maps.app.goo.gl/$1'
    );

    // 3. Escape HTML
    const escapedText = escapeHtml(cleanText);

    // 4. Match full http/https URLs accurately
    const urlRegex = /(https?:\/\/[^\s<]+?)(?=[.,!?:;]?(?:\s|$|<))/g;

    return escapedText.replace(
      urlRegex,
      url =>
        `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
    );
  }

  // Helper function to create text paragraphs with active links AND preserved line breaks
  function createParagraph(text) {
    const p = document.createElement('p');
    p.className = 'news-list-item-article-text';

    // Convert single/double newlines into <br> tags while maintaining linkify formatting
    const htmlWithBreaks = linkifyText(text).replace(/\r?\n/g, '<br>');
    p.innerHTML = htmlWithBreaks;
    return p;
  }

  // Helper function to render data into the DOM
  function renderNoticeboard(data) {
    newsListContainer.innerHTML = '';

    // Reverse data array so newest publications (bottom rows) appear on top
    const sortedData = [...data].reverse();

    sortedData.forEach(row => {
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
            day: 'numeric',
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

      // 5. Intelligent Text Distribution (URL-Safe)
      let rawText = row.text ? row.text.replace(/\r/g, '') : '';

      let allParagraphs = rawText ? rawText.split(/\n\s*\n/) : [];

      // If no double newlines, split by sentence endings while protecting URLs
      if (allParagraphs.length <= 1 && rawText) {
        // Regex splits on punctuation ONLY followed by a space and uppercase letter/emoji (prevents splitting domain names)
        allParagraphs = rawText.match(
          /(?:[^.!?]|\.(?!\s+[A-Z\u00C0-\u024F\u1F60-\u1F64]))+[.!?]*/g
        ) || [rawText];
      }

      let paragraphIndex = 0;
      const chunksCount = photos.length > 0 ? photos.length + 1 : 1;
      const chunkSize = Math.max(
        1,
        Math.ceil(allParagraphs.length / chunksCount)
      );

      if (allParagraphs.length > 0) {
        const initialChunk = allParagraphs.slice(0, chunkSize).join(' ');
        if (initialChunk.trim()) {
          article.appendChild(createParagraph(initialChunk));
        }
        paragraphIndex = chunkSize;
      }

      photos.forEach((photoUrl, index) => {
        const img = document.createElement('img');
        img.src = photoUrl.trim();
        img.alt = '';

        applySmartImageStyling(img, index);
        article.appendChild(img);

        const nextChunk = allParagraphs
          .slice(paragraphIndex, paragraphIndex + chunkSize)
          .join(' ');
        paragraphIndex += chunkSize;

        if (nextChunk.trim()) {
          article.appendChild(createParagraph(nextChunk));
        }
      });

      if (paragraphIndex < allParagraphs.length) {
        const remainingChunk = allParagraphs.slice(paragraphIndex).join(' ');
        if (remainingChunk.trim()) {
          article.appendChild(createParagraph(remainingChunk));
        }
      }

      li.appendChild(article);
      newsListContainer.appendChild(li);
    });
  }

  // Check if we have cached data to display *instantly*
  const cachedData = localStorage.getItem(cacheKey);
  let hasDisplayedCache = false;

  if (cachedData) {
    try {
      const parsedCache = JSON.parse(cachedData);
      renderNoticeboard(parsedCache);
      hasDisplayedCache = true;
    } catch (e) {
      console.error('Failed to parse noticeboard cache:', e);
    }
  }

  // If no cache exists yet, show the loading spinner
  if (!hasDisplayedCache) {
    newsListContainer.innerHTML = `
      <div class="news-spinner-container">
        <div class="news-spinner"></div>
      </div>
    `;
  }

  // Fetch fresh data in the background (or foreground if no cache was found)
  try {
    const response = await fetch(endpointUrl);
    const data = await response.json();

    // Safely save to localStorage with quota error handling
    try {
      localStorage.setItem(cacheKey, JSON.stringify(data));
    } catch (storageError) {
      console.warn(
        'Noticeboard data too large for localStorage cache:',
        storageError
      );
    }

    // Render the fresh data to keep the view updated
    renderNoticeboard(data);
  } catch (error) {
    console.error('Error loading noticeboard data:', error);
    // Only show the error state if we didn't have a cache to fall back on
    if (!hasDisplayedCache) {
      newsListContainer.innerHTML =
        '<p class="news-error">Noticeboard temporarily unavailable.</p>';
    }
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
