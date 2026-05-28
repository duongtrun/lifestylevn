const fs = require('fs');
const path = require('path');

const textPath = path.join(__dirname, '../news_recruit/news_extracted_text.txt');
const text = fs.readFileSync(textPath, 'utf8');

// We split by marker: <a id="..."></a>Thẻ X or <a id="..."></a>tuyển dụng
const sections = text.split(/<a id="[^"]+"><\/a>(Thẻ\s*\d+|tuyển\s*d[uụ]n?g(?:[_\s]*\d+)?)/gi);

const dateMap = {};

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
  
  dateMap[marker.toLowerCase()] = date;
  console.log(`Marker: "${marker}" -> Date: ${date}`);
}

console.log(`Total markers parsed from text file: ${Object.keys(dateMap).length}`);
fs.writeFileSync(path.join(__dirname, '../news_recruit/parsed_dates_map.json'), JSON.stringify(dateMap, null, 2));
