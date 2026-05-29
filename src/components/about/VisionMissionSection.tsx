'use client';

// File: src/components/about/VisionMissionSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị 3 tab — Tầm nhìn / Sứ mệnh / Triết lý kinh doanh.
//          Mặc định hiển thị tab "Tầm nhìn". Nhấn tab để chuyển nội dung, ảnh nền chuyển mượt.
// Dùng khi: Người dùng cuộn xuống phần Tầm nhìn & Sứ mệnh.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Eye, Compass, Lightbulb } from 'lucide-react';

// --- DỮ LIỆU 3 TAB ---
const tabs = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    icon: Eye,
    imageDesktop: '/images/tam_nhin.webp',
    imageMobile: '/images/tam_nhin_mobile.webp',
    heading: 'TẦM NHÌN',
    content:
      'Trở thành doanh nghiệp tiên phong trong việc xây dựng hệ sinh thái Mẹ & Bé toàn diện tại Việt Nam – nơi công nghệ, dinh dưỡng, giáo dục và sức khỏe kết hợp để mang đến giải pháp nuôi dạy con toàn diện và bền vững.',
    cardClass: 'absolute bottom-[5px] top-auto left-[5px] right-[5px] z-20 w-auto max-h-[200px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-[5px] md:right-auto md:w-[300px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-3 md:p-6 h-auto md:h-full justify-center',
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    icon: Compass,
    imageDesktop: '/images/su_menh.webp',
    imageMobile: '/images/su_menh_mobile.webp',
    heading: 'SỨ MỆNH',
    content:
      'Mang đến giải pháp toàn diện và đáng tin cậy giúp trẻ phát triển khỏe mạnh – hạnh phúc – an toàn trong những năm đầu đời, đồng hành cùng các bà mẹ trong hành trình nuôi dạy con khôn lớn.',
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[200px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-auto md:right-[5px] md:w-[300px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
    objectPositionMobile: 'object-top',
  },
  {
    id: 'philosophy',
    label: 'Triết lý kinh doanh',
    icon: Lightbulb,
    imageDesktop: '/images/triet_li.webp',
    imageMobile: '/images/triet_li_mobile.webp',
    heading: 'TRIẾT LÝ KINH DOANH',
    content:
      'Hợp tác – Phát triển – Chia sẻ lợi nhuận. Khách hàng là người bạn đồng hành, không chỉ là người mua hàng. Cam kết cung cấp giá trị thật, minh bạch và bền vững. Tôn trọng đạo đức kinh doanh – tuân thủ pháp luật. Liên tục đổi mới để mang lại chất lượng vượt trội.',
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[200px] overflow-y-auto',
    innerClass: 'p-2 md:p-3 h-auto justify-start',
  },
];

// --- HIỆU ỨNG ANIMATION ---
const contentVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: 'easeOut' } },
  exit: { opacity: 0, x: -30, transition: { duration: 0.3, ease: 'easeIn' } },
};

const bgVariants: Variants = {
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
    <section className="relative w-full py-12 lg:py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">

        {/* --- TIÊU ĐỀ SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 lg:mb-14"
        >
          <h2 className="text-2xl md:text-4xl font-bold text-[#273F68] tracking-wide">
            Tầm nhìn, Sứ mệnh &amp; Triết lý kinh doanh
          </h2>
        </motion.div>

        {/* --- THANH TAB --- */}
        <div className="flex justify-center mb-8 px-4 relative z-20">
          <div className="flex bg-gray-100/80 p-1.5 rounded-full shadow-inner border border-gray-200 overflow-x-auto max-w-full hide-scrollbar">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-5 py-2.5 md:px-10 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? 'bg-white text-[#009fe3] shadow-md'
                      : 'text-slate-500 hover:text-[#009fe3]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* --- KHU VỰC HIỂN THỊ NỘI DUNG --- */}
        {/* Khung bao ngoài: padding ngang để thanh xanh nhô ra, max-w thu hẹp lại để ảnh không chiếm hết */}
        <div className="relative mx-auto max-w-3xl px-8 md:px-16">
          {/* Thanh xanh TRÁI — to hơn, cao hơn, nhô ra ngoài rõ */}
          <div className="absolute left-0 top-6 w-14 md:w-16 h-[65%] bg-[#009fe3] z-0" />
          {/* Thanh xanh PHẢI — to hơn, cao hơn, nhô ra ngoài rõ */}
          <div className="absolute right-0 bottom-6 w-14 md:w-16 h-[55%] bg-[#009fe3] z-0" />

          {/* Hộp ảnh chính — Đặt chiều cao cố định để chứa trọn hộp chữ bên trong */}
          <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl h-[400px] md:h-[420px]">
            
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
                  src={currentTab.imageDesktop}
                  alt={`${currentTab.heading} desktop`}
                  fill
                  className="object-cover hidden md:block"
                  priority
                />
                <Image
                  src={currentTab.imageMobile}
                  alt={`${currentTab.heading} mobile`}
                  fill
                  className={`object-cover md:hidden ${currentTab.objectPositionMobile || 'object-center'}`}
                  priority
                />
              </motion.div>
            </AnimatePresence>

            {/* Thẻ Glassmorphism chứa nội dung text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${activeTab}`}
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className={currentTab.cardClass}
              >
                <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl flex flex-col ${currentTab.innerClass}`}>
                  {/* Icon + Tiêu đề */}
                  <div className="flex items-center gap-2 mb-3">
                    <Icon className="w-5 h-5" style={{ color: '#273F68' }} />
                    <h3 className="font-extrabold text-base md:text-lg tracking-widest" style={{ color: '#273F68' }}>
                      {currentTab.heading}
                    </h3>
                  </div>
                  {/* Nội dung văn bản - thêm class whitespace-pre-line để hỗ trợ xuống dòng */}
                  <p className="text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line" style={{ color: '#273F68' }}>
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
