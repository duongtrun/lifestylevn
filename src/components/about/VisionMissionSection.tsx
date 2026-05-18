'use client';

// File: src/components/about/VisionMissionSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị 3 tab — Tầm nhìn / Sứ mệnh / Triết lý kinh doanh.
//          Mặc định hiển thị tab "Tầm nhìn". Nhấn tab để chuyển nội dung, ảnh nền chuyển mượt.
// Dùng khi: Người dùng cuộn xuống phần Tầm nhìn & Sứ mệnh.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Compass, Lightbulb } from 'lucide-react';

// --- DỮ LIỆU 3 TAB ---
const tabs = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    icon: Eye,
    bg: '/img_about_us/bg_vision.svg',
    heading: 'TẦM NHÌN',
    content:
      '"Trở thành doanh nghiệp tiên phong trong việc xây dựng hệ sinh thái Mẹ & Bé toàn diện tại Việt Nam – nơi công nghệ, dinh dưỡng, giáo dục và sức khỏe kết hợp để mang đến giải pháp nuôi dạy con toàn diện và bền vững."',
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    icon: Compass,
    bg: '/img_about_us/bg_su_menh.svg',
    heading: 'SỨ MỆNH',
    content:
      '"Đồng hành cùng hàng triệu gia đình Việt Nam trong hành trình nuôi dưỡng và phát triển thế hệ tương lai, bằng những sản phẩm & dịch vụ chất lượng cao, lấy sức khỏe và hạnh phúc của Mẹ & Bé làm trọng tâm."',
  },
  {
    id: 'philosophy',
    label: 'Triết lý kinh doanh',
    icon: Lightbulb,
    bg: '/img_about_us/bg_triet_ly.svg',
    heading: 'TRIẾT LÝ KINH DOANH',
    content:
      '"Phát triển bền vững trên nền tảng giá trị con người. Chúng tôi tin rằng một doanh nghiệp thực sự thành công khi tạo ra giá trị không chỉ cho cổ đông, mà còn cho nhân viên, đối tác, khách hàng và toàn xã hội."',
  },
];

// --- HIỆU ỨNG ANIMATION ---
const contentVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};

const bgVariants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.35 } },
};

export default function VisionMissionSection() {
  // State lưu tab đang active, mặc định là "vision"
  const [activeTab, setActiveTab] = useState('vision');

  const currentTab = tabs.find((t) => t.id === activeTab)!;
  const Icon = currentTab.icon;

  return (
    <section className="relative w-full py-16 lg:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">

        {/* --- TIÊU ĐỀ SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#009fe3] tracking-wide">
            Tầm nhìn, sứ mệnh &amp; triết lý kinh doanh
          </h2>
        </motion.div>

        {/* --- THANH TAB --- */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-slate-100 rounded-full p-1.5 shadow-inner gap-1">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                    transition-all duration-300 whitespace-nowrap
                    ${isActive
                      ? 'bg-white text-[#009fe3] shadow-md'
                      : 'text-slate-500 hover:text-[#009fe3]'
                    }
                  `}
                >
                  {/* Gạch chân active */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute inset-0 bg-white rounded-full shadow-md"
                      style={{ zIndex: 0 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-1.5">
                    <TabIcon size={15} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* --- KHU VỰC HIỂN THỊ NỘI DUNG --- */}
        {/* Khung bao ngoài: padding ngang để thanh xanh nhô ra, max-w thu hẹp lại để ảnh không chiếm hết */}
        <div className="relative mx-auto max-w-3xl px-12 md:px-16">
          {/* Thanh xanh TRÁI — to hơn, cao hơn, nhô ra ngoài rõ */}
          <div className="absolute left-0 top-6 w-14 md:w-16 h-[65%] bg-[#009fe3] z-0" />
          {/* Thanh xanh PHẢI — to hơn, cao hơn, nhô ra ngoài rõ */}
          <div className="absolute right-0 bottom-6 w-14 md:w-16 h-[55%] bg-[#009fe3] z-0" />

          {/* Hộp ảnh chính — chiều cao cố định, không quá to */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl h-[260px] md:h-[340px]">
            
            {/* Ảnh nền — AnimatePresence để chuyển mượt khi đổi tab */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`bg-${activeTab}`}
                variants={bgVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={currentTab.bg}
                  alt={currentTab.heading}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Lớp gradient phủ nhẹ bên trái để chữ dễ đọc hơn */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-transparent z-10" />

            {/* Thẻ Glassmorphism chứa nội dung text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeTab}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute top-1/2 -translate-y-1/2 left-6 md:left-10 z-20 max-w-xs md:max-w-sm"
              >
                <div className="bg-white/25 backdrop-blur-md border border-white/40 rounded-xl p-6 shadow-xl">
                  {/* Icon + Tiêu đề */}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5" style={{ color: '#273F68' }} />
                    <h3 className="font-extrabold text-base md:text-lg tracking-widest" style={{ color: '#273F68' }}>
                      {currentTab.heading}
                    </h3>
                  </div>
                  {/* Nội dung văn bản */}
                  <p className="text-sm md:text-base leading-relaxed font-medium" style={{ color: '#273F68' }}>
                    {currentTab.content}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}
