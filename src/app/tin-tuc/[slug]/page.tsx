// File này: Trang chi tiết bài viết tin tức
// Vai trò: Hiển thị toàn bộ nội dung 1 bài viết, ảnh đại diện, ngày đăng, danh mục
// Dùng khi: Người dùng bấm "Đọc tiếp" từ trang danh sách Tin Tức

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getPostBySlug, getPosts, fixImageUrl } from '@/lib/wp-api';
import { Calendar, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

// --- Kiểu dữ liệu cho params (bắt buộc của Next.js App Router) ---
interface PageProps {
  params: Promise<{ slug: string }>;
}

// --- Tạo metadata (tiêu đề tab, mô tả cho SEO) tự động theo nội dung bài viết ---
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Không tìm thấy bài viết' };
  }

  // Lấy tiêu đề tùy biến nếu có từ ACF
  const removeVietnameseDiacritics = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };
  const findAcfValue = (keyword: string): string => {
    if (!post.acf) return '';
    const acf = post.acf as Record<string, any>;
    const normalizedKeyword = removeVietnameseDiacritics(keyword);
    const key = Object.keys(acf).find(k => removeVietnameseDiacritics(k).includes(normalizedKeyword));
    return key ? (acf[key] || '') : '';
  };
  const customTitle = findAcfValue('title');
  const displayTitle = customTitle || post.title.rendered;

  // Lấy ảnh đại diện để hiển thị khi chia sẻ lên mạng xã hội
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;

  return {
    title: `${displayTitle} | Lifestyle Việt Nam`,
    description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
    openGraph: {
      title: displayTitle,
      description: post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 160),
      images: featuredImage ? [featuredImage] : [],
    },
  };
}

// --- Tạo sẵn danh sách đường dẫn tĩnh (giúp trang tải nhanh hơn) ---
export async function generateStaticParams() {
  // Trả về mảng rỗng để tránh gửi hàng loạt request đồng thời lên Localtunnel lúc build (gây lỗi 429).
  // Các trang chi tiết sẽ được tự động tạo và lưu bộ nhớ đệm (ISR) vào lần đầu tiên người dùng truy cập.
  return [];
}

