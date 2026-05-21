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
      contentElements: [],
    };
  } else {
    if (currentPost) {
      if (!currentPost.title) {
        currentPost.title = text;
      } else if (!currentPost.category && (text.toLowerCase() === 'tin tức' || text.toLowerCase() === 'tuyển dụng')) {
        currentPost.category = text;
      } else {
        currentPost.contentElements.push($.html(element));
      }
    }
  }
});

if (currentPost) {
  posts.push(currentPost);
}

const recruitPosts = posts.filter(p => p.marker.toLowerCase().includes('tuyển'));

recruitPosts.forEach((post, i) => {
  console.log(`\n========================================`);
  console.log(`RECRUITMENT POST #${i + 1}`);
  console.log(`Marker:   ${post.marker}`);
  console.log(`Title:    ${post.title}`);
  console.log(`Content Elements (${post.contentElements.length}):`);
  post.contentElements.forEach(htmlStr => {
    const textStr = $(htmlStr).text().trim();
    if (textStr) {
      console.log(`- [${$(htmlStr)[0].name}]: ${textStr}`);
    }
  });
});
