'use client';

// File: src/components/iruka-care/IrukaCareMission.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Section "Tầm nhìn, sứ mệnh & Cam kết" với hiệu ứng chuyển tab.
// Dùng khi: Hiển thị ở phần cuối trang Iruka Care (Sau phần Potential).

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    imageDesktop: '/img_iruka_care/tam_nhin.jpg',
    imageMobile: '/img_iruka_care/tam_nhin_mobile.jpg',
    title: '“An toàn chạm đến từng khoảnh khắc – Bảo vệ trọn vẹn hành trình lớn khôn của trẻ.”',
    text: `Iruka Care hướng đến trở thành thương hiệu vệ sinh & an toàn đáng tin cậy cho trẻ em Việt Nam.
Chúng tôi tạo ra những sản phẩm sạch – lành tính – minh bạch, như “lá chắn vô hình” giúp trẻ tự do khám phá thế giới.
Mỗi sản phẩm đều được thiết kế để mang đến sự yên tâm cho bố mẹ và sự bảo vệ nhẹ nhàng, bền vững cho trẻ nhỏ.`
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    imageDesktop: '/img_iruka_care/su_menh.jpg',
    imageMobile: '/img_iruka_care/su_menh_mobile.jpg',
    title: '“Bảo vệ sự hồn nhiên – Chăm sóc toàn diện – Đồng hành cùng gia đình Việt.”',
    text: `Chúng tôi mang đến sản phẩm an toàn tuyệt đối cho trẻ nhỏ, dựa trên tiêu chuẩn khoa học và hiểu biết về làn da nhạy cảm.
Iruka Care giúp bố mẹ giảm lo lắng và chủ động chăm sóc con mỗi ngày.
Sứ mệnh của chúng tôi là góp phần xây dựng thế hệ trẻ khỏe mạnh, hình thành thói quen vệ sinh đúng – sạch – an toàn.`
  },
  {
    id: 'commitment',
    label: 'Lời cam kết',
    imageDesktop: '/img_iruka_care/cam_ket.jpg',
    imageMobile: '/img_iruka_care/cam_ket_mobile.jpg',
    title: '“Mỗi sản phẩm đều được làm bằng sự yêu thương và trách nhiệm.”',
    text: `Chúng tôi cam kết minh bạch thành phần, không thỏa hiệp với bất kỳ yếu tố gây hại cho trẻ.
Mỗi sản phẩm đều được chọn lọc kỹ lưỡng, kiểm nghiệm độc lập và liên tục cải tiến.
Iruka Care đặt trải nghiệm của trẻ và sự yên tâm của bố mẹ làm trọng tâm trong mọi quyết định.`
  }
];

export default function IrukaCareMission() {
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
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#005A8C] text-center mb-8 px-4"
      >
        Tầm nhìn, sứ mệnh &amp; Lời cam kết từ đội ngũ Iruka Care
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 md:mb-16 px-4 relative z-20">
        <div className="flex bg-gray-100/80 p-1.5 rounded-full shadow-inner border border-gray-200 overflow-x-auto max-w-full hide-scrollbar">
          {missionData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 md:px-10 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-[#005A8C] shadow-sm bg-white'
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
        
        {/* Hình khối trang trí phía sau (Background Rectangles màu xanh của Iruka Care) */}
        <div className="absolute top-[10%] left-0 w-[40%] md:w-[45%] h-[45%] md:h-[50%] z-0 pointer-events-none bg-[#008BBD]" />
        <div className="absolute bottom-[-10%] right-0 w-[40%] md:w-[45%] h-[45%] md:h-[50%] z-0 pointer-events-none bg-[#008BBD]" />

        {/* Khối hiển thị hình ảnh & Text */}
        <div className="relative z-10 w-full md:w-[85%] lg:w-[75%] mx-auto h-[320px] sm:h-[380px] md:h-[450px] lg:h-[480px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white">
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
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 800px"
                  className="object-cover"
                />
              </div>

              {/* Hình ảnh nền Mobile */}
              <div className="block md:hidden absolute inset-0 w-full h-full bg-[#f5ebe4]">
                <Image
                  src={activeData.imageMobile}
                  alt={activeData.label}
                  fill
                  sizes="(max-width: 768px) 100vw, 85vw"
                  className="object-cover"
                />
              </div>
              
              {/* Overlay Gradient tối ở nửa trên để làm nổi bật chữ trắng */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent pointer-events-none" />

              {/* Chữ mô tả */}
              <div className="absolute inset-0 p-6 md:p-10 lg:p-14 text-center z-20 flex flex-col items-center justify-center">
                <h3 className="text-white font-bold text-sm sm:text-base md:text-lg lg:text-xl mb-2.5 leading-snug drop-shadow-md">
                  {activeData.title}
                </h3>
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg leading-relaxed md:leading-loose whitespace-pre-line max-w-4xl drop-shadow-md">
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
