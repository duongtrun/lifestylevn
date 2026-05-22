// File này: Các hàm gọi API từ WordPress
// Vai trò: Lấy dữ liệu bài viết, danh mục từ LocalWP backend, tích hợp dữ liệu giả lập cao cấp làm phương án dự phòng (fallback) khi máy chủ WordPress ngoại tuyến.
// Dùng khi: Cần fetch data hiển thị ra màn hình trang danh sách và trang chi tiết Tin tức.

const RAW_WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';

let WP_API_URL = RAW_WP_API_URL;
const FETCH_HEADERS: HeadersInit = {
  'Bypass-Tunnel-Reminder': 'true',
};

// Sửa lỗi TypeError của Node Fetch khi URL chứa mật khẩu (như Live Link của LocalWP)
try {
  const parsedUrl = new URL(RAW_WP_API_URL);
  if (parsedUrl.username || parsedUrl.password) {
    const authString = `${parsedUrl.username}:${parsedUrl.password}`;
    FETCH_HEADERS['Authorization'] = `Basic ${typeof btoa !== 'undefined' ? btoa(authString) : Buffer.from(authString).toString('base64')}`;
    parsedUrl.username = '';
    parsedUrl.password = '';
    WP_API_URL = parsedUrl.toString().replace(/\/$/, '');
  }
} catch (e) {
  // Bỏ qua nếu parse lỗi
}

/**
 * Hàm tiện ích giúp các Server Actions tự động làm sạch URL và trích xuất header Authorization (nếu URL chứa basic auth)
 */
export function getWpRequestDetails(customUrl?: string) {
  const rawUrl = customUrl || process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';
  let cleanUrl = rawUrl;
  const headers: Record<string, string> = {
    'Bypass-Tunnel-Reminder': 'true', // Bỏ qua màn hình cảnh báo của Localtunnel
  };
  
  try {
    const parsedUrl = new URL(rawUrl);
    if (parsedUrl.username || parsedUrl.password) {
      const authString = `${parsedUrl.username}:${parsedUrl.password}`;
      headers['Authorization'] = `Basic ${typeof btoa !== 'undefined' ? btoa(authString) : Buffer.from(authString).toString('base64')}`;
      parsedUrl.username = '';
      parsedUrl.password = '';
      cleanUrl = parsedUrl.toString().replace(/\/$/, '');
    }
  } catch (e) {
    // Bỏ qua
  }
  
  return { url: cleanUrl, headers };
}

// Domain nội bộ mà WordPress tự gắn vào URL ảnh
const WP_INTERNAL_ORIGIN = 'http://lifestyleadminvn.local';

// Tự động phân tích và lấy domain thực tế từ đường dẫn API được cấu hình
const getPublicOrigin = (): string => {
  try {
    const parsedUrl = new URL(WP_API_URL);
    return parsedUrl.origin;
  } catch (error) {
    return 'http://localhost:10004';
  }
};
const WP_PUBLIC_ORIGIN = getPublicOrigin();

export function fixImageUrl(url: string | undefined): string {
  if (!url) return '';
  
  // Nếu là ảnh nội bộ (mock data) bắt đầu bằng dấu / thì giữ nguyên
  if (url.startsWith('/')) {
    return url;
  }
  
  const wpContentIndex = url.indexOf('/wp-content/');
  if (wpContentIndex !== -1) {
    return WP_PUBLIC_ORIGIN + url.substring(wpContentIndex);
  }
  
  return url;
}

/**
 * Giải mã các ký tự đặc biệt mà WordPress trả về dưới dạng mã HTML
 * Ví dụ: &#038; → &, &#8217; → ', &amp; → &
 */
export function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"');
}

