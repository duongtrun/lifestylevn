'use client';

// File này: Component thanh cuộn ngang (News Category Slider)
// Vai trò: Hiển thị danh sách 5 bài viết thuộc một chuyên mục dưới dạng thẻ cuộn ngang mượt mà, chuẩn thiết kế cao cấp
// Dùng khi: Ở trang Tin Tức chính (/tin-tuc) cho hai chuyên mục "Dinh dưỡng & tiêu hóa" và "Sức khỏe & vệ sinh"

import Link from 'next/link';
import { motion } from 'framer-motion';
import { WPPost, fixImageUrl } from '@/lib/wp-api';
import { Calendar } from 'lucide-react';
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface NewsCategorySliderProps {
  title: string;       // Tiêu đề của chuyên mục (ví dụ: Dinh dưỡng & tiêu hóa)
  posts: WPPost[];     // Mảng 5 bài viết của chuyên mục đó
}

export default function NewsCategorySlider({ title, posts }: NewsCategorySliderProps) {
  // Khởi tạo Embla Carousel với tính năng vòng lặp vô tận (loop: true) và tự động cuộn (Autoplay)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: 'start',
      loop: true,
      dragFree: false
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  // Nếu không có bài viết nào, ẩn hoàn toàn chuyên mục này
  if (!posts || posts.length === 0) return null;

  // Hàm định dạng ngày tháng sang dạng vi-VN (Ngày/Tháng/Năm)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  // Nút điều hướng vòng lặp thực thụ với Embla
  const scrollLeft = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollRight = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-10 lg:py-14 bg-white border-b border-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TIÊU ĐỀ CHUYÊN MỤC VÀ NÚT ĐIỀU HƯỚNG ================= */}
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900 tracking-tight flex items-center gap-2.5">
              {title}
              <span className="w-2.5 h-2.5 rounded-full bg-[#008BBD] inline-block animate-pulse"></span>
            </h2>
            <div className="w-16 h-1 bg-[#008BBD] mt-3 rounded-full"></div>
          </div>

          {/* Cặp nút điều hướng cuộn trên Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <button 
              onClick={scrollLeft}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Cuộn trái"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={scrollRight}
              className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Cuộn phải"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* ================= THANH CUỘN VÔ TẬN VỚI EMBLA CAROUSEL ================= */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6 pb-6 cursor-grab active:cursor-grabbing">
            {posts.map((post, idx) => {
              // Xử lý lấy ảnh đại diện của bài viết
              const image = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg';
              const cleanTitle = post.title.rendered;

              return (
                <div key={post.id} className="pl-6 flex-none w-full sm:w-1/2 lg:w-1/3">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="w-full h-[190px] sm:h-[230px] lg:h-[250px] relative rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100/30 bg-black group"
                  >
                    <Link href={`/tin-tuc/${post.slug}`} className="absolute inset-0 z-20" />

                    {/* Ảnh nền của card */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={image} 
                      alt={cleanTitle} 
                      className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out z-0"
                    />

                    {/* Lớp phủ chuyển sắc tối (dark gradient overlay) chống chói chữ trắng cực xịn */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                    {/* Nội dung text hiển thị đè lên trên lớp phủ */}
                    <div className="absolute inset-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end z-10">
                      
                      {/* Badge mốc thời gian Time +07 */}
                      <div className="flex items-center gap-2 mb-3">
                        <span className="bg-[#008BBD] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                          Time +07
                        </span>
                        <span className="text-white/70 text-[11px] flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.date)}
                        </span>
                      </div>

                      {/* Tiêu đề chính của bài viết */}
                      <h3 
                        className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-[#008BBD] transition-colors duration-300 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: cleanTitle }}
                      />

                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
