/**
 * File này: Script tự động đẩy bài viết Dinh dưỡng từ file extracted.md lên WordPress.
 * Vai trò:
 *   - Đọc dữ liệu từ `news_recruit/dinh_duong/extracted.md` (trích xuất từ docx bằng mammoth).
 *   - Tách thành các bài viết độc lập dựa trên pattern "Dinh dưỡng" + "Ngày DD/MM/YYYY".
 *   - Quét tìm ảnh base64, lưu file tạm, upload lên WordPress Media Library.
 *   - Thay thế base64 bằng URL thật (dùng split/join cho hiệu năng cao).
 *   - Gán ảnh lớn đầu tiên làm Featured Image.
 *   - Đẩy bài viết với category "Dinh dưỡng & tiêu hóa" + ngày đăng chính xác.
 *   - Lưu tiến độ để tránh trùng lặp khi chạy lại.
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

// ================= NẠP CẤU HÌNH =================
function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const match = line.match(/^\s*([^#=]+)=(.*)$/);
      if (match) {
        process.env[match[1].trim()] = match[2].trim().replace(/^['"]|['"]$/g, '');
      }
    }
  }
}
loadEnv();

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
const WP_URL = `${WP_BASE_URL}/wp/v2`;
const WP_USERNAME = process.env.WP_AUTH_USERNAME || 'trungnguyen';
const WP_APP_PASSWORD = process.env.WP_AUTH_APPLICATION_PASSWORD || 'FLfX sz1n OKz3 2BUm PccC iwSV';
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

const PROGRESS_FILE = path.join(__dirname, '../news_recruit/dinh_duong/import_progress.json');
const MD_FILE = path.join(__dirname, '../news_recruit/dinh_duong/extracted.md');
const TEMP_IMAGE_DIR = path.join(__dirname, '../news_recruit/dinh_duong/temp_images');

if (!fs.existsSync(TEMP_IMAGE_DIR)) {
  fs.mkdirSync(TEMP_IMAGE_DIR, { recursive: true });
}

// ================= HELPERS =================
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try { return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8')); } catch(e) {}
  }
  return { uploadedMedia: {}, uploadedPosts: {} };
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

async function fetchWithRetry(url, options = {}, retries = 3, backoff = 2000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000);
  try {
    const res = await fetch(url, { ...options, signal: controller.signal, headers: { ...options.headers, 'Connection': 'close' } });
    clearTimeout(timeoutId);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    if (retries > 0 && !error.message.includes('aborted') && !error.message.includes('HTTP 404')) {
      console.warn(`  🔄 Thử lại sau ${backoff}ms... (còn ${retries} lần)`);
      await new Promise(r => setTimeout(r, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

const categoryCache = {};
async function getOrCreateCategory(name, slug) {
  if (categoryCache[name]) return categoryCache[name];
  try {
    const res = await fetchWithRetry(`${WP_URL}/categories?slug=${slug}`, { headers: { 'Authorization': AUTH_HEADER } });
    const existing = await res.json();
    if (existing.length > 0) {
      categoryCache[name] = existing[0].id;
      return existing[0].id;
    }
    const createRes = await fetchWithRetry(`${WP_URL}/categories`, {
      method: 'POST',
      headers: { 'Authorization': AUTH_HEADER, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, slug })
    });
    const newCat = await createRes.json();
    if (newCat.id) { categoryCache[name] = newCat.id; return newCat.id; }
    if (newCat.data?.term_id) { categoryCache[name] = newCat.data.term_id; return newCat.data.term_id; }
    return 1;
  } catch(e) {
    console.error(`  ❌ Lỗi tạo danh mục "${name}":`, e.message);
    return 1;
  }
}

function saveBase64Image(base64Data, filename) {
  const match = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  if (!match) return null;
  const ext = match[1];
  const buffer = Buffer.from(match[2], 'base64');
  const finalFilename = filename.endsWith(`.${ext}`) ? filename : `${filename}.${ext}`;
  const imagePath = path.join(TEMP_IMAGE_DIR, finalFilename);
  fs.writeFileSync(imagePath, buffer);
  return { path: imagePath, ext, bufferLength: buffer.length };
}

async function uploadMedia(imagePath, filename, mimeType) {
  try {
    const fileBuffer = fs.readFileSync(imagePath);
    console.log(`  📤 Upload "${filename}" (${(fileBuffer.length/1024).toFixed(1)} KB)...`);
    const res = await fetchWithRetry(`${WP_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': mimeType || 'image/png'
      },
      body: fileBuffer
    });
    const data = await res.json();
    console.log(`  🎉 Upload OK! ID: ${data.id}`);
    return { id: data.id, url: data.source_url };
  } catch(e) {
    console.error(`  ❌ Upload thất bại "${filename}":`, e.message);
    return null;
  }
}

// Markdown to simple HTML converter
function markdownToHtml(mdText) {
  let html = mdText;
  const lines = html.split('\n');
  const converted = [];
  let inList = false;
  
  for (let line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ') || trimmed.startsWith('\\- ')) {
      if (!inList) { converted.push('<ul>'); inList = true; }
      const itemText = trimmed.replace(/^\\?[\-\*]\s+/, '').trim();
      converted.push(`<li>${itemText}</li>`);
      continue;
    } else {
      if (inList) { converted.push('</ul>'); inList = false; }
    }
    if (trimmed.startsWith('## ')) { converted.push(`<h2>${trimmed.substring(3).trim()}</h2>`); continue; }
    if (trimmed.startsWith('### ')) { converted.push(`<h3>${trimmed.substring(4).trim()}</h3>`); continue; }
    if (trimmed.startsWith('> ')) { converted.push(`<blockquote>${trimmed.substring(2).trim()}</blockquote>`); continue; }
    if (trimmed.length > 0) {
      let cleanText = trimmed.replace(/\\([.+*?^=!:${}()|[\]\/\\])/g, '$1');
      converted.push(`<p>${cleanText}</p>`);
    } else {
      converted.push('');
    }
  }
  if (inList) converted.push('</ul>');
  html = converted.join('\n');
  
  // Inline markdown images
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
    const isEmoji = alt.length > 0 && alt.length <= 2;
    if (isEmoji) {
      return `<img src="${url}" alt="${alt}" class="inline-block w-5 h-5 mx-0.5 align-text-bottom" style="display: inline-block; vertical-align: middle;" />`;
    } else {
      return `<img src="${url}" alt="${alt}" class="block my-4 max-w-full h-auto rounded-xl shadow-md mx-auto" />`;
    }
  });
  
  // Convert markdown links
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#008BBD] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  return html;
}

// ================= PARSE ARTICLES =================
async function parseArticles() {
  const stream = fs.createReadStream(MD_FILE, { encoding: 'utf8' });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });
  
  const articles = [];
  let current = null;
  const recentLines = [];
  
  for await (const line of rl) {
    const trimmed = line.trim();
    const dateMatch = trimmed.match(/^Ngày\s+(\d{1,2})\/(\d{1,2})\/(\d{4})\s*$/);
    
    if (dateMatch) {
      const hasCategoryMarker = recentLines.slice(-3).map(l => l.trim()).some(l => l === 'Dinh dưỡng');
      if (hasCategoryMarker) {
        if (current) articles.push(current);
        const day = dateMatch[1].padStart(2, '0');
        const month = dateMatch[2].padStart(2, '0');
        const year = dateMatch[3];
        current = {
          date: `${year}-${month}-${day}T08:00:00`,
          dateDisplay: `${dateMatch[1]}/${dateMatch[2]}/${dateMatch[3]}`,
          contentLines: []
        };
        recentLines.push(line);
        if (recentLines.length > 5) recentLines.shift();
        continue;
      }
    }
    
    if (current && trimmed !== 'Dinh dưỡng') {
      current.contentLines.push(line);
    }
    
    recentLines.push(line);
    if (recentLines.length > 5) recentLines.shift();
  }
  
  if (current) articles.push(current);
  rl.close();
  stream.destroy();
  return articles;
}

// ================= EXTRACT TITLE =================
function extractTitle(contentLines) {
  for (const line of contentLines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('![')) continue;
    if (trimmed.startsWith('[') || trimmed.startsWith('\\[')) continue;
    if (trimmed.startsWith('\\-') || trimmed.startsWith('-')) continue;
    if (trimmed.startsWith('__')) continue;
    if (trimmed.length < 10) continue;
    return trimmed.replace(/\\([.+*?^=!:${}()|[\]\/\\])/g, '$1').substring(0, 200);
  }
  return null;
}

// ================= MAIN =================
async function main() {
  console.log('\n============================================================');
  console.log('🚀 IMPORT BÀI VIẾT DINH DƯỠNG LÊN WORDPRESS');
  console.log(`🌐 API: ${WP_URL}`);
  console.log('============================================================\n');

  // Test connection
  try {
    const testRes = await fetchWithRetry(`${WP_URL}/posts?per_page=1`, { headers: { 'Authorization': AUTH_HEADER } });
    console.log('✅ Kết nối WordPress thành công!\n');
  } catch(e) {
    console.error('❌ Kết nối WordPress thất bại:', e.message);
    process.exit(1);
  }

  const progress = loadProgress();
  const categoryId = await getOrCreateCategory('Dinh dưỡng & tiêu hóa', 'dinh-duong-tieu-hoa');
  console.log(`📂 Category "Dinh dưỡng & tiêu hóa" ID: ${categoryId}\n`);

  // Parse articles
  console.log('📖 Đang phân tách bài viết từ extracted.md...');
  const articles = await parseArticles();
  console.log(`📊 Tìm thấy ${articles.length} bài viết.\n`);

  let successCount = 0;
  let failedCount = 0;

  for (let idx = 0; idx < articles.length; idx++) {
    const art = articles[idx];
    const progressKey = `dinh_duong_${idx}`;
    
    // Extract title
    const rawTitle = extractTitle(art.contentLines) || `Bài viết Dinh dưỡng - ${art.dateDisplay}`;
    
    console.log(`\n📝 [${idx + 1}/${articles.length}] "${rawTitle}"`);
    console.log(`   📅 Ngày: ${art.dateDisplay}`);

    // Check if already uploaded
    let createUrl = `${WP_URL}/posts`;
    let isUpdate = false;
    if (progress.uploadedPosts[progressKey]) {
      createUrl = `${WP_URL}/posts/${progress.uploadedPosts[progressKey]}`;
      isUpdate = true;
      console.log(`   🔄 Cập nhật bài ID: ${progress.uploadedPosts[progressKey]}`);
    }

    try {
      let contentMd = art.contentLines.join('\n');
      
      // Find and process base64 images
      const imgRegex = /!\[(.*?)\]\((data:image\/([a-zA-Z]+);base64,([A-Za-z0-9+/=]+))\)/g;
      let match;
      const imagesToProcess = [];
      while ((match = imgRegex.exec(contentMd)) !== null) {
        imagesToProcess.push({
          fullMatch: match[0],
          alt: match[1],
          dataUrl: match[2],
          ext: match[3],
          base64Data: match[4]
        });
      }
      
      console.log(`   🔍 Ảnh tìm thấy: ${imagesToProcess.length}`);
      
      let featuredMediaId = 0;
      let firstRealImageUrl = '';
      let firstRealImageFound = false;

      for (let imgIdx = 0; imgIdx < imagesToProcess.length; imgIdx++) {
        const img = imagesToProcess[imgIdx];
        const base64Hash = img.base64Data.substring(0, 100) + img.base64Data.length;
        let mediaResult = progress.uploadedMedia[base64Hash];
        
        const filename = `dinh_duong_${idx + 1}_${imgIdx + 1}.${img.ext}`;
        const tempImgInfo = saveBase64Image(img.dataUrl, filename);
        
        if (!tempImgInfo) continue;
        
        const isRealImage = tempImgInfo.bufferLength > 5000;
        
        if (!mediaResult) {
          mediaResult = await uploadMedia(tempImgInfo.path, filename, `image/${img.ext}`);
          if (mediaResult) {
            progress.uploadedMedia[base64Hash] = mediaResult;
            saveProgress(progress);
          }
        } else {
          // Skip log for emoji icons to reduce noise
          if (isRealImage) console.log(`   ⏭️ Dùng lại ảnh "${filename}"`);
        }

        if (mediaResult) {
          // Use split/join for performance (avoids regex on huge base64 strings)
          contentMd = contentMd.split(img.dataUrl).join(mediaResult.url);
          
          if (isRealImage && !firstRealImageFound) {
            featuredMediaId = mediaResult.id;
            firstRealImageUrl = mediaResult.url;
            firstRealImageFound = true;
            console.log(`   🎯 Featured Image: "${filename}" (ID: ${mediaResult.id})`);
          }
        }
      }

      // Convert markdown to HTML
      const contentHtml = markdownToHtml(contentMd);

      // Build payload
      const payload = {
        title: rawTitle,
        content: contentHtml,
        status: 'publish',
        date: art.date,
        categories: [categoryId],
        featured_media: featuredMediaId || 0
      };

      // Push to WordPress
      let res;
      try {
        res = await fetchWithRetry(createUrl, {
          method: 'POST',
          headers: { 'Authorization': AUTH_HEADER, 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        if (isUpdate && (err.message.includes('404') || err.message.includes('invalid_id'))) {
          console.log(`   ⚠️ Bài ID ${progress.uploadedPosts[progressKey]} đã bị xóa. Tạo mới...`);
          createUrl = `${WP_URL}/posts`;
          isUpdate = false;
          res = await fetchWithRetry(createUrl, {
            method: 'POST',
            headers: { 'Authorization': AUTH_HEADER, 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });
        } else {
          throw err;
        }
      }

      const createdPost = await res.json();
      progress.uploadedPosts[progressKey] = createdPost.id;
      saveProgress(progress);
      successCount++;
      console.log(`   🎉 ${isUpdate ? 'Cập nhật' : 'Đăng'} thành công! ID: ${createdPost.id}`);

    } catch (err) {
      console.error(`   ❌ Lỗi: ${err.message}`);
      failedCount++;
    }

    console.log('────────────────────────────────────────────────────────────');
    // Nghỉ 2s tránh quá tải LocalWP
    await new Promise(r => setTimeout(r, 2000));
  }

  console.log('\n============================================================');
  console.log('📊 KẾT QUẢ IMPORT DINH DƯỠNG:');
  console.log(`   ✅ Thành công: ${successCount} bài`);
  console.log(`   ❌ Thất bại: ${failedCount} bài`);
  console.log('============================================================');
  console.log('🎉 Hoàn tất! Kiểm tra tại WordPress Admin.');
  console.log('============================================================\n');
}

main();