export interface WPPost {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

/**
 * Bản đồ ảnh mặc định theo danh mục
 * Khi bài viết từ WordPress chưa có ảnh đại diện, hệ thống tự gán ảnh dựa vào danh mục
 */
const CATEGORY_DEFAULT_IMAGES: Record<string, string[]> = {
  // Mỗi danh mục có nhiều ảnh, hệ thống sẽ xoay vòng để bài không bị trùng ảnh
  'su-kien': ['/images/hot_news_img.webp', '/img_news/edu_img.svg', '/img_news/suc_khoe.svg'],
  'dinh-duong-tieu-hoa': ['/img_news/dinh_duong_tieu_hoa.svg', '/img_news/dinh_duong_tieu_hoa_2.svg', '/img_news/dinh_duong_tieu_hoa_3.svg'],
  'suc-khoe-ve-sinh': ['/img_news/suc_khoe.svg', '/img_news/suc_khoe_2.svg', '/img_news/suc_khoe_3.svg'],
};
const DEFAULT_IMAGE = '/img_news/edu_img.svg';

/**
 * Gán ảnh mặc định cho bài viết từ WordPress nếu chưa có ảnh đại diện
 * Ảnh được chọn theo danh mục của bài, xoay vòng để không bị trùng
 */
function enrichPostWithFallbackImage(post: WPPost, index: number = 0): WPPost {
  // Nếu bài đã có ảnh từ WordPress thì giữ nguyên
  const hasImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (hasImage) return post;

  // Tìm danh mục (slug) của bài viết
  const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || '';
  const images = CATEGORY_DEFAULT_IMAGES[categorySlug] || [DEFAULT_IMAGE];
  // Xoay vòng ảnh theo thứ tự bài (bài 1 → ảnh 1, bài 2 → ảnh 2, bài 3 → ảnh 3, bài 4 → ảnh 1...)
  const selectedImage = images[index % images.length];

  // Gắn ảnh vào đúng cấu trúc _embedded để các component hiển thị được
  return {
    ...post,
    _embedded: {
      ...post._embedded,
      'wp:featuredmedia': [{ source_url: selectedImage, alt_text: post.title.rendered }],
    },
  };
}

export interface WPJob {
  id: number;
  date: string;
  slug: string;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  acf?: {
    // Tên trường mặc định không dấu (trường hợp tốt nhất)
    muc_luong?: string;
    dia_diem?: string;
    kinh_nghiem?: string;
    han_nop_ho_so?: string;
    // Tên trường bị dính dấu tiếng Việt do người dùng tạo
    'mức_lương'?: string;
    'địa_điểm_'?: string;
    'kinh_nghiệm'?: string;
    'hạn_nộp_hồ_sơ'?: string;
    'mô_tả_công_việc_jd'?: string;
    'yêu_cầu_ứng_viên'?: string;
    'quyền_lợi'?: string;
  };
}

// ================= HỆ THỐNG DỮ LIỆU GIẢ LẬP CAO CẤP PHÒNG NGỪA (FALLBACK MOCK DATA) =================
// Dùng để hiển thị giao diện lung linh lập tức kể cả khi máy chủ LocalWP của anh Đào đang tắt.
export const MOCK_POSTS: WPPost[] = [
  // ================= 3 BÀI SỰ KIỆN NỔI BẬT =================
  {
    id: 991,
    date: '2026-05-19T08:00:00',
    slug: 'hoi-thao-babego-cong-nghe-nano-hoa-ky',
    title: { rendered: 'Babego - Ứng dụng công nghệ Nano Hoa Kỳ chiết xuất thảo dược chùm ngây' },
    content: { rendered: `
      <h2>Lễ ra mắt dòng sản phẩm dinh dưỡng chùm ngây cao cấp</h2>
      <p>Sự kiện đã diễn ra vô cùng thành công với sự tham gia của hơn 500 gia đình và các chuyên gia y tế, dinh dưỡng hàng đầu. Tại buổi hội thảo, các bác sĩ đã chia sẻ những kiến thức vô cùng bổ ích về tầm quan trọng của dinh dưỡng đối với trẻ nhỏ.</p>
      <p>Công nghệ Nano Hoa Kỳ giúp phân tách các chất dinh dưỡng từ chùm ngây thành các phân tử siêu nhỏ, giúp cơ thể trẻ hấp thụ tối đa chất dinh dưỡng gấp 300 lần bình thường. Đây là giải pháp đột phá giúp bé ăn ngon miệng, ngừa táo bón và tăng cân khoa học tự nhiên.</p>
      <blockquote>Dinh dưỡng khoa học là nền tảng vững chắc để trẻ tự do khám phá và phát triển toàn diện cả thể chất lẫn trí tuệ.</blockquote>
    ` },
    excerpt: { rendered: 'Hội thảo dinh dưỡng giới thiệu giải pháp đột phá từ chùm ngây giúp trẻ hấp thụ tối đa dưỡng chất, ngừa táo bón và tăng cân tự nhiên khỏe mạnh.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/images/hot_news_img.webp', alt_text: 'Hội thảo Babego' }],
      'wp:term': [[{ name: 'Sự kiện', slug: 'su-kien', taxonomy: 'category' }]]
    }
  },
  {
    id: 992,
    date: '2026-05-18T14:30:00',
    slug: 'lifestyle-hop-tap-chien-luoc-y-te-toan-dien',
    title: { rendered: 'Lifestyle Việt Nam công bố hợp tác chiến lược y tế toàn diện cùng Iruka Care' },
    content: { rendered: `
      <h2>Cột mốc phát triển mới của hệ sinh thái chăm sóc sức khỏe Mẹ & Bé</h2>
      <p>Nhằm đem lại dịch vụ tư vấn y tế chất lượng cao, Lifestyle Việt Nam chính thức công bố ký kết thỏa thuận hợp tác chiến lược toàn diện cùng chuỗi trung tâm chăm sóc sức khỏe Iruka Care.</p>
      <p>Thông qua hợp tác này, toàn bộ khách hàng của hệ sinh thái Lifestyle sẽ nhận được sự hỗ trợ y tế 24/7 trực tiếp từ đội ngũ bác sĩ nhi khoa đầu ngành của Iruka Care, nâng niu sự phát triển toàn diện của mỗi em bé.</p>
    ` },
    excerpt: { rendered: 'Ký kết thỏa thuận hợp tác chiến lược mở ra chương mới giúp chăm sóc sức khỏe nhi khoa tốt nhất cho các bé trong hệ sinh thái.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe.svg', alt_text: 'Hợp tác y tế' }],
      'wp:term': [[{ name: 'Sự kiện', slug: 'su-kien', taxonomy: 'category' }]]
    }
  },
  {
    id: 993,
    date: '2026-05-17T09:15:00',
    slug: 'iruka-edu-khai-xuan-ruc-ro-chuoi-hoat-dong',
    title: { rendered: 'Hệ thống giáo dục Iruka Edu khai xuân rực rỡ với chuỗi hoạt động trải nghiệm' },
    content: { rendered: `
      <h2>Chuỗi ngày hội trải nghiệm giáo dục sớm thu hút hàng ngàn gia đình</h2>
      <p>Hệ thống mầm non và trung tâm phát triển kỹ năng Iruka Edu đã chào xuân mới bằng chuỗi ngày hội trải nghiệm đa giác quan "Ươm mầm tương lai" trên toàn hệ thống.</p>
      <p>Tại ngày hội, các em bé được hòa mình vào không gian sáng tạo nghệ thuật, phát triển tư duy logic toán học qua các trò chơi tương tác hiện đại và nhận các phần quà xinh xắn đầu năm.</p>
    ` },
    excerpt: { rendered: 'Hàng ngàn gia đình hào hứng tham gia chuỗi hoạt động phát triển kỹ năng, tư duy nghệ thuật và toán học chất lượng cao.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/edu_img.svg', alt_text: 'Ngày hội Iruka Edu' }],
      'wp:term': [[{ name: 'Sự kiện', slug: 'su-kien', taxonomy: 'category' }]]
    }
  },

  // ================= 5 BÀI DINH DƯỠNG & TIÊU HÓA =================
  {
    id: 1001,
    date: '2026-05-16T10:00:00',
    slug: 'bi-quyet-giup-tre-tang-can-tu-nhien-khong-tao-bon',
    title: { rendered: 'Bí quyết giúp trẻ tăng cân tự nhiên không lo táo bón' },
    content: { rendered: '<p>Làm thế nào để trẻ tăng cân đều đặn nhưng hệ tiêu hóa vẫn khỏe mạnh? Bài viết này tổng hợp lời khuyên từ các bác sĩ dinh dưỡng đầu ngành về việc cân đối hàm lượng chất xơ hòa tan kết hợp cùng các acid amin thiết yếu trong chế độ ăn hàng ngày của bé.</p>' },
    excerpt: { rendered: 'Tổng hợp các mẹo nhỏ cực kỳ hiệu quả giúp cân đối thực đơn ăn dặm giàu xơ và dinh dưỡng lành mạnh cho hệ tiêu hóa trẻ.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/dinh_duong_tieu_hoa.svg', alt_text: 'Dinh dưỡng tiêu hóa' }],
      'wp:term': [[{ name: 'Dinh dưỡng & tiêu hóa', slug: 'dinh-duong-tieu-hoa', taxonomy: 'category' }]]
    }
  },
  {
    id: 1002,
    date: '2026-05-15T15:45:00',
    slug: 'thuc-don-an-dam-dinh-duong-khoa-hoc',
    title: { rendered: 'Thực đơn ăn dặm giàu dưỡng chất hỗ trợ đường ruột non nớt của bé' },
    content: { rendered: '<p>Bước vào giai đoạn ăn dặm, hệ tiêu hóa của bé vẫn còn rất non nớt. Việc xây dựng thực đơn cần được tính toán chi li, đa dạng hóa các nguồn đạm dễ tiêu và bổ sung chất xơ FOS tự nhiên giúp bé hấp thu trọn vẹn dinh dưỡng mà không bị đầy hơi, khó tiêu.</p>' },
    excerpt: { rendered: 'Phương pháp xây dựng thực đơn ăn dặm khoa học giúp bổ sung đầy đủ vitamin và kích thích hệ tiêu hóa non nớt hoạt động trơn tru.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/dinh_duong_tieu_hoa_2.svg', alt_text: 'Thực đơn ăn dặm khoa học' }],
      'wp:term': [[{ name: 'Dinh dưỡng & tiêu hóa', slug: 'dinh-duong-tieu-hoa', taxonomy: 'category' }]]
    }
  },
  {
    id: 1003,
    date: '2026-05-14T08:30:00',
    slug: 'vai-tro-cua-loi-khuan-doi-voi-tieu-hoa-cua-be',
    title: { rendered: 'Tầm quan trọng của lợi khuẩn probiotics đối với hệ tiêu hóa khỏe mạnh' },
    content: { rendered: '<p>Hệ vi sinh đường ruột đóng vai trò quyết định đến 70% hệ miễn dịch của bé. Bổ sung đúng loại lợi khuẩn giúp ức chế hại khuẩn, ngăn ngừa rối loạn tiêu hóa, kích thích thành ruột hấp thu tối đa dưỡng chất, tạo đà cho bé tăng cân đều đặn.</p>' },
    excerpt: { rendered: 'Tăng cường sức đề kháng và cải thiện hệ hấp thu của trẻ nhỏ thông qua việc bổ sung probiotics khoa học mỗi ngày.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/dinh_duong_tieu_hoa_3.svg', alt_text: 'Bổ sung lợi khuẩn' }],
      'wp:term': [[{ name: 'Dinh dưỡng & tiêu hóa', slug: 'dinh-duong-tieu-hoa', taxonomy: 'category' }]]
    }
  },
  {
    id: 1004,
    date: '2026-05-13T11:00:00',
    slug: 'sua-non-thao-duoc-giai-phap-dinh-duong-toan-dien',
    title: { rendered: 'Sữa non thảo dược - Giải pháp đột phá giúp trẻ hấp thu dinh dưỡng tối đa' },
    content: { rendered: '<p>Sự kết hợp hoàn hảo giữa sữa non chất lượng cao nhập khẩu và chiết xuất thảo dược thiên nhiên như chùm ngây, giúp cung cấp hàng rào miễn dịch tự nhiên dồi dào, đồng thời tái tạo các lông mao đường ruột để trẻ thèm ăn tự nhiên và tăng cân khỏe mạnh.</p>' },
    excerpt: { rendered: 'Ứng dụng dinh dưỡng đột phá mới từ thảo dược thiên nhiên và sữa non nâng cao sức khỏe đường ruột cho bé.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/dinh_duong_tieu_hoa.svg', alt_text: 'Dinh dưỡng thảo dược' }],
      'wp:term': [[{ name: 'Dinh dưỡng & tiêu hóa', slug: 'dinh-duong-tieu-hoa', taxonomy: 'category' }]]
    }
  },
  {
    id: 1005,
    date: '2026-05-12T09:00:00',
    slug: 'bo-sung-kem-va-khoang-chat-dung-cach-cho-tre',
    title: { rendered: 'Mẹo bổ sung Kẽm và chất xơ tự nhiên giúp bé hết biếng ăn' },
    content: { rendered: '<p>Thiếu hụt vi chất dinh dưỡng, đặc biệt là kẽm, là nguyên nhân hàng đầu khiến bé mất cảm giác ngon miệng. Kết hợp kẽm cùng chất xơ hòa tan FOS giúp kích hoạt các gai vị giác, đồng thời làm mềm phân, ngừa táo bón triệt để cho bé luôn vui khỏe.</p>' },
    excerpt: { rendered: 'Giải pháp khắc phục triệt để tình trạng biếng ăn kéo dài ở trẻ nhỏ bằng phương pháp cân đối vi chất tự nhiên.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/dinh_duong_tieu_hoa_2.svg', alt_text: 'Bổ sung vi chất' }],
      'wp:term': [[{ name: 'Dinh dưỡng & tiêu hóa', slug: 'dinh-duong-tieu-hoa', taxonomy: 'category' }]]
    }
  },

  // ================= 5 BÀI SỨC KHỎE & VỆ SINH =================
  {
    id: 1011,
    date: '2026-05-11T16:20:00',
    slug: 'bi-quyet-bao-ve-rang-mieng-cho-be-yeu',
    title: { rendered: 'Bí quyết bảo vệ răng miệng cho bé từ những chiếc răng đầu tiên' },
    content: { rendered: '<p>Chăm sóc răng miệng ngay từ khi bé mới nhú những chiếc răng sữa đầu tiên là nền tảng cho một nụ cười rạng rỡ và chắc khỏe sau này. Hướng dẫn cách rơ lưỡi đúng cách, lựa chọn bàn chải lông siêu mềm và kem đánh răng nuốt được an toàn cho bé.</p>' },
    excerpt: { rendered: 'Phương pháp bảo vệ nướu và men răng sữa khỏe mạnh cho trẻ nhỏ từ giai đoạn nhũ nhi cực kỳ hiệu quả.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe.svg', alt_text: 'Bảo vệ răng miệng' }],
      'wp:term': [[{ name: 'Sức khỏe & vệ sinh', slug: 'suc-khoe-ve-sinh', taxonomy: 'category' }]]
    }
  },
  {
    id: 1012,
    date: '2026-05-10T14:30:00',
    slug: 'nguyen-tac-tam-be-so-sinh-an-toan-chuan-y-khoa',
    title: { rendered: 'Nguyên tắc tắm và vệ sinh cho bé sơ sinh an toàn chuẩn y khoa' },
    content: { rendered: '<p>Tắm bé sơ sinh đòi hỏi sự cẩn thận tuyệt đối để tránh nhiễm trùng rốn và làm khô làn da nhạy cảm của con. Hướng dẫn chi tiết từng bước chuẩn bị phòng kín gió, nhiệt độ nước tiêu chuẩn, cách nâng đỡ bé an toàn và lau khô đúng cách.</p>' },
    excerpt: { rendered: 'Quy trình tắm và chăm sóc rốn đúng chuẩn y tế giúp bảo vệ làn da non nớt của bé sơ sinh.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe_2.svg', alt_text: 'Tắm bé sơ sinh' }],
      'wp:term': [[{ name: 'Sức khỏe & vệ sinh', slug: 'suc-khoe-ve-sinh', taxonomy: 'category' }]]
    }
  },
  {
    id: 1013,
    date: '2026-05-09T10:15:00',
    slug: 'phong-tranh-cac-benh-ve-da-cho-tre-khi-troi-nong',
    title: { rendered: 'Mẹo phòng ngừa rôm sảy và các bệnh ngoài da cho trẻ ngày nắng nóng' },
    content: { rendered: '<p>Thời tiết oi bức dễ làm tuyến mồ hôi của trẻ bị tắc nghẽn, dẫn đến rôm sảy, mẩn ngứa và hăm da. Cùng tìm hiểu các dòng sữa tắm thảo dược tự nhiên lành tính giúp làm dịu da nhanh chóng, giữ da bé luôn khô thoáng và kháng khuẩn nhẹ nhàng.</p>' },
    excerpt: { rendered: 'Phương pháp bảo vệ làn da nhạy cảm của bé khỏi rôm sảy, dị ứng và mẩn ngứa trong thời tiết mùa hè.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe_3.svg', alt_text: 'Phòng ngừa rôm sảy' }],
      'wp:term': [[{ name: 'Sức khỏe & vệ sinh', slug: 'suc-khoe-ve-sinh', taxonomy: 'category' }]]
    }
  },
  {
    id: 1014,
    date: '2026-05-08T09:00:00',
    slug: 'huong-dan-rua-tay-dung-cach-cho-be-ngua-vi-khuan',
    title: { rendered: 'Hướng dẫn xây dựng thói quen rửa tay sạch khuẩn bảo vệ sức khỏe bé' },
    content: { rendered: '<p>Bàn tay là con đường lây truyền virus phổ biến nhất ở trẻ nhỏ. Tạo thói quen rửa tay bằng xà phòng dịu nhẹ trước khi ăn và sau khi đi vệ sinh, hướng dẫn bé các bước rửa tay sạch khuẩn toàn diện giúp ngăn ngừa các bệnh truyền nhiễm nguy hiểm.</p>' },
    excerpt: { rendered: 'Cách dạy bé rửa tay vui vẻ, đúng cách giúp tiêu diệt vi khuẩn gây bệnh và duy trì thói quen vệ sinh sạch sẽ.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe.svg', alt_text: 'Rửa tay sạch khuẩn' }],
      'wp:term': [[{ name: 'Sức khỏe & vệ sinh', slug: 'suc-khoe-ve-sinh', taxonomy: 'category' }]]
    }
  },
  {
    id: 1015,
    date: '2026-05-07T08:00:00',
    slug: 'cham-soc-he-ho-hap-cua-tre-trong-thoi-diem-giao-mua',
    title: { rendered: 'Chăm sóc hệ hô hấp và vệ sinh mũi họng đúng cách lúc giao mùa' },
    content: { rendered: '<p>Khi thời tiết chuyển mùa, hệ hô hấp của trẻ rất dễ bị tấn công bởi virus. Hướng dẫn cách sử dụng nước muối sinh lý vệ sinh mũi nhẹ nhàng, duy trì độ ẩm phòng ngủ lý tưởng và bổ sung các vitamin thiết yếu để tăng đề kháng hô hấp toàn diện.</p>' },
    excerpt: { rendered: 'Các nguyên tắc cốt lõi giúp giữ ấm cổ họng và vệ sinh đường thở thông thoáng cho bé khi giao mùa.' },
    _embedded: {
      'wp:featuredmedia': [{ source_url: '/img_news/suc_khoe_2.svg', alt_text: 'Vệ sinh đường hô hấp' }],
      'wp:term': [[{ name: 'Sức khỏe & vệ sinh', slug: 'suc-khoe-ve-sinh', taxonomy: 'category' }]]
    }
  }
];