// --- Trang chính ---
export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  // Nếu không tìm thấy bài viết → hiện trang 404
  if (!post) {
    notFound();
  }

  // Hàm bỏ hết dấu tiếng Việt để so sánh tên trường cho chắc chắn
  const removeVietnameseDiacritics = (str: string): string => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D');
  };

  // Tìm giá trị ACF bằng cách bỏ dấu cả tên trường lẫn từ khóa rồi so sánh
  const findAcfValue = (keyword: string): string => {
    if (!post.acf) return '';
    const acf = post.acf as Record<string, any>;
    const normalizedKeyword = removeVietnameseDiacritics(keyword);
    const key = Object.keys(acf).find(k => removeVietnameseDiacritics(k).includes(normalizedKeyword));
    return key ? (acf[key] || '') : '';
  };

  // Lấy dữ liệu nội dung từ ACF
  const customTitle = findAcfValue('title') || '';
  const mainContentText = findAcfValue('noi_dung_chinh') || '';
  const imageContentText = findAcfValue('anh') || '';
  const authorText = findAcfValue('nguoi_dang_bai') || '';

  const hasAcfContent = mainContentText || imageContentText || customTitle;

  // Sửa toàn bộ đường dẫn ảnh nội bộ trong nội dung HTML của WP sang public origin
  const fixHtmlImageUrls = (html: string): string => {
    if (!html) return '';
    const publicOrigin = process.env.NEXT_PUBLIC_WP_API_URL 
      ? new URL(process.env.NEXT_PUBLIC_WP_API_URL).origin 
      : 'http://localhost:10004';
    return html.replace(/(?:https?:\/\/[^\/\s]+)?\/wp-content\//g, `${publicOrigin}/wp-content/`);
  };

  // Lấy ảnh đại diện (thumbnail)
  const featuredImage = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);
  const featuredAlt = post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered;

  // Lấy danh mục
  const categories = post._embedded?.['wp:term']?.[0] || [];

  // Lấy thẻ tag
  const tags = post._embedded?.['wp:term']?.[1] || [];

  // Hàm chuyển đổi định dạng ngày tháng sang tiếng Việt
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    }).format(date);
  };

  // Loại bỏ thông tin đóng góp nhạy cảm (Name, SĐT...) ở môi trường Client công khai
  const cleanContent = post.content.rendered
    .replace(/<!-- contribution-meta-start -->[\s\S]*?<!-- contribution-meta-end -->/g, '');

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA]">

      {/* ===== PHẦN BANNER NHỎ TRÊN ĐẦU ===== */}
      <section className="relative w-full bg-[#008BBD] py-12 lg:py-16">
        {/* Lớp nền pattern nhẹ */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          {/* Breadcrumb — Đường dẫn phân cấp */}
          <nav className="flex items-center gap-1.5 text-white/80 text-sm font-medium mb-4">
            <Link href="/" className="hover:text-white transition-colors">
              Trang chủ
            </Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <Link href="/tin-tuc" className="hover:text-white transition-colors">
              Tin tức
            </Link>
            <ChevronRight className="w-4 h-4 opacity-50" />
            <span className="text-white font-semibold line-clamp-1 max-w-[300px]"
              dangerouslySetInnerHTML={{ __html: customTitle || post.title.rendered }}
            />
          </nav>

          {/* Tiêu đề bài viết */}
          <h1
            className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-white leading-tight max-w-4xl"
            dangerouslySetInnerHTML={{ __html: customTitle || post.title.rendered }}
          />

          {/* Thông tin phụ: ngày đăng + danh mục */}
          <div className="flex flex-wrap items-center gap-4 mt-5 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            {categories.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                {categories.map((cat) => (
                  <span key={cat.slug} className="bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full text-xs font-semibold">
                    {cat.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ===== PHẦN NỘI DUNG CHÍNH ===== */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="max-w-4xl mx-auto">

          {/* Ảnh đại diện lớn */}
          {featuredImage && (
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-10 shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage}
                alt={featuredAlt}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Nội dung bài viết — render HTML từ WordPress hoặc từ Form ACF */}
          {hasAcfContent ? (
            <article
              className="
                prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-[#008BBD] prose-a:font-semibold hover:prose-a:text-[#006A91]
                prose-img:rounded-xl prose-img:shadow-md
                prose-blockquote:border-l-[#008BBD] prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-strong:text-gray-900
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700
              "
            >
              {/* Nội dung chính */}
              {mainContentText && (
                <div dangerouslySetInnerHTML={{ __html: fixHtmlImageUrls(mainContentText) }} />
              )}

              {/* Phần ảnh / nội dung ảnh phụ */}
              {imageContentText && (
                <div 
                  className="mt-6 wp-content" 
                  dangerouslySetInnerHTML={{ __html: fixHtmlImageUrls(imageContentText) }} 
                />
              )}

              {/* Người đăng bài / Tác giả */}
              {authorText && (
                <div className="mt-8 pt-4 border-t border-gray-100 text-right text-sm text-gray-500 font-medium italic">
                  Người đăng bài: {authorText}
                </div>
              )}
            </article>
          ) : (
            <article
              className="
                prose prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-a:text-[#008BBD] prose-a:font-semibold hover:prose-a:text-[#006A91]
                prose-img:rounded-xl prose-img:shadow-md
                prose-blockquote:border-l-[#008BBD] prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
                prose-strong:text-gray-900
                prose-ul:list-disc prose-ol:list-decimal
                prose-li:text-gray-700
              "
              dangerouslySetInnerHTML={{ __html: cleanContent }}
            />
          )}

          {/* Thẻ tag (nếu có) */}
          {tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {tags.map((tag) => (
                  <span
                    key={tag.slug}
                    className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-[#008BBD]/10 hover:text-[#008BBD] transition-colors"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Nút quay lại danh sách */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/tin-tuc"
              className="inline-flex items-center gap-2 text-[#008BBD] font-semibold hover:text-[#006A91] transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              Quay lại danh sách tin tức
            </Link>
          </div>

        </div>
      </section>
    </main>
  );
}
