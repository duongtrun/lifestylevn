/**
 * File này: Script tự động đẩy 45 bài viết (41 tin tức + 4 tuyển dụng) kèm hình ảnh lên WordPress.
 * Vai trò: 
 *   - Đọc dữ liệu từ file `news_recruit/clean_structure.html`.
 *   - Tách thành 45 bài viết độc lập (tin tức và tuyển dụng).
 *   - Tải hình ảnh tự động lên WordPress Media Library (Thư viện đa phương tiện).
 *   - Thay thế link ảnh placeholder bằng link ảnh thật trên WordPress.
 *   - Tạo bài viết dạng Custom Post Type `tuyen_dung` (kèm các trường ACF như mức lương, địa điểm, hạn nộp, liên hệ)
 *     hoặc bài viết dạng `post` Tin tức (tự động phân loại danh mục).
 *   - Có chức năng lưu trữ tiến độ (progress cache) để có thể chạy tiếp tục (resume) nếu bị lỗi kết nối giữa chừng.
 * Dùng khi: Cần đồng bộ toàn bộ nội dung từ file tài liệu Word cũ lên website WordPress.
 */

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

// ================= CẤU HÌNH KẾT NỐI (CONNECTION SETUP) =================
const WP_BASE_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
const WP_URL = `${WP_BASE_URL}/wp/v2`;
const WP_USERNAME = 'trungnguyen';
const WP_APP_PASSWORD = 'FLfX sz1n OKz3 2BUm PccC iwSV';

// Mã hóa thông tin đăng nhập thành chuỗi Basic Authentication
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

// Đường dẫn file lưu tiến độ để chạy tiếp sức (resume)
const PROGRESS_FILE = path.join(__dirname, '../news_recruit/import_progress.json');

// Danh sách thông tin ACF của 4 bài tuyển dụng
const RECRUIT_ACF_MAP = {
  'tuyển dụng': {
    muc_luong: '8 - 15 triệu VNĐ',
    dia_diem: 'VOV Mễ Trì, Nam Từ Liêm, Hà Nội',
    kinh_nghiem: '1 năm',
    han_nop_ho_so: '30/06/2026',
    lien_he: '<p>Gửi CV vào email: <strong>npthao.lifestyle@gmail.com</strong></p><p>Liên hệ Ms Thảo: <strong>0969.872.835</strong></p>'
  },
  'tuyển dụng_2': {
    muc_luong: 'Thỏa thuận',
    dia_diem: 'VOV Mễ Trì, Nam Từ Liêm, Hà Nội',
    kinh_nghiem: '1 năm',
    han_nop_ho_so: '30/06/2026',
    lien_he: '<p>Gửi CV vào email: <strong>npthao.lifestyle@gmail.com</strong></p><p>Liên hệ Ms Thảo: <strong>0969.872.835</strong></p>'
  },
  'tuyển dụng _3': {
    muc_luong: 'Thỏa thuận',
    dia_diem: 'VOV Mễ Trì, Nam Từ Liêm, Hà Nội',
    kinh_nghiem: '1 năm',
    han_nop_ho_so: '30/06/2026',
    lien_he: '<p>Gửi CV vào email: <strong>npthao.lifestyle@gmail.com</strong></p><p>Liên hệ Ms Thảo: <strong>0969.872.835</strong></p>'
  },
  'tuyển dung _4': {
    muc_luong: 'Thỏa thuận (lên đến 15 triệu VNĐ + thưởng)',
    dia_diem: 'VOV Mễ Trì, Nam Từ Liêm, Hà Nội',
    kinh_nghiem: '1 năm trở lên',
    han_nop_ho_so: '30/06/2026',
    lien_he: '<p>Liên hệ Phòng NS: <strong>0397.646.394</strong> Ms Vĩnh</p><p>Email: <strong>nhansu1.lifestyle@gmail.com</strong></p><p>Địa chỉ: Toà Nhà CT1A-B Khu VOV Mễ Trì, Nam Từ Liêm, Hà Nội</p>'
  }
};

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
    uploadedPosts: {}
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

// Bộ lưu trữ tạm danh mục đã tạo
const categoryCache = {};

/**
 * Tìm hoặc tạo danh mục (category) trên WordPress
 */