/**
 * Lấy danh sách bài viết mới nhất
 */
export async function getPosts(limit: number = 9): Promise<WPPost[]> {
  console.log(`[WP-API] getPosts calling URL: ${WP_API_URL}/wp/v2/posts?_embed=true&per_page=${limit}`);
  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/posts?_embed=true&per_page=${limit}`, {
      headers: FETCH_HEADERS,
      // Revalidate mỗi 60 giây (ISR — tự động làm mới dữ liệu)
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000) // Tự động ngắt kết nối sau 4 giây nếu máy chủ không phản hồi
    });
    
    if (!res.ok) {
      throw new Error(`Lỗi gọi API: ${res.status}`);
    }
    
    const posts: WPPost[] = await res.json();
    
    // Nếu API trả về mảng rỗng thì dùng dữ liệu mock để giao diện không bị trống
    if (posts.length === 0) {
      return MOCK_POSTS.slice(0, limit);
    }
    
    // Gắn ảnh mặc định cho bài chưa có ảnh đại diện (theo danh mục)
    return posts.map((post, index) => enrichPostWithFallbackImage(post, index));
  } catch (error) {
    console.warn(`Kết nối WordPress thất bại cho URL: ${WP_API_URL}, tự động kích hoạt chế độ Fallback Mock Data:`, error);
    // Khi máy chủ WordPress offline, trả về mảng dữ liệu mock cực kỳ chuyên nghiệp
    return MOCK_POSTS.slice(0, limit);
  }
}

/**
 * Lấy chi tiết 1 bài viết theo slug
 */
export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  console.log(`[WP-API] getPostBySlug calling URL: ${WP_API_URL}/wp/v2/posts?slug=${slug}&_embed=true`);
  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/posts?slug=${slug}&_embed=true`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000)
    });

    if (!res.ok) {
      throw new Error(`Lỗi gọi API: ${res.status}`);
    }

    const posts: WPPost[] = await res.json();
    
    if (posts.length > 0) {
      // Gắn ảnh mặc định nếu bài chưa có ảnh đại diện
      return enrichPostWithFallbackImage(posts[0]);
    }
    
    // Tìm kiếm trong mảng giả lập nếu API không có kết quả
    const mockPost = MOCK_POSTS.find(p => p.slug === slug);
    return mockPost || null;
  } catch (error) {
    console.warn(`Lấy chi tiết thất bại cho URL: ${WP_API_URL}, tìm kiếm trong Fallback Mock Data cho slug:`, slug, error);
    const mockPost = MOCK_POSTS.find(p => p.slug === slug);
    return mockPost || null;
  }
}

