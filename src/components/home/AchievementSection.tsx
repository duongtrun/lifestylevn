'use client';

// File: src/components/home/AchievementSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị danh sách thành tựu dạng băng chuyền (slider) cuộn ngang sử dụng thư viện Embla.
// Dùng khi: Người dùng cuộn xuống dưới phần Sự Khác Biệt.

import React, { useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function AchievementSection() {
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

  // Dữ liệu mô phỏng 5 bức ảnh
  const achievements = [
    { id: 1, title: 'TOP 10 thương hiệu dẫn đầu Việt Nam 2022' },
    { id: 2, title: 'TOP 10 thương hiệu dẫn đầu Việt Nam 2022' },
    { id: 3, title: 'TOP 10 thương hiệu dẫn đầu Việt Nam 2022' },
    { id: 4, title: 'TOP 10 thương hiệu dẫn đầu Việt Nam 2022' },
    { id: 5, title: 'TOP 10 thương hiệu dẫn đầu Việt Nam 2022' },
  ];

  return (
    <section className="relative w-full py-16 bg-[#fafafa] overflow-hidden">
      
      {/* Tiêu đề lệch trái */}
      <div className="mb-12">
        <div className="bg-[#98C04A] inline-block pl-4 pr-12 md:pl-10 md:pr-24 py-4 md:py-6 shadow-md rounded-r-lg">
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
                  className="pl-6 relative flex-none w-[85%] sm:w-[60%] md:w-[45%] lg:w-[30%] min-w-0 aspect-[3/4]"
                >
                  <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg group/card">
                    <Image 
                      src="/images/achieve.svg"
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
            className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#98C04A] hover:bg-[#98C04A] hover:text-white border-2 border-[#98C04A] hover:scale-110 active:scale-95 transition-all shadow-xl z-10 opacity-90 group-hover:opacity-100"
            aria-label="Trượt sang trái"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </button>

          {/* Nút Điều Hướng Phải */}
          <button 
            onClick={scrollNext}
            className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white text-[#98C04A] hover:bg-[#98C04A] hover:text-white border-2 border-[#98C04A] hover:scale-110 active:scale-95 transition-all shadow-xl z-10 opacity-90 group-hover:opacity-100"
            aria-label="Trượt sang phải"
          >
            <ArrowRight size={24} strokeWidth={2.5} />
          </button>
        </div>

      </div>
    </section>
  );
}
