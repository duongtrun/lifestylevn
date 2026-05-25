'use client';

// File: src/components/news/NewsHero.tsx
// Luồng: Trang Tin tức (/tin-tuc)
// Vai trò: Banner đầu trang tin tức
// Dùng khi: Hiển thị ở phần đầu trang Tin Tức

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

export default function NewsHero() {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] lg:h-[60vh] flex flex-col justify-center overflow-hidden bg-[#008BBD]">

      {/* Ảnh nền banner */}
      <div className="absolute inset-0 z-0">
        {/* Banner cho thiết bị di động */}
        <Image
          src="/img_news/banner_mobile.webp"
          alt="Tin tức - Lifestyle Việt Nam"
          fill
          className="object-cover object-center block md:hidden"
          priority
        />
        {/* Banner cho máy tính và máy tính bảng */}
        <Image
          src="/img_news/news_banner.webp"
          alt="Tin tức - Lifestyle Việt Nam"
          fill
          className="object-cover object-center lg:object-[center_top] hidden md:block"
          priority
        />
      </div>

      {/* Lớp phủ gradient nhẹ để text dễ đọc hơn nếu cần */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#008BBD]/80 via-transparent to-transparent" />

      {/* Nội dung văn bản */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center mt-8">
        
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-1.5 text-white/80 text-sm font-medium mb-6"
        >
          <Link href="/" className="hover:text-white transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="w-4 h-4 opacity-50" />
          <span className="text-white font-semibold">Tin tức</span>
        </motion.div>

        {/* Tiêu đề chính */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-[1.2] tracking-tight"
        >
          TIN TỨC
        </motion.h1>

        {/* Nút đóng góp bài viết */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-4"
        >
          <Link
            href="/dong-gop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base group"
          >
            <span>✍️ Góp ý của bạn (Đăng bài)</span>
          </Link>
        </motion.div>

      </div>

    </section>
  );
}
