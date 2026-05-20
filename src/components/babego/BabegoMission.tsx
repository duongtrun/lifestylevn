'use client';

// File: src/components/babego/BabegoMission.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Section "Tầm nhìn, Sứ mệnh & Cam kết" với hiệu ứng chuyển tab.
// Dùng khi: Hiển thị ở phần cuối trang Babego.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    image: '/img_babego/babego_tam_nhin.webp',
    title: '', // Tắt title đi vì trong text đã đủ ý rồi, hoặc để text tự nổi bật
    text: `Chúng tôi tin rằng một hệ tiêu hóa khỏe mạnh là nền tảng quan trọng nhất cho sự phát triển của một đứa trẻ.\n\nVới niềm tin ấy, Babego hướng đến trở thành thương hiệu dinh dưỡng hàng đầu Việt Nam, không chỉ cung cấp sản phẩm mà còn mang đến sự yên tâm, niềm tin, và khoa học nuôi dưỡng đúng đắn cho mọi gia đình.\n\nBabego mong muốn đồng hành lâu dài cùng bố mẹ trong hành trình nuôi con, trở thành thương hiệu mà bố mẹ nghĩ đến đầu tiên khi con gặp vấn đề tiêu hóa – ăn uống – tăng trưởng.`
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    image: '/img_babego/babego_su_menh.webp',
    title: '',
    text: `Babego cam kết tạo ra những sản phẩm dinh dưỡng an toàn, khoa học và phù hợp với thể trạng trẻ em Việt Nam, đặt chất lượng và sức khỏe trẻ nhỏ lên hàng đầu.\n\nChúng tôi không ngừng cải tiến công thức dựa trên nghiên cứu khoa học và phản hồi thực tế, hướng tới mục tiêu đồng hành cùng gia đình Việt trong hành trình nuôi dưỡng một thế hệ trẻ khỏe mạnh, tự tin và phát triển bền vững.`
  },
  {
    id: 'commitment',
    label: 'Cam kết',
    image: '/img_babego/babego_cam_ket.webp',
    title: '',
    text: `Babego cam kết tạo ra những sản phẩm dinh dưỡng an toàn – minh bạch – phù hợp với thể trạng trẻ Việt.\n\nChúng tôi không phóng đại công dụng, không thỏa hiệp với chất lượng, và luôn đặt sức khỏe trẻ nhỏ lên hàng đầu.\n\nMỗi sản phẩm Babego là sự kết hợp giữa nghiên cứu khoa học, nguyên liệu chọn lọc và trách nhiệm lâu dài với gia đình Việt – vì một thế hệ trẻ em khỏe mạnh và phát triển bền vững.`
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
        <div className="relative z-10 w-full md:w-[85%] lg:w-[75%] mx-auto h-[320px] sm:h-[380px] md:h-[450px] lg:h-[480px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-[#E8F5E9]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Hình ảnh nền (thường là svg chứa minh họa) */}
              <div className="absolute inset-0">
                <Image
                  src={activeData.image}
                  alt={activeData.label}
                  fill
                  className="object-cover object-center"
                />
              </div>
              
              {/* Overlay Gradient tối ở nửa trên để làm nổi bật chữ trắng */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

              {/* Chữ mô tả */}
              <div className="absolute inset-0 p-6 md:p-10 lg:p-14 text-center z-20 flex flex-col items-center justify-center">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed md:leading-loose whitespace-pre-line max-w-4xl drop-shadow-md">
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
