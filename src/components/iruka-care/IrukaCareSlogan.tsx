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
    <section className="w-full bg-white py-16 md:py-24 flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1000px] px-4 flex justify-center items-center min-h-[440px] md:min-h-[640px] xl:min-h-[420px]">

        {/* Khung viền vẽ tay - Giao diện Desktop */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden xl:block opacity-90">
          {/* Tạm dùng lại khung viền của Iruka Edu vì thiết kế giống hệt */}
          <Image
            src="/img_iruka_care/bg_slogan.svg"
            alt="Iruka Care Background Outline Desktop"
            fill
            className="object-contain filter hue-rotate-[15deg] contrast-125"
            priority
          />
        </div>

        {/* Khung viền vẽ tay - Giao diện Mobile */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block xl:hidden opacity-90">
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
          className="relative z-10 flex flex-col items-center text-center px-14 sm:px-12 xl:px-24 py-4 xl:py-6"
        >
          {/* Logo (tạm dùng mascot 1 của Iruka Care) */}
          <div className="relative w-[50px] h-[50px] md:w-[70px] md:h-[70px] mb-2 md:mb-3">
            <Image 
              src="/img_iruka_care/logo.webp" 
              alt="Iruka Care Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm md:text-sm xl:text-2xl font-bold text-[#333333] mb-2 xl:mb-3 max-w-[190px] sm:max-w-[220px] md:max-w-[250px] xl:max-w-none">
            iruKa Care – An toàn chạm đến từng khoảnh khắc
          </h2>

          {/* Lời hứa */}
          <p className="text-xs md:text-[11px] xl:text-base text-[#333333] max-w-[190px] sm:max-w-[230px] md:max-w-[250px] xl:max-w-[700px] leading-relaxed xl:leading-loose">
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
