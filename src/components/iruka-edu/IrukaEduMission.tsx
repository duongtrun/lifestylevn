'use client';

// File: src/components/iruka-edu/IrukaEduMission.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "Tầm nhìn, sứ mệnh & Cam kết" với hiệu ứng chuyển tab.
// Dùng khi: Hiển thị ở phần cuối trang Iruka EDU.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    imageDesktop: '/img_iruka_edu/tam_nhin.jpg',
    imageMobile: '/img_iruka_edu/tam_nhin_mobile.jpg',
    text: `Chúng tôi tin rằng mỗi đứa trẻ đều có khả năng tỏa sáng theo cách riêng của mình.
Iruka Edu hướng tới trở thành nền tảng giáo dục sớm ứng dụng AI hàng đầu Việt Nam — nơi trẻ học theo nhịp riêng, phát triển tự nhiên, tự tin, tò mò và đầy cảm hứng khám phá thế giới.
Chúng tôi mong muốn mọi gia đình Việt đều có cơ hội tiếp cận một nền giáo dục hiện đại, nhân văn và bình đẳng.`
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    imageDesktop: '/img_iruka_edu/su_menh.jpg',
    imageMobile: '/img_iruka_edu/su_menh_mobile.jpg',
    text: `Iruka Edu nỗ lực mang đến một môi trường học tập:
• Lấy trẻ làm trung tâm
• Ứng dụng công nghệ để nâng chất lượng giáo dục, không thay thế giáo dục
• Biến quá trình học thành hành trình khám phá vui vẻ
• Đồng hành cùng gia đình và nhà trường một cách khoa học
• Lan tỏa giá trị tốt đẹp cho cộng đồng và thế hệ tương lai`
  },
  {
    id: 'commitment',
    label: 'Lời cam kết',
    imageDesktop: '/img_iruka_edu/cam_ket.jpg',
    imageMobile: '/img_iruka_edu/cam_ket_mobile.jpg',
    text: `Chúng tôi là những con người tin vào sức mạnh của giáo dục và giá trị của sự tử tế.
Ngay từ đầu, đội ngũ đã lựa chọn con đường khó:
• Không chạy theo số lượng
• Không giáo dục “mì ăn liền”
• Mà tập trung vào giá trị bền vững cho trẻ nhỏ
Chúng tôi cam kết tiếp tục đổi mới, học hỏi và cống hiến, để Iruka Edu trở thành một nền tảng giáo dục hiện đại – an toàn – đầy cảm hứng.`
  }
];

export default function IrukaEduMission() {
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
        Tầm nhìn, sứ mệnh &amp; Lời cam kết từ đội ngũ Iruka Edu
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
                          : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
          ))}
        </div>
      </div>

      {/* Khối nội dung hình ảnh & text */}
      <div className="relative w-full max-w-6xl mx-auto px-4 md:px-0 mt-4">

        {/* Hình khối trang trí phía sau (Background Rectangles) */}
        <div className="absolute top-[10%] left-0 w-[40%] md:w-[45%] h-[45%] md:h-[50%] z-0 pointer-events-none">
          <Image
              src="/img_iruka_edu/Rectangle_left.svg"
              alt="Decoration Left"
              fill
              className="object-cover object-left"
          />
        </div>
        <div className="absolute bottom-[-10%] right-0 w-[40%] md:w-[45%] h-[45%] md:h-[50%] z-0 pointer-events-none">
          <Image
              src="/img_iruka_edu/Rectangle_right.svg"
              alt="Decoration Right"
              fill
              className="object-cover object-right"
          />
        </div>

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
              <div className="block md:hidden absolute inset-0 w-full h-full">
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
              <div className="absolute inset-0 p-6 md:p-10 lg:p-14 text-left z-20 flex flex-col items-start justify-center">
                <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-medium leading-relaxed md:leading-loose whitespace-pre-line max-w-3xl drop-shadow-md">
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
