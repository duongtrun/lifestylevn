'use client';

// File: src/components/iruka-care/IrukaCareProduct.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Hiển thị danh sách sản phẩm / lộ trình sản phẩm iruKa Care
// Dùng khi: Nằm ngay dưới phần Công nghệ sinh học & Tiêu chuẩn

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const productTimelineData = [
  {
    year: '2026',
    title: 'Sản phẩm cốt lõi',
    items: [
      'Xịt sâu răng',
      'Kem đánh răng bọt cho bé',
      'Xịt tắm khô',
      'Xịt kháng khuẩn đa năng'
    ]
  },
  {
    year: '2027',
    title: 'Hệ sinh thái hoàn chỉnh',
    items: [
      'Xịt chống muỗi',
      'Miếng dán chống muỗi',
      'Xịt chống côn trùng',
      'Khăn dùng 1 lần',
      'Nước giặt kháng khuẩn hữu cơ',
      'Gel rửa tay dịu nhẹ',
      'Xịt họng trẻ nhỏ',
      'Bộ vệ sinh đồ chơi – bình sữa'
    ]
  }
];

export default function IrukaCareProduct() {
  return (
    <section className="relative w-full py-10 bg-gradient-to-b from-[#E6F4F9] to-[#80CBE5] overflow-hidden flex flex-col items-center min-h-[800px]">
      {/* Ảnh nền mờ - iruka_care_product_blur.svg */}
      <div className="absolute inset-0 z-0 opacity-100 mix-blend-overlay pointer-events-none flex items-center justify-center">
        <Image
          src="/img_iruka_care/iruka_care_product_blur.svg"
          alt="Product Background"
          fill
          className="object-cover opacity-60 md:opacity-100"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-[1000px] flex flex-col items-center">
        {/* Tiêu đề */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-20"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#1A5298]">
            Bộ sản phẩm iruKa Care
          </h2>
        </motion.div>

        {/* Danh sách 2 năm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 w-full">
          {productTimelineData.map((data, index) => (
            <motion.div
              key={data.year}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center w-full"
            >
              {/* Box Năm */}
              <div className="bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-3 px-12 mb-8 inline-block">
                <h3 className="text-2xl md:text-3xl font-extrabold text-[#1A5298]">
                  {data.year}
                </h3>
              </div>

              {/* Card nội dung */}
              <div className="bg-white rounded-[16px] shadow-[0_10px_30px_rgba(0,0,0,0.08)] p-8 md:p-10 w-full min-h-[250px] md:min-h-[350px]">
                <h4 className="text-[#4A5568] font-bold text-base md:text-lg mb-4">
                  {data.title}
                </h4>
                <ul className="space-y-3">
                  {data.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-[#4A5568] mr-3 mt-1 text-xs md:text-sm">●</span>
                      <span className="text-[#4A5568] font-medium text-sm md:text-base leading-snug">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
