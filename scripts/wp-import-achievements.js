/**
 * File này: Script tự động trích xuất và đẩy 7 bài viết Thành tựu kèm hình ảnh giải mã từ file word lên WordPress.
 * Vai trò:
 *   - Đọc dữ liệu từ file `news_recruit/achieve/extracted.md`.
 *   - Tách thành 7 bài viết thành tựu độc lập.
 *   - Quét tìm các hình ảnh base64, lưu thành file ảnh tạm thời, và tải lên WordPress Media Library.
 *   - Thay thế các chuỗi ảnh base64 trong bài viết thành đường dẫn ảnh thật trên WordPress.
 *   - Gán ảnh lớn đầu tiên làm Featured Image (ảnh đại diện).
 *   - Đẩy bài viết lên WordPress với danh mục "Thành tựu" (slug "thanh-tuu").
 *   - Lưu trữ tiến độ để tránh tải lên trùng lặp nếu chạy lại.
 */

const fs = require('fs');
const path = require('path');

// ================= CẤU HÌNH KẾT NỐI (CONNECTION SETUP) =================
const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
const WP_URL = `${WP_BASE_URL}/wp/v2`;
const WP_USERNAME = 'trungnguyen';
const WP_APP_PASSWORD = 'FLfX sz1n OKz3 2BUm PccC iwSV';

// Mã hóa thông tin đăng nhập thành chuỗi Basic Authentication
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

// Đường dẫn file lưu tiến độ để chạy tiếp sức (resume)
const PROGRESS_FILE = path.join(__dirname, '../news_recruit/achieve/import_progress.json');
const MD_FILE = path.join(__dirname, '../news_recruit/achieve/extracted.md');
const TEMP_IMAGE_DIR = path.join(__dirname, '../news_recruit/achieve/temp_images');

// Cleaned titles mapped by index to look elegant and premium in carousel
const CLEAN_TITLES = [
  '(iruKa) Giải ba chung cuộc tại AI Hackathon Việt Nam - Nhật Bản 2025',
  '(Babego) Thương hiệu Vàng – Phát triển bền vững 2024',
  '(Babego) Top 10 Thương hiệu nổi tiếng Quốc gia 2023',
  '(Babego) Top 10 Thương hiệu xuất sắc Châu Á 2023',
  '(Mamigo) Thương hiệu mạnh, sản phẩm, dịch vụ chất lượng cao Asean 2022',
  '(Babego) Top 10 Thương hiệu dẫn đầu Việt Nam 2022',
  '(Babego) Top 100 Sản phẩm – Dịch vụ tốt nhất cho gia đình & trẻ em 2021'
];

// Ensure temp directory exists
if (!fs.existsSync(TEMP_IMAGE_DIR)) {
  fs.mkdirSync(TEMP_IMAGE_DIR, { recursive: true });
}

// ================= HÀM TIỆN ÍCH (HELPERS) =================

// Đọc tiến độ đã lưu
function loadProgress() {
  if (fs.existsSync(PROGRESS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
    } catch (e) {
      console.warn('⚠️ Lỗi đọc file tiến độ cũ, bắt đầu tiến độ mới.');
    }
  }
  return {
    uploadedMedia: {}, // map from base64 hash or index to { id, url }
    uploadedPosts: {}  // map from title/index to WordPress ID
  };
}

// Lưu lại tiến độ hiện tại
function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

