/**
 * File này: Script tự động đẩy bài viết lên WordPress
 * Vai trò: Đọc danh sách bài mock, tạo danh mục (nếu chưa có), rồi tạo bài viết qua WP REST API
 * Dùng khi: Chạy 1 lần để nhập liệu hàng loạt lên WordPress
 */

// ============= CẤU HÌNH =============
const WP_URL = 'http://lifestyleadminvn.local/wp-json/wp/v2';
const WP_USERNAME = 'trungnguyen';
const WP_APP_PASSWORD = 'FLfX sz1n OKz3 2BUm PccC iwSV';

// Tạo header xác thực (giống như "chìa khóa" để WordPress cho phép đăng bài)
const AUTH_HEADER = 'Basic ' + Buffer.from(`${WP_USERNAME}:${WP_APP_PASSWORD}`).toString('base64');

// ============= DANH SÁCH BÀI VIẾT =============
const POSTS = [
  // --- 3 BÀI SỰ KIỆN ---
  {
    title: 'Babego - Ứng dụng công nghệ Nano Hoa Kỳ chiết xuất thảo dược chùm ngây',
    content: `<h2>Lễ ra mắt dòng sản phẩm dinh dưỡng chùm ngây cao cấp</h2>
<p>Sự kiện đã diễn ra vô cùng thành công với sự tham gia của hơn 500 gia đình và các chuyên gia y tế, dinh dưỡng hàng đầu. Tại buổi hội thảo, các bác sĩ đã chia sẻ những kiến thức vô cùng bổ ích về tầm quan trọng của dinh dưỡng đối với trẻ nhỏ.</p>
<p>Công nghệ Nano Hoa Kỳ giúp phân tách các chất dinh dưỡng từ chùm ngây thành các phân tử siêu nhỏ, giúp cơ thể trẻ hấp thụ tối đa chất dinh dưỡng gấp 300 lần bình thường. Đây là giải pháp đột phá giúp bé ăn ngon miệng, ngừa táo bón và tăng cân khoa học tự nhiên.</p>
<blockquote>Dinh dưỡng khoa học là nền tảng vững chắc để trẻ tự do khám phá và phát triển toàn diện cả thể chất lẫn trí tuệ.</blockquote>`,
    excerpt: 'Hội thảo dinh dưỡng giới thiệu giải pháp đột phá từ chùm ngây giúp trẻ hấp thụ tối đa dưỡng chất, ngừa táo bón và tăng cân tự nhiên khỏe mạnh.',
    category: 'Sự kiện',
    date: '2026-05-19T08:00:00',
  },
  {
    title: 'Lifestyle Việt Nam công bố hợp tác chiến lược y tế toàn diện cùng Iruka Care',
    content: `<h2>Cột mốc phát triển mới của hệ sinh thái chăm sóc sức khỏe Mẹ & Bé</h2>
<p>Nhằm đem lại dịch vụ tư vấn y tế chất lượng cao, Lifestyle Việt Nam chính thức công bố ký kết thỏa thuận hợp tác chiến lược toàn diện cùng chuỗi trung tâm chăm sóc sức khỏe Iruka Care.</p>
<p>Thông qua hợp tác này, toàn bộ khách hàng của hệ sinh thái Lifestyle sẽ nhận được sự hỗ trợ y tế 24/7 trực tiếp từ đội ngũ bác sĩ nhi khoa đầu ngành của Iruka Care, nâng niu sự phát triển toàn diện của mỗi em bé.</p>`,
    excerpt: 'Ký kết thỏa thuận hợp tác chiến lược mở ra chương mới giúp chăm sóc sức khỏe nhi khoa tốt nhất cho các bé trong hệ sinh thái.',
    category: 'Sự kiện',
    date: '2026-05-18T14:30:00',
  },
  {
    title: 'Hệ thống giáo dục Iruka Edu khai xuân rực rỡ với chuỗi hoạt động trải nghiệm',
    content: `<h2>Chuỗi ngày hội trải nghiệm giáo dục sớm thu hút hàng ngàn gia đình</h2>
<p>Hệ thống mầm non và trung tâm phát triển kỹ năng Iruka Edu đã chào xuân mới bằng chuỗi ngày hội trải nghiệm đa giác quan "Ươm mầm tương lai" trên toàn hệ thống.</p>
<p>Tại ngày hội, các em bé được hòa mình vào không gian sáng tạo nghệ thuật, phát triển tư duy logic toán học qua các trò chơi tương tác hiện đại và nhận các phần quà xinh xắn đầu năm.</p>`,
    excerpt: 'Hàng ngàn gia đình hào hứng tham gia chuỗi hoạt động phát triển kỹ năng, tư duy nghệ thuật và toán học chất lượng cao.',
    category: 'Sự kiện',
    date: '2026-05-17T09:15:00',
  },

  // --- 5 BÀI DINH DƯỠNG ---
  {
    title: 'Bí quyết giúp trẻ tăng cân tự nhiên không lo táo bón',
    content: '<p>Làm thế nào để trẻ tăng cân đều đặn nhưng hệ tiêu hóa vẫn khỏe mạnh? Bài viết này tổng hợp lời khuyên từ các bác sĩ dinh dưỡng đầu ngành về việc cân đối hàm lượng chất xơ hòa tan kết hợp cùng các acid amin thiết yếu trong chế độ ăn hàng ngày của bé.</p>',
    excerpt: 'Tổng hợp các mẹo nhỏ cực kỳ hiệu quả giúp cân đối thực đơn ăn dặm giàu xơ và dinh dưỡng lành mạnh cho hệ tiêu hóa trẻ.',
    category: 'Dinh dưỡng & tiêu hóa',
    date: '2026-05-16T10:00:00',
  },
  {
    title: 'Thực đơn ăn dặm giàu dưỡng chất hỗ trợ đường ruột non nớt của bé',
    content: '<p>Bước vào giai đoạn ăn dặm, hệ tiêu hóa của bé vẫn còn rất non nớt. Việc xây dựng thực đơn cần được tính toán chi li, đa dạng hóa các nguồn đạm dễ tiêu và bổ sung chất xơ FOS tự nhiên giúp bé hấp thu trọn vẹn dinh dưỡng mà không bị đầy hơi, khó tiêu.</p>',
    excerpt: 'Phương pháp xây dựng thực đơn ăn dặm khoa học giúp bổ sung đầy đủ vitamin và kích thích hệ tiêu hóa non nớt hoạt động trơn tru.',
    category: 'Dinh dưỡng & tiêu hóa',
    date: '2026-05-15T15:45:00',
  },
  {
    title: 'Tầm quan trọng của lợi khuẩn probiotics đối với hệ tiêu hóa khỏe mạnh',
    content: '<p>Hệ vi sinh đường ruột đóng vai trò quyết định đến 70% hệ miễn dịch của bé. Bổ sung đúng loại lợi khuẩn giúp ức chế hại khuẩn, ngăn ngừa rối loạn tiêu hóa, kích thích thành ruột hấp thu tối đa dưỡng chất, tạo đà cho bé tăng cân đều đặn.</p>',
    excerpt: 'Tăng cường sức đề kháng và cải thiện hệ hấp thu của trẻ nhỏ thông qua việc bổ sung probiotics khoa học mỗi ngày.',
    category: 'Dinh dưỡng & tiêu hóa',
    date: '2026-05-14T08:30:00',
  },
  {
    title: 'Sữa non thảo dược - Giải pháp đột phá giúp trẻ hấp thu dinh dưỡng tối đa',
    content: '<p>Sự kết hợp hoàn hảo giữa sữa non chất lượng cao nhập khẩu và chiết xuất thảo dược thiên nhiên như chùm ngây, giúp cung cấp hàng rào miễn dịch tự nhiên dồi dào, đồng thời tái tạo các lông mao đường ruột để trẻ thèm ăn tự nhiên và tăng cân khỏe mạnh.</p>',
    excerpt: 'Ứng dụng dinh dưỡng đột phá mới từ thảo dược thiên nhiên và sữa non nâng cao sức khỏe đường ruột cho bé.',
    category: 'Dinh dưỡng & tiêu hóa',
    date: '2026-05-13T11:00:00',
  },
  {
    title: 'Mẹo bổ sung Kẽm và chất xơ tự nhiên giúp bé hết biếng ăn',
    content: '<p>Thiếu hụt vi chất dinh dưỡng, đặc biệt là kẽm, là nguyên nhân hàng đầu khiến bé mất cảm giác ngon miệng. Kết hợp kẽm cùng chất xơ hòa tan FOS giúp kích hoạt các gai vị giác, đồng thời làm mềm phân, ngừa táo bón triệt để cho bé luôn vui khỏe.</p>',
    excerpt: 'Giải pháp khắc phục triệt để tình trạng biếng ăn kéo dài ở trẻ nhỏ bằng phương pháp cân đối vi chất tự nhiên.',
    category: 'Dinh dưỡng & tiêu hóa',
    date: '2026-05-12T09:00:00',
  },

  // --- 5 BÀI SỨC KHỎE ---
  {
    title: 'Bí quyết bảo vệ răng miệng cho bé từ những chiếc răng đầu tiên',
    content: '<p>Chăm sóc răng miệng ngay từ khi bé mới nhú những chiếc răng sữa đầu tiên là nền tảng cho một nụ cười rạng rỡ và chắc khỏe sau này. Hướng dẫn cách rơ lưỡi đúng cách, lựa chọn bàn chải lông siêu mềm và kem đánh răng nuốt được an toàn cho bé.</p>',
    excerpt: 'Phương pháp bảo vệ nướu và men răng sữa khỏe mạnh cho trẻ nhỏ từ giai đoạn nhũ nhi cực kỳ hiệu quả.',
    category: 'Sức khỏe & vệ sinh',
    date: '2026-05-11T16:20:00',
  },
  {
    title: 'Nguyên tắc tắm và vệ sinh cho bé sơ sinh an toàn chuẩn y khoa',
    content: '<p>Tắm bé sơ sinh đòi hỏi sự cẩn thận tuyệt đối để tránh nhiễm trùng rốn và làm khô làn da nhạy cảm của con. Hướng dẫn chi tiết từng bước chuẩn bị phòng kín gió, nhiệt độ nước tiêu chuẩn, cách nâng đỡ bé an toàn và lau khô đúng cách.</p>',
    excerpt: 'Quy trình tắm và chăm sóc rốn đúng chuẩn y tế giúp bảo vệ làn da non nớt của bé sơ sinh.',
    category: 'Sức khỏe & vệ sinh',
    date: '2026-05-10T14:30:00',
  },
  {
    title: 'Mẹo phòng ngừa rôm sảy và các bệnh ngoài da cho trẻ ngày nắng nóng',
    content: '<p>Thời tiết oi bức dễ làm tuyến mồ hôi của trẻ bị tắc nghẽn, dẫn đến rôm sảy, mẩn ngứa và hăm da. Cùng tìm hiểu các dòng sữa tắm thảo dược tự nhiên lành tính giúp làm dịu da nhanh chóng, giữ da bé luôn khô thoáng và kháng khuẩn nhẹ nhàng.</p>',
    excerpt: 'Phương pháp bảo vệ làn da nhạy cảm của bé khỏi rôm sảy, dị ứng và mẩn ngứa trong thời tiết mùa hè.',
    category: 'Sức khỏe & vệ sinh',
    date: '2026-05-09T10:15:00',
  },
  {
    title: 'Hướng dẫn xây dựng thói quen rửa tay sạch khuẩn bảo vệ sức khỏe bé',
    content: '<p>Bàn tay là con đường lây truyền virus phổ biến nhất ở trẻ nhỏ. Tạo thói quen rửa tay bằng xà phòng dịu nhẹ trước khi ăn và sau khi đi vệ sinh, hướng dẫn bé các bước rửa tay sạch khuẩn toàn diện giúp ngăn ngừa các bệnh truyền nhiễm nguy hiểm.</p>',
    excerpt: 'Cách dạy bé rửa tay vui vẻ, đúng cách giúp tiêu diệt vi khuẩn gây bệnh và duy trì thói quen vệ sinh sạch sẽ.',
    category: 'Sức khỏe & vệ sinh',
    date: '2026-05-08T09:00:00',
  },
  {
    title: 'Chăm sóc hệ hô hấp và vệ sinh mũi họng đúng cách lúc giao mùa',
    content: '<p>Khi thời tiết chuyển mùa, hệ hô hấp của trẻ rất dễ bị tấn công bởi virus. Hướng dẫn cách sử dụng nước muối sinh lý vệ sinh mũi nhẹ nhàng, duy trì độ ẩm phòng ngủ lý tưởng và bổ sung các vitamin thiết yếu để tăng đề kháng hô hấp toàn diện.</p>',
    excerpt: 'Các nguyên tắc cốt lõi giúp giữ ấm cổ họng và vệ sinh đường thở thông thoáng cho bé khi giao mùa.',
    category: 'Sức khỏe & vệ sinh',
    date: '2026-05-07T08:00:00',
  },
];

