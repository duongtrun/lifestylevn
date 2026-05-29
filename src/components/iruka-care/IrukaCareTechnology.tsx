'use client';

// File: src/components/iruka-care/IrukaCareTechnology.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Hiển thị phần Công nghệ sinh học & Tiêu chuẩn
// Dùng khi: Ngay dưới phần Workflow.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const techData = [
  {
    id: 1,
    desc: 'Ứng dụng khoa học chăm sóc da trẻ em theo tiêu chuẩn môi trường Châu Á',
    icon: '/img_iruka_care/AI_img.webp' // Có thể cập nhật lại icon đúng nếu có
  },
  {
    id: 2,
    desc: 'Hiệu quả được kiểm chứng - không quảng cáo phóng đại',
    icon: '/img_iruka_care/analyst_img.webp' // Chart icon
  },
  {
    id: 3,
    desc: 'An toàn ở cấp độ cao nhất - từ thành phần đến quy trình sản xuất',
    icon: '/img_iruka_care/shield_img.webp'
  },
  {
    id: 4,
    desc: 'Công thức được phát triển riêng cho trẻ sơ sinh & trẻ nhỏ',
    icon: '/img_iruka_care/professional_img.webp'
  },
  {
    id: 5,
    desc: 'Định hướng phát triển đồng bộ thành hệ sản phẩm trọn gói',
    icon: '/img_iruka_care/recycle.svg'
  },
  {
    id: 6,
    desc: 'Cam kết minh bạch: nói thật - làm thật - công bố rõ ràng tiêu chuẩn chất lượng',
    icon: '/img_iruka_care/shield_img.webp'
  }
];

export default function IrukaCareTechnology() {
  return (
    <section className="relative w-full py-12 md:py-16 lg:py-20 overflow-hidden flex flex-col items-center">
      {/* Background Tech - Phủ toàn bộ section, không có nền trắng */}
      <div className="absolute inset-0 z-0 bg-[#0F2A4A]"> {/* Màu nền dự phòng nếu hình chưa load */}
        <Image
          src="/img_iruka_edu/tech_different.svg"
          alt="Technology Background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* Title box (stick to left) */}
      <div className="relative z-10 w-full mb-8 md:mb-10 mt-4 md:mt-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white inline-block py-4 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-32 mb-6 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#005A8C]">
            Nền tảng công nghệ và điểm khác biệt
          </h2>
        </motion.div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-[1200px]">
        {/* 6 Tech Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 w-full">
          {techData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative rounded-[6px] overflow-hidden flex flex-col items-center text-center p-6 md:p-8 min-h-[220px] justify-center border border-white/10 hover:-translate-y-2 transition-transform duration-300 shadow-xl"
            >
              {/* Card Background: bg_text_tech.svg */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/img_iruka_care/bg_text_tech.svg"
                  alt="Card Background"
                  fill
                  className="object-cover"
                />
              </div>

              {/* Card Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-[50px] h-[50px] md:w-[64px] md:h-[64px] mb-4 relative drop-shadow-md">
                  <Image
                    src={item.icon}
                    alt="Tech Icon"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-sm md:text-base text-white leading-relaxed font-medium whitespace-pre-line drop-shadow-sm px-2">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
