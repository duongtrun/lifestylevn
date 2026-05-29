'use client';

// File: src/components/iruka-care/IrukaCareSlogan.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Section Slogan cuối trang với khung viền vẽ tay và Logo.
// Dùng khi: Nằm ở phần kết luận của trang Iruka Care trước khi xuống Footer.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaCareSlogan() {
  return (
    <section className="w-full bg-white py-10 flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1000px] px-4 flex justify-center items-center min-h-[440px] lg:w-[1000px] lg:h-[420px]">

        {/* Khung viền vẽ tay - Giao diện Desktop & iPad Landscape */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden lg:block opacity-90">
          {/* Tạm dùng lại khung viền của Iruka Edu vì thiết kế giống hệt */}
          <Image
            src="/img_iruka_care/bg_slogan.svg"
            alt="Iruka Care Background Outline Desktop"
            fill
            className="object-contain filter hue-rotate-[15deg] contrast-125"
            priority
          />
        </div>

        {/* Khung viền vẽ tay - Giao diện Mobile & iPad Portrait */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block lg:hidden opacity-90">
          <Image
            src="/img_iruka_edu/bg_slogan_moblie.svg"
            alt="Iruka Care Background Outline Mobile"
            fill
            className="object-contain filter hue-rotate-[15deg] contrast-125"
            priority
          />
        </div>

        {/* Nội dung Slogan */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative lg:absolute lg:inset-0 z-10 flex flex-col items-center justify-center text-center px-14 sm:px-12 lg:px-16 py-4 lg:py-0"
        >
          {/* Logo (tạm dùng mascot 1 của Iruka Care) */}
          <div className="relative w-[50px] h-[50px] lg:w-[70px] lg:h-[70px] mb-2 lg:mb-3">
            <Image 
              src="/img_iruka_care/logo.webp" 
              alt="Iruka Care Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm sm:text-base lg:text-2xl font-bold text-[#333333] mb-2 lg:mb-3 max-w-[210px] sm:max-w-[280px] lg:max-w-none">
            iruKa Care – An toàn chạm đến từng khoảnh khắc
          </h2>

          {/* Lời hứa */}
          <p className="text-xs sm:text-xs lg:text-base text-[#333333] max-w-[190px] sm:max-w-[260px] lg:max-w-[700px] leading-relaxed lg:leading-loose">
            Mỗi đứa trẻ đều lớn lên từ những khoảnh khắc nhỏ bé: một cái ôm
            sau giờ chơi, đôi bàn tay lấm lem khi khám phá, hay nụ cười giòn tan mà bố mẹ luôn muốn giữ mãi.{" "}
            <span className="font-medium block mt-1.5 md:mt-2 xl:inline xl:mt-0">
              iruKa Care ra đời để bảo vệ những khoảnh khắc ấy – nhẹ nhàng mà trọn vẹn.
            </span>
          </p>
        </motion.div>

      </div>
    </section>
  );
}
