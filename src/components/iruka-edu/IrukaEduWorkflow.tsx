'use client';

// File: src/components/iruka-edu/IrukaEduWorkflow.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "iruKa Edu hoạt động như thế nào?" —
//   Nền xanh (workflow_blur.svg), 4 bước workflow hiển thị theo hàng ngang,
//   mỗi bước gồm icon SVG + mô tả ngắn.
// Dùng khi: Hiển thị ngay dưới section "Vì sao xây dựng iruKa Edu?"

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Dữ liệu 4 bước workflow — mỗi bước gồm icon, tiêu đề và mô tả
const workflowSteps = [
  {
    icon: '/img_iruka_edu/workflow_1.webp',
    title: 'Bước 1',
    description: 'Phụ huynh đăng nhập vào ứng dụng iruKa Edu. Tạo tài khoản cho trẻ học tập.',
  },
  {
    icon: '/img_iruka_edu/workflow_3.webp',
    title: 'Bước 2',
    description: 'AI phân tích năng lực ban đầu và hành vi học của trẻ. Cá nhân hóa lộ trình học tập.',
  },
  {
    icon: '/img_iruka_edu/workflow_4.webp',
    title: 'Bước 3',
    description: 'Bài học được truyền tải qua mini-game giáo dục, hình ảnh sinh động, âm thanh hấp dẫn.',
  },
  {
    icon: '/img_iruka_edu/workflow_2.webp',
    title: 'Bước 4',
    description: 'Sau mỗi bài, hệ thống lưu tiến trình và tạo báo cáo cho phụ huynh theo dõi.',
  },
];

export default function IrukaEduWorkflow() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Ảnh nền xanh blur full-width được làm mờ viền để không bị kẻ vạch */}
      <div 
        className="absolute inset-0 z-0 opacity-80"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      >
        <Image
          src="/img_iruka_edu/workflow_blur.svg"
          alt="Workflow Background"
          fill
          className="object-cover"
        />
      </div>

      {/* Nội dung */}
      <div className="relative z-10 container mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-32">
        {/* Tiêu đề */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#273F68] text-center mb-14 md:mb-20"
        >
          iruKa Edu hoạt động như thế nào?
        </motion.h2>

        {/* 4 bước workflow — hàng ngang trên desktop, 2x2 trên mobile */}
        <div className="flex flex-wrap md:flex-nowrap justify-center md:justify-between items-start gap-y-10 md:gap-y-0 max-w-6xl mx-auto">
          {workflowSteps.map((step, index) => (
            <React.Fragment key={step.title}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center w-1/2 md:w-auto md:flex-1 px-2"
              >
                {/* Icon workflow */}
                <div className="relative w-[120px] h-[100px] md:w-[130px] md:h-[110px] lg:w-[180px] lg:h-[140px] mb-5">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Mô tả */}
                <p className="text-xs md:text-sm text-black/85 leading-relaxed max-w-[220px]">
                  {step.description}
                </p>
              </motion.div>

              {/* Mũi tên nối (Chỉ hiện trên màn hình md trở lên) */}
              {index < workflowSteps.length - 1 && (
                <div className="hidden md:flex flex-col items-center pt-[50px] lg:pt-[70px] w-[30px] lg:w-[50px] xl:w-[70px] flex-shrink-0">
                  <div className="flex items-center w-full">
                    {/* Chấm tròn */}
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 rounded-full bg-[#273F68]" />
                    {/* Đường gạch đứt */}
                    <div className="flex-1 h-0 border-t-2 border-dashed border-[#273F68] mx-1" />
                    {/* Mũi tên (Tam giác) */}
                    <div className="w-0 h-0 border-t-[4px] border-b-[4px] border-l-[6px] lg:border-t-[5px] lg:border-b-[5px] lg:border-l-[8px] border-transparent border-l-[#273F68]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
