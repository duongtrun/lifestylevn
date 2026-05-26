'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// File: src/components/babego/BabegoOrigin.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Trình bày các cột mốc ra đời và phát triển của Babego (2019, 2023).
// Dùng khi: Ở section thứ 2 ngay sau Hero Banner.

const TIMELINE_DATA = [
  {
    year: '2019',
    title: 'Ra đời Babego',
    content: [
      '• Ra mắt dòng sản phẩm Babego đầu tiên.',
      '• Công thức tập trung vào tiêu hóa – ăn ngon – tăng cân ổn định.',
      '• Đưa thảo dược chùm ngây vào công thức, tạo dấu ấn khác biệt.'
    ]
  },
  {
    year: '2020',
    title: 'Tăng trưởng & Khẳng định vị thế',
    content: [
      '• Babego được hàng nghìn gia đình tin tưởng nhờ hiệu quả rõ rệt.',
      '• Mở rộng hệ thống phân phối trên toàn quốc.',
      '• Trở thành thương hiệu quen thuộc trên các hội nhóm mẹ & bé.',
      '• Sản phẩm được đánh giá cao bởi tính an toàn – lành tính – dễ hấp thu.'
    ]
  },
  {
    year: '2024',
    title: 'Bước ngoặt lớn: Ra mắt Babego Gold (Công thức cải tiến)',
    content: [
      'Dựa trên dữ liệu hàng chục nghìn phản hồi khách hàng, đội ngũ R&D nâng cấp công thức lên thành Babego Gold, tập trung vào:',
      '• Tiêu hóa khỏe',
      '• Miễn dịch vững',
      '• Tăng cân dễ',
      '• Hỗ trợ chiều cao',
      'Đây là cột mốc quan trọng khẳng định Babego không chỉ phát triển về sản phẩm mà còn về chiến lược dài hạn và uy tín thương hiệu.'
    ]
  },
  {
    year: '2025',
    title: 'Định hướng hoàn thiện & Mở rộng hệ sản phẩm',
    content: [
      '• Hoàn thiện bộ sản phẩm Babego Gold theo từng độ tuổi và nhu cầu của trẻ.',
      '• Tập trung nghiên cứu sản phẩm nâng cao, phù hợp hơn với trẻ có hệ tiêu hóa đặc biệt nhạy cảm.',
      '• Tối ưu quy trình sản xuất – kiểm định – vận hành để đảm bảo chất lượng ổn định.'
    ]
  },
  {
    year: '2026+',
    title: 'Chiến lược phát triển bền vững',
    content: [
      '• Mở rộng danh mục sản phẩm dinh dưỡng chuyên biệt theo từng nhóm sức khỏe.',
      '• Tăng cường hợp tác chuyên gia, bác sĩ dinh dưỡng để nâng tầm công thức.',
      '• Đưa Babego trở thành thương hiệu dinh dưỡng Việt có mặt tại thị trường quốc tế.',
      '• Liên tục cải tiến dựa trên khoa học và dữ liệu thực tế.',
      'Babego không chỉ là một sản phẩm – mà là một hành trình dài hơi, được xây dựng bằng niềm tin, trí tuệ và tâm huyết của cả đội ngũ.'
    ]
  }
];

export default function BabegoOrigin() {
  const [activeIndex, setActiveIndex] = useState(0); // Mặc định chọn 2019 (index 0)

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < TIMELINE_DATA.length - 1 ? prev + 1 : prev));
  };

  const activeData = TIMELINE_DATA[activeIndex];

  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-white">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/img_babego/babego_bg_timeline.webp"
          alt="Babego Origin Background"
          fill
          className="object-cover object-center"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-8 lg:gap-16">
          
          {/* Cột trái: Danh sách Năm (Years) - BẢN TRƯỢT NGANG CHO MOBILE */}
          <div className="flex md:hidden flex-row items-center justify-center w-full gap-4 py-6 z-10">
            {/* Nút sang trái */}
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#00724C] hover:text-[#2D7A3A] cursor-pointer'}`}
              aria-label="Năm trước"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>

            {/* Các năm hiển thị nằm ngang */}
            <div className="flex items-center justify-center h-20 w-[240px] relative overflow-hidden">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex; // Khoảng cách chênh lệch index (-1, 0, 1)
                
                // Chỉ hiển thị năm hiện tại và 2 năm lân cận
                if (Math.abs(offset) > 1) return null;

                return (
                  <motion.div
                    key={item.year}
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.65,
                      opacity: isActive ? 1 : 0.4,
                      x: offset * 80, // Giãn cách ngang giữa các năm
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#00724C] text-4xl' : 'text-gray-400 text-3xl hover:text-gray-600'}`}>
                      {item.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Nút sang phải */}
            <button 
              onClick={handleNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className={`p-2 transition-colors ${activeIndex === TIMELINE_DATA.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#00724C] hover:text-[#2D7A3A] cursor-pointer'}`}
              aria-label="Năm sau"
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </button>
          </div>

          {/* Cột trái: Danh sách Năm (Years) - BẢN DỌC TRÊN DESKTOP */}
          <div className="hidden md:flex flex-none flex-col items-center justify-center w-48 gap-4 py-10 z-10">
            {/* Nút lên */}
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#00724C] hover:text-[#2D7A3A] cursor-pointer'}`}
              aria-label="Lên trên"
            >
              <ChevronUp size={40} strokeWidth={2.5} />
            </button>

            {/* Các năm xếp dọc */}
            <div className="flex flex-col items-center justify-center h-[280px] w-full relative">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex; // Khoảng cách chênh lệch index (-1, 0, 1)
                
                // Chỉ hiển thị năm hiện tại và 2 năm lân cận
                if (Math.abs(offset) > 1) return null;

                return (
                  <motion.div
                    key={item.year}
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.6,
                      opacity: isActive ? 1 : 0.4,
                      y: offset * 80, // Giãn cách dọc giữa các năm
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#00724C] text-6xl md:text-7xl lg:text-8xl' : 'text-gray-400 text-5xl md:text-6xl hover:text-gray-600'}`}>
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
              className={`p-2 transition-colors ${activeIndex === TIMELINE_DATA.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#00724C] hover:text-[#2D7A3A] cursor-pointer'}`}
              aria-label="Xuống dưới"
            >
              <ChevronDown size={40} strokeWidth={2.5} />
            </button>
          </div>

          {/* Cột giữa: Đường kẻ thanh trượt */}
          <div className="hidden md:flex flex-none w-1.5 relative bg-gray-300 rounded-full my-10">
            <motion.div 
              className="absolute left-0 right-0 bg-[#00724C] rounded-full w-2 -ml-[1px]"
              initial={false}
              animate={{ 
                top: `${(activeIndex / Math.max(TIMELINE_DATA.length - 1, 1)) * 100}%`,
                height: '80px',
                marginTop: '-40px' // Căn giữa track marker
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Cột phải: Nội dung chi tiết */}
          <div className="w-full md:flex-1 flex flex-col justify-start h-[520px] sm:h-[450px] md:h-[350px] lg:h-[300px] overflow-y-auto scrollbar-none">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 my-auto"
              >
                <h3 className="text-2xl md:text-3xl lg:text-[32px] font-bold text-[#00724C] leading-snug">
                  {activeData.title}
                </h3>
                
                <div className="space-y-3 text-[#444444] text-sm md:text-base leading-relaxed">
                  {activeData.content.map((paragraph, idx) => (
                    <p key={idx} className={paragraph.startsWith('•') ? 'pl-4 whitespace-pre-line font-medium' : ''}>
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
