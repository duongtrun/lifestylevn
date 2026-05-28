// File này: Các hàm gọi API từ WordPress
// Vai trò: Lấy dữ liệu bài viết, danh mục từ LocalWP backend, tích hợp dữ liệu giả lập cao cấp làm phương án dự phòng (fallback) khi máy chủ WordPress ngoại tuyến.
// Dùng khi: Cần fetch data hiển thị ra màn hình trang danh sách và trang chi tiết Tin tức.

const RAW_WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL || 'http://localhost:10004/wp-json';

// Cấu hình thời gian kết nối (Timeout) thông minh theo môi trường:
// - Khi ở local/dev: chỉ chờ 2 giây (2000ms) để tải cực nhanh và tránh bị treo khi localWP tắt.
// - Khi ở production/build (Vercel): chờ 20 giây (20000ms) để đảm bảo kết nối qua internet ổn định không bị lỗi ABORT_ERR.
const API_TIMEOUT = process.env.NODE_ENV === 'development' ? 2000 : 20000;

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
  } else {
    // Nếu URL không chứa basic auth, kiểm tra biến môi trường độc lập
    const username = process.env.WP_AUTH_USERNAME;
    const appPassword = process.env.WP_AUTH_APPLICATION_PASSWORD;
    if (username && appPassword) {
      const authString = `${username}:${appPassword}`;
      FETCH_HEADERS['Authorization'] = `Basic ${typeof btoa !== 'undefined' ? btoa(authString) : Buffer.from(authString).toString('base64')}`;
    }
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
  acf?: {
    title?: string;
    noi_dung_chinh?: string;
    anh?: string;
    nguoi_dang_bai?: string;
    [key: string]: any;
  };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id?: number;
      name: string;
      slug: string;
      taxonomy: string;
    }>>;
  };
}

const CATEGORY_DEFAULT_IMAGES: Record<string, string[]> = {
  // Mỗi danh mục có nhiều ảnh, hệ thống sẽ xoay vòng để bài không bị trùng ảnh
  'su-kien': ['/images/hot_news_img.webp', '/img_news/edu_img.svg', '/img_news/suc_khoe.svg'],
  'dinh-duong-tieu-hoa': ['/img_news/dinh_duong_tieu_hoa.webp', '/img_news/dinh_duong_tieu_hoa_2.webp', '/img_news/dinh_duong_tieu_hoa_3.webp'],
  'suc-khoe-ve-sinh': ['/img_news/suc_khoe.svg', '/img_news/suc_khoe_2.svg', '/img_news/suc_khoe_3.svg'],
  'giao-duc': ['/img_news/edu_img.svg', '/images/hot_news_img.webp'],
};
const DEFAULT_IMAGE = '/img_news/edu_img.svg';

function enrichPostWithFallbackImage(post: WPPost, index: number = 0): WPPost {
  // 1. Ưu tiên hàng đầu: Nếu bài viết có trường ảnh tùy biến từ ACF và đó là link ảnh hợp lệ, dùng làm ảnh đại diện chính
  const acfImage = post.acf?.anh;
  const isRawImageUrl = (text: string | undefined): boolean => {
    if (!text) return false;
    const trimmed = text.trim();
    if (trimmed.includes('<') || trimmed.includes('>')) return false;
    return /^(https?:\/\/|\/|wp-content\/).*\.(png|jpg|jpeg|gif|webp|svg)(?:\?.*)?$/i.test(trimmed) 
      || (trimmed.startsWith('http') && !trimmed.includes(' '));
  };

  if (acfImage && isRawImageUrl(acfImage)) {
    return {
      ...post,
      _embedded: {
        ...post._embedded,
        'wp:featuredmedia': [{ source_url: acfImage.trim(), alt_text: post.title.rendered }],
      },
    };
  }

  // 2. Ưu tiên hai: Nếu bài đã có ảnh Featured Media được gán trực tiếp từ admin WordPress thì giữ nguyên
  const hasImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  if (hasImage) return post;

  // 3. Dự phòng cuối cùng: Chọn ảnh mặc định theo danh mục (xoay vòng)
  const categorySlug = post._embedded?.['wp:term']?.[0]?.[0]?.slug || '';
  const images = CATEGORY_DEFAULT_IMAGES[categorySlug] || [DEFAULT_IMAGE];
  const selectedImage = images[index % images.length];

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
    [key: string]: string | undefined;
  };
}

