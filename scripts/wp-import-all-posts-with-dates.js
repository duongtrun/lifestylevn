/**
 * File này: Script tự động đẩy/cập nhật toàn bộ 45 bài viết lên WordPress dạng bài viết Tin tức.
 * Vai trò: 
 *   - Load cấu hình từ file `.env.local` (ưu tiên mật khẩu ứng dụng mới nhất).
 *   - Đọc dữ liệu từ file `news_recruit/clean_structure.html`.
 *   - Đọc bản đồ metadata đã trích xuất gồm ngày hiển thị và danh mục cụ thể (`news_recruit/parsed_news_metadata.json`).
 *   - Tách thành 45 bài viết độc lập.
 *   - Tải hình ảnh tự động lên WordPress Media Library (Thư viện đa phương tiện) nếu chưa có.
 *   - Thay thế link ảnh placeholder bằng link ảnh thật trên WordPress.
 *   - Đẩy toàn bộ 45 bài viết lên WordPress dưới dạng `post` thường.
 *   - Mặc định gán toàn bộ các bài viết vào danh mục "Tin tức" (category: "Tin tức").
 *   - ĐẶC BIỆT: Nếu bài viết được đánh dấu thuộc chuyên mục "Dinh dưỡng & tiêu hóa", tự động thêm bài viết đó vào cả danh mục "Dinh dưỡng & tiêu hóa" (sở hữu song song 2 danh mục: Tin tức và Dinh dưỡng).
 *   - Cài đặt thời gian hiển thị (`date`) CHÍNH XÁC theo thời gian ghi nhận từ tài liệu docx.
 *   - Sử dụng cơ chế UPDATE bài viết cũ nếu đã tồn tại để tránh trùng lặp dữ liệu, đồng thời tự động sửa lại ngày hiển thị và danh mục.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// ================= NẠP CẤU HÌNH .ENV.LOCAL (ENV LOADING) =================
function loadEnv() {
  const envPath = path.join(__dirname, '../.env.local');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');
    for (let line of lines) {
      const match = line.match(/^\s*([^#=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim().replace(/^['"]|['"]$/g, ''); // Bỏ dấu nháy
        process.env[key] = value;
      }
    }
  }
}
loadEnv();

const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
const WP_URL = `${WP_BASE_URL}/wp/v2`;
const WP_USERNAME = process.env.WP_AUTH_USERNAME || 'trungnguyen';
const WP_APP_PASSWORD = process.env.WP_AUTH_APPLICATION_PASSWORD || 'FLfX sz1n OKz3 2BUm PccC iwSV';

// Mã hóa thông tin đăng nhập thành chuỗi Basic Authentication
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

// Đường dẫn các file dữ liệu và tiến độ
const PROGRESS_FILE = path.join(__dirname, '../news_recruit/import_progress.json');
const METADATA_FILE = path.join(__dirname, '../news_recruit/parsed_news_metadata.json');
const HTML_FILE = path.join(__dirname, '../news_recruit/clean_structure.html');

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
    uploadedMedia: {},
    uploadedPosts: {},
    syncedPosts: {}
  };
}

// Lưu lại tiến độ hiện tại
function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2), 'utf8');
}

// Đọc bản đồ metadata (ngày + category)
function loadMetadata() {
  if (fs.existsSync(METADATA_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf8'));
    } catch (e) {
      console.error('❌ Lỗi đọc file bản đồ metadata!');
    }
  }
  return {};
}

// Gọi API có cơ chế thử lại (retry mechanism) và timeout chống treo
async function fetchWithRetry(url, options = {}, retries = 3, backoff = 1000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 120000); // 120 giây timeout (local WP cần thời gian xử lý bài lớn)
  
  // Tránh vấn đề giữ kết nối (Keep-Alive) làm cạn kiệt worker PHP-FPM trên LocalWP
  const headers = {
    ...options.headers,
    'Connection': 'close'
  };
  
  try {
    const res = await fetch(url, {
      ...options,
      headers,
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`HTTP ${res.status}: ${errorText}`);
    }
    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    const isTimeout = error.name === 'AbortError' || error.message.includes('aborted') || error.message.includes('timeout');
    const is404 = error.message.includes('HTTP 404') || error.message.includes('rest_post_invalid_id');
    
    // Nếu gặp lỗi timeout (aborted), hoặc lỗi 404 không tồn tại bài viết, không nên retry
    if (retries > 0 && !isTimeout && !is404) {
      console.warn(`  🔄 Gặp lỗi khi gọi API (${error.message}). Đang thử lại sau ${backoff}ms... (Lượt thử lại còn lại: ${retries})`);
      await new Promise(resolve => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    }
    throw error;
  }
}

// Bộ lưu trữ tạm danh mục đã tạo
const categoryCache = {};

// Bản đồ ánh xạ tên danh mục sang slug an toàn
const SLUG_MAP = {
  'Tin tức': 'tin-tuc',
  'Dinh dưỡng & tiêu hóa': 'dinh-duong-tieu-hoa',
  'Sự kiện': 'su-kien',
  'Sức khỏe & vệ sinh': 'suc-khoe-ve-sinh',
  'Giáo dục': 'giao-duc',
  'Tuyển dụng': 'tuyen-dung'
};

/**
 * Tìm hoặc tạo danh mục (category) trên WordPress
 */
