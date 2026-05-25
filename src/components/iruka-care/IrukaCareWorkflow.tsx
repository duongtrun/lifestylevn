'use client';

// File: src/components/iruka-care/IrukaCareWorkflow.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Hiển thị 4 bước "iruKa Care hoạt động như thế nào?"
// Dùng khi: Nằm ngay dưới phần "Vì sao xây dựng".

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const workflowData = [
  {
    id: 1,
    title: 'Công thức sạch',
    desc: 'Ưu tiên thành phần tự nhiên, không chứa các chất có nguy cơ gây kích ứng.',
    icon: '/img_iruka_care/iruka_care_chemistry.svg'
  },
  {
    id: 2,
    title: 'Công nghệ sinh học\n& tiêu chuẩn Nhật - Châu Âu',
    desc: 'Áp dụng những hoạt chất kháng khuẩn - làm sạch - dưỡng da nhẹ nhàng, phù hợp với chuẩn an toàn quốc tế.',
    icon: '/img_iruka_care/iruka_care_banh_rang.svg'
  },
  {
    id: 3,
    title: 'Kiểm nghiệm nghiêm ngặt',
    desc: 'Mỗi sản phẩm được kiểm định nghiêm ngặt, nhiều lần.',
    icon: '/img_iruka_care/iruka_care_laptop.webp'
  },
  {
    id: 4,
    title: 'Thiết kế dễ dùng -\ndễ mang theo - tiện lợi mỗi ngày',
    desc: 'Khuyến khích trẻ tự học thói quen vệ sinh: rửa tay - làm sạch - bảo vệ bản thân.',
    icon: '/img_iruka_care/iruka_care_achieve.webp'
  }
];

export default function IrukaCareWorkflow() {
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#6CC4E8] overflow-hidden">
      {/* Ảnh nền mờ - workflow_blur.svg */}
      <div className="absolute inset-0 z-0 opacity-100 mix-blend-overlay pointer-events-none">
        <Image
          src="/img_iruka_care/workflow_blur.svg"
          alt="Workflow Background"
          fill
          className="object-cover"
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-[1200px]">
        {/* Tiêu đề */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#005A8C] text-center mb-16 md:mb-24 drop-shadow-sm"
        >
          iruKa Care hoạt động như thế nào?
        </motion.h2>

        {/* Flex layout cho 4 bước */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-6 md:gap-4 lg:gap-8">
          {workflowData.map((item, index) => (
            <React.Fragment key={item.id}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="flex flex-col items-center text-center w-full md:w-1/4 max-w-[280px] mx-auto relative"
              >
                {/* Khối Icon chữ nhật bo tròn */}
                <div className="w-[140px] h-[100px] md:w-[150px] md:h-[110px] lg:w-[160px] lg:h-[120px] bg-white rounded-3xl shadow-lg flex items-center justify-center mb-6 p-4 transform hover:-translate-y-2 transition-transform duration-300 relative z-10 border-2 border-white/80">
                  <div className="relative w-full h-full">
                    <Image
                      src={item.icon}
                      alt={item.title.replace('\n', ' ')}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text Nội dung */}
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-[#005A8C] mb-3 whitespace-pre-line drop-shadow-sm min-h-[40px] md:min-h-[60px] flex items-end justify-center">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#273F68] leading-relaxed font-medium px-2">
                  {item.desc}
                </p>
              </motion.div>

              {/* Mũi tên chỉ đường (chỉ hiển thị Desktop) */}
              {index < workflowData.length - 1 && (
                <div className="hidden md:flex flex-1 items-center justify-center mt-[40px] lg:mt-[50px] opacity-80">
                  <div className="w-full flex items-center">
                    <div className="w-2 h-2 rounded-full bg-[#005A8C]/80 shadow-sm"></div>
                    <div className="flex-1 border-t-2 border-dashed border-[#005A8C]/60 mx-1 shadow-sm"></div>
                    <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-[#005A8C]/80 border-b-[5px] border-b-transparent drop-shadow-sm"></div>
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
