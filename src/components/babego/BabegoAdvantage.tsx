'use client';

// File: src/components/babego/BabegoAdvantage.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Section "Lợi thế cạnh tranh của Babego" hiển thị 4 thẻ bài.
// Dùng khi: Ở phần cuối của trang Babego.

import React from 'react';
import { motion } from 'framer-motion';

const ADVANTAGES = [
  {
    title: "Công thức phù hợp đặc thù trẻ Việt",
    desc: "Không chạy theo công thức Tây, Babego nghiên cứu dựa trên thể trạng trẻ Việt"
  },
  {
    title: "Hiệu quả thực tế – phản hồi tích cực từ hàng nghìn mẹ",
    desc: "Babego được lan tỏa nhờ trải nghiệm thực, không phải quảng cáo phóng đại."
  },
  {
    title: "Giá thành hợp lý, tiếp cận nhiều gia đình",
    desc: "Babego đem đến giá trị thực – không “hô giá cao” như nhiều hàng nhập khẩu."
  },
  {
    title: "Nằm trong hệ sinh thái LifeStyle Việt Nam",
    desc: "Nó là một phần của hệ sinh thái Mẹ & Bé toàn diện. Điều này tạo khác biệt lớn so với các sản phẩm chỉ bán đơn lẻ ngoài thị trường."
  }
];

export default function BabegoAdvantage() {
  return (
    <section className="relative w-full bg-white py-10 overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Title Box - bám sát lề trái */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#6FBD44] inline-block py-5 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-[calc((100vw-1100px)/2)] mb-16 shadow-md rounded-r-md"
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-white">
            Lợi thế cạnh tranh của Babego
          </h2>
        </motion.div>

        {/* Cards Container */}
        <div className="container mx-auto px-6 md:px-4 max-w-[1100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {ADVANTAGES.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative w-full"
              >
                {/* Thẻ viền xanh */}
                <div className="relative h-full min-h-[160px] lg:min-h-[180px] bg-white border-[2px] border-[#6FBD44] rounded-lg flex flex-col p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-[#444444] font-semibold text-sm md:text-base leading-snug whitespace-pre-line mb-3">
                    {item.title}
                  </h3>
                  <p className="text-[#666666] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                  {/* Chấm tròn xanh ở góc trên bên trái */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-[#6FBD44] shadow-sm" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
