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
      <div className="relative w-full max-w-[900px] px-4 flex justify-center items-center min-h-[420px] md:min-h-[400px]">
        
        {/* Khung viền vẽ tay - Giao diện Desktop */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden md:block opacity-90">
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
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block md:hidden opacity-90">
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
          className="relative z-10 flex flex-col items-center text-center px-14 sm:px-10 md:px-24 py-14 md:py-16"
        >
          {/* Logo (tạm dùng mascot 1 của Iruka Care) */}
          <div className="relative w-[70px] h-[70px] md:w-[100px] md:h-[100px] mb-4">
            <Image 
              src="/img_iruka_care/logo.webp" 
              alt="Iruka Care Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-[#333333] mb-4 max-w-[200px] md:max-w-none">
            iruKa Care – An toàn chạm đến từng khoảnh khắc
          </h2>

          {/* Lời hứa */}
          <p className="text-xs sm:text-sm md:text-base text-[#333333] max-w-[190px] sm:max-w-[400px] md:max-w-[650px] leading-relaxed md:leading-loose mb-2">
            Mỗi đứa trẻ đều lớn lên từ những khoảnh khắc nhỏ bé: một cái ôm<br className="hidden md:block"/>
            sau giờ chơi, đôi bàn tay lấm lem khi khám phá, hay nụ cười giòn<br className="hidden md:block"/>
            tan mà bố mẹ luôn muốn giữ mãi.
          </p>
          <p className="text-xs sm:text-sm md:text-base text-[#333333] max-w-[190px] sm:max-w-[400px] md:max-w-[650px] leading-relaxed md:leading-loose font-medium">
            iruKa Care ra đời để bảo vệ những khoảnh khắc ấy – nhẹ nhàng mà<br className="hidden md:block"/>
            trọn vẹn.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