// ================= HỆ THỐNG DỮ LIỆU GIẢ LẬP CAO CẤP PHÒNG NGỪA (MOCK JOBS) =================
export const MOCK_JOBS: WPJob[] = [
  {
    id: 2001,
    date: '2026-05-19T09:00:00',
    slug: 'chuyen-vien-truyen-thong-va-marketing',
    title: { rendered: '[Tuyển dụng] Chuyên viên Truyền thông & Marketing Hệ sinh thái IruKa' },
    content: { rendered: '' }, // Để rỗng để test tính năng fallback sang form ACF
    acf: {
      'mức_lương': '12.000.000 - 18.000.000 VNĐ',
      'địa_điểm_': 'Quận 1, TP. Hồ Chí Minh',
      'kinh_nghiệm': '1 - 2 năm',
      'hạn_nộp_hồ_sơ': '30/06/2026',
      'mô_tả_công_việc_jd': '<ul><li>Tham gia xây dựng và triển khai kế hoạch Marketing tổng thể.</li><li>Quản lý và phát triển nội dung trên Fanpage, Zalo, Tiktok.</li></ul>',
      'yêu_cầu_ứng_viên': '<ul><li>Tốt nghiệp ngành Marketing, Báo chí, Truyền thông.</li><li>Có ít nhất 1 năm kinh nghiệm.</li></ul>',
      'quyền_lợi': '<ul><li>Lương tháng 13 + Thưởng.</li><li>Đóng BHXH đầy đủ.</li></ul>'
    }
  },
  {
    id: 2002,
    date: '2026-05-15T09:00:00',
    slug: 'chuyen-vien-cham-soc-khach-hang',
    title: { rendered: '[Tuyển dụng] Chuyên viên Chăm sóc Khách hàng (CSKH)' },
    content: { rendered: '<h3>MÔ TẢ CÔNG VIỆC</h3><ul><li>Tư vấn và giải đáp thắc mắc cho khách hàng về các sản phẩm dinh dưỡng.</li><li>Chăm sóc khách hàng cũ, hỗ trợ đại lý.</li></ul><h3>YÊU CẦU</h3><ul><li>Giọng nói chuẩn, không nói ngọng, nói lắp.</li><li>Kiên nhẫn, khéo léo.</li></ul>' },
    acf: {
      muc_luong: '8.000.000 - 12.000.000 VNĐ',
      dia_diem: 'Quận 1, TP. Hồ Chí Minh',
      kinh_nghiem: 'Dưới 1 năm',
      han_nop_ho_so: '15/06/2026'
    }
  }
];

