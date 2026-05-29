'use client';

// File: src/components/home/EcosystemSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Giới thiệu 3 sản phẩm trong hệ sinh thái Lifestyle Việt Nam dạng ngang, thiết kế theo phong cách SotaMed cao cấp nhưng sử dụng tone màu nhẹ đồng điệu với website.
// Dùng khi: Hiển thị trên trang chủ ngay dưới phần About.

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const products = [
  {
    id: 'iruka-edu',
    badge: '01 - GIÁO DỤC',
    name: 'iruKa EDU',
    desc: 'Giải pháp giáo dục thông minh ứng dụng trí tuệ nhân tạo (AI) giúp cá nhân hóa lộ trình học tập của trẻ từ 3–6 tuổi.',
    image: '/img_iruka_edu/mascot_no_bg.png',
    href: '/he-sinh-thai/iruka-edu',
    rightTitleLine1: 'NỀN TẢNG',
    rightTitleLine2: 'AI GIÁO DỤC',
    highlights: [
      'Cá nhân hoá lộ trình học tập cho bé',
      'Hơn 300+ bài học và 10,000+ trò chơi hấp dẫn',
      'Tự động phân tích và đánh giá thế mạnh',
      'Tạo môi trường giáo dục hiện đại, bắt kịp xu hướng quốc tế.'
    ],
    cardBg: 'bg-[#008BBD]/20',
    borderColor: 'border-[#008BBD]/30',
    dividerColor: 'border-[#008BBD]/20',
    badgeColor: 'text-[#005c7e]',
    btnBg: 'bg-[#008BBD] hover:bg-[#00749e]',
    textAccent: 'from-[#008BBD] to-[#00b4d8]',
    glowColor: 'rgba(0, 139, 189, 0.1)',
    darkTextColor: 'text-[#0F172A]',
    descColor: 'text-[#0F172A]/85',
    titleColorClass: 'bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] inline-block'
  },
  {
    id: 'babego',
    badge: '02 - DINH DƯỠNG',
    name: 'Babego GOLD',
    desc: 'Sữa dinh dưỡng chuyên biệt tập trung vào tiêu hóa, hấp thu và tăng trưởng vượt trội cho trẻ nhỏ.',
    image: '/img_babego/babego_mascot_2.webp',
    href: '/he-sinh-thai/babego',
    rightTitleLine1: 'DINH DƯỠNG',
    rightTitleLine2: 'TIÊU HÓA & TĂNG TRƯỞNG',
    highlights: [
      'Dinh dưỡng chuyên sâu từ sữa non nguyên chất',
      'Hỗ trợ tiêu hoá khoẻ mạnh & tăng cân vượt trội',
      'Nguyên liệu thảo dược nhập khẩu New Zealand',
      'Có các dòng sản phẩm chuyên biệt theo độ tuổi của từng trẻ.'
    ],
    cardBg: 'bg-[#98C04A]/20',
    borderColor: 'border-[#98C04A]/30',
    dividerColor: 'border-[#98C04A]/20',
    badgeColor: 'text-[#5c7a23]',
    btnBg: 'bg-[#98C04A] hover:bg-[#7e9f3b]',
    textAccent: 'from-[#98C04A] to-[#b0d860]',
    glowColor: 'rgba(152, 192, 74, 0.1)',
    darkTextColor: 'text-neutral-800',
    descColor: 'text-neutral-700',
    titleColorClass: 'text-[#66493C]'
  },
  {
    id: 'iruka-care',
    badge: '03 - CHĂM SÓC',
    name: 'iruKa CARE',
    desc: 'Giải pháp vệ sinh & an toàn sinh học toàn diện cho trẻ nhỏ từ sơ sinh đến 10 tuổi.',
    image: '/img_iruka_care/mascot_no_bg.png',
    href: '/he-sinh-thai/iruka-care',
    rightTitleLine1: 'GIẢI PHÁP',
    rightTitleLine2: 'VỆ SINH & AN TOÀN',
    highlights: [
      'Bảo vệ bé khỏi vi khuẩn gây hại hằng ngày',
      'Thành phần hữu cơ lành tính từ thiên nhiên',
      'Đã được kiểm nghiệm lâm sàng của Bộ Y tế',
      'Thiết kế thân thiện, dễ sử dụng, phù hợp gia đình Việt'
    ],
    cardBg: 'bg-[#008BBD]/20',
    borderColor: 'border-[#008BBD]/30',
    dividerColor: 'border-[#008BBD]/20',
    badgeColor: 'text-[#005c7e]',
    btnBg: 'bg-[#008BBD] hover:bg-[#00749e]',
    textAccent: 'from-[#008BBD] to-[#00b4d8]',
    glowColor: 'rgba(0, 139, 189, 0.1)',
    darkTextColor: 'text-[#0F172A]',
    descColor: 'text-[#0F172A]/85',
    titleColorClass: 'bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#1E3A8A] inline-block'
  }
];

