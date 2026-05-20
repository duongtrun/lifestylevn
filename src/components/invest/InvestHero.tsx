'use client';

// File: src/components/invest/InvestHero.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Banner đầu trang — ảnh nền skyline thành phố, tiêu đề lớn + breadcrumb.
// Dùng khi: Hiển thị ở đầu trang /dau-tu.

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function InvestHero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[420px] lg:h-[70vh] flex flex-col justify-end overflow-hidden">

      {/* Ảnh nền banner (skyline thành phố tone xanh đậm) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/invest_img/invest_banner.svg"
          alt="Đối tác và Nhà đầu tư - Skyline thành phố"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Lớp phủ gradient — đậm ở dưới để chữ trắng nổi rõ */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Thanh trang trí dọc bên trái */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute left-0 top-[15%] w-[5px] h-[40%] bg-[#008BBD] z-20 origin-top rounded-r-full"
      />

      {/* Nội dung văn bản */}
      <div className="relative z-20 container mx-auto px-4 pb-14 lg:pb-20 space-y-5">

        {/* Breadcrumb (đường dẫn điều hướng) */}
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
          <span className="text-[#5CC8EC] font-semibold">Đầu tư</span>
        </motion.div>

        {/* Nhãn nhỏ phía trên tiêu đề */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#008BBD]/20 border border-[#008BBD]/40 text-[#5CC8EC] text-xs font-bold tracking-widest uppercase backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#008BBD] animate-pulse"></span>
            Lifestyle Việt Nam
          </span>
        </motion.div>

        {/* Tiêu đề chính */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.3] tracking-tight"
        >
          ĐỐI TÁC VÀ{'  '}
          <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008BBD] to-[#5CC8EC]">
            NHÀ ĐẦU TƯ
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
          <p className="text-white/70 text-sm md:text-base font-medium tracking-wide">
            Cùng nhau kiến tạo hệ sinh thái Mẹ &amp; Bé hàng đầu Việt Nam
          </p>
        </motion.div>

        {/* Nút Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="pt-2"
        >
          <Link
            href="/lien-he"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#008BBD] to-[#5CC8EC] text-white rounded-full font-semibold text-sm md:text-base hover:shadow-lg hover:shadow-[#008BBD]/30 transition-all hover:-translate-y-1"
          >
            Gửi yêu cầu
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>

      {/* Sóng lượn dưới đáy section — chuyển tiếp mềm sang section dưới */}
      <div className="absolute -bottom-[1px] left-0 right-0 z-20 overflow-hidden leading-none">
        <svg
          viewBox="0 0 1440 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-12 md:h-16 block scale-105"
          preserveAspectRatio="none"
        >
          <path
            d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
