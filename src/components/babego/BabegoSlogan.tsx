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
    <section className="w-full bg-[#FAFAFA] py-16 md:py-24 flex justify-center items-center overflow-hidden">
      <div className="relative w-full max-w-[1000px] px-4 flex justify-center items-center min-h-[420px] md:min-h-[400px]">
        
        {/* Khung viền vẽ tay (Oval) - Giao diện Desktop */}
        <div className="absolute inset-0 w-[90%] lg:w-[80%] h-full z-0 pointer-events-none mx-auto opacity-100 hidden md:block">
          <Image 
            src="/img_babego/bg_slogan.svg" 
            alt="Babego Background Outline Desktop" 
            fill 
            className="object-contain" 
            priority
          />
        </div>

        {/* Khung viền vẽ tay (Oval) - Giao diện Mobile */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block md:hidden opacity-95">
          <Image 
            src="/img_iruka_edu/bg_slogan_moblie.svg" 
            alt="Babego Background Outline Mobile" 
            fill 
            className="object-contain filter hue-rotate-[290deg] saturate-[1.6] brightness-[0.7]" 
            priority
          />
        </div>

        {/* Mascot nằm chèn lên khung bên phải - Chỉ hiển thị trên Desktop */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 70 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute right-0 lg:right-[-2%] top-1/2 -translate-y-1/2 w-[180px] h-[240px] lg:w-[410px] lg:h-[500px] z-20 pointer-events-none hidden lg:block"
        >
          <Image 
            src="/img_babego/babego_mascot_2.webp" 
            alt="Babego Mascot" 
            fill 
            className="object-contain" 
          />
        </motion.div>

        {/* Nội dung Slogan */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center text-center px-14 sm:px-12 md:px-16 lg:px-28 py-14 md:py-16 mt-4 w-full md:w-[85%] lg:w-[80%]"
        >
          {/* Logo Babego Gold */}
          <div className="relative w-[120px] h-[60px] md:w-[180px] md:h-[80px] mb-4 md:mb-6">
            <Image 
              src="/img_babego/slogan_logo.webp" 
              alt="Babego Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm sm:text-base md:text-[20px] font-bold text-[#444444] mb-3 md:mb-5 max-w-[220px] sm:max-w-none">
            Babego Gold – Tiêu hóa vững vàng, tăng cân dễ dàng
          </h2>

          {/* Lời hứa */}
          <p className="text-[11px] sm:text-sm md:text-[15px] text-[#444444] max-w-[190px] sm:max-w-[400px] md:max-w-[650px] leading-relaxed md:leading-loose">
            Mỗi đứa trẻ là một hành trình phát triển riêng biệt. Dinh dưỡng không chỉ là năng lượng, mà là nền tảng cho tương lai của con. Babego được tạo ra để nâng đỡ hành trình ấy bằng sự an toàn, khoa học và thấu hiểu thể trạng trẻ Việt.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
