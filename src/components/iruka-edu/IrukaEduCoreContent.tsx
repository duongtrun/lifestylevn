'use client';

// File: src/components/iruka-edu/IrukaEduCoreContent.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "Nội dung giáo dục cốt lõi của iruKa Edu" hiển thị 5 hình tròn.
// Dùng khi: Nằm ngay dưới phần Nền tảng công nghệ.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const coreData = [
  {
    id: 1,
    title: "Tư duy – Logic\nToán học",
    icon: "/img_iruka_edu/brain_img.webp"
  },
  {
    id: 2,
    title: "Ngôn ngữ &\nTừ vựng",
    icon: "/img_iruka_edu/book_img.svg"
  },
  {
    id: 3,
    title: "Kỹ năng mềm\nSáng tạo",
    icon: "/img_iruka_edu/idea_img.svg"
  },
  {
    id: 4,
    title: "Kỹ năng cảm xúc\nHành vi",
    icon: "/img_iruka_edu/face_img.svg"
  },
  {
    id: 5,
    title: "Kiến thức đời sống\nThế giới quan",
    icon: "/img_iruka_edu/world_img.svg"
  }
];

export default function IrukaEduCoreContent() {
  return (
    <section className="relative w-full overflow-hidden py-10">
      {/* Background kết hợp ảnh blur và dải gradient xanh xuống trắng */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#7EC8E3] via-[#C9EAF3] to-white -z-10" />
        <Image
          src="/img_iruka_edu/workflow_blur.svg"
          alt="Blur Background"
          fill
          className="object-cover object-top opacity-50 mix-blend-multiply"
          style={{ maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12 md:mb-16 drop-shadow-md"
        >
          Nội dung giáo dục cốt lõi của iruKa Edu
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-10">
          {coreData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center w-[140px] md:w-[160px] lg:w-[180px]"
            >
              {/* Vòng tròn */}
              <div className="w-[140px] h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px] rounded-full bg-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center p-4 transform hover:-translate-y-2 transition-transform duration-300">
                {/* Icon ảnh */}
                <div className="relative w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[70px] lg:h-[70px] mb-2 md:mb-3">
                  <Image 
                    src={item.icon} 
                    alt={item.title.replace('\n', ' ')} 
                    fill 
                    className="object-contain" 
                  />
                </div>
                {/* Chữ mô tả */}
                <p className="text-[11px] md:text-xs lg:text-sm text-[#273F68] font-bold text-center whitespace-pre-line leading-tight">
                  {item.title}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
