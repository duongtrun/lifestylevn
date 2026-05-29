'use client';

// File: src/components/iruka-edu/IrukaEduMission.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "Tầm nhìn, sứ mệnh & Cam kết" với hiệu ứng chuyển tab.
// Dùng khi: Hiển thị ở phần cuối trang Iruka EDU.

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Compass, ShieldCheck } from 'lucide-react';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    icon: Eye,
    imageDesktop: '/img_iruka_edu/irukaedu_tam_nhin.png',
    imageMobile: '/img_iruka_edu/irukaedu_tam_nhin_mobile.png',
    heading: 'TẦM NHÌN',
    text: `Chúng tôi tin rằng mỗi đứa trẻ đều có khả năng tỏa sáng theo cách riêng của mình. Iruka Edu hướng tới trở thành nền tảng giáo dục sớm ứng dụng AI hàng đầu Việt Nam — nơi trẻ học theo nhịp riêng, phát triển tự nhiên, tự tin, tò mò và đầy cảm hứng khám phá thế giới. Chúng tôi mong muốn mọi gia đình Việt đều có cơ hội tiếp cận một nền giáo dục hiện đại, nhân văn và bình đẳng.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-auto md:left-[5px] md:right-[5px] md:w-auto md:max-h-none md:overflow-y-visible',
    innerClass: 'p-3 md:p-6 h-auto justify-center',
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    icon: Compass,
    imageDesktop: '/img_iruka_edu/irukaedu_su_menh.png',
    imageMobile: '/img_iruka_edu/irukaedu_su_menh_mobile.png',
    heading: 'SỨ MỆNH',
    text: `Iruka Edu nỗ lực mang đến một môi trường học tập lấy trẻ làm trung tâm, ứng dụng công nghệ để nâng cao chất lượng giáo dục nhưng không thay thế giáo dục. Chúng tôi biến quá trình học thành hành trình khám phá vui vẻ, đồng hành cùng gia đình và nhà trường một cách khoa học để lan tỏa những giá trị tốt đẹp cho cộng đồng và thế hệ tương lai.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-auto md:left-[5px] md:right-[5px] md:w-auto md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto justify-start md:justify-center',
  },
  {
    id: 'commitment',
    label: 'Cam kết',
    icon: ShieldCheck,
    imageDesktop: '/img_iruka_edu/irukaedu_cam_ket.png',
    imageMobile: '/img_iruka_edu/irukaedu_cam_ket_mobile.png',
    heading: 'CAM KẾT',
    text: `Chúng tôi là những con người tin vào sức mạnh của giáo dục và giá trị của sự tử tế. Ngay từ đầu, đội ngũ đã lựa chọn con đường khó: không chạy theo số lượng, không giáo dục "mì ăn liền" mà tập trung vào giá trị bền vững cho trẻ nhỏ. Chúng tôi cam kết tiếp tục đổi mới, học hỏi và cống hiến để Iruka Edu trở thành một nền tảng giáo dục hiện đại, an toàn và đầy cảm hứng.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-auto md:right-[5px] md:w-[415px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
  }
];

export default function IrukaEduMission() {
  const [activeTab, setActiveTab] = useState(missionData[0].id);

  const activeData = missionData.find(t => t.id === activeTab) || missionData[0];

  return (
    <section className="relative w-full bg-[#FAFAFA] py-10 overflow-hidden">
      {/* Tiêu đề */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#005A8C] text-center mb-8 px-4"
      >
        Tầm nhìn, Sứ mệnh &amp; Lời cam kết từ đội ngũ Iruka Edu
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
        <div className="relative z-10 w-full md:w-[800px] mx-auto h-[400px] md:h-[420px] rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-white">
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
                  className="object-cover"
                />
              </div>

              {/* Hình ảnh nền Mobile */}
              <div className="block md:hidden absolute inset-0 w-full h-full">
                <Image
                  src={activeData.imageMobile}
                  alt={activeData.label}
                  fill
                  className="object-cover"
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
