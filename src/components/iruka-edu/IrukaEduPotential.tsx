'use client';

// File: src/components/iruka-edu/IrukaEduPotential.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "Tại sao iruKa Edu có tiềm năng phát triển mạnh?" hiển thị 5 thẻ bài.
// Dùng khi: Nằm ở phần dưới cùng của trang Iruka EDU (sau nội dung cốt lõi).

import React from 'react';
import { motion } from 'framer-motion';

const potentialData = [
  "Xu hướng giáo dục\nsớm bùng nổ",
  "Khoảng trống lớn\ntrong thị trường",
  "Nhu cầu học tập tại\nnhà tăng cao",
  "Lợi thế tham gia\ncuộc thi công nghệ\ntại Nhật",
  "Hệ sinh thái hỗ trợ\nlẫn nhau"
];

export default function IrukaEduPotential() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      {/* Title Box - bám sát lề trái */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#008BBD] inline-block py-5 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-32 mb-16 shadow-md rounded-r-md"
      >
        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white">
          Tại sao iruKa Edu có tiềm năng phát triển mạnh?
        </h2>
      </motion.div>

      {/* Cards Container */}
      <div className="container mx-auto px-6 md:px-10 max-w-[1400px]">
        <div className="flex flex-wrap lg:flex-nowrap justify-center gap-6 lg:gap-8">
          {potentialData.map((text, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative w-full sm:w-[calc(50%-12px)] md:w-[calc(33.33%-16px)] lg:flex-1"
            >
              {/* Thẻ viền xanh */}
              <div className="relative h-full min-h-[140px] bg-white border-[2px] border-[#008BBD] rounded-lg flex items-center justify-center p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-[#008BBD] font-medium text-center text-sm lg:text-base leading-relaxed whitespace-pre-line">
                  {text}
                </p>
                {/* Chấm tròn xanh ở góc trên bên trái */}
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#008BBD] shadow-sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
