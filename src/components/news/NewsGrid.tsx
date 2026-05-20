import Image from 'next/image';
import Link from 'next/link';
import { WPPost, fixImageUrl } from '@/lib/wp-api';
import { Calendar, ChevronRight } from 'lucide-react';

// File này: Hiển thị lưới danh sách bài viết tin tức
// Vai trò: Lấy dữ liệu mảng bài viết (từ server) và map ra giao diện grid dạng card
// Dùng khi: Ở trang danh sách Tin Tức hoặc các trang cần hiển thị nhiều bài viết

export default function NewsGrid({ posts }: { posts: WPPost[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed border-gray-200 rounded-2xl bg-white">
        <p className="text-lg font-medium text-gray-500">Chưa có bài viết nào.</p>
      </div>
    );
  }

  // Hàm chuyển đổi định dạng ngày tháng
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => {
        // Lấy ảnh đại diện (thumbnail)
        const featuredImage = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg'; // Ảnh mặc định nếu không có
        
        // Lấy danh mục đầu tiên (nếu có)
        const categories = post._embedded?.['wp:term']?.[0] || [];
        const categoryName = categories.length > 0 ? categories[0].name : 'Tin tức';

        return (
          <article 
            key={post.id} 
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
          >
            {/* Vùng chứa ảnh */}
            <Link href={`/tin-tuc/${post.slug}`} className="relative h-56 w-full overflow-hidden block shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={featuredImage}
                alt={post.title.rendered}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#008BBD] uppercase tracking-wider">
                {categoryName}
              </div>
            </Link>

            {/* Vùng nội dung */}
            <div className="p-6 flex flex-col flex-grow">
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-3">
                <Calendar className="w-4 h-4" />
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
              
              <Link href={`/tin-tuc/${post.slug}`} className="block mb-3">
                <h2 
                  className="text-xl font-bold text-gray-900 group-hover:text-[#008BBD] transition-colors line-clamp-2"
                  dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                />
              </Link>
              
              <div 
                className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow"
                dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
              />
              
              <Link 
                href={`/tin-tuc/${post.slug}`}
                className="inline-flex items-center gap-1 text-[#008BBD] font-semibold text-sm hover:text-[#006A91] transition-colors mt-auto w-fit"
              >
                Đọc tiếp <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
