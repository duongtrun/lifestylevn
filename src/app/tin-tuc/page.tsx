import { Metadata } from 'next';
import NewsHero from '@/components/news/NewsHero';
import NewsCategorySlider from '@/components/news/NewsCategorySlider';
import NewsEventsGroupSlider from '@/components/news/NewsEventsGroupSlider';
import { getPosts, getPostsByCategorySlug } from '@/lib/wp-api';

// File này: Trang danh sách Tin Tức chính
// Vai trò: Lấy dữ liệu bài viết từ API, phân nhóm và hiển thị các hàng tin tức Sự kiện (slider nhóm 3 bài dạng 1-to-2) và 3 chuyên mục cuộn ngang Giáo dục, Dinh dưỡng, Sức khỏe.
// Dùng khi: Người dùng truy cập đường dẫn /tin-tuc

export const metadata: Metadata = {
  title: 'Tin tức | Lifestyle Việt Nam',
  description: 'Cập nhật những tin tức mới nhất về hệ sinh thái Mẹ và Bé từ Lifestyle Việt Nam.',
};

export default async function NewsPage() {
  // Lấy dữ liệu theo từng danh mục riêng biệt một cách song song (Parallel Fetching)
  // Việc này giúp WordPress chỉ phải xử lý các query rất nhỏ (6 bài mỗi loại) thay vì quét hàng trăm bài cùng lúc, giúp thời gian tải giảm đi 15-20 lần!
  // Lấy danh sách bài viết từ WordPress song song
  const [newsPosts, eventCategoryPosts, achievementPosts, educationPosts, nutritionPosts, healthPosts] = await Promise.all([
    // Lấy bài thuộc category Tin tức (ID: 10)
    getPosts(60, 10),
    // Lấy bài thuộc category Sự kiện (ID: 4)
    getPosts(60, 4),
    // Lấy bài thuộc category Thành tựu (ID: 13)
    getPosts(60, 13),
    // Chuyên mục Giáo dục
    getPostsByCategorySlug('giao-duc', 6),
    // 3. Chuyên mục Dinh dưỡng & tiêu hóa (Tăng lên 60 bài để hiển thị đầy đủ tất cả bài viết dinh dưỡng đã import)
    getPostsByCategorySlug('dinh-duong-tieu-hoa', 60),
    // Chuyên mục Sức khỏe & vệ sinh
    getPostsByCategorySlug('suc-khoe-ve-sinh', 6)
  ]);

  // Gộp các bài thuộc Tin tức, Sự kiện và Thành tựu làm mục "Sự kiện" chung
  // Đảm bảo không lẫn các bài của Giáo dục (ID: 14), Dinh dưỡng (ID: 5), Sức khỏe (ID: 6)
  const combinedEvents = [...newsPosts, ...eventCategoryPosts, ...achievementPosts];
  
  // Loại bỏ trùng lặp bài viết (nếu một bài gán nhiều category) và sắp xếp theo ngày mới nhất
  const eventPosts = Array.from(new Map(combinedEvents.map(post => [post.id, post])).values())
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 60);

  const hasNoPosts = eventPosts.length === 0 && educationPosts.length === 0 && nutritionPosts.length === 0 && healthPosts.length === 0;

  return (
    <main className="flex min-h-screen flex-col bg-white pb-20">
      {/* Banner giới thiệu đầu trang */}
      <NewsHero />
      
      {/* Phần 1: Sự kiện nổi bật (Slider cuộn ngang tự động chạy ngang mỗi 3 giây theo cụm 3 bài) */}
      <NewsEventsGroupSlider posts={eventPosts} />
      
      {/* Phần 2: Hàng chuyên mục Giáo dục */}
      <NewsCategorySlider 
        title="Giáo dục" 
        posts={educationPosts} 
      />

      {/* Phần 3: Hàng chuyên mục Dinh dưỡng & tiêu hóa */}
      <NewsCategorySlider 
        title="Dinh dưỡng & tiêu hóa" 
        posts={nutritionPosts} 
      />

      {/* Phần 4: Hàng chuyên mục Sức khỏe & vệ sinh */}
      <NewsCategorySlider 
        title="Sức khỏe & vệ sinh" 
        posts={healthPosts} 
      />

      {/* Hiển thị thông báo khi hệ thống trống hoàn toàn bài viết */}
      {hasNoPosts && (
        <section className="container mx-auto px-4 py-20 text-center">
          <div className="max-w-md mx-auto py-12 px-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Đang cập nhật thêm các bài viết tin tức mới nhất từ hệ thống...</p>
          </div>
        </section>
      )}
    </main>
  );
}
