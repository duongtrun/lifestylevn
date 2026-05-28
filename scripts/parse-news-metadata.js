const fs = require('fs');
const path = require('path');

const textPath = path.join(__dirname, '../news_recruit/news_extracted_text.txt');
const text = fs.readFileSync(textPath, 'utf8');

// Split by marker: <a id="..."></a>Thẻ X or <a id="..."></a>tuyển dụng
const sections = text.split(/<a id="[^"]+"><\/a>(Thẻ\s*\d+|tuyển\s*d[uụ]n?g(?:[_\s]*\d+)?)/gi);

const metadataMap = {};

for (let i = 1; i < sections.length; i += 2) {
  const marker = sections[i].trim();
  const content = sections[i + 1] || '';
  
  // Find date pattern like: Ngày DD/MM/YYYY
  const dateMatch = content.match(/Ngày\s*(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/i);
  let date = null;
  if (dateMatch) {
    const day = dateMatch[1].padStart(2, '0');
    const month = dateMatch[2].padStart(2, '0');
    const year = dateMatch[3];
    date = `${year}-${month}-${day}T08:00:00`;
  }
  
  // Find category in the first 100 characters of the content
  const firstLines = content.substring(0, 150);
  let category = 'Tin tức'; // default
  
  if (/dinh\s*dưỡng/i.test(firstLines)) {
    category = 'Dinh dưỡng & tiêu hóa'; // we map "Dinh dưỡng" to the existing "Dinh dưỡng & tiêu hóa" category
  } else if (/tuyển\s*dụng/i.test(firstLines) || marker.toLowerCase().startsWith('tuyển')) {
    category = 'Tuyển dụng';
  } else if (/sự\s*kiện/i.test(firstLines)) {
    category = 'Sự kiện';
  } else if (/sức\s*khỏe/i.test(firstLines)) {
    category = 'Sức khỏe & vệ sinh';
  }
  
  metadataMap[marker.toLowerCase()] = {
    date: date,
    category: category
  };
  console.log(`Marker: "${marker}" -> Date: ${date} | Category: ${category}`);
}

console.log(`Total markers parsed: ${Object.keys(metadataMap).length}`);
fs.writeFileSync(path.join(__dirname, '../news_recruit/parsed_news_metadata.json'), JSON.stringify(metadataMap, null, 2));
