'use client';

// File: src/components/iruka-edu/IrukaEduSlogan.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section Slogan cuối trang với khung viền vẽ tay (bg_iruka_edu.webp) và Logo.
// Dùng khi: Nằm ở phần kết luận của trang Iruka EDU trước khi xuống Footer.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaEduSlogan() {
  return (
    <section className="w-full bg-white py-10 flex justify-center items-center overflow-hidden">
      {/* Tăng min-h trên mobile và iPad lên 440px để hình tròn có đủ chiều cao chứa chữ bên trong */}
      <div className="relative w-full max-w-[1000px] px-4 flex justify-center items-center min-h-[440px] md:min-h-[640px] xl:min-h-[420px]">

        {/* Khung viền vẽ tay - Giao diện Desktop */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none hidden xl:block">
          <Image
            src="/img_iruka_edu/bg_iruka_edu.svg"
            alt="Iruka Edu Background Outline Desktop"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Khung viền vẽ tay - Giao diện Mobile & iPad */}
        <div className="absolute inset-0 w-full h-full z-0 pointer-events-none block xl:hidden">
          <Image
            src="/img_iruka_edu/bg_slogan_moblie.svg"
            alt="Iruka Edu Background Outline Mobile"
            fill
            className="object-contain"
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
          {/* px-14 trên mobile đẩy chữ vào vùng an toàn của hình tròn (tránh phần cong cắt góc) */}
          {/* Logo */}
          <div className="relative w-[72px] h-[54px] md:w-[90px] md:h-[65px] mb-2 md:mb-3">
            <Image 
              src="/img_iruka_edu/logo.svg" 
              alt="Iruka Edu Logo" 
              fill 
              className="object-contain" 
            />
          </div>

          {/* Tiêu đề */}
          <h2 className="text-sm sm:text-base md:text-sm xl:text-2xl font-bold text-[#333333] mb-2 xl:mb-3 max-w-[230px] sm:max-w-[280px] md:max-w-[250px] xl:max-w-none">
            iruKa Edu – Học theo cách của con
          </h2>

          {/* Lời hứa */}
          {/* max-w-[190px] trên mobile để chữ không chạm viền cong của hình tròn */}
          <p className="text-[11px] sm:text-xs md:text-[11px] xl:text-base text-gray-600 max-w-[190px] sm:max-w-[260px] md:max-w-[250px] xl:max-w-[700px] leading-relaxed xl:leading-loose">
            Đó không chỉ là slogan, mà là triết lý sống của dự án — cũng là lời
            hứa của chúng tôi gửi đến mỗi gia đình và mỗi đứa trẻ.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
