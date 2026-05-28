'use client';

// File: src/components/iruka-care/IrukaCareHero.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Section mở đầu (Hero) của trang Iruka Care
// Dùng khi: Hiển thị ngay đầu trang, giới thiệu tổng quan về Iruka Care.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaCareHero() {
  return (
    <section className="relative w-full h-[100svh] min-h-[600px] lg:min-h-[800px] flex items-center justify-center overflow-hidden pt-[60px] md:pt-[80px]">
      
      {/* Background Banner - Phủ kín section, nằm dưới header */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          maskImage: "linear-gradient(to bottom, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 90%, transparent 100%)"
        }}
      >
        <Image
          src="/img_iruka_care/iruka_banner.png"
          alt="Iruka Care Banner Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Nội dung nằm chính giữa banner */}
      <div className="relative z-10 w-full flex justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="relative w-[90%] md:w-[70%] lg:w-[60%] max-w-[900px] aspect-[16/9] md:aspect-[21/9] flex items-center justify-center"
        >
          {/* Ảnh Blur Banner làm background cho khối chữ */}
          <Image 
            src="/img_iruka_care/iruka_care_blur_banner.svg" 
            alt="Iruka Care Blur Background" 
            fill 
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]" 
            priority
          />

          {/* Nội dung text nằm trong khung blur */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20">
            <h1 className="text-[28px] sm:text-[36px] md:text-[44px] lg:text-[64px] font-extrabold uppercase leading-[1.2] tracking-normal text-white mb-2 md:mb-4 drop-shadow-md">
              IRUKA CARE
            </h1>
            
            <h2 className="text-[11px] sm:text-xs md:text-sm lg:text-xl font-semibold text-white tracking-wide drop-shadow-md max-w-[200px] sm:max-w-[320px] md:max-w-[400px] lg:max-w-2xl">
              GIẢI PHÁP VỆ SINH & AN TOÀN CHO TRẺ <br></br> TỪ SƠ SINH
            </h2>
          </div>
        </motion.div>
      </div>

    </section>
  );
}