// ============= HÀM CHÍNH =============

// Bộ nhớ lưu ID danh mục đã tạo (tránh tạo trùng)
const categoryCache = {};

/**
 * Tìm hoặc tạo danh mục trên WordPress
 */
async function getOrCreateCategory(name) {
  // Nếu đã tìm rồi thì lấy từ bộ nhớ
  if (categoryCache[name]) return categoryCache[name];

  try {
    // Bước 1: Tìm xem danh mục đã tồn tại chưa
    const searchRes = await fetch(`${WP_URL}/categories?search=${encodeURIComponent(name)}&per_page=100`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    const existing = await searchRes.json();

    if (existing.length > 0) {
      categoryCache[name] = existing[0].id;
      console.log(`  📂 Danh mục "${name}" đã có (ID: ${existing[0].id})`);
      return existing[0].id;
    }

    // Bước 2: Nếu chưa có thì tạo mới
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
    return 1; // Trả về danh mục mặc định (Uncategorized)
  }
}

/**
 * Tạo 1 bài viết trên WordPress
 */
async function createPost(post, index) {
  try {
    const categoryId = await getOrCreateCategory(post.category);

    const res = await fetch(`${WP_URL}/posts`, {
      method: 'POST',
      headers: {
        'Authorization': AUTH_HEADER,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: post.title,
        content: post.content,
        excerpt: post.excerpt,
        status: 'publish',
        date: post.date,
        categories: [categoryId],
      }),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || `HTTP ${res.status}`);
    }

    const created = await res.json();
    console.log(`✅ [${index + 1}/${POSTS.length}] "${post.title}" → ID: ${created.id}`);
    return created;
  } catch (error) {
    console.error(`❌ [${index + 1}/${POSTS.length}] "${post.title}" → Lỗi: ${error.message}`);
    return null;
  }
}

