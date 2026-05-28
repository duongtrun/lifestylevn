const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const htmlPath = path.join(__dirname, '../news_recruit/clean_structure.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const $ = cheerio.load(html);
const bodyChildren = $('body').children();

const posts = [];
let currentPost = null;

bodyChildren.each((index, element) => {
  const $el = $(element);
  const text = $el.text().trim();
  
  const markerRegex = /^(Thẻ\s*\d+|tuyển\s*d[uụ]n?g(?:[_\s]*\d+)?)$/i;
  const isMarker = element.name === 'p' && markerRegex.test(text) && $el.find('a[id]').length > 0;
  
  if (isMarker) {
    if (currentPost) {
      posts.push(currentPost);
    }
    currentPost = {
      marker: text,
      title: null,
      category: null,
      paragraphs: [],
      contentHTML: []
    };
  } else {
    if (currentPost) {
      if (!currentPost.title) {
        currentPost.title = text;
      } else if (!currentPost.category && (text.toLowerCase() === 'tin tức' || text.toLowerCase() === 'tuyển dụng')) {
        currentPost.category = text;
      } else {
        currentPost.paragraphs.push(text);
        currentPost.contentHTML.push($.html(element));
      }
    }
  }
});

if (currentPost) {
  posts.push(currentPost);
}

console.log(`Total parsed posts/items: ${posts.length}`);

// Function to extract date from paragraphs
function extractDate(post) {
  const textContent = post.paragraphs.join(' ');
  
  // Pattern 1: DD/MM/YYYY or DD-MM-YYYY
  const datePattern = /(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/;
  const match = textContent.match(datePattern);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = match[2].padStart(2, '0');
    const year = match[3];
    return `${year}-${month}-${day}T08:00:00`;
  }
  
  // Pattern 2: tháng MM năm YYYY
  const monthYearPattern = /tháng\s*(\d{1,2})\s*năm\s*(\d{4})/i;
  const matchMY = textContent.match(monthYearPattern);
  if (matchMY) {
    const month = matchMY[1].padStart(2, '0');
    const year = matchMY[2];
    return `${year}-${month}-01T08:00:00`;
  }

  // Pattern 3: năm YYYY
  const yearPattern = /năm\s*(\d{4})/i;
  const matchY = textContent.match(yearPattern);
  if (matchY) {
    const year = matchY[1];
    return `${year}-01-01T08:00:00`;
  }
  
  return null;
}

posts.forEach((post, i) => {
  if (post.marker.toLowerCase().startsWith('tuyển')) {
    return; // skip recruitment
  }
  const date = extractDate(post);
  console.log(`[Post ${i + 1}] Marker: ${post.marker} | Date: ${date} | Title: ${post.title.substring(0, 50)}...`);
});
