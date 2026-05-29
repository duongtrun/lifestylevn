'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// File: src/components/careers/CareersHero.tsx
// Luồng: Trang Tuyển dụng (/tuyen-dung)
// Vai trò: Client Component quản lý Banner Hero, tích hợp các hiệu ứng chuyển động mượt mà (framer-motion).
//          Bao gồm Breadcrumb, Tiêu đề lớn căn trái, và Logo overlay trung tâm.

export default function CareersHero() {
  return (
    <section className="relative w-full h-[80vh] min-h-[660px] lg:h-[85vh] lg:min-h-[720px] flex flex-col pt-24 md:pt-28 lg:pt-32 overflow-hidden bg-neutral-900 select-none">
      
      {/* ===== Ảnh banner nền — tự thích ứng (Responsive) ===== */}
      <div className="absolute inset-0 z-0 bg-[#EEF8FC]">
        {/* Banner dành riêng cho di động */}
        <Image
          src="/img_recruit/recruit_banner_mobile.png"
          alt="Banner tuyển dụng di động"
          fill
          className="object-cover object-center md:hidden"
          priority
        />
        {/* Banner dành riêng cho máy tính */}
        <Image
          src="/img_recruit/recruit_banner.png"
          alt="Banner tuyển dụng máy tính"
          fill
          className="object-cover object-center hidden md:block"
          priority
        />
      </div>

      {/* ===== Lớp phủ gradient — đậm ở dưới để chữ nổi ===== */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

      {/* ===== Thanh màu xanh ngang nhỏ ở cạnh trái (trang trí) ===== */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 top-[15%] w-[5px] h-[40%] bg-[#008BBD] z-20 origin-top rounded-r-full"
      />

      {/* ===== Logo overlay — đặt giữa trung tâm banner, hiệu ứng zoom nhẹ + floating nhè nhẹ ===== */}
      <div className="absolute inset-0 z-15 flex items-start justify-center pt-15 md:items-center md:pt-0 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1] // Custom ease-out
          }}
          className="w-[60%] sm:w-[45%] md:w-[35%] lg:w-[27%] h-auto flex items-center justify-center"
        >
          <motion.img
            animate={{ 
              y: [0, -10, 0] // Floating effect
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            src="/img_recruit/recruit_logo.webp"
            alt="Logo tuyển dụng IruKa — Cùng kiến tạo tương lai"
            className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,139,189,0.3)]"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* ===== Nội dung văn bản ===== */}
      <div className="relative z-20 container mx-auto px-4 mt-auto pb-[160px] md:pb-[180px] lg:pb-[200px] space-y-5">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 text-white/60 text-sm font-medium"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 opacity-50" />
          <span className="text-white font-semibold">Tuyển dụng</span>
        </motion.div>

        {/* Tiêu đề chính "TUYỂN DỤNG" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.0] tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
        >
          TUYỂN{' '}
          <span className="">
            <br />
            DỤNG
          </span>
        </motion.h1>

        {/* Đường kẻ trang trí + tagline */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex items-center gap-4"
        >
          <div className="h-[2px] w-12 bg-[#008BBD] rounded-full"></div>
          <p className="text-white text-sm md:text-base font-medium tracking-wide">
            Gia nhập đội ngũ LifeStyle Việt Nam để cùng kiến tạo giá trị nhân văn cho thế hệ tương lai
          </p>
        </motion.div>
      </div>
    </section>
  );
}