/**
 * Chạy script chính
 */
async function main() {
  console.log('');
  console.log('🚀 BẮT ĐẦU ĐẨY BÀI VIẾT LÊN WORDPRESS');
  console.log(`📊 Tổng số bài: ${POSTS.length}`);
  console.log(`🌐 WordPress: ${WP_URL}`);
  console.log(`👤 Tài khoản: ${WP_USERNAME}`);
  console.log('─'.repeat(60));

  // Kiểm tra kết nối trước
  try {
    const testRes = await fetch(`${WP_URL}/posts?per_page=1`, {
      headers: { 'Authorization': AUTH_HEADER },
    });
    if (!testRes.ok) throw new Error(`HTTP ${testRes.status}`);
    console.log('✅ Kết nối WordPress thành công!\n');
  } catch (error) {
    console.error('❌ Không kết nối được WordPress! Kiểm tra lại LocalWP đã bật chưa.');
    console.error('   Lỗi:', error.message);
    process.exit(1);
  }

  // Đẩy từng bài
  let success = 0;
  let failed = 0;

  for (let i = 0; i < POSTS.length; i++) {
    const result = await createPost(POSTS[i], i);
    if (result) success++;
    else failed++;

    // Nghỉ 500ms giữa mỗi bài để không quá tải server
    await new Promise(r => setTimeout(r, 500));
  }

  // Báo cáo kết quả
  console.log('\n' + '─'.repeat(60));
  console.log('📊 KẾT QUẢ:');
  console.log(`   ✅ Thành công: ${success}/${POSTS.length} bài`);
  if (failed > 0) console.log(`   ❌ Thất bại: ${failed} bài`);
  console.log('\n🎉 XONG! Vào WordPress kiểm tra lại nhé anh!');
  console.log(`   👉 http://lifestyleadminvn.local/wp-admin/edit.php`);
}

main();
