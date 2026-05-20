import { Metadata } from 'next';
import NewsHero from '@/components/news/NewsHero';
import NewsEvents from '@/components/news/NewsEvents';
import NewsCategorySlider from '@/components/news/NewsCategorySlider';
import NewsGrid from '@/components/news/NewsGrid';
import { getPosts } from '@/lib/wp-api';

// File này: Trang danh sách Tin Tức chính
// Vai trò: Lấy dữ liệu bài viết từ API, phân nhóm theo danh mục và hiển thị qua các component chuyên biệt (Hero, Sự kiện 1-to-2, Thanh cuộn chuyên mục, Lưới tin tức thường)
// Dùng khi: Người dùng truy cập đường dẫn /tin-tuc

export const metadata: Metadata = {
  title: 'Tin tức | Lifestyle Việt Nam',
  description: 'Cập nhật những tin tức mới nhất về hệ sinh thái Mẹ và Bé từ Lifestyle Việt Nam.',
};

export default async function NewsPage() {
  // Lấy tối đa 100 bài viết mới nhất từ WordPress/dữ liệu giả lập
  const posts = await getPosts(100);

  // 1. Phân lọc danh sách bài viết Sự kiện nổi bật (slug: su-kien) - Tối đa 3 bài
  const featuredPosts = posts
    .filter(post => post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'su-kien'))
    .slice(0, 3);

  // 2. Phân lọc danh sách bài viết Dinh dưỡng & tiêu hóa (slug: dinh-duong-tieu-hoa) - Không giới hạn
  const nutritionPosts = posts
    .filter(post => post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'dinh-duong-tieu-hoa'));

  // 3. Phân lọc danh sách bài viết Sức khỏe & vệ sinh (slug: suc-khoe-ve-sinh) - Không giới hạn
  const healthPosts = posts
    .filter(post => post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'suc-khoe-ve-sinh'));

  // 4. Các bài viết còn lại làm tin tức thường bên dưới (tránh trùng lặp với 3 khu vực trên)
  const shownIds = new Set([
    ...featuredPosts.map(p => p.id),
    ...nutritionPosts.map(p => p.id),
    ...healthPosts.map(p => p.id)
  ]);
  const regularPosts = posts.filter(post => !shownIds.has(post.id));

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] pb-20">
      {/* Banner giới thiệu đầu trang */}
      <NewsHero />
      
      {/* Phần 1: Sự kiện nổi bật (Bố cục 1 to bên trái, 2 nhỏ bên phải) */}
      {featuredPosts.length > 0 && (
        <NewsEvents posts={featuredPosts} />
      )}
      
      {/* Phần 2: Chuyên mục Dinh dưỡng & tiêu hóa (Cuộn ngang cao cấp) */}
      {nutritionPosts.length > 0 && (
        <NewsCategorySlider 
          title="Dinh dưỡng & tiêu hóa" 
          posts={nutritionPosts} 
        />
      )}

      {/* Phần 3: Chuyên mục Sức khỏe & vệ sinh (Cuộn ngang cao cấp) */}
      {healthPosts.length > 0 && (
        <NewsCategorySlider 
          title="Sức khỏe & vệ sinh" 
          posts={healthPosts} 
        />
      )}
      
      {/* Phần 4: Danh sách các tin tức khác bên dưới (Dạng Lưới Card thường) */}
      {regularPosts.length > 0 && (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 border-t border-gray-100/60 bg-white">
          
          {/* Tiêu đề mục tin tức khác */}
          <div className="mb-10 lg:mb-12">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              Tin tức khác
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300 inline-block"></span>
            </h2>
            <div className="w-16 h-1 bg-[#008BBD] mt-3 rounded-full"></div>
          </div>

          {/* Lưới các bài viết thường */}
          <NewsGrid posts={regularPosts} />
          
        </section>
      )}

      {/* Hiển thị thông báo khi hệ thống trống hoàn toàn bài viết */}
      {posts.length === 0 && (
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto py-12 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Đang cập nhật thêm các bài viết tin tức mới nhất từ hệ thống...</p>
          </div>
        </section>
      )}
    </main>
  );
}