async function getOrCreateCategory(name) {
  if (categoryCache[name]) return categoryCache[name];

  const slug = SLUG_MAP[name] || encodeURIComponent(name.toLowerCase().replace(/[^a-z0-9]+/g, '-'));

  try {
    // 1. Tìm kiếm danh mục theo slug (an toàn tuyệt đối, không gây treo máy chủ LocalWP)
    const searchRes = await fetchWithRetry(`${WP_URL}/categories?slug=${slug}`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    const existing = await searchRes.json();

    if (Array.isArray(existing) && existing.length > 0) {
      categoryCache[name] = existing[0].id;
      console.log(`  📂 Danh mục "${name}" đã tồn tại (ID: ${existing[0].id})`);
      return existing[0].id;
    }

    // 2. Nếu chưa có, ta thử tạo mới
    const createRes = await fetchWithRetry(`${WP_URL}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, slug }),
    });
    
    const newCat = await createRes.json();
    
    if (newCat.id) {
      categoryCache[name] = newCat.id;
      console.log(`  ✅ Tạo danh mục mới "${name}" (ID: ${newCat.id})`);
      return newCat.id;
    } else if (newCat.code === 'term_exists' && newCat.data && newCat.data.term_id) {
      categoryCache[name] = newCat.data.term_id;
      console.log(`  📂 Danh mục "${name}" đã tồn tại trên WP (ID: ${newCat.data.term_id})`);
      return newCat.data.term_id;
    } else {
      throw new Error(newCat.message || 'Lỗi không rõ khi tạo danh mục');
    }
  } catch (error) {
    console.error(`  ❌ Lỗi tạo danh mục "${name}":`, error.message);
    return 1; // ID mặc định (Uncategorized)
  }
}

/**
 * Đẩy ảnh nhị phân lên thư viện WordPress Media Library
 */
async function uploadMedia(imageName, progress) {
  if (progress.uploadedMedia[imageName]) {
    return progress.uploadedMedia[imageName];
  }

  const imagePath = path.join(__dirname, '../news_recruit/images', imageName);
  if (!fs.existsSync(imagePath)) {
    console.warn(`  ⚠️ Không tìm thấy tệp ảnh local tại: ${imagePath}`);
    return null;
  }

  try {
    console.log(`  📤 Đang upload ảnh "${imageName}" lên WordPress...`);
    const fileBuffer = fs.readFileSync(imagePath);

    const res = await fetchWithRetry(`${WP_URL}/media`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Disposition': `attachment; filename="${imageName}"`,
        'Content-Type': 'image/png',
      },
      body: fileBuffer
    });

    const mediaData = await res.json();
    const result = {
      id: mediaData.id,
      url: mediaData.source_url
    };

    progress.uploadedMedia[imageName] = result;
    saveProgress(progress);
    console.log(`  🎉 Upload ảnh thành công! WordPress URL: ${result.url} (ID: ${result.id})`);
    return result;
  } catch (error) {
    console.error(`  ❌ Lỗi upload ảnh "${imageName}":`, error.message);
    return null;
  }
}

// ================= LUỒNG CHẠY CHÍNH (MAIN PROCESS) =================

async function main() {
  console.log('\n============================================================');
  console.log('🚀 AUTOMATION IMPORT BÀI VIẾT VỚI DỰ LIỆU HOÀN CHỈNH & PHÂN LOẠI');
  console.log(`🌐 API Endpoint: ${WP_URL}`);
  console.log(`👤 Tài khoản: ${WP_USERNAME}`);
  console.log('============================================================\n');

  // Bước 1: Kiểm tra kết nối API
  try {
    const testRes = await fetchWithRetry(`${WP_URL}/posts?per_page=1`, {
      headers: { 'Authorization': AUTH_HEADER }
    });
    if (!testRes.ok) {
      throw new Error(`HTTP Code ${testRes.status}`);
    }
    console.log('✅ Kết nối API WordPress và xác thực thành công!\n');
  } catch (error) {
    console.error('❌ Thất bại khi kết nối WordPress! Hãy chắc chắn ứng dụng LocalWP đang chạy và thông tin .env.local chính xác.');
    console.error(`   Chi tiết lỗi: ${error.message}\n`);
    process.exit(1);
  }

  // Nạp tiến độ và metadata
  const progress = loadProgress();
  const metadataMap = loadMetadata();
  
  // Tạo/lấy danh mục "Tin tức" và "Dinh dưỡng & tiêu hóa"
  const newsCategoryId = await getOrCreateCategory('Tin tức');
  const nutritionCategoryId = await getOrCreateCategory('Dinh dưỡng & tiêu hóa');

  // Bước 2: Đọc file HTML cấu trúc sạch và phân tách thành danh sách bài viết
  console.log('📖 Đang đọc và phân tích cấu trúc clean_structure.html...');
  if (!fs.existsSync(HTML_FILE)) {
    console.error(`❌ File clean_structure.html không tồn tại tại ${HTML_FILE}.`);
    process.exit(1);
  }

  const html = fs.readFileSync(HTML_FILE, 'utf8');
  const $ = cheerio.load(html);
  const bodyChildren = $('body').children();

  const rawPosts = [];
  let currentPost = null;

  bodyChildren.each((index, element) => {
    const $el = $(element);
    const text = $el.text().trim();
    
    // Nhận diện mốc phân tách bài viết
    const markerRegex = /^(Thẻ\s*\d+|tuyển\s*d[uụ]n?g(?:[_\s]*\d+)?)$/i;
    const isMarker = element.name === 'p' && markerRegex.test(text) && $el.find('a[id]').length > 0;
    
    if (isMarker) {
      if (currentPost) {
        rawPosts.push(currentPost);
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
    rawPosts.push(currentPost);
  }

  const postsToImport = rawPosts.filter(p => p.title && p.contentElements.length > 0);
  console.log(`📊 Tìm thấy tổng cộng: ${postsToImport.length} bài viết hợp lệ để xử lý.`);
  console.log('────────────────────────────────────────────────────────────\n');

  let successCount = 0;
  let failedCount = 0;

  // Khởi tạo syncedPosts nếu chưa có (tương thích với progress cũ)
  if (!progress.syncedPosts) progress.syncedPosts = {};

  for (let i = 0; i < postsToImport.length; i++) {
    const post = postsToImport[i];
    const postKey = post.marker.trim();
    const isRecruitment = postKey.toLowerCase().startsWith('tuyển');
    const syncKey = isRecruitment ? `post_${postKey}` : postKey;
    
    // SKIP: Bỏ qua bài đã sync thành công ở lần chạy trước
    if (progress.syncedPosts[syncKey]) {
      console.log(`⏭️  [${i + 1}/${postsToImport.length}] SKIP (đã sync): "${post.title}" (${postKey})`);
      successCount++;
      continue;
    }
    
    // Tìm thông tin metadata từ parsed_news_metadata.json
    const metadata = metadataMap[postKey.toLowerCase()] || { date: null, category: 'Tin tức' };
    const dateToUse = metadata.date || new Date().toISOString();
    const parsedCategory = metadata.category || 'Tin tức';

    // Xác định danh sách ID danh mục của bài viết
    // Mặc định luôn có danh mục "Tin tức" (newsCategoryId)
    const categoriesList = [newsCategoryId];
    
    // Nếu metadata chỉ ra bài viết thuộc danh mục "Dinh dưỡng & tiêu hóa", ta thêm nó vào song song
    if (parsedCategory === 'Dinh dưỡng & tiêu hóa') {
      categoriesList.push(nutritionCategoryId);
    }

    console.log(`📝 [${i + 1}/${postsToImport.length}] Xử lý bài: "${post.title}" (${postKey})`);
    console.log(`   📅 Ngày hiển thị: ${dateToUse}`);
    console.log(`   📂 Danh mục: ${parsedCategory === 'Dinh dưỡng & tiêu hóa' ? 'Tin tức + Dinh dưỡng & tiêu hóa' : 'Tin tức'}`);

    try {
      // 1. Quét tìm và upload ảnh, thay thế link placeholder trong bài
      let contentHTML = post.contentElements.join('');
      const imgPlaceholderRegex = /\[IMAGE_PLACEHOLDER_(img_\d+\.png)\]/g;
      let match;
      const placeholders = [];

      while ((match = imgPlaceholderRegex.exec(contentHTML)) !== null) {
        placeholders.push(match[1]);
      }

      let featuredMediaId = 0;

      for (let j = 0; j < placeholders.length; j++) {
        const imageName = placeholders[j];
        const mediaResult = await uploadMedia(imageName, progress);

        if (mediaResult) {
          contentHTML = contentHTML.replace(new RegExp(`\\[IMAGE_PLACEHOLDER_${imageName.replace('.', '\\.')}\\]`, 'g'), mediaResult.url);
          if (j === 0) {
            featuredMediaId = mediaResult.id;
          }
        }
      }

      // 2. Chuẩn bị payload và URL gọi API
      let createUrl = `${WP_URL}/posts`;
      let isUpdate = false;
      let existingPostId = null;

      if (isRecruitment) {
        // Đối với bài tuyển dụng đăng thành post thường, kiểm tra key "post_tuyển dụng"
        const postRecruitKey = `post_${postKey}`;
        if (progress.uploadedPosts[postRecruitKey]) {
          existingPostId = progress.uploadedPosts[postRecruitKey];
          createUrl = `${WP_URL}/posts/${existingPostId}`;
          isUpdate = true;
        }
      } else {
        // Đối với bài tin tức thường, kiểm tra key thông thường
        if (progress.uploadedPosts[postKey]) {
          existingPostId = progress.uploadedPosts[postKey];
          createUrl = `${WP_URL}/posts/${existingPostId}`;
          isUpdate = true;
        }
      }

      const payload = {
        title: post.title,
        content: contentHTML,
        status: 'publish',
        categories: categoriesList, // Gán song song cả 2 danh mục nếu thuộc Dinh dưỡng
        featured_media: featuredMediaId || 0,
        date: dateToUse // Thời gian hiển thị chính xác
      };

      console.log(`   🔄 Đang ${isUpdate ? `cập nhật bài viết ID ${existingPostId}` : 'tạo bài viết mới'} trên WordPress...`);

      // 3. Gọi API gửi bài viết
      let res;
      try {
        res = await fetchWithRetry(createUrl, {
          method: 'POST',
          headers: {
            'Authorization': AUTH_HEADER,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        // TỰ ĐỘNG TẠO MỚI nếu bài viết đã bị xóa trên WordPress (lỗi 404 Invalid post ID)
        if (isUpdate && err.message.includes('404')) {
          console.warn(`   ⚠️ Bài viết ID ${existingPostId} không tồn tại trên WP (có thể đã bị xóa). Đang chuyển sang tạo mới...`);
          createUrl = `${WP_URL}/posts`;
          isUpdate = false;
          res = await fetchWithRetry(createUrl, {
            method: 'POST',
            headers: {
              'Authorization': AUTH_HEADER,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
          });
        } else {
          throw err;
        }
      }

      const resultPost = await res.json();
      
      // Ghi nhận thành công vào file tiến độ
      if (isRecruitment) {
        progress.uploadedPosts[`post_${postKey}`] = resultPost.id;
      } else {
        progress.uploadedPosts[postKey] = resultPost.id;
      }
      
      // Đánh dấu đã sync thành công — lần chạy sau sẽ skip bài này
      progress.syncedPosts[syncKey] = true;
      saveProgress(progress);
      successCount++;
      
      console.log(`   🎉 ${isUpdate ? 'Cập nhật' : 'Đăng'} bài thành công! ID: ${resultPost.id}`);

    } catch (err) {
      console.error(`   ❌ Lỗi khi xử lý bài viết "${post.title}":`, err.message);
      failedCount++;
    }

    console.log('────────────────────────────────────────────────────────────');
    // Nghỉ 3 giây tránh quá tải local server, cho phép PHP-FPM giải phóng bộ nhớ
    await new Promise(resolve => setTimeout(resolve, 3000));
  }

  // Báo cáo tổng kết
  console.log('\n============================================================');
  console.log('📊 TỔNG KẾT QUÁ TRÌNH IMPORT BÀI VIẾT HOÀN TẤT:');
  console.log(`   - Thành công: ${successCount} bài`);
  console.log(`   - Thất bại: ${failedCount} bài`);
  console.log('============================================================');
  console.log('🎉 Toàn bộ bài viết đã được đẩy/cập nhật lên WordPress thành công!');
  console.log('   Các bài có tag "Dinh dưỡng" đã được gán song song vào cả danh mục "Dinh dưỡng & tiêu hóa"!');
  console.log('   👉 Kiểm tra: http://localhost:10004/wp-admin/edit.php');
  console.log('============================================================\n');
}

main();