// Gọi API có cơ chế thử lại (retry mechanism) khi mất mạng/quá tải
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 1000) {
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return res;
  } catch (error) {
    if (retries > 0) {
      console.warn(`  🔄 Gặp lỗi khi gọi API. Đang thử lại sau ${backoff}ms... (Lượt thử lại còn lại: ${retries})`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

// Tìm hoặc tạo danh mục (category) trên WordPress
async function getOrCreateCategory(name) {
  try {
    const searchRes = await fetch(`${WP_URL}/categories?search=${encodeURIComponent(name)}&per_page=100`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    const existing = await searchRes.json();

    if (existing.length > 0) {
      console.log(`  📂 Danh mục "${name}" đã tồn tại (ID: ${existing[0].id})`);
      return existing[0].id;
    }

    const createRes = await fetch(`${WP_URL}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, slug: 'thanh-tuu' }),
    });
    const newCat = await createRes.json();
    console.log(`  ✅ Tạo danh mục mới "${name}" (ID: ${newCat.id})`);
    return newCat.id;
  } catch (error) {
    console.error(`  ❌ Lỗi tạo danh mục "${name}":`, error.message);
    return 1; // ID mặc định (Uncategorized)
  }
}

// Trích xuất thông tin ảnh base64 và lưu thành tệp PNG/JPG
function saveBase64Image(base64Data, filename) {
  const match = base64Data.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
  if (!match) {
    // Try without prefix
    try {
      const buffer = Buffer.from(base64Data, 'base64');
      const imagePath = path.join(TEMP_IMAGE_DIR, filename);
      fs.writeFileSync(imagePath, buffer);
      return imagePath;
    } catch (e) {
      console.error(`  ❌ Lỗi giải mã base64 raw: ${e.message}`);
      return null;
    }
  }
  
  const ext = match[1];
  const data = match[2];
  const buffer = Buffer.from(data, 'base64');
  const finalFilename = filename.endsWith(`.${ext}`) ? filename : `${filename}.${ext}`;
  const imagePath = path.join(TEMP_IMAGE_DIR, finalFilename);
  fs.writeFileSync(imagePath, buffer);
  return { path: imagePath, ext, bufferLength: buffer.length };
}

// Đẩy ảnh nhị phân lên thư viện WordPress Media Library
async function uploadMedia(imagePath, filename, mimeType) {
  try {
    const fileBuffer = fs.readFileSync(imagePath);
    console.log(`  📤 Đang upload ảnh "${filename}" (${(fileBuffer.length/1024).toFixed(1)} KB) lên WordPress...`);

    const res = await fetchWithRetry(`${WP_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Type': mimeType || 'image/png',
      },
      body: fileBuffer
    });

    const mediaData = await res.json();
    console.log(`  🎉 Upload ảnh thành công! ID: ${mediaData.id}, URL: ${mediaData.source_url}`);
    return {
      id: mediaData.id,
      url: mediaData.source_url
    };
  } catch (error) {
    console.error(`  ❌ Lỗi upload ảnh "${filename}":`, error.message);
    return null;
  }
}

// Markdown to Simple HTML Converter
function markdownToHtml(mdText) {
  let html = mdText;
  
  // Convert lines
  const lines = html.split('\n');
  const convertedLines = [];
  let inList = false;
  
  for (let line of lines) {
    const trimmed = line.trim();
    
    // Unordered list
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      if (!inList) {
        convertedLines.push('<ul>');
        inList = true;
      }
      const itemText = trimmed.substring(2).trim();
      convertedLines.push(`<li>${itemText}</li>`);
      continue;
    } else {
      if (inList) {
        convertedLines.push('</ul>');
        inList = false;
      }
    }
    
    // Headings
    if (trimmed.startsWith('## ')) {
      convertedLines.push(`<h2>${trimmed.substring(3).trim()}</h2>`);
      continue;
    }
    if (trimmed.startsWith('### ')) {
      convertedLines.push(`<h3>${trimmed.substring(4).trim()}</h3>`);
      continue;
    }
    
    // Blockquote
    if (trimmed.startsWith('> ')) {
      convertedLines.push(`<blockquote>${trimmed.substring(2).trim()}</blockquote>`);
      continue;
    }
    
    // Normal paragraph
    if (trimmed.length > 0) {
      // Escape some characters like \. from mammoth markdown
      let cleanText = trimmed.replace(/\\([.+*?^=!:${}()|\[\]\/\\])/g, '$1');
      convertedLines.push(`<p>${cleanText}</p>`);
    } else {
      convertedLines.push('');
    }
  }
  
  if (inList) {
    convertedLines.push('</ul>');
  }
  
  html = convertedLines.join('\n');
  
  // Convert markdown images to HTML img tags
  // Emojis (alt text length <= 2) will render inline, regular screenshots will render block-level
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (match, alt, url) => {
    const isEmoji = alt.length > 0 && alt.length <= 2;
    if (isEmoji) {
      return `<img src="${url}" alt="${alt}" class="inline-block w-5 h-5 mx-0.5 align-text-bottom" style="display: inline-block; vertical-align: middle;" />`;
    } else {
      return `<img src="${url}" alt="${alt}" class="block my-4 max-w-full h-auto rounded-xl shadow-md mx-auto" />`;
    }
  });

  // Convert markdown links to HTML anchors
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#008BBD] hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

  // Convert markdown bold to strong
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  return html;
}

// ================= MAIN PROCESS =================

async function main() {
  console.log('\n============================================================');
  console.log('🚀 AUTOMATION IMPORT THÀNH TỰU ĐẠT ĐƯỢC LÊN WORDPRESS');
  console.log(`🌐 API Endpoint: ${WP_URL}`);
  console.log(`👤 Tài khoản: ${WP_USERNAME}`);
  console.log('============================================================\n');

  // Kiểm tra file MD
  if (!fs.existsSync(MD_FILE)) {
    console.error(`❌ Không tìm thấy file extracted.md tại ${MD_FILE}. Vui lòng chạy read-docx.js trước.`);
    process.exit(1);
  }

  // Bước 1: Kiểm tra kết nối API
  try {
    const testRes = await fetch(`${WP_URL}/posts?per_page=1`, {
      headers: { 'Authorization': AUTH_HEADER }
    });
    if (!testRes.ok) {
      throw new Error(`HTTP Code ${testRes.status}`);
    }
    console.log('✅ Kết nối API WordPress và xác thực thành công!\n');
  } catch (error) {
    console.error('❌ Thất bại khi kết nối WordPress! Hãy chắc chắn ứng dụng LocalWP đang chạy.');
    console.error(`   Chi tiết lỗi: ${error.message}\n`);
    process.exit(1);
  }

  // Load progress & get category
  const progress = loadProgress();
  const catId = await getOrCreateCategory('Thành tựu');

  // Bước 2: Đọc file MD và phân tách thành 7 bài viết
  console.log('📖 Đang đọc và phân tách file extracted.md...');
  const mdContent = fs.readFileSync(MD_FILE, 'utf8');
  const lines = mdContent.split('\n');
  
  const rawArticles = [];
  let currentArt = null;
  let inSummary = false;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const isYear = /^(202\d|Năm 202\d|202\d:)$/.test(line);
    
    if (isYear) {
      if (currentArt) {
        rawArticles.push(currentArt);
      }
      currentArt = {
        year: line.replace(':', '').replace('Năm ', '').trim(),
        rawTitle: '',
        contentLines: [],
        summary: '',
        date: ''
      };
      inSummary = false;
      continue;
    }
    
    if (!currentArt) continue;
    
    if (!currentArt.rawTitle && line.length > 0) {
      currentArt.rawTitle = line;
      continue;
    }
    
    if (/^Tóm tắt:?$/i.test(line)) {
      inSummary = true;
      continue;
    }
    
    const dateMatch = line.match(/^Ngày (\d{1,2})\/(\d{1,2})\/(\d{4})$/);
    if (dateMatch) {
      const day = dateMatch[1].padStart(2, '0');
      const month = dateMatch[2].padStart(2, '0');
      const year = dateMatch[3];
      currentArt.date = `${year}-${month}-${day}T08:00:00`;
      continue;
    }
    
    if (inSummary) {
      if (line.length > 0) {
        currentArt.summary += (currentArt.summary ? '\n' : '') + line;
      }
    } else {
      currentArt.contentLines.push(lines[i]);
    }
  }
  
  if (currentArt) {
    rawArticles.push(currentArt);
  }

  console.log(`📊 Tìm thấy ${rawArticles.length} bài viết thành tựu.`);
  if (rawArticles.length !== 7) {
    console.warn(`⚠️ Số bài viết tìm thấy (${rawArticles.length}) khác kỳ vọng (7). Vui lòng kiểm tra lại cấu trúc.`);
  }

  console.log('────────────────────────────────────────────────────────────\n');

  // Bước 3: Đẩy từng bài viết lên WordPress
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let idx = 0; idx < rawArticles.length; idx++) {
    const art = rawArticles[idx];
    const cleanTitle = CLEAN_TITLES[idx] || art.rawTitle;
    const progressKey = `achievement_${idx}`;

    console.log(`📝 [${idx + 1}/${rawArticles.length}] Đang xử lý bài: "${cleanTitle}"`);

    let createUrl = `${WP_URL}/posts`;
    let isUpdate = false;

    if (progress.uploadedPosts[progressKey]) {
      createUrl = `${WP_URL}/posts/${progress.uploadedPosts[progressKey]}`;
      isUpdate = true;
      console.log(`  🔄 Bài viết đã tồn tại (ID: ${progress.uploadedPosts[progressKey]}). Tiến hành cập nhật nội dung.`);
    }

    try {
      let contentMd = art.contentLines.join('\n');
      
      // Tìm tất cả ảnh base64 trong bài viết
      // Thư viện mammoth chuyển đổi ảnh thành: ![alt text](data:image/png;base64,...) hoặc ![](data:image/png;base64,...)
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
      
      console.log(`  🔍 Tìm thấy ${imagesToProcess.length} ảnh trong nội dung bài viết.`);
      
      let featuredMediaId = 0;
      let firstRealImageFound = false;

      for (let imgIdx = 0; imgIdx < imagesToProcess.length; imgIdx++) {
        const img = imagesToProcess[imgIdx];
        
        // Tạo mã băm hoặc key duy nhất cho ảnh dựa trên nội dung base64 của nó
        const base64Hash = img.base64Data.substring(0, 100) + img.base64Data.length;
        let mediaResult = progress.uploadedMedia[base64Hash];
        
        const filename = `achieve_${idx + 1}_${imgIdx + 1}.${img.ext}`;
        const tempImgInfo = saveBase64Image(img.dataUrl, filename);
        
        if (!tempImgInfo) {
          console.warn(`  ⚠️ Lỗi lưu ảnh tạm thời #${imgIdx + 1}`);
          continue;
        }

        // Quyết định xem ảnh này là icon/emoji hay ảnh lớn dựa vào dung lượng buffer
        const isRealImage = tempImgInfo.bufferLength > 5000; // > 5KB
        
        if (!mediaResult) {
          // Upload ảnh lên WordPress
          const uploadRes = await uploadMedia(tempImgInfo.path, filename, `image/${img.ext}`);
          if (uploadRes) {
            mediaResult = uploadRes;
            progress.uploadedMedia[base64Hash] = mediaResult;
            saveProgress(progress);
          }
        } else {
          console.log(`  ⏭️ Ảnh "${filename}" đã được upload trước đó. Dùng lại URL.`);
        }

        if (mediaResult) {
          // Thay thế mã base64 trong bài viết bằng link ảnh WordPress thật
          // Escape các ký tự đặc biệt trong dataUrl để an toàn khi regex replace
          const escapedDataUrl = img.dataUrl.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
          contentMd = contentMd.replace(new RegExp(escapedDataUrl, 'g'), mediaResult.url);
          
          // Gán ảnh lớn đầu tiên làm featured image (ảnh đại diện)
          if (isRealImage && !firstRealImageFound) {
            featuredMediaId = mediaResult.id;
            firstRealImageFound = true;
            console.log(`  🎯 Gán ảnh "${filename}" (ID: ${mediaResult.id}) làm Ảnh đại diện (Featured Image).`);
          }
        }
      }

      // Convert Markdown content to HTML
      let contentHtml = markdownToHtml(contentMd);

      // Nếu không tìm thấy ảnh đại diện nào từ nội dung (ví dụ chỉ toàn icon nhỏ),
      // tự động lấy ảnh fallback từ `/images/1.jpg` đến `/images/7.jpg`.
      // Lưu ý: Đối với ảnh đại diện fallback, ta không cần upload media nếu nó đã được định nghĩa
      // tĩnh trong website. Nhưng trên WordPress DB, nếu ta muốn có featured_media id,
      // ta cũng có thể upload ảnh fallback từ thư mục public/images/.
      if (!featuredMediaId) {
        const fallbackFilename = `${(idx % 7) + 1}.jpg`;
        const fallbackPath = path.join(__dirname, `../public/images/${fallbackFilename}`);
        if (fs.existsSync(fallbackPath)) {
          console.log(`  ⚠️ Không tìm thấy ảnh lớn nào trong bài viết. Tiến hành upload ảnh đại diện mặc định: ${fallbackFilename}`);
          const fallbackHash = `fallback_${fallbackFilename}`;
          let fallbackMedia = progress.uploadedMedia[fallbackHash];
          
          if (!fallbackMedia) {
            fallbackMedia = await uploadMedia(fallbackPath, fallbackFilename, 'image/jpeg');
            if (fallbackMedia) {
              progress.uploadedMedia[fallbackHash] = fallbackMedia;
              saveProgress(progress);
            }
          }
          if (fallbackMedia) {
            featuredMediaId = fallbackMedia.id;
          }
        }
      }

      // Tạo payload gửi lên WordPress
      const payload = {
        title: cleanTitle,
        content: contentHtml,
        excerpt: art.summary,
        status: 'publish',
        date: art.date || new Date().toISOString(),
        categories: [catId],
        featured_media: featuredMediaId || 0,
        // Hỗ trợ ACF
        acf: {
          title: cleanTitle,
          noi_dung_chinh: contentHtml,
          anh: firstRealImageFound && progress.uploadedMedia[Object.keys(progress.uploadedMedia)[idx]] 
               ? progress.uploadedMedia[Object.keys(progress.uploadedMedia)[idx]].url 
               : `/images/${(idx % 7) + 1}.jpg`,
          nguoi_dang_bai: 'Ban Biên Tập Lifestyle'
        }
      };

      // Đẩy bài viết lên WordPress
      const res = await fetchWithRetry(createUrl, {
        method: 'POST',
        headers: {
          'Authorization': AUTH_HEADER,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const createdPost = await res.json();
      
      progress.uploadedPosts[progressKey] = createdPost.id;
      saveProgress(progress);
      successCount++;
      
      console.log(`  🎉 ${isUpdate ? 'Cập nhật' : 'Đăng'} bài thành công! WordPress ID: ${createdPost.id}`);

    } catch (err) {
      console.error(`  ❌ Lỗi khi đăng bài "${cleanTitle}":`, err.message);
      failedCount++;
    }

    console.log('────────────────────────────────────────────────────────────');
    // Tránh quá tải local server, nghỉ ngắn 300ms giữa các bài viết
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Báo cáo tổng kết
  console.log('\n============================================================');
  console.log('📊 BÁO CÁO KẾT QUẢ AUTOMATION IMPORT THÀNH TỰU:');
  console.log(`   - Đã upload thành công mới: ${successCount} bài`);
  console.log(`   - Đã bỏ qua (đã có từ trước): ${skippedCount} bài`);
  console.log(`   - Thất bại: ${failedCount} bài`);
  console.log('============================================================');
  console.log('🎉 Quá trình hoàn tất! Hãy kiểm tra trong trang quản trị WordPress nhé!');
  console.log(`   👉 http://localhost:10004/wp-admin/edit.php`);
  console.log('============================================================\n');
}

main();