async function getOrCreateCategory(name) {
  if (categoryCache[name]) return categoryCache[name];

  try {
    const searchRes = await fetch(`${WP_URL}/categories?search=${encodeURIComponent(name)}&per_page=100`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    const existing = await searchRes.json();

    if (existing.length > 0) {
      categoryCache[name] = existing[0].id;
      console.log(`  📂 Danh mục "${name}" đã tồn tại (ID: ${existing[0].id})`);
      return existing[0].id;
    }

    const createRes = await fetch(`${WP_URL}/categories`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    const newCat = await createRes.json();
    categoryCache[name] = newCat.id;
    console.log(`  ✅ Tạo danh mục mới "${name}" (ID: ${newCat.id})`);
    return newCat.id;
  } catch (error) {
    console.error(`  ❌ Lỗi tạo danh mục "${name}":`, error.message);
    return 1; // ID mặc định (Uncategorized)
  }
}

/**
 * Đẩy ảnh nhị phân lên thư viện WordPress Media Library
 */
async function uploadMedia(imageName, progress) {
  // Nếu ảnh này đã được upload trước đó, trả về thông tin lưu trong cache
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

    // Lưu lại tiến độ ngay khi thành công
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
  console.log('🚀 KHỞI ĐỘNG HỆ THỐNG AUTOMATION IMPORT BÀI VIẾT LÊN WORDPRESS');
  console.log(`🌐 API Endpoint (Đường dẫn API): ${WP_URL}`);
  console.log(`👤 Tài khoản quản trị: ${WP_USERNAME}`);
  console.log('============================================================\n');

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

  // Nạp tiến độ cũ
  const progress = loadProgress();

  // Bước 2: Đọc file HTML cấu trúc sạch và phân tách thành danh sách bài viết
  console.log('📖 Đang đọc và phân tích cấu trúc clean_structure.html...');
  const htmlPath = path.join(__dirname, '../news_recruit/clean_structure.html');
  if (!fs.existsSync(htmlPath)) {
    console.error(`❌ File clean_structure.html không tồn tại tại ${htmlPath}. Vui lòng chạy check-headings.js trước.`);
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, 'utf8');
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

  // Lọc các bài hợp lệ (có tiêu đề và nội dung)
  const postsToImport = rawPosts.filter(p => p.title && p.contentElements.length > 0);
  console.log(`📊 Tìm thấy tổng cộng: ${postsToImport.length} bài viết hợp lệ.`);
  console.log(`   - Bài tin tức (marker bắt đầu bằng Thẻ): ${postsToImport.filter(p => p.marker.toLowerCase().startsWith('thẻ')).length} bài`);
  console.log(`   - Bài tuyển dụng (marker bắt đầu bằng tuyển): ${postsToImport.filter(p => p.marker.toLowerCase().startsWith('tuyển')).length} bài`);
  console.log('────────────────────────────────────────────────────────────\n');

  // Bước 3: Đẩy từng bài viết lên WordPress
  let successCount = 0;
  let skippedCount = 0;
  let failedCount = 0;

  for (let i = 0; i < postsToImport.length; i++) {
    const post = postsToImport[i];
    const postKey = post.marker; // Sử dụng marker (ví dụ: "Thẻ 1" hoặc "tuyển dụng") làm khóa định danh duy nhất

    console.log(`📝 [${i + 1}/${postsToImport.length}] Đang xử lý bài: "${post.title}" (${post.marker})`);

    // Kiểm tra xem bài này đã được upload thành công trong tiến độ trước đó chưa
    if (progress.uploadedPosts[postKey]) {
      console.log(`  ⏭️ Bài viết đã được import thành công trước đó (ID: ${progress.uploadedPosts[postKey]}). Bỏ qua.`);
      skippedCount++;
      console.log('────────────────────────────────────────────────────────────');
      continue;
    }

    try {
      // 1. Quét tìm và upload ảnh, thay thế link placeholder trong bài
      let contentHTML = post.contentElements.join('');
      const imgPlaceholderRegex = /\[IMAGE_PLACEHOLDER_(img_\d+\.png)\]/g;
      let match;
      const placeholders = [];

      // Thu thập các placeholder ảnh
      while ((match = imgPlaceholderRegex.exec(contentHTML)) !== null) {
        placeholders.push(match[1]);
      }

      let featuredMediaId = 0;

      for (let j = 0; j < placeholders.length; j++) {
        const imageName = placeholders[j];
        const mediaResult = await uploadMedia(imageName, progress);

        if (mediaResult) {
          // Thay thế placeholder bằng link ảnh WordPress thật
          contentHTML = contentHTML.replace(new RegExp(`\\[IMAGE_PLACEHOLDER_${imageName.replace('.', '\\.')}\\]`, 'g'), mediaResult.url);
          
          // Gán ảnh đầu tiên làm featured image (ảnh đại diện)
          if (j === 0) {
            featuredMediaId = mediaResult.id;
          }
        }
      }

      // 2. Chuẩn bị payload gửi lên WordPress
      const isRecruitment = post.marker.toLowerCase().startsWith('tuyển');
      let createUrl = '';
      let payload = {};

      if (isRecruitment) {
        // Xử lý bài tuyển dụng (Custom Post Type 'tuyen_dung')
        createUrl = `${WP_URL}/tuyen_dung`;
        
        // Lấy dữ liệu ACF dựa trên marker
        const markerKey = post.marker.trim();
        const acfData = RECRUIT_ACF_MAP[markerKey] || {
          muc_luong: 'Thỏa thuận',
          dia_diem: 'VOV Mễ Trì, Nam Từ Liêm, Hà Nội',
          kinh_nghiem: '1 năm',
          han_nop_ho_so: '30/06/2026',
          lien_he: ''
        };

        payload = {
          title: post.title,
          content: contentHTML,
          status: 'publish',
          featured_media: featuredMediaId || 0,
          acf: {
            muc_luong: acfData.muc_luong,
            dia_diem: acfData.dia_diem,
            kinh_nghiem: acfData.kinh_nghiem,
            han_nop_ho_so: acfData.han_nop_ho_so,
            lien_he: acfData.lien_he,
            // Hỗ trợ cả các tên trường có dấu tiếng Việt phòng hờ
            'mức_lương': acfData.muc_luong,
            'địa_điểm_': acfData.dia_diem,
            'kinh_nghiệm': acfData.kinh_nghiem,
            'hạn_nộp_hồ_sơ': acfData.han_nop_ho_so
          }
        };
      } else {
        // Xử lý bài tin tức thường ('posts')
        createUrl = `${WP_URL}/posts`;
        
        // Xác định danh mục bài viết
        let categoryName = 'Tin tức';
        if (post.category) {
          categoryName = post.category.trim();
        }
        const categoryId = await getOrCreateCategory(categoryName);

        payload = {
          title: post.title,
          content: contentHTML,
          status: 'publish',
          categories: [categoryId],
          featured_media: featuredMediaId || 0
        };
      }

      // 3. Gọi API tạo bài viết
      const res = await fetchWithRetry(createUrl, {
        method: 'POST',
        headers: {
          'Authorization': AUTH_HEADER,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const createdPost = await res.json();
      
      // Ghi nhận thành công vào file tiến độ
      progress.uploadedPosts[postKey] = createdPost.id;
      saveProgress(progress);
      successCount++;
      
      console.log(`  🎉 Đăng bài thành công! WordPress ID: ${createdPost.id}`);

    } catch (err) {
      console.error(`  ❌ Lỗi khi đăng bài "${post.title}":`, err.message);
      failedCount++;
    }

    console.log('────────────────────────────────────────────────────────────');
    // Tránh quá tải local server, nghỉ ngắn 300ms giữa các bài viết
    await new Promise(resolve => setTimeout(resolve, 300));
  }

  // Báo cáo tổng kết
  console.log('\n============================================================');
  console.log('📊 BÁO CÁO KẾT QUẢ AUTOMATION IMPORT:');
  console.log(`   - Đã upload thành công mới: ${successCount} bài`);
  console.log(`   - Đã bỏ qua (đã có từ trước): ${skippedCount} bài`);
  console.log(`   - Thất bại: ${failedCount} bài`);
  console.log('============================================================');
  console.log('🎉 Quá trình hoàn tất! Hãy kiểm tra trong trang quản trị WordPress nhé anh Đào!');
  console.log('   👉 Tin tức: http://localhost:10004/wp-admin/edit.php');
  console.log('   👉 Tuyển dụng: http://localhost:10004/wp-admin/edit.php?post_type=tuyen_dung');
  console.log('============================================================\n');
}

main();
