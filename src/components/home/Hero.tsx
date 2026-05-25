"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

// File này: Component Hero (Phần đầu trang chủ)
// Vai trò: Khu vực Banner chính giới thiệu dự án với ảnh mẹ và bé, nút khám phá và các icon nổi (floating).
// Dùng khi: Render ở phần đầu tiên của màn hình Home (page.tsx).

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center overflow-hidden bg-gradient-to-r from-sky-50/80 to-white">
      {/* Background Image Banner - Mobile */}
      <div
        className="absolute inset-0 z-0 opacity-30 block md:hidden pointer-events-none bg-cover bg-center"
        style={{
          backgroundImage: 'url("/images/banner_mobile.webp")',
        }}
      />

      {/* Background Image Banner - Tablet & Desktop */}
      <div
        className="absolute inset-0 z-0 opacity-40 md:opacity-100 md:w-[60%] md:left-[40%] pointer-events-none bg-cover bg-center md:bg-right hidden md:block"
        style={{
          backgroundImage: 'url("/images/banner_home_page.jpg")',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)',
          maskImage: 'linear-gradient(to right, transparent, black 30%)',
        }}
      />

      <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-12 gap-8 items-center h-full">
        {/* Left Content */}
        <div className="max-w-2xl space-y-6 pt-10 pb-20 md:py-0 md:col-span-7 lg:col-span-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[#008BBD] font-extrabold tracking-widest text-base sm:text-lg md:text-xl uppercase"
          >
            LIFESTYLE VIỆT NAM
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.2] pb-2"
          >
            <span className="block whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]">
              KIẾN TẠO HỆ SINH THÁI
            </span>
            <span className="block whitespace-nowrap bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]">
              MẸ VÀ BÉ
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-6"
          >
            <Link
              href="/gioi-thieu"
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-[#008BBD] px-8 text-base font-medium text-white hover:bg-[#00749e] hover:scale-105 transition-all shadow-xl shadow-[#008BBD]/25 group"
            >
              Khám phá ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Content spacer */}
        <div className="hidden md:block md:col-span-5 lg:col-span-4" />
      </div>
    </section>
  );
}
