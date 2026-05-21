'use client';

// File: src/components/about/EcosystemSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Giới thiệu 3 sản phẩm trong hệ sinh thái Lifestyle Việt Nam.
//          Thiết kế premium: nền tech bg_ecosys, 3 card gradient nổi bật với mascot SVG + text.
// Dùng khi: Người dùng cuộn xuống phần Hệ sinh thái.

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// === DỮ LIỆU 3 SẢN PHẨM ===
const products = [
  {
    id: 'iruka-edu',
    tag: 'Giáo dục',
    name: 'Iruka EDU',
    tagline: 'Nền tảng giáo dục ứng dụng AI cho trẻ 3–10 tuổi',
    desc: 'Iruka Edu mang đến môi trường học tập hiện đại, cá nhân hoá và đầy hứng thú cho con, ứng dụng AI, game hoá và nhiều tính năng chuyên gia.',
    image: '/img_about_us/iruka_img.webp',
    href: '/he-sinh-thai/iruka-edu',
    // Màu chủ đạo #008BBD — biến thể đầy đủ nhất
    gradientFrom: '#008BBD',
    gradientTo: '#005A7A',
    tagBg: 'bg-cyan-400/30',
    tagText: 'text-cyan-100',
    border: 'border-cyan-400/40',
  },
  {
    id: 'iruka-care',
    tag: 'Chăm sóc',
    name: 'Iruka CARE',
    tagline: 'Giải pháp vệ sinh & an toàn cho trẻ từ sơ sinh đến 10 tuổi',
    desc: 'Iruka Care ra đời từ mong muốn bảo vệ trẻ nhỏ trước vi khuẩn và tác nhân gây hại hằng ngày, thương hiệu uy tín tại các chuỗi siêu thị lớn.',
    image: '/img_about_us/iruka_care.webp',
    href: '/he-sinh-thai/iruka-care',
    // Biến thể sangle hơn một chút — #00AEDA (cyan sáng)
    gradientFrom: '#00AEDA',
    gradientTo: '#007BA3',
    tagBg: 'bg-sky-400/30',
    tagText: 'text-sky-100',
    border: 'border-sky-400/40',
  },
  {
    id: 'babego',
    tag: 'Dinh dưỡng',
    name: 'Babego GOLD',
    tagline: 'Dinh dưỡng tập trung vào tiêu hoá & tăng trưởng cho trẻ nhỏ',
    desc: 'Babego Gold là dòng sữa dinh dưỡng phát triển dành riêng cho trẻ có nhu cầu hỗ trợ tiêu hoá và tăng cân, được công nhận ở nhiều giải thưởng chuyên ngành.',
    image: '/img_about_us/babego.webp',
    href: '/he-sinh-thai/babego',
    // Biến thể đậm hơn — #006FA0 (navy xanh)
    gradientFrom: '#006FA0',
    gradientTo: '#004870',
    tagBg: 'bg-blue-400/30',
    tagText: 'text-blue-100',
    border: 'border-blue-400/40',
  },
];

export default function EcosystemSection() { // Hàm hiển thị phần Hệ sinh thái IruKa với 3 thẻ sản phẩm EDU, CARE, và Babego GOLD
  return (
    <section className="relative w-full overflow-hidden py-20 lg:py-28">

      {/* === NỀN BG_ECOSYS === */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_about_us/bg_ecosys.webp"
          alt="Ecosystem Background"
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay — tối dần ở trên & dưới, giữ phần giữa */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/80 via-[#0a1628]/60 to-[#0a1628]/80" />
      </div>

      {/* === NỘI DUNG CHÍNH === */}
      <div className="relative z-10 container mx-auto px-4 md:px-10">

        {/* --- TIÊU ĐỀ --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 lg:mb-20"
        >
          {/* Badge nhỏ phía trên */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            Hệ sinh thái
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight drop-shadow-lg">
            Hệ sinh thái{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400">
              Lifestyle Việt Nam
            </span>
          </h2>
          <p className="mt-4 text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Ba thương hiệu — một sứ mệnh chung: đồng hành cùng gia đình Việt.
          </p>
        </motion.div>

        {/* === LƯỚI 3 CARD === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product, index) => (
          <Link key={product.id} href={product.href} className="flex h-full">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group relative flex flex-col overflow-hidden rounded-2xl border backdrop-blur-sm cursor-pointer w-full h-full"
              style={{ borderColor: `${product.gradientFrom}40` }}
            >
              {/* --- VÙNG ẢNH (phần trên card) --- */}
              <div
                className="relative h-52 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${product.gradientFrom}, ${product.gradientTo})`,
                }}
              >
                {/* Họa tiết vòng tròn trang trí phía sau */}
                <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-white/10 blur-md" />
                <div className="absolute -left-6 -bottom-6 w-28 h-28 rounded-full bg-white/10 blur-md" />

                {/* Badge tag sản phẩm */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${product.tagBg} ${product.tagText} border ${product.border} backdrop-blur-sm z-20`}>
                  {product.tag}
                </div>

                {/* Ảnh mascot/logo sản phẩm — nhô lên khỏi card */}
                <div className="absolute -inset-[1.5px] transform group-hover:scale-105 transition-transform duration-500 z-10">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* --- VÙNG TEXT (phần dưới card) --- */}
              <div className="flex flex-col flex-1 bg-[#0f2040]/80 backdrop-blur-md p-6 border-t border-white/10">
                {/* Tên thương hiệu */}
                <h3
                  className="text-xl font-extrabold mb-1.5"
                  style={{ color: product.gradientFrom }}
                >
                  {product.name}
                </h3>

                {/* Tagline */}
                <p className="text-white font-semibold text-sm mb-3 leading-snug">
                  {product.tagline}
                </p>

                {/* Mô tả */}
                <p className="text-white/60 text-sm leading-relaxed flex-1">
                  {product.desc}
                </p>

                {/* CTA link */}
                <div className="mt-5 pt-4 border-t border-white/10">
                  <button
                    className="flex items-center gap-1.5 text-sm font-semibold transition-all duration-300 group/btn"
                    style={{ color: product.gradientFrom }}
                  >
                    Tìm hiểu thêm
                    <ArrowRight
                      size={15}
                      className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300"
                    />
                  </button>
                </div>
              </div>
            </motion.div>
          </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
