'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import Image from 'next/image';

// File: src/components/about/TimelineSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Trình bày các cột mốc lịch sử phát triển (2017 -> 2025).
//          Bố cục: Trái (danh sách năm click được), Giữa (thanh trượt), Phải (nội dung chi tiết).
// Dùng khi: Ngay dưới phần giới thiệu chung (AboutIntroSection) của trang /gioi-thieu.

const TIMELINE_DATA = [
  {
    year: 2017,
    title: 'Khởi nguồn những bước đi đầu tiên',
    content: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ]
  },
  {
    year: 2019,
    title: 'Mở rộng thị trường & khẳng định chất lượng',
    content: [
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.',
      'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.'
    ]
  },
  {
    year: 2021,
    title: 'Manh nha ý tưởng về một hệ sinh thái Mẹ & Bé toàn diện',
    content: [
      'Sau 5 năm phát triển, Babego trở thành thương hiệu cốt lõi của công ty, nhận nhiều giải thưởng uy tín, trở thành thương hiệu quen thuộc của hàng chục nghìn bà mẹ Việt.',
      'Từ nền tảng thành công của Babego, ban lãnh đạo LifeStyle nhận thấy xu hướng phát triển dài hạn của ngành mẹ & bé cần vượt xa hơn chỉ một sản phẩm dinh dưỡng.',
      'Công ty bắt đầu nghiên cứu, lên ý tưởng và đặt những viên gạch đầu tiên cho mô hình hệ sinh thái Mẹ & Bé đa trụ cột, bao gồm:',
      '• Dinh dưỡng\n• Giáo dục\n• Vệ sinh - an toàn',
      'Đây là bước chuyển tư duy chiến lược quan trọng.'
    ]
  },
  {
    year: 2024,
    title: 'Hiện thực hóa Hệ sinh thái, vươn tầm cao mới',
    content: [
      'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.',
      'Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?'
    ]
  },
  {
    year: 2025,
    title: 'Tầm nhìn dẫn đầu thị trường Mẹ & Bé Việt Nam',
    content: [
      'Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?',
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.'
    ]
  }
];

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định chọn 2021 (index 2)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TIMELINE_DATA.length - 1 ? prev + 1 : prev));
  };

  const activeData = TIMELINE_DATA[activeIndex];

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-gray-50">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/img_about_us/bg_timeline.svg"
          alt="Timeline background"
          fill
          className="object-cover object-center opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-8 lg:gap-16">
          
          {/* Cột trái: Danh sách Năm (Years) */}
          <div className="flex-none flex flex-col items-center justify-center w-full md:w-48 gap-4 py-10">
            {/* Nút lên */}
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
            >
              <ChevronUp size={32} strokeWidth={2.5} />
            </button>

            {/* Các năm */}
            <div className="flex flex-col items-center justify-center h-[280px] w-full relative">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex; // -2, -1, 0, 1, 2
                
                // Ẩn nếu nằm ngoài khoảng nhìn thấy (-1, 0, 1)
                if (Math.abs(offset) > 1) return null;

                return (
                  <motion.div
                    key={item.year}
                    layout
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.6,
                      opacity: isActive ? 1 : 0.4,
                      y: offset * 80, // Khoảng cách giãn cách giữa các năm
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#008BBD] text-6xl md:text-7xl lg:text-8xl' : 'text-gray-400 text-5xl md:text-6xl hover:text-gray-600'}`}>
                      {item.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Nút xuống */}
            <button 
              onClick={handleNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className={`p-2 transition-colors ${activeIndex === TIMELINE_DATA.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
            >
              <ChevronDown size={32} strokeWidth={2.5} />
            </button>
          </div>

          {/* Cột giữa: Đường kẻ thanh trượt */}
          <div className="hidden md:flex flex-none w-1 relative bg-gray-300 rounded-full my-10">
            <motion.div 
              className="absolute left-0 right-0 bg-[#008BBD] rounded-full w-1.5 -ml-[1px]"
              initial={false}
              animate={{ 
                top: `${(activeIndex / (TIMELINE_DATA.length - 1)) * 100}%`,
                height: '80px',
                marginTop: '-40px' // Căn giữa track marker
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Cột phải: Nội dung chi tiết */}
          <div className="flex-1 flex flex-col justify-center min-h-[350px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#008BBD] leading-snug">
                  {activeData.title}
                </h3>
                
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  {activeData.content.map((paragraph, idx) => (
                    <p key={idx} className={paragraph.startsWith('•') ? 'pl-4 whitespace-pre-line text-gray-700 font-medium' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
