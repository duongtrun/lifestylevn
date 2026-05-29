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
    <section className="relative w-full h-[80vh] min-h-[660px] lg:h-[85vh] lg:min-h-[720px] flex flex-col pt-24 md:pt-28 lg:pt-32 overflow-hidden">

      {/* ===== Ảnh nền tự thích ứng (Responsive) theo thiết bị di động & máy tính ===== */}
      <div className="absolute inset-0 z-0 bg-[#EEF8FC]">
        {/* Ảnh banner dành riêng cho thiết bị di động (Mobile) */}
        <Image
          src="/img_news/banner_mobile.webp"
          alt="Tin tức - Lifestyle Việt Nam"
          fill
          className="object-cover object-center md:hidden"
          priority
        />
        {/* Ảnh banner dành riêng cho máy tính (Desktop/Tablet) */}
        <Image
          src="/img_news/news_banner.webp"
          alt="Tin tức - Lifestyle Việt Nam"
          fill
          className="object-cover object-center hidden md:block"
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
      <div className="relative z-20 container mx-auto px-4 mt-auto pb-[160px] md:pb-[180px] lg:pb-[200px] space-y-5">

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
          <span className="text-white font-semibold">Tin tức</span>
        </motion.div>

        {/* Tiêu đề chính "TIN TỨC" */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.0] tracking-tight"
        >
          TIN{" "}
          <span className="">
            TỨC
          </span>
        </motion.h1>

        {/* Đường kẻ trang trí + tagline và nút */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-2">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-4"
          >
            <div className="h-[2px] w-12 bg-[#008BBD] rounded-full"></div>
            <p className="text-white text-sm md:text-base font-medium tracking-wide">
              Cập nhật hoạt động mới nhất, sự kiện ý nghĩa và kiến thức hữu ích
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="flex-shrink-0"
          >
            <Link
              href="/dong-gop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white font-semibold border border-white/20 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 text-sm md:text-base group"
            >
              <span>✍️ Góp ý của bạn (Đăng bài)</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
