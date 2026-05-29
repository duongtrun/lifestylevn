'use client';

// File: src/components/iruka-care/IrukaCareMission.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: Section "Tầm nhìn, sứ mệnh & Cam kết" với hiệu ứng chuyển tab và thẻ glassmorphism.
// Dùng khi: Hiển thị ở phần cuối trang Iruka Care (Sau phần Potential).

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Compass, ShieldCheck } from 'lucide-react';

const missionData = [
  {
    id: 'vision',
    label: 'Tầm nhìn',
    icon: Eye,
    imageDesktop: '/img_iruka_care/irukacare_tam_nhin.png',
    imageMobile: '/img_iruka_care/irukacare_tam_nhin_mobile.png',
    heading: 'TẦM NHÌN',
    text: `“Iruka Care – An toàn trong từng khoảnh khắc lớn khôn.”
Iruka Care hướng đến trở thành thương hiệu vệ sinh và an toàn đáng tin cậy cho trẻ em Việt Nam, mang đến các sản phẩm sạch, lành tính và minh bạch. Mỗi sản phẩm được tạo ra như một “lá chắn” dịu nhẹ, giúp trẻ tự do khám phá thế giới và mang lại sự yên tâm cho bố mẹ trong hành trình chăm con.
`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-[5px] md:right-auto md:w-[365px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-3 md:p-6 h-auto md:h-full justify-center',
  },
  {
    id: 'mission',
    label: 'Sứ mệnh',
    icon: Compass,
    imageDesktop: '/img_iruka_care/irukacare_su_menh.png',
    imageMobile: '/img_iruka_care/irukacare_su_menh_mobile.png',
    heading: 'SỨ MỆNH',
    text: `“Bảo vệ sự hồn nhiên – Chăm sóc toàn diện – Đồng hành cùng gia đình Việt.” Chúng tôi mang đến sản phẩm an toàn tuyệt đối cho trẻ nhỏ, dựa trên tiêu chuẩn khoa học và hiểu biết về làn da nhạy cảm. Iruka Care giúp bố mẹ giảm lo lắng và chủ động chăm sóc con mỗi ngày. Sứ mệnh của chúng tôi là góp phần xây dựng thế hệ trẻ khỏe mạnh, hình thành thói quen vệ sinh đúng – sạch – an toàn.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-auto md:right-[5px] md:w-[445px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
  },
  {
    id: 'commitment',
    label: 'Lời cam kết',
    icon: ShieldCheck,
    imageDesktop: '/img_iruka_care/irukacare_cam_ket.png',
    imageMobile: '/img_iruka_care/irukacare_cam_ket_mobile.png',
    heading: 'LỜI CAM KẾT',
    text: `“Mỗi sản phẩm đều được làm bằng sự yêu thương và trách nhiệm.” Chúng tôi cam kết minh bạch thành phần, không thỏa hiệp với bất kỳ yếu tố gây hại cho trẻ. Mỗi sản phẩm đều được chọn lọc kỹ lưỡng, kiểm nghiệm độc lập và liên tục cải tiến. Iruka Care đặt trải nghiệm của trẻ và sự yên tâm của bố mẹ làm trọng tâm trong mọi quyết định.`,
    cardClass: 'absolute top-[5px] bottom-auto left-[5px] right-[5px] z-20 w-auto max-h-[245px] overflow-y-auto md:top-[5px] md:bottom-[5px] md:left-[5px] md:right-auto md:w-[445px] md:max-h-none md:overflow-y-visible',
    innerClass: 'p-2 md:p-6 h-auto md:h-full justify-start md:justify-center',
  }
];

export default function IrukaCareMission() {
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
        Tầm nhìn, Sứ mệnh &amp; Lời cam kết từ đội ngũ Iruka Care
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center mb-10 md:mb-16 px-4 relative z-20">
        <div className="flex bg-gray-100/80 p-1.5 rounded-full shadow-inner border border-gray-200 overflow-x-auto max-w-full hide-scrollbar">
          {missionData.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-6 py-2.5 md:px-10 md:py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
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
        <div className="relative z-10 w-full md:w-[800px] mx-auto h-[400px] md:h-[420px] rounded-xl md:rounded-3xl overflow-hidden shadow-2xl bg-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
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
