'use client';

// File: src/components/iruka-care/IrukaCarePotential.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Section "Tại sao iruKa Care có tiềm năng phát triển mạnh?" hiển thị 5 thẻ bài.
// Dùng khi: Nằm ở phần dưới cùng của trang Iruka Care (sau phần Product).

import React from 'react';
import { motion } from 'framer-motion';

const potentialData = [
  "Nhu cầu thị trường\nrất lớn nhưng thiếu\nthương hiệu dẫn đầu",
  "Phụ huynh ngày\ncàng ưu tiên tiêu\nchuẩn sạch, hữu cơ,\nlành tính",
  "LifeStyle Việt Nam\nhỗ trợ truyền thông –\nphân phối – niềm tin\nthương hiệu",
  "Sản phẩm có thể mở\nrộng sang thị trường\nquốc tế",
  "Đáp ứng xu hướng\ntoàn cầu: “Lành tính\nnhưng vẫn hiệu quả”"
];

export default function IrukaCarePotential() {
  return (
    <section className="relative w-full bg-gradient-to-b from-[#80CBE5] via-[#E6F4F9] to-white py-16 md:py-24 overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Title Box - bám sát lề trái */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#008BBD] inline-block py-5 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-32 mb-16 shadow-md rounded-r-md"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-white">
            Tại sao iruKa Care có tiềm năng phát triển mạnh?
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
              <div className="relative h-full min-h-[150px] lg:min-h-[160px] bg-white border-[2px] border-[#008BBD] rounded-lg flex items-center justify-center p-4 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                <p className="text-[#008BBD] font-medium text-center text-sm lg:text-[15px] leading-relaxed whitespace-pre-line">
                  {text}
                </p>
                {/* Chấm tròn xanh ở góc trên bên trái */}
                <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#008BBD] shadow-sm" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
