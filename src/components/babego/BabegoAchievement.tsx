'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

// File: src/components/babego/BabegoAchievement.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Trình bày dòng thời gian thành tựu & giải thưởng ngang lượn sóng.
//          Bao gồm 5 mốc (2021 → 2024) với hiệu ứng hover sáng chấm tròn.
// Dùng khi: Section thành tựu, ngay sau phần "Ra đời Babego".

// Dữ liệu 5 cột mốc thành tựu
const ACHIEVEMENTS = [
  {
    year: '2021',
    title: 'Top 100 Sản phẩm –\nDịch vụ tốt nhất cho\ngia đình & trẻ em 2021',
  },
  {
    year: '2022',
    title: 'Top 10 Thương hiệu dẫn\nđầu Việt Nam 2022',
  },
  {
    year: '2023',
    title: 'Top 10 Thương hiệu\nxuất sắc Châu Á 2023',
  },
  {
    year: '2023',
    title: 'Top 10 Thương hiệu nổi\ntiếng Quốc gia 2023',
  },
  {
    year: '2024',
    title: 'Thương hiệu Vàng – Phát\ntriển bền vững 2024',
  },
];

// Tọa độ X% và Y (px) trên đường lượn sóng cho mỗi mốc
// Mốc X là 10, 30, 50, 70, 90 (để dãn đều màn hình)
const POSITIONS = [
  { xPercent: 10, y: 150 },
  { xPercent: 30, y: 220 },
  { xPercent: 50, y: 120 },
  { xPercent: 70, y: 230 },
  { xPercent: 90, y: 140 },
];

export default function BabegoAchievement() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative w-full py-16 md:py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-[1100px]">

        {/* Tiêu đề */}
        <div className="text-center mb-10 md:mb-6">
          <h2 className="text-3xl md:text-[40px] font-extrabold text-[#00724C] ">
            Thành tựu và giải thưởng
          </h2>
        </div>

        {/* === DESKTOP: SVG đường lượn + các mốc absolute === */}
        <div className="hidden lg:block relative w-full" style={{ height: 380 }}>

          {/* Đường lượn sóng SVG */}
          <svg
            className="absolute inset-0 w-full"
            style={{ height: 380 }}
            viewBox="0 0 1000 380"
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Đường cong đi qua chính xác 5 tọa độ POSITIONS */}
            <path
              d="M 0 120 C 50 120, 50 150, 100 150 C 200 150, 200 220, 300 220 C 400 220, 400 120, 500 120 C 600 120, 600 230, 700 230 C 800 230, 800 140, 900 140 C 950 140, 950 130, 1000 130"
              stroke="#8BC34A"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {/* Các mốc thành tựu */}
          {ACHIEVEMENTS.map((item, index) => {
            const pos = POSITIONS[index];
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className="absolute flex items-center justify-center cursor-pointer"
                style={{
                  left: `${pos.xPercent}%`,
                  top: pos.y,
                  transform: 'translate(-50%, -50%)',
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Năm (nằm tuyệt đối phía trên chấm) */}
                <motion.div
                  className="absolute bottom-[calc(100%+12px)] flex justify-center w-[150px]"
                >
                  <span className={`text-3xl lg:text-4xl font-extrabold leading-none transition-colors duration-200 ${isHovered ? 'text-[#00724C]' : 'text-[#2D7A3A]'}`}>
                    {item.year}
                  </span>
                </motion.div>

                {/* Chấm tròn (nằm chính giữa toạ độ top/left) */}
                <div className="relative flex items-center justify-center">
                  {/* Vòng lan tỏa (pulse) khi hover */}
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0.6, scale: 1 }}
                      animate={{ opacity: [0.6, 0], scale: [1, 3] }}
                      transition={{ duration: 1.2, repeat: Infinity }}
                      className="absolute w-4 h-4 rounded-full bg-[#4CAF50]"
                    />
                  )}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.6 : 1,
                      backgroundColor: isHovered ? '#00724C' : '#8BC34A',
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-4 h-4 rounded-full z-10 shadow-md"
                  />
                </div>

                {/* Cúp và Mô tả (nằm tuyệt đối phía dưới chấm) */}
                <div className="absolute top-[calc(100%+16px)] flex flex-col items-center w-[180px]">
                  <motion.div
                    animate={{ y: isHovered ? -3 : 0, scale: isHovered ? 1.15 : 1 }}
                    transition={{ duration: 0.25 }}
                    className={`mb-2 transition-colors duration-200 ${isHovered ? 'text-[#00724C]' : 'text-[#4CAF50]'}`}
                  >
                    <Trophy size={26} strokeWidth={1.5} />
                  </motion.div>

                  <p
                    className={`text-center text-xs lg:text-sm whitespace-pre-line leading-relaxed transition-colors duration-200 ${isHovered ? 'text-[#00724C] font-semibold' : 'text-[#444444]'}`}
                  >
                    {item.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* === MOBILE: Dạng thẻ dọc === */}
        <div className="lg:hidden flex flex-col gap-8 mt-8">
          {ACHIEVEMENTS.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-[#F5FBF5] p-5 rounded-2xl border border-[#E8F5E9]"
            >
              {/* Chấm + đường dọc */}
              <div className="flex flex-col items-center pt-1">
                <div className="w-3.5 h-3.5 rounded-full bg-[#4CAF50] shadow-md" />
                {index < ACHIEVEMENTS.length - 1 && (
                  <div className="w-0.5 h-14 bg-[#C8E6C9] mt-1" />
                )}
              </div>
              {/* Nội dung */}
              <div>
                <span className="text-xl font-extrabold text-[#00724C]">{item.year}</span>
                <Trophy size={18} className="inline-block ml-2 text-[#4CAF50] -mt-1" />
                <p className="text-sm text-[#444444] mt-1 whitespace-pre-line leading-relaxed">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