/**
 * Lấy danh sách bài viết mới nhất
 */
export async function getPosts(limit: number = 9, categoryId?: number): Promise<WPPost[]> {
  const url = categoryId
    ? `${WP_API_URL}/wp/v2/posts?_embed=true&per_page=${limit}&categories=${categoryId}`
    : `${WP_API_URL}/wp/v2/posts?_embed=true&per_page=${limit}`;

  console.log(`[WP-API] getPosts calling URL: ${url}`);
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      // Revalidate mỗi 60 giây (ISR — tự động làm mới dữ liệu)
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(API_TIMEOUT) // Tự động ngắt kết nối theo thời gian cấu hình tùy môi trường
    });
    
    if (!res.ok) {
      throw new Error(`Lỗi gọi API: ${res.status}`);
    }
    
    const posts: WPPost[] = await res.json();
    
    if (!posts || posts.length === 0) {
      return [];
    }
    
    // Gắn ảnh mặc định cho bài chưa có ảnh đại diện (theo danh mục)
    return posts.map((post, index) => enrichPostWithFallbackImage(post, index));
  } catch (error) {
    console.warn(`Kết nối WordPress thất bại cho URL: ${WP_API_URL}:`, error);
    return [];
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
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!res.ok) {
      throw new Error(`Lỗi gọi API: ${res.status}`);
    }

    const posts: WPPost[] = await res.json();
    
    if (posts && posts.length > 0) {
      // Gắn ảnh mặc định nếu bài chưa có ảnh đại diện
      return enrichPostWithFallbackImage(posts[0]);
    }
    
    return null;
  } catch (error) {
    console.warn(`Lấy chi tiết thất bại cho URL: ${WP_API_URL} cho slug: ${slug}:`, error);
    return null;
  }
}

export const MOCK_JOBS: WPJob[] = [];

/**
 * Lấy danh sách việc làm (Tuyển dụng)
 */
export async function getJobs(limit: number = 10): Promise<WPJob[]> {
  console.log(`[WP-API] getJobs calling URL: ${WP_API_URL}/wp/v2/tuyen_dung?per_page=${limit}`);
  try {
    const res = await fetch(`${WP_API_URL}/wp/v2/tuyen_dung?per_page=${limit}`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });
    
    if (!res.ok) {
      throw new Error(`Lỗi gọi API Jobs: ${res.status}`);
    }
    
    const jobs: WPJob[] = await res.json();
    
    if (!jobs || jobs.length === 0) {
      return [];
    }
    
    return jobs;
  } catch (error) {
    console.warn(`Kết nối WP thất bại cho URL: ${WP_API_URL}:`, error);
    return [];
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
      signal: AbortSignal.timeout(API_TIMEOUT)
    });

    if (!res.ok) {
      throw new Error(`Lỗi gọi API Job Detail: ${res.status}`);
    }

    const jobs: WPJob[] = await res.json();
    
    if (jobs && jobs.length > 0) {
      return jobs[0];
    }
    
    return null;
  } catch (error) {
    console.warn(`Lấy chi tiết Job thất bại cho URL: ${WP_API_URL} cho slug: ${slug}:`, error);
    return null;
  }
}

export const MOCK_ACHIEVEMENTS: WPPost[] = [];

/**
 * Lấy danh sách bài viết theo slug danh mục (Dùng cho phần Thành tựu đạt được)
 */
export async function getPostsByCategorySlug(slug: string, limit: number = 5): Promise<WPPost[]> {
  console.log(`[WP-API] getPostsByCategorySlug calling URL: ${WP_API_URL}/wp/v2/categories?slug=${slug}`);
  try {
    const catRes = await fetch(`${WP_API_URL}/wp/v2/categories?slug=${slug}`, {
      headers: FETCH_HEADERS,
      next: { revalidate: 60 },
      signal: AbortSignal.timeout(API_TIMEOUT)
    });
    
    if (!catRes.ok) {
      throw new Error(`Lỗi gọi API Categories: ${catRes.status}`);
    }
    
    const categories = await catRes.json();
    
    if (categories && categories.length > 0) {
      const categoryId = categories[0].id;
      return await getPosts(limit, categoryId);
    }
    
    throw new Error(`Không tìm thấy danh mục với slug: ${slug}`);
  } catch (error) {
    console.warn(`Lấy bài viết theo category slug thất bại cho slug: ${slug}:`, error);
    return [];
  }
}