/**
 * Lấy danh sách việc làm (Tuyển dụng)
 */
export async function getJobs(limit: number = 10): Promise<WPJob[]> {
  console.log(`[WP-API] getJobs calling URL: ${WP_API_URL}/wp/v2/tuyen_dung?per_page=${limit}`);
  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/tuyen_dung?per_page=${limit}`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000)
    });
    
    if (!res.ok) {
      throw new Error(`Lỗi gọi API Jobs: ${res.status}`);
    }
    
    const jobs: WPJob[] = await res.json();
    
    if (jobs.length === 0) {
      return MOCK_JOBS.slice(0, limit);
    }
    
    return jobs;
  } catch (error) {
    console.warn(`Kết nối WP thất bại cho URL: ${WP_API_URL}, kích hoạt Mock Jobs:`, error);
    return MOCK_JOBS.slice(0, limit);
  }
}

/**
 * Lấy chi tiết 1 công việc theo slug
 */
export async function getJobBySlug(slug: string): Promise<WPJob | null> {
  console.log(`[WP-API] getJobBySlug calling URL: ${WP_API_URL}/wp/v2/tuyen_dung?slug=${slug}`);
  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/tuyen_dung?slug=${slug}`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(4000)
    });

    if (!res.ok) {
      throw new Error(`Lỗi gọi API Job Detail: ${res.status}`);
    }

    const jobs: WPJob[] = await res.json();
    
    if (jobs.length > 0) {
      return jobs[0];
    }
    
    const mockJob = MOCK_JOBS.find(j => j.slug === slug);
    return mockJob || null;
  } catch (error) {
    console.warn(`Lấy chi tiết Job thất bại cho URL: ${WP_API_URL}, dùng Fallback Mock Job:`, slug, error);
    const mockJob = MOCK_JOBS.find(j => j.slug === slug);
    return mockJob || null;
  }
}
