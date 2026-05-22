'use client';

// File: src/components/iruka-edu/IrukaEduTech.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: Section "Nền tảng công nghệ và điểm khác biệt"
//   - Background: tech_different.svg
//   - 5 khối nội dung sử dụng background bg_text_tech.svg
// Dùng khi: Hiển thị bên dưới section Workflow

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const techData = [
  // Cột 1 (Trái)
  {
    id: 1,
    col: 1,
    icon: "/img_iruka_edu/puzzle_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-2 text-sm md:text-base">Mini-game giáo dục – Học thông qua chơi</h4>
        <p className="text-xs md:text-sm text-white/90 mb-2">
          Trẻ cảm thấy hứng thú, chủ động khám phá với hệ thống mini-game trực quan được thiết kế:
        </p>
        <p className="text-xs md:text-sm text-white/90">
          Tư duy logic, Ngôn ngữ – từ vựng, Toán học nền tảng, Ghi nhớ, Khả năng quan sát – phản xạ
        </p>
      </>
    )
  },
  {
    id: 2,
    col: 1,
    icon: "/img_iruka_edu/professional_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-2 text-sm md:text-base">Nội dung học được cố vấn bởi chuyên gia giáo dục</h4>
        <p className="text-xs md:text-sm text-white/90 mb-2">
          Đội ngũ cố vấn gồm các chuyên gia có kinh nghiệm trong:
        </p>
        <ul className="text-xs md:text-sm text-white/90 space-y-1 list-none">
          <li>Giáo dục sớm 0–10 tuổi</li>
          <li>Tâm lý – hành vi trẻ nhỏ</li>
          <li>Phương pháp Montessori, STEAM</li>
          <li>Giáo dục công nghệ</li>
        </ul>
      </>
    )
  },
  // Cột 2 (Giữa)
  {
    id: 3,
    col: 2,
    icon: "/img_iruka_edu/AI_img.webp",
    content: (
      <>
        <p className="font-bold text-white mb-2 text-sm md:text-base">
          Hệ thống đánh giá mức độ hiểu bài, tốc độ tiếp thu, sở thích và hành vi học tập của trẻ để:
        </p>
        <ul className="text-xs md:text-sm text-white/90 space-y-1 list-disc pl-4 mb-2">
          <li>Tự động điều chỉnh nội dung</li>
          <li>Gợi ý bài học phù hợp</li>
          <li>Phát hiện &quot;vùng yếu&quot; để cải thiện</li>
          <li>Tối ưu năng lực mạnh của từng bé</li>
        </ul>
        <p className="text-xs md:text-sm text-white/90 font-medium">
          Mỗi trẻ có một chương trình học riêng.
        </p>
      </>
    )
  },
  // Cột 3 (Phải)
  {
    id: 4,
    col: 3,
    icon: "/img_iruka_edu/shield_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-2 text-sm md:text-base">Nền tảng cam kết:</h4>
        <ul className="text-xs md:text-sm text-white/90 space-y-1 list-disc pl-4 mb-2">
          <li>Không quảng cáo</li>
          <li>Không nội dung độc hại</li>
          <li>Không dẫn trẻ sang video giải trí</li>
          <li>Không thu thập dữ liệu ngoài phạm vi bảo mật</li>
        </ul>
        <p className="text-xs md:text-sm text-white/90 font-medium">
          Môi trường học tập 100% an toàn cho trẻ em.
        </p>
      </>
    )
  },
  {
    id: 5,
    col: 3,
    icon: "/img_iruka_edu/analyst_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-2 text-sm md:text-base">Hệ thống theo dõi tiến độ & báo cáo học tập thông minh</h4>
        <p className="text-xs md:text-sm text-white/90 mb-2">
          Cha mẹ có thể:
        </p>
        <ul className="text-xs md:text-sm text-white/90 space-y-1 list-disc pl-4">
          <li>Theo dõi tiến độ từng kỹ năng</li>
          <li>Nhận báo cáo tổng hợp theo tuần/tháng</li>
          <li>Nhận gợi ý để luyện thêm tại nhà</li>
          <li>Biết được con đang học gì, mạnh gì, cần hỗ trợ gì</li>
        </ul>
      </>
    )
  }
];

export default function IrukaEduTech() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A3D73] py-16 md:py-24">
      {/* Background Image: tech_different.svg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_iruka_edu/tech_different.svg"
          alt="Tech Different Background"
          fill
          className="object-cover object-top opacity-90"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Title box (stick to left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white inline-block py-4 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-32  mb-12 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#005A8C]">
            Nền tảng công nghệ và điểm khác biệt
          </h2>
        </motion.div>

        {/* 3 Columns Layout */}
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            
            {/* Cột 1 */}
            <div className="flex flex-col gap-6 lg:gap-10 h-full">
              {techData.filter(d => d.col === 1).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.1} className="flex-1 flex flex-col" />
              ))}
            </div>

            {/* Cột 2 (Căn giữa theo chiều dọc) */}
            <div className="flex flex-col justify-center gap-6 lg:gap-10 mt-6 md:mt-0">
              {techData.filter(d => d.col === 2).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.3} />
              ))}
            </div>

            {/* Cột 3 */}
            <div className="flex flex-col gap-6 lg:gap-10 mt-6 md:mt-0 h-full">
              {techData.filter(d => d.col === 3).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.5} className="flex-1 flex flex-col" />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component cho mỗi Card
function TechCard({ icon, content, index, delay, className }: { icon?: string, content: React.ReactNode, index: number, delay: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay + index * 0.15 }}
      className={`relative w-full rounded-2xl overflow-hidden shadow-xl ${className || ''}`}
    >
      {/* Background bg_text_tech.svg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_iruka_edu/bg_text_tech.svg"
          alt="Tech Text Background"
          fill
          className="object-cover"
        />
        {/* Overlay một lớp đen/xanh mỏng để chữ trắng dễ đọc hơn trên nền svg (phòng hờ) */}
        <div className="absolute inset-0 bg-[#001D4A]/40 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 min-h-[220px] flex-1 flex flex-col justify-center">
        {icon && (
          <div className="flex justify-center w-full mb-4">
            <div className="relative w-[50px] h-[50px] md:w-[70px] md:h-[70px]">
              <Image src={icon} alt="Tech Icon" fill className="object-contain" />
            </div>
          </div>
        )}
        <div className="text-left w-full">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
