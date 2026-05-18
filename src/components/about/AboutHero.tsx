'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

// File: src/components/about/AboutHero.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Banner đầu trang "VỀ CHÚNG TÔI" — ảnh nền toàn màn hình,
//          chữ tiêu đề lớn + breadcrumb điều hướng.
// Dùng khi: Hiển thị ở đầu trang /gioi-thieu.

export default function AboutHero() {
  return (
    <section className="relative w-full h-[60vh] min-h-[420px] lg:h-[70vh] flex flex-col justify-end overflow-hidden">

      {/* ===== Ảnh nền (placeholder — anh thay bằng ảnh thật sau) ===== */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_about_us/banner.svg"
          alt="Đội ngũ Lifestyle Việt Nam trong cuộc họp"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* ===== Lớp phủ gradient — đậm ở dưới để chữ nổi ===== */}
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* ===== Thanh màu xanh ngang nhỏ ở cạnh trái (trang trí) ===== */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute left-0 top-[15%] w-[5px] h-[40%] bg-[#008BBD] z-20 origin-top rounded-r-full"
      />

      {/* ===== Nội dung văn bản ===== */}
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
          <span className="text-[#008BBD] font-semibold">Giới thiệu</span>
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

        {/* Tiêu đề chính "VỀ CHÚNG TÔI" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.0] tracking-tight"
        >
          VỀ{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#008BBD] to-[#5CC8EC]">
            CHÚNG
          </span>
          <br />
          TÔI
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
            Kiến tạo hệ sinh thái Mẹ &amp; Bé toàn diện tại Việt Nam
          </p>
        </motion.div>
      </div>

      {/* ===== Sóng lượn dưới đáy section (chuyển tiếp mềm sang section dưới) ===== */}
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
            fill="#EEF8FC"
          />
        </svg>
      </div>
    </section>
  );
}
