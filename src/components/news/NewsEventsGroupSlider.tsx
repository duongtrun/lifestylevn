'use client';

// File: src/components/news/NewsEventsGroupSlider.tsx
// Luồng: Trang Tin tức (/tin-tuc)
// Vai trò: Slider đặc biệt (Events Responsive Slider) hiển thị 1 bài khổ lớn trên di động (w-full) và 2 bài khổ lớn song song trên desktop (md:w-1/2). Tự động chuyển slide mỗi 3 giây.
// Dùng khi: Hiển thị ở mục Sự kiện trên cùng trang danh sách Tin Tức.

import React, { useCallback } from 'react';
import Link from 'next/link';
import { WPPost, fixImageUrl } from '@/lib/wp-api';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

interface NewsEventsGroupSliderProps {
  posts: WPPost[];
}

export default function NewsEventsGroupSlider({ posts }: NewsEventsGroupSliderProps) {
  // Khởi tạo Embla Carousel tự động cuộn slide mỗi 3 giây, hỗ trợ vòng lặp vô tận
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      align: 'start',
      loop: true,
      dragFree: false,
      slidesToScroll: 1
    },
    [
      Autoplay({ 
        delay: 3000, 
        stopOnInteraction: false, 
        stopOnMouseEnter: true 
      })
    ]
  );



  const scrollLeft = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollRight = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (!posts || posts.length === 0) return null;

  // Định dạng ngày tháng tiếng Việt
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const firstPost = posts[0];
  const firstImage = firstPost ? (fixImageUrl(firstPost._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg') : '';
  const firstTitle = firstPost ? firstPost.title.rendered : '';
  const firstExcerpt = firstPost ? (firstPost.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 180) + '...') : '';

  return (
    <section className="w-full py-12 md:py-16 bg-[#F8F9FA] relative overflow-hidden select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* ================= TIÊU ĐỀ SECTION VÀ NÚT ĐIỀU HƯỚNG ================= */}
        <div className="flex items-end justify-between mb-8 lg:mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-3">
              Sự kiện
              <span className="w-3 h-3 rounded-full bg-[#008BBD] inline-block animate-pulse"></span>
            </h2>
            <div className="w-20 h-1.5 bg-[#008BBD] mt-3 rounded-full"></div>
          </div>

          {/* Cặp nút điều hướng cuộn (Chỉ hiển thị ở chế độ desktop khi có slider) */}
          <div className="hidden md:flex items-center gap-3 z-30">
            <button 
              onClick={scrollLeft}
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Trang trước"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-11 h-11 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
              aria-label="Trang sau"
            >
              <ChevronRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* ================= GIAO DIỆN MOBILE: CHỈ HIỂN THỊ 1 CÁI DUY NHẤT ================= */}
        {firstPost && (
          <div className="block md:hidden">
            <div className="relative rounded-[32px] overflow-hidden shadow-lg border border-gray-100/40 bg-black group h-[320px] sm:h-[400px]">
              <Link href={`/tin-tuc/${firstPost.slug}`} className="absolute inset-0 z-20" />
              
              {/* Ảnh nền */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={firstImage} 
                alt={firstTitle} 
                className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-750 ease-out z-0"
              />
              
              {/* Lớp phủ tối */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              
              {/* Nội dung đè lên ảnh */}
              <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-10">
                <div className="space-y-3.5">
                  {/* Badge thời gian */}
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#008BBD] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                      Time +07
                    </span>
                    <span className="text-white/80 text-xs sm:text-sm flex items-center gap-1.5 ml-1">
                      <Calendar className="w-4 h-4 opacity-80" />
                      {formatDate(firstPost.date)}
                    </span>
                  </div>

                  {/* Tiêu đề chính */}
                  <h3 
                    className="text-white text-lg sm:text-xl font-extrabold leading-snug group-hover:text-[#5CC8EC] transition-colors duration-300 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: firstTitle }}
                  />

                  {/* Trích dẫn ngắn */}
                  <p 
                    className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    dangerouslySetInnerHTML={{ __html: firstExcerpt }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= GIAO DIỆN DESKTOP: SLIDER 2 CÁI CHẠY NGANG TỰ ĐỘNG ================= */}
        <div className="hidden md:block">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 pb-4 cursor-grab active:cursor-grabbing">
              {posts.map((post) => {
                const image = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg';
                const cleanTitle = post.title.rendered;
                const excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').slice(0, 180) + '...';

                return (
                  <div 
                    key={post.id} 
                    className="pl-6 flex-none w-1/2"
                  >
                    <div className="relative rounded-[32px] overflow-hidden shadow-lg border border-gray-100/40 bg-black group h-[400px] lg:h-[480px]">
                      <Link href={`/tin-tuc/${post.slug}`} className="absolute inset-0 z-20" />
                      
                      {/* Ảnh nền */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img 
                        src={image} 
                        alt={cleanTitle} 
                        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-103 transition-transform duration-750 ease-out z-0"
                      />
                      
                      {/* Lớp phủ tối */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                      
                      {/* Nội dung đè lên ảnh */}
                      <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-end z-10">
                        <div className="space-y-3.5">
                          {/* Badge thời gian */}
                          <div className="flex items-center gap-2.5">
                            <span className="bg-[#008BBD] text-white px-3.5 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                              Time +07
                            </span>
                            <span className="text-white/80 text-xs sm:text-sm flex items-center gap-1.5 ml-1">
                              <Calendar className="w-4 h-4 opacity-80" />
                              {formatDate(post.date)}
                            </span>
                          </div>

                          {/* Tiêu đề chính khổ lớn */}
                          <h3 
                            className="text-white text-lg sm:text-xl lg:text-2xl font-extrabold leading-snug group-hover:text-[#5CC8EC] transition-colors duration-300 line-clamp-2"
                            dangerouslySetInnerHTML={{ __html: cleanTitle }}
                          />

                          {/* Trích dẫn ngắn */}
                          <p 
                            className="text-white/80 text-xs sm:text-sm leading-relaxed line-clamp-3 font-medium opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                            dangerouslySetInnerHTML={{ __html: excerpt }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>


        </div>

      </div>
    </section>
  );
}
