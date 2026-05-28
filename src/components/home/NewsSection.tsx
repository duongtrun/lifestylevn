'use client';

import React, { useCallback, useState, useEffect } from 'react';
import Link from 'next/link';
import { WPPost, fixImageUrl } from '@/lib/wp-api';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { motion } from 'framer-motion';

// File: src/components/home/NewsSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị phần "Tin tức nổi bật" dưới dạng slider tự động chạy (Autoplay),
//          trưng bày 5 bài viết mới nhất lấy từ WordPress.
//          Đáp ứng: 3 bài/slide trên Desktop, 1 bài/slide trên Mobile.

interface NewsSectionProps {
  posts: WPPost[];
}

export default function NewsSection({ posts }: NewsSectionProps) {
  // Khởi tạo Embla Carousel với tính năng vòng lặp vô tận (loop: true) và tự động cuộn (Autoplay)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: 'start',
      loop: true,
      dragFree: false,
      slidesToScroll: 1
    },
    [
      Autoplay({
        delay: 4000,
        stopOnInteraction: false,
        stopOnMouseEnter: true
      })
    ]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
  }, [emblaApi, onSelect]);

  // Nút điều hướng Embla
  const scrollLeft = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollRight = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const hasPosts = posts && posts.length > 0;

  // Hàm định dạng ngày tháng sang dạng vi-VN (Ngày/Tháng/Năm)
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  return (
    <section className="w-full py-16 md:py-24 bg-[#008BBD]/20 border-t border-[#008BBD]/20 overflow-hidden select-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

        {/* ================= TIÊU ĐỀ VÀ NÚT ĐIỀU HƯỚNG ================= */}
        <div className="flex items-end justify-between mb-10 md:mb-12">
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#008BBD] tracking-tight flex items-center gap-2.5">
              Tin tức nổi bật
              <span className="w-2.5 h-2.5 rounded-full bg-[#008BBD] inline-block animate-pulse"></span>
            </h2>
            <p className="text-neutral-700 text-sm md:text-base max-w-md">
              Cập nhật những hoạt động mới nhất, sự kiện ý nghĩa và kiến thức bổ ích từ LifeStyle Việt Nam.
            </p>
          </div>

          {/* Cặp nút điều hướng cuộn trên Desktop */}
          {hasPosts && (
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={scrollLeft}
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Cuộn trái"
              >
                <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
              </button>
              <button
                onClick={scrollRight}
                className="w-11 h-11 rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 flex items-center justify-center text-neutral-600 hover:text-[#008BBD] active:scale-95 transition-all duration-200 cursor-pointer shadow-sm"
                aria-label="Cuộn phải"
              >
                <ChevronRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          )}
        </div>

        {/* ================= THANH CUỘN VÔ TẬN VỚI EMBLA CAROUSEL ================= */}
        {hasPosts ? (
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 pb-4 cursor-grab active:cursor-grabbing">
              {posts.map((post, idx) => {
                // Lấy ảnh đại diện
                const image = fixImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url) || '/img_home/placeholder_news.jpg';
                const cleanTitle = post.title.rendered;

                return (
                  <div
                    key={post.id}
                    className="pl-6 flex-none w-full sm:w-1/2 lg:w-1/3"
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      className="w-full h-[260px] sm:h-[280px] lg:h-[320px] relative rounded-3xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.12)] transition-all duration-500 border border-neutral-100 bg-black group"
                    >
                      <Link href={`/tin-tuc/${post.slug}`} className="absolute inset-0 z-20" />

                      {/* Ảnh nền card */}
                      <img
                        src={image}
                        alt={cleanTitle}
                        className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-750 ease-out z-0"
                      />

                      {/* Lớp phủ gradient chuyển màu từ tối ở dưới lên sáng dần ở trên */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-300 z-10" />

                      {/* Nội dung text */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">

                        {/* Badge mốc thời gian */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="bg-[#008BBD] text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
                            BÀI VIẾT
                          </span>
                          <span className="text-white/70 text-xs flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 opacity-80" />
                            {formatDate(post.date)}
                          </span>
                        </div>

                        {/* Tiêu đề */}
                        <h3
                          className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-[#5CC8EC] transition-colors duration-300 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: cleanTitle }}
                        />

                        {/* Nút giả lập chuyển hướng */}
                        <div className="mt-4 flex items-center gap-1 text-xs text-[#5CC8EC] font-semibold opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                          <span>Đọc tiếp</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="flex -ml-6 pb-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="pl-6 flex-none w-full sm:w-1/2 lg:w-1/3">
                <div className="w-full h-[260px] sm:h-[280px] lg:h-[320px] rounded-3xl bg-white/40 animate-pulse border border-neutral-100/50 relative overflow-hidden">
                  <div className="absolute inset-6 space-y-3 flex flex-col justify-end">
                    <div className="h-3.5 bg-[#008BBD]/20 rounded w-1/4" />
                    <div className="h-5 bg-[#008BBD]/20 rounded w-3/4" />
                    <div className="h-5 bg-[#008BBD]/20 rounded w-2/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Chấm tròn chỉ hướng cho Mobile */}
        {hasPosts && (
          <div className="flex items-center justify-center gap-2.5 mt-6 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-[#008BBD] w-6' : 'bg-[#008BBD]/30 w-2'
                  }`}
                aria-label={`Xem tin tức ${index + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
