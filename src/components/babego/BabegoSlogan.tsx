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
      <div className="relative w-full max-w-[1100px] px-4 flex justify-center items-center min-h-[440px] md:min-h-[640px] xl:min-h-[420px]">

        {/* Khung viền vẽ tay (Oval) - Giao diện Desktop */}
        <div className="absolute inset-0 w-[95%] xl:w-[85%] h-full z-0 pointer-events-none mx-auto opacity-100 hidden xl:block">
          <Image
            src="/img_babego/bg_slogan.svg"
            alt="Babego Background Outline Desktop"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Khung viền vẽ tay (Oval) - Giao diện Mobile & iPad */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block xl:hidden opacity-95">
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
          className="relative z-10 flex flex-col items-center text-center px-14 sm:px-12 xl:px-24 py-2 xl:py-3 mt-1.5 w-full xl:w-[80%]"
        >
          {/* Logo Babego Gold */}
          <div className="relative w-[96px] h-[48px] md:w-[130px] md:h-[58px] mb-1.5 md:mb-2">
            <Image 
              src="/img_babego/slogan_logo.webp" 
              alt="Babego Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm sm:text-base md:text-sm xl:text-2xl font-bold text-[#444444] mb-2 xl:mb-3 max-w-[210px] sm:max-w-[280px] md:max-w-[250px] xl:max-w-none">
            Babego Gold – Tiêu hóa vững vàng, tăng cân dễ dàng
          </h2>

          {/* Lời hứa */}
          <p className="text-[11px] sm:text-xs md:text-[11px] xl:text-base text-[#444444] max-w-[190px] sm:max-w-[260px] md:max-w-[250px] xl:max-w-[700px] leading-relaxed xl:leading-loose">
            Mỗi đứa trẻ là một hành trình phát triển riêng biệt. Dinh dưỡng không chỉ là năng lượng, mà là nền tảng cho tương lai của con. Babego được tạo ra để nâng đỡ hành trình ấy bằng sự an toàn, khoa học và thấu hiểu thể trạng trẻ Việt.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
