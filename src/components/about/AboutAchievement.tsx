'use client';

// File: src/components/about/AboutAchievement.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị danh sách thành tựu dạng băng chuyền (slider) cuộn ngang sử dụng thư viện Embla với tông màu xanh sương.
// Dùng khi: Người dùng cuộn xuống phần Timeline.

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AboutAchievement() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    align: 'start',
    loop: true,
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 6 ảnh thành tựu từ thư mục public/img_about_us/
  const achievements = [
    { id: 1, title: 'Thành tựu nổi bật 1', image: '/img_about_us/achieve_1.webp' },
    { id: 2, title: 'Thành tựu nổi bật 2', image: '/img_about_us/achieve_2.webp' },
    { id: 3, title: 'Thành tựu nổi bật 3', image: '/img_about_us/achieve_3.webp' },
    { id: 4, title: 'Thành tựu nổi bật 4', image: '/img_about_us/achieve_4.webp' },
    { id: 5, title: 'Thành tựu nổi bật 5', image: '/img_about_us/achieve_5.webp' },
    { id: 6, title: 'Thành tựu nổi bật 6', image: '/img_about_us/achieve_6.webp' },
  ];

  return (
    <section className="relative w-full py-16 bg-[#EEF8FC] overflow-hidden">
      
      {/* Tiêu đề lệch trái */}
      <div className="mb-12">
        {/* Màu xanh sương (#009fe3) thay vì xanh lá */}
        <div className="bg-[#009fe3] inline-block pl-4 pr-12 md:pl-10 md:pr-24 py-4 md:py-6 shadow-md rounded-r-lg">
          <h2 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-wide">
            Thành tựu đạt được
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 relative">
        
        {/* Vùng Băng Chuyền Embla */}
        <div className="relative group">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-6 pb-4 cursor-grab active:cursor-grabbing">
              {achievements.map((item) => (
                <div 
                  key={item.id}
                  className="pl-6 relative flex-none w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] min-w-0 aspect-[4/5]"
                >
                  {/* Card màu trắng, chứa SVG ảnh */}
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg group/card bg-white">
                    <Image 
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover/card:scale-105 transition-transform duration-700 pointer-events-none"
                    />
                    
                    {/* Lớp gradient đen phía dưới để làm nổi chữ */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none"></div>
                    
                    <div className="absolute bottom-6 inset-x-6 text-center pointer-events-none">
                      <p className="text-white font-semibold text-sm md:text-base leading-snug drop-shadow-md">
                        {item.title}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Nút Điều Hướng Trái */}
          <button 
            onClick={scrollPrev}
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#009fe3] hover:bg-[#009fe3] hover:text-white border-2 border-[#009fe3] hover:scale-110 active:scale-95 transition-all shadow-xl z-10 opacity-90 group-hover:opacity-100"
            aria-label="Trượt sang trái"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Nút Điều Hướng Phải */}
          <button 
            onClick={scrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#009fe3] hover:bg-[#009fe3] hover:text-white border-2 border-[#009fe3] hover:scale-110 active:scale-95 transition-all shadow-xl z-10 opacity-90 group-hover:opacity-100"
            aria-label="Trượt sang phải"
          >
            <ArrowRight size={24} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