export default function EcosystemSection() {
  return (
    <section className="relative w-full overflow-hidden py-10 bg-white">
      {/* === NỘI DUNG CHÍNH === */}
      <div className="relative z-10 container mx-auto px-4 md:px-10 max-w-6xl">
        
        {/* --- TIÊU ĐỀ --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-12"
        >
          {/* Badge nhỏ phía trên */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#008BBD]/10 border border-[#008BBD]/20 text-[#008BBD] text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            Hệ sinh thái
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#0F172A] to-[#1E3A8A]">
              Hệ sinh thái
            </span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008BBD] to-[#00b4d8]">
              LifeStyle Việt Nam
            </span>
          </h2>
          <p className="mt-4 text-[#0F172A]/80 text-base md:text-lg max-w-xl mx-auto">
            Ba thương hiệu — một sứ mệnh chung: đồng hành cùng gia đình Việt.
          </p>
        </motion.div>

        {/* === DANH SÁCH 3 CARD THEO PHONG CÁCH SOTAMED TONE NHẸ === */}
        <div className="flex flex-col gap-4">
          {products.map((product, index) => (
            <Link key={product.id} href={product.href} className="block w-full">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: 'easeOut' }}
                whileHover={{ y: -4, scale: 1.005 }}
                className={`group relative overflow-hidden rounded-[24px] border ${product.borderColor} ${product.cardBg} transition-all duration-500 p-5 md:p-6 lg:p-7 grid grid-cols-1 lg:grid-cols-[3.5fr_8.5fr] gap-6 lg:gap-0 items-center shadow-lg hover:shadow-xl`}
              >
                {/* Hiệu ứng quầng sáng tinh tế phía sau */}
                <div 
                  className="absolute top-0 right-0 w-[250px] h-[250px] rounded-full blur-[60px] pointer-events-none" 
                  style={{ background: product.glowColor }}
                />

                {/* 1. CỘT TRÁI (SotaMed style brand details): Trên mobile hiển thị sau tên & tagline (order-2) */}
                <div className={`order-2 lg:order-1 pr-0 lg:pr-6 border-b lg:border-b-0 lg:border-r pb-6 lg:pb-0 h-full flex flex-col justify-between text-left ${product.dividerColor}`}>
                  <div>
                    <span className={`font-bold tracking-widest text-xs md:text-sm uppercase mb-3 block ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl font-extrabold ${product.titleColorClass} leading-tight mb-3 transition-transform duration-500 group-hover:scale-[1.01] origin-left`}>
                      {product.name}
                    </h3>
                    <p className={`${product.descColor} text-base md:text-lg leading-relaxed mb-6`}>
                      {product.desc}
                    </p>
                  </div>
                  <div>
                    <span className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 ${product.btnBg} text-white font-bold rounded-lg shadow-md transition-all duration-300 w-fit text-sm`}>
                      Khám phá ngay
                      <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>

                {/* 2. CỘT PHẢI (Large Headline, Highlights & Mockup): Trên mobile hiển thị đầu tiên (order-1) */}
                <div className="order-1 lg:order-2 pl-0 lg:pl-6 h-full flex flex-col justify-start pt-2">
                  {/* Headline lớn ở phía trên - Kích thước đồng nhất */}
                  <h4 className="text-xl md:text-2xl lg:text-3xl font-extrabold leading-tight mb-3 text-left">
                    <span className={product.titleColorClass}>
                      {product.rightTitleLine1}
                    </span>{' '}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${product.textAccent}`}>
                      {product.rightTitleLine2}
                    </span>
                  </h4>

                  {/* Phần bên dưới: Chia 2 cột nhỏ (highlights bên trái & mockup bên phải) */}
                  <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-6 items-end w-full">
                    {/* Bảng highlights bên trái */}
                    <div className="flex flex-col space-y-2.5 text-left pb-2">
                      {product.highlights.map((hl, idx) => (
                        <div key={idx} className={`${product.descColor} text-sm md:text-base font-semibold leading-relaxed`}>
                          • {hl}
                        </div>
                      ))}
                    </div>

                    {/* Ảnh minh họa bên phải */}
                    <div className="w-full flex justify-center md:justify-end">
                      <div className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] aspect-[4/3]">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 1024px) 100vw, 30vw"
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
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
