'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

// File: src/components/careers/CareersHero.tsx
// Luồng: Trang Tuyển dụng (/tuyen-dung)
// Vai trò: Client Component quản lý Banner Hero, tích hợp các hiệu ứng chuyển động mượt mà (framer-motion).
//          Bao gồm Breadcrumb, Tiêu đề lớn căn trái, và Logo overlay trung tâm.

export default function CareersHero() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-900 select-none">
      {/* Lớp phủ gradient bên trái để tăng độ tương phản và chiều sâu cho text trắng */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 via-black/25 to-transparent pointer-events-none" 
      />

      {/* Ảnh banner nền — giữ tỷ lệ gốc, tràn full chiều ngang */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="w-full h-auto block"
      >
        <img
          src="/img_recruit/recruit_banner.svg"
          alt="Banner tuyển dụng IruKa Group — hình ảnh đội ngũ và môi trường làm việc"
          className="w-full h-auto block object-cover"
          loading="eager"
        />
      </motion.div>

      {/* Logo overlay — đặt giữa trung tâm banner, hiệu ứng zoom nhẹ + floating nhè nhẹ */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
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
            src="/img_recruit/recruit_logo.svg"
            alt="Logo tuyển dụng IruKa — Cùng kiến tạo tương lai"
            className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,139,189,0.3)]"
            loading="eager"
          />
        </motion.div>
      </div>

      {/* Breadcrumb và Tiêu đề đè lên trên banner ở góc trái */}
      <div className="absolute inset-0 z-20 flex flex-col justify-center pt-4 sm:pt-8 md:pt-12 lg:pt-16 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
            className="flex items-center gap-1.5 text-white/90 text-[10px] sm:text-xs md:text-sm font-medium mb-1.5 sm:mb-3"
          >
            <Link href="/" className="hover:text-[#5CC8EC] transition-colors drop-shadow-sm">
              Trang chủ
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 opacity-70 drop-shadow-sm" />
            <span className="text-[#5CC8EC] font-semibold drop-shadow-sm">Tuyển dụng</span>
          </motion.div>

          {/* Tiêu đề chính "TUYỂN DỤNG" với hiệu ứng slide-in & text gradient nhẹ */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-lg sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          >
            TUYỂN{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008BBD] to-[#5CC8EC] drop-shadow-none">
              DỤNG
            </span>
          </motion.h1>
        </div>
      </div>
    </section>
  );
}
