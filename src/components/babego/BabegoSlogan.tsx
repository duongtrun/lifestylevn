'use client';

// File: src/components/babego/BabegoSlogan.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Section Slogan cuối trang với khung viền hình oval, logo và mascot.
// Dùng khi: Nằm ở phần kết luận của trang Babego trước khi xuống Footer.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BabegoSlogan() {
  return (
    <section className="w-full bg-[#FAFAFA] py-10 flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1000px] px-4 flex justify-center items-center min-h-[440px] lg:w-[1000px] lg:h-[420px]">

        {/* Khung viền vẽ tay (Oval) - Giao diện Desktop & iPad Landscape */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden lg:block">
          <Image
            src="/img_babego/bg_slogan.svg"
            alt="Babego Background Outline Desktop"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Khung viền vẽ tay (Oval) - Giao diện Mobile & iPad Portrait */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block lg:hidden opacity-95">
          <Image
            src="/img_babego/bg_sloggan_mobile.svg"
            alt="Babego Background Outline Mobile"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Mascot nằm chèn lên khung bên phải - Chỉ hiển thị trên Desktop */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 70 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute right-0 xl:right-[-2%] top-1/2 -translate-y-1/2 w-[180px] h-[240px] xl:w-[410px] xl:h-[500px] z-20 pointer-events-none hidden xl:block"
        >
          {/* <Image 
            src="/img_babego/babego_mascot_2.webp" 
            alt="Babego Mascot" 
            fill 
            className="object-contain" 
            priority
          /> */}
        </motion.div>

        {/* Nội dung Slogan */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative lg:absolute lg:inset-0 z-10 flex flex-col items-center justify-center text-center px-14 sm:px-12 lg:px-16 py-4 lg:py-0"
        >
          {/* Logo Babego Gold */}
          <div className="relative w-[96px] h-[48px] lg:w-[120px] lg:h-[54px] mb-2 lg:mb-3">
            <Image 
              src="/img_babego/slogan_logo.webp" 
              alt="Babego Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm sm:text-base lg:text-2xl font-bold text-[#444444] mb-2 lg:mb-3 max-w-[210px] sm:max-w-[280px] lg:max-w-none">
            Babego Gold – Tiêu hóa vững vàng, tăng cân dễ dàng
          </h2>

          {/* Lời hứa */}
          <p className="text-[11px] sm:text-xs lg:text-base text-[#444444] max-w-[190px] sm:max-w-[260px] lg:max-w-[700px] leading-relaxed lg:leading-loose">
            Mỗi đứa trẻ là một hành trình phát triển riêng biệt. Dinh dưỡng không chỉ là năng lượng, mà là nền tảng cho tương lai của con. Babego được tạo ra để nâng đỡ hành trình ấy bằng sự an toàn, khoa học và thấu hiểu thể trạng trẻ Việt.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
