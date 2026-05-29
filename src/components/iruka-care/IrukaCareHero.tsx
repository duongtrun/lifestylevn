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
    <section className="relative w-full overflow-hidden">
      {/* --- Ảnh nền banner full-width --- */}
      <div className="relative w-full h-[650px] md:h-[850px] lg:h-[1000px]">
        <Image
          src="/img_iruka_care/irukacare_banner.svg"
          alt="Iruka Care Banner Background"
          fill
          className="object-cover object-center"
          priority
        />

        {/* --- Overlay nội dung: text trái + mascot phải --- */}
        <div className="absolute inset-0 z-10 flex items-center">
          <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[180px] xl:gap-[300px] mt-0 lg:-mt-[250px]">

            {/* Bên trái: Tiêu đề + tagline */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-lg text-center lg:text-left"
            >
              <h1 className="text-4xl lg:text-8xl font-extrabold text-[#005a8c] leading-tight mb-4 drop-shadow-md">
                IRUKA CARE
              </h1>
              <p className="text-lg lg:text-2xl font-bold text-[#005a8c]/90 uppercase tracking-wide leading-snug drop-shadow-md">
                Giải pháp vệ sinh &amp; an toàn<br />
                cho trẻ từ sơ sinh
              </p>
            </motion.div>

            {/* Bên phải: Mascot mascot_no_bg.png */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-[220px] h-[250px] sm:w-[300px] sm:h-[340px] lg:w-[380px] lg:h-[430px] flex-shrink-0"
            >
              <Image
                src="/img_iruka_care/mascot.svg"
                alt="Iruka Care Mascot"
                fill
                className="object-contain drop-shadow-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
