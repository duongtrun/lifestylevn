'use client';

// File này: Phần hiển thị Sự kiện nổi bật (News Events)
// Vai trò: Hiển thị 1 bài to bên trái, 2 bài nhỏ bên phải, chèn các họa tiết SVG bay trang trí
// Dùng khi: Ở trang chủ danh sách Tin Tức (/tin-tuc) phần trên cùng dưới banner

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WPPost, fixImageUrl } from '@/lib/wp-api';
import { Calendar } from 'lucide-react';

interface NewsEventsProps {
  posts: WPPost[];
}

export default function NewsEvents({ posts }: NewsEventsProps) {
  // Lấy ra tối đa 3 bài viết để làm Sự kiện nổi bật
  const featuredPosts = posts.slice(0, 3);

  // Nếu không có đủ bài viết, không hiển thị phần này
  if (featuredPosts.length === 0) return null;

  // Trích xuất thông tin bài 1 (bài to bên trái)
  const mainPost = featuredPosts[0];
  const mainImage = fixImageUrl(mainPost._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg';
  const mainTitle = mainPost.title.rendered;
  const mainExcerpt = mainPost.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 150) + '...';

  // Trích xuất thông tin bài 2 và bài 3 (2 bài nhỏ bên phải)
  const rightPosts = featuredPosts.slice(1, 3);

  // Hàm định dạng ngày tháng tiếng Việt đơn giản
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="relative w-full overflow-hidden py-10 lg:py-16 bg-gradient-to-b from-white to-[#F8F9FA]">
      
      {/* ================= HỌA TIẾT SVG BAY LƠ LỬNG TRANG TRÍ ================= */}
      {/* Họa tiết bên trái */}
      <motion.div 
        className="absolute -left-12 top-[20%] w-36 h-36 hidden xl:block pointer-events-none opacity-60 z-0"
        animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img_news/event_left.svg" alt="Họa tiết trang trí trái" className="w-full h-full object-contain" />
      </motion.div>

      {/* Họa tiết bên phải 1 */}
      <motion.div 
        className="absolute -right-16 top-[10%] w-40 h-40 hidden xl:block pointer-events-none opacity-50 z-0"
        animate={{ y: [0, 15, 0], rotate: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img_news/event_right.svg" alt="Họa tiết trang trí phải 1" className="w-full h-full object-contain" />
      </motion.div>

      {/* Họa tiết bên phải 2 */}
      <motion.div 
        className="absolute -right-12 bottom-[15%] w-36 h-36 hidden xl:block pointer-events-none opacity-50 z-0"
        animate={{ y: [0, -10, 0], scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img_news/even_right_2.svg" alt="Họa tiết trang trí phải 2" className="w-full h-full object-contain" />
      </motion.div>

      {/* CONTAINER CHÍNH */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tiêu đề mục Sự kiện */}
        <div className="mb-8 lg:mb-12">
          <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
            Sự kiện
            <span className="w-3 h-3 rounded-full bg-[#008BBD] inline-block animate-pulse"></span>
          </h2>
          <p className="text-gray-500 mt-2 text-sm lg:text-base">Những cột mốc, sự kiện nổi bật và hoạt động đáng chú ý của chúng tôi.</p>
        </div>

        {/* KHU VỰC BẢN ĐỒ BỐ CỤC 1:2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 min-h-[500px] lg:min-h-[580px]">
          
          {/* ================= BÀI VIẾT NỔI BẬT LỚN (BÊN TRÁI) ================= */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col justify-end min-h-[400px] lg:h-full bg-black"
          >
            {/* Ảnh nền phủ đầy */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={mainImage} 
              alt={mainTitle} 
              className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
            />
            {/* Lớp phủ màu chuyển sắc từ đen sang mờ dần lên trên để text hiển thị cực rõ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 z-10 transition-opacity duration-500 group-hover:opacity-95" />

            {/* Nội dung bài viết */}
            <div className="relative z-20 p-6 sm:p-8 lg:p-10 flex flex-col justify-end w-full">
              {/* Nhãn thời gian Time +07 */}
              <div className="flex items-center gap-2 mb-4 w-fit">
                <span className="bg-[#008BBD] text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                  Time +07
                </span>
                <span className="text-white/80 text-xs flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(mainPost.date)}
                </span>
              </div>

              {/* Tiêu đề bài viết */}
              <Link href={`/tin-tuc/${mainPost.slug}`}>
                <h3 
                  className="text-2xl sm:text-3xl font-extrabold text-white leading-snug group-hover:text-[#008BBD] transition-colors duration-300"
                  dangerouslySetInnerHTML={{ __html: mainTitle }}
                />
              </Link>

              {/* Mô tả tóm tắt ngắn */}
              <p 
                className="text-white/80 text-sm sm:text-base mt-3 line-clamp-2 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: mainExcerpt }}
              />

              {/* Nút xem chi tiết thiết kế tinh tế */}
              <Link 
                href={`/tin-tuc/${mainPost.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-white font-bold text-sm bg-white/10 hover:bg-white/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 w-fit"
              >
                Khám phá ngay
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>

          {/* ================= 2 BÀI VIẾT NHỎ XẾP DỌC (BÊN PHẢI) ================= */}
          <div className="flex flex-col gap-6 lg:gap-8 h-full">
            {rightPosts.map((post, idx) => {
              const image = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg';
              
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * (idx + 1) }}
                  className="group relative flex-1 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col justify-end min-h-[220px] bg-black"
                >
                  {/* Ảnh nền */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={image} 
                    alt={post.title.rendered} 
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                  />
                  {/* Lớp phủ chuyển sắc tối */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-95 z-10 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Nội dung */}
                  <div className="relative z-20 p-6 lg:p-8 flex flex-col justify-end">
                    {/* Nhãn thời gian */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="bg-[#008BBD] text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                        Time +07
                      </span>
                      <span className="text-white/70 text-xs flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(post.date)}
                      </span>
                    </div>

                    {/* Tiêu đề bài viết */}
                    <Link href={`/tin-tuc/${post.slug}`}>
                      <h4 
                        className="text-lg sm:text-xl font-bold text-white leading-snug group-hover:text-[#008BBD] transition-colors duration-300 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>

    </section>
  );
}
