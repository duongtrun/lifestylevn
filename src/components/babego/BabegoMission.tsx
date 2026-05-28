'use client';

// File: src/components/babego/BabegoMission.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Section "Tầm nhìn, Sứ mệnh & Cam kết" với hiệu ứng chuyển tab.
// Dùng khi: Hiển thị ở phần cuối trang Babego.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Compass, ShieldCheck } from 'lucide-react';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    icon: Eye,
    imageDesktop: '/img_babego/babego_tam_nhin.png',
    imageMobile: '/img_babego/babego_tam_nhin_mobile.png',
    heading: 'TẦM NHÌN',
    text: `Babego tin rằng hệ tiêu hóa khỏe mạnh là nền tảng cho sự phát triển toàn diện của trẻ nhỏ. Với định hướng trở thành thương hiệu dinh dưỡng hàng đầu Việt Nam, Babego mong muốn đồng hành cùng bố mẹ bằng những giải pháp dinh dưỡng khoa học, tận tâm và phù hợp. Babego hướng tới trở thành thương hiệu được nhiều gia đình tin tưởng khi trẻ gặp vấn đề về tiêu hóa, ăn uống và tăng trưởng.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-[5px] md:right-auto md:w-[345px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-3 md:p-6 h-auto md:h-full justify-center',
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    icon: Compass,
    imageDesktop: '/img_babego/babego_su_menh.png',
    imageMobile: '/img_babego/babego_su_menh_mobile.png',
    heading: 'SỨ MỆNH',
    text: `Babego cam kết mang đến các sản phẩm dinh dưỡng an toàn, khoa học và phù hợp với trẻ em Việt Nam. Không ngừng cải tiến từ nghiên cứu thực tế và khoa học dinh dưỡng, Babego mong muốn đồng hành cùng gia đình Việt trong hành trình nuôi dưỡng thế hệ trẻ khỏe mạnh, tự tin và phát triển bền vững.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-[5px] md:right-auto md:w-[345px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
  },
  {
    id: 'commitment',
    label: 'Cam kết',
    icon: ShieldCheck,
    imageDesktop: '/img_babego/babego_cam_ket.png',
    imageMobile: '/img_babego/babego_cam_ket_mobile.png',
    heading: 'CAM KẾT',
    text: `Babego cam kết tạo ra những sản phẩm dinh dưỡng an toàn – minh bạch – phù hợp với thể trạng trẻ Việt. Chúng tôi không phóng đại công dụng, không thỏa hiệp với chất lượng, và luôn đặt sức khỏe trẻ nhỏ lên hàng đầu. Mỗi sản phẩm Babego là sự kết hợp giữa nghiên cứu khoa học, nguyên liệu chọn lọc và trách nhiệm lâu dài với gia đình Việt – vì một thế hệ trẻ em khỏe mạnh và phát triển bền vững.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-auto md:right-[5px] md:w-[345px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
  }
];

// Hàm hiển thị khu vực Tầm nhìn, Sứ mệnh và Lời cam kết của Babego
export default function BabegoMission() {
  const [activeTab, setActiveTab] = useState(missionData[0].id);

  const activeData = missionData.find(t => t.id === activeTab) || missionData[0];

  return (
    <section className="relative w-full bg-[#FAFAFA] py-16 md:py-24 overflow-hidden">
      {/* Tiêu đề */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl lg:text-[40px] font-extrabold text-[#00724C] text-center mb-10 px-4"
      >
        Tầm nhìn, sứ mệnh &amp; Cam kết
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 md:mb-16 px-4 relative z-20">
        <div className="flex bg-gray-100/80 p-1.5 rounded-full shadow-inner border border-gray-200 overflow-x-auto max-w-full hide-scrollbar">
          {missionData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 md:px-12 md:py-3.5 rounded-full text-sm md:text-base lg:text-lg font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#00724C] shadow-sm bg-white'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Khối nội dung hình ảnh & text */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-0 mt-4">
        
        {/* Hình khối trang trí phía sau */}
        <div className="absolute top-[-5%] md:top-[5%] left-0 w-[40%] md:w-[35%] h-[50%] md:h-[60%] z-0 pointer-events-none">
          <Image 
            src="/img_babego/Rectangle_left.svg" 
            alt="Rectangle Left" 
            fill 
            className="object-contain object-left-top opacity-80" 
            unoptimized
          />
        </div>
        <div className="absolute bottom-[-5%] md:bottom-[-10%] right-0 w-[40%] md:w-[35%] h-[50%] md:h-[60%] z-0 pointer-events-none">
          <Image 
            src="/img_babego/Rectangle_right.svg" 
            alt="Rectangle Right" 
            fill 
            className="object-contain object-right-bottom opacity-80" 
            unoptimized
          />
        </div>

        {/* Khối hiển thị hình ảnh & Text */}
        <div className="relative z-10 w-full md:w-[800px] mx-auto h-[400px] md:h-[420px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-[#E8F5E9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Hình ảnh nền Desktop */}
              <div className="hidden md:block absolute inset-0 w-full h-full">
                <Image
                  src={activeData.imageDesktop}
                  alt={activeData.label}
                  fill
                  className="object-cover object-center"
                />
              </div>

              {/* Hình ảnh nền Mobile */}
              <div className="block md:hidden absolute inset-0 w-full h-full bg-[#E8F5E9]">
                <Image
                  src={activeData.imageMobile}
                  alt={activeData.label}
                  fill
                  className="object-cover object-center"
                />
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Thẻ Glassmorphism chứa nội dung text */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`content-${activeTab}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className={activeData.cardClass}
            >
              <div className={`bg-white/30 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl flex flex-col ${activeData.innerClass}`}>
                {/* Icon + Tiêu đề */}
                <div className="flex items-center gap-2 mb-3">
                  <activeData.icon className="w-5 h-5 text-black" />
                  <h3 className="font-extrabold text-base md:text-lg tracking-widest text-black">
                    {activeData.heading}
                  </h3>
                </div>
                {/* Nội dung văn bản - thêm class whitespace-pre-line để hỗ trợ xuống dòng */}
                <p className="text-xs md:text-sm leading-relaxed font-medium whitespace-pre-line text-black">
                  {activeData.text}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
        
      </div>
    </section>
  );
}
