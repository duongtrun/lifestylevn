import { Metadata } from 'next';
import NewsHero from '@/components/news/NewsHero';
import NewsCategorySlider from '@/components/news/NewsCategorySlider';
import NewsEventsGroupSlider from '@/components/news/NewsEventsGroupSlider';
import { getPosts, MOCK_POSTS } from '@/lib/wp-api';

// File này: Trang danh sách Tin Tức chính
// Vai trò: Lấy dữ liệu bài viết từ API, phân nhóm và hiển thị các hàng tin tức Sự kiện (slider nhóm 3 bài dạng 1-to-2) và 3 chuyên mục cuộn ngang Giáo dục, Dinh dưỡng, Sức khỏe.
// Dùng khi: Người dùng truy cập đường dẫn /tin-tuc

export const metadata: Metadata = {
  title: 'Tin tức | Lifestyle Việt Nam',
  description: 'Cập nhật những tin tức mới nhất về hệ sinh thái Mẹ và Bé từ Lifestyle Việt Nam.',
};

export default async function NewsPage() {
  // Lấy tối đa 100 bài viết mới nhất từ WordPress/dữ liệu giả lập
  const posts = await getPosts(100);

  // 1. Phân lọc phần Sự kiện (Gộp chung tin tức & thành tựu nổi bật ở trên cùng - chạy slider cuộn ngang)
  const eventPosts = posts.filter(post => 
    post._embedded?.['wp:term']?.[0]?.some(term => 
      term.slug === 'tin-tuc' || term.slug === 'thanh-tuu' || term.slug === 'su-kien'
    )
  );

  // 2. Phân lọc danh sách bài viết Giáo dục (slug: giao-duc) - Tự động fallback dữ liệu mock nếu chưa có bài trên DB
  let educationPosts = posts.filter(post => 
    post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'giao-duc')
  );
  if (educationPosts.length === 0) {
    educationPosts = MOCK_POSTS.filter(post => 
      post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'giao-duc')
    );
  }

  // 3. Phân lọc danh sách bài viết Dinh dưỡng & tiêu hóa (slug: dinh-duong-tieu-hoa) - Tự động fallback dữ liệu mock
  let nutritionPosts = posts.filter(post => 
    post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'dinh-duong-tieu-hoa')
  );
  if (nutritionPosts.length === 0) {
    nutritionPosts = MOCK_POSTS.filter(post => 
      post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'dinh-duong-tieu-hoa')
    );
  }

  // 4. Phân lọc danh sách bài viết Sức khỏe & vệ sinh (slug: suc-khoe-ve-sinh) - Tự động fallback dữ liệu mock
  let healthPosts = posts.filter(post => 
    post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'suc-khoe-ve-sinh')
  );
  if (healthPosts.length === 0) {
    healthPosts = MOCK_POSTS.filter(post => 
      post._embedded?.['wp:term']?.[0]?.some(term => term.slug === 'suc-khoe-ve-sinh')
    );
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F8F9FA] pb-20">
      {/* Banner giới thiệu đầu trang */}
      <NewsHero />
      
      {/* Phần 1: Sự kiện nổi bật (Slider cuộn ngang tự động chạy ngang mỗi 3 giây theo cụm 3 bài) */}
      {eventPosts.length > 0 && (
        <NewsEventsGroupSlider posts={eventPosts} />
      )}
      
      {/* Phần 2: Hàng chuyên mục Giáo dục */}
      {educationPosts.length > 0 && (
        <NewsCategorySlider 
          title="Giáo dục" 
          posts={educationPosts} 
        />
      )}

      {/* Phần 3: Hàng chuyên mục Dinh dưỡng & tiêu hóa */}
      {nutritionPosts.length > 0 && (
        <NewsCategorySlider 
          title="Dinh dưỡng & tiêu hóa" 
          posts={nutritionPosts} 
        />
      )}

      {/* Phần 4: Hàng chuyên mục Sức khỏe & vệ sinh */}
      {healthPosts.length > 0 && (
        <NewsCategorySlider 
          title="Sức khỏe & vệ sinh" 
          posts={healthPosts} 
        />
      )}

      {/* Hiển thị thông báo khi hệ thống trống hoàn toàn bài viết */}
      {posts.length === 0 && eventPosts.length === 0 && (
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto py-12 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Đang cập nhật thêm các bài viết tin tức mới nhất từ hệ thống...</p>
          </div>
        </section>
      )}
    </main>
  );
}
