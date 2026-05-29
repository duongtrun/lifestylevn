'use client';

// File: src/components/home/AchievementSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị danh sách thành tựu dạng băng chuyền (slider) cuộn ngang sử dụng thư viện Embla.
// Dùng khi: Người dùng cuộn xuống dưới phần Sự Khác Biệt.

import React, { useCallback, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { WPPost, fixImageUrl, decodeHtmlEntities } from '@/lib/wp-api';

interface AchievementSectionProps {
  achievements: WPPost[];
}

const parseTitle = (rawTitle: string) => {
  const match = rawTitle.match(/^\(([^)]+)\)\s*(.*)$/);
  if (match) {
    return {
      brand: match[1],
      cleanTitle: match[2]
    };
  }
  return {
    brand: '',
    cleanTitle: rawTitle
  };
};

const getBrandTagColor = (brandName: string) => {
  const b = brandName.toLowerCase();
  if (b.includes('iruka')) return 'bg-[#008BBD]';
  if (b.includes('babego')) return 'bg-[#98C04A]';
  if (b.includes('mamigo')) return 'bg-[#E28743]';
  return 'bg-[#008BBD]';
};

export default function AchievementSection({ achievements = [] }: AchievementSectionProps) {
  // Cấu hình Embla Carousel: Tắt dragFree (trượt tự do) để bắt buộc snap (khớp) từng ảnh trượt trên mobile.
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: false
  });

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

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const stripHtml = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
  };

  const hasAchievements = achievements && achievements.length > 0;

  return (
    <section className="relative w-full py-10 bg-[#fafafa] overflow-hidden">

      {/* Tiêu đề lệch trái */}
      <div className="mb-12">
        <div className="bg-[#008BBD] inline-block pl-4 pr-12 md:pl-10 md:pr-24 py-4 md:py-6 shadow-md rounded-r-lg">
          <h2 className="text-white text-2xl md:text-3xl font-bold uppercase tracking-wide">
            Thành tựu đạt được
          </h2>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-10 relative">

        {/* Vùng Băng Chuyền Embla */}
        {hasAchievements ? (
          <div className="relative group/slider">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex -ml-6 pb-4 cursor-grab active:cursor-grabbing">
                {achievements.map((item, index) => {
                  const image = fixImageUrl(item._embedded?.['wp:featuredmedia']?.[0]?.source_url) || `/images/${(index % 7) + 1}.jpg`;
                  const rawTitle = decodeHtmlEntities(item.title.rendered);
                  const { brand, cleanTitle: parsedTitle } = parseTitle(rawTitle);
                  const cleanSummary = stripHtml(item.excerpt.rendered || item.content.rendered);

                  return (
                    <div
                      key={item.id}
                      // Chia đều 100% bề ngang slider (flex-[0_0_100%] trên mobile, 50% trên tablet, 25% trên desktop) để hiển thị đầy đủ không bị vỡ.
                      className="pl-6 relative flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] min-w-0 aspect-[3/4]"
                    >
                      <Link
                        href={`/tin-tuc/${item.slug}`}
                        className="relative block w-full h-full rounded-xl overflow-hidden shadow-lg bg-neutral-100 cursor-pointer achievement-card"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={image}
                          alt={parsedTitle}
                          className="w-full h-full object-cover pointer-events-none achievement-image"
                        />

                        {/* Chỉ báo chạm trên mobile */}
                        <div className="absolute top-4 right-4 z-10 md:hidden bg-black/60 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md border border-white/10 pointer-events-none animate-pulse">
                          <span>Chi tiết</span>
                          <ArrowRight size={10} strokeWidth={3} />
                        </div>

                        {/* Brand Tag Pill positioned absolutely in top-left corner */}
                        {brand && (
                          <div className="absolute top-4 left-4 z-10 pointer-events-none transition-opacity duration-300 achievement-hide-on-hover">
                            <span className={`${getBrandTagColor(brand)} text-white px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-md`}>
                              {brand}
                            </span>
                          </div>
                        )}

                        {/* Lớp gradient đen phía dưới để làm nổi chữ (mặc định) */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/45 to-transparent pointer-events-none transition-opacity duration-300 achievement-hide-on-hover"></div>

                        <div className="absolute bottom-6 inset-x-6 text-center pointer-events-none transition-opacity duration-300 achievement-hide-on-hover">
                          <p className="text-white font-semibold text-sm md:text-base leading-snug drop-shadow-md line-clamp-2">
                            {parsedTitle}
                          </p>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] flex flex-col justify-between p-5 md:p-6 text-left z-20 achievement-overlay">
                          <div className="space-y-2 md:space-y-3">
                            {brand && (
                              <span className={`${getBrandTagColor(brand)} text-white px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider w-fit shadow-md block`}>
                                {brand}
                              </span>
                            )}
                            <h3 className="text-white font-bold text-sm md:text-base leading-snug line-clamp-2">
                              {parsedTitle}
                            </h3>
                            <p className="text-neutral-300 text-xs md:text-sm leading-relaxed line-clamp-6">
                              {cleanSummary}
                            </p>
                          </div>
                          <div>
                            <span
                              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#008BBD] text-white hover:bg-[#00749e] font-bold text-xs shadow-md hover:shadow-lg transition-all duration-300"
                            >
                              Xem thêm
                              <ArrowRight size={14} />
                            </span>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Nút Điều Hướng Trái */}
            <button
              onClick={scrollPrev}
              className="absolute left-4 xl:-left-6 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white text-[#008BBD] hover:bg-[#008BBD] hover:text-white border-2 border-[#008BBD] hover:scale-110 active:scale-95 transition-all shadow-xl z-30 opacity-90 group-hover/slider:opacity-100"
              aria-label="Trượt sang trái"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>

            {/* Nút Điều Hướng Phải */}
            <button
              onClick={scrollNext}
              className="absolute right-4 xl:-right-6 top-1/2 -translate-y-1/2 w-12 h-12 hidden md:flex items-center justify-center rounded-full bg-white text-[#008BBD] hover:bg-[#008BBD] hover:text-white border-2 border-[#008BBD] hover:scale-110 active:scale-95 transition-all shadow-xl z-30 opacity-90 group-hover/slider:opacity-100"
              aria-label="Trượt sang phải"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>
        ) : (
            <div className="flex -ml-6 pb-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="pl-6 flex-none w-full sm:flex-[0_0_50%] lg:flex-[0_0_25%] aspect-[3/4]">
                  <div className="w-full h-full rounded-xl bg-neutral-200/50 animate-pulse border border-neutral-100/30 relative overflow-hidden flex flex-col justify-end p-6">
                    <div className="h-4 bg-neutral-300 rounded w-1/4 mb-3" />
                    <div className="h-5 bg-neutral-300 rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chấm tròn chỉ hướng cho Mobile */}
        {hasAchievements && (
          <div className="flex items-center justify-center gap-2.5 mt-6 md:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${selectedIndex === index ? 'bg-[#008BBD] w-6' : 'bg-[#008BBD]/30 w-2'
                  }`}
                aria-label={`Xem thành tựu ${index + 1}`}
              />
            ))}
          </div>
        )}

    </section>
  );
}
