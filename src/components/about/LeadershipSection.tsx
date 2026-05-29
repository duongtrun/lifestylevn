'use client';

// File: src/components/about/LeadershipSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị Đội ngũ lãnh đạo, gồm 2 ảnh CEO, banner LIFESTYLE và thư ngỏ.
// Dùng khi: Tích hợp vào page.tsx

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function LeadershipSection() {
  return (
    <section className="relative w-full pt-20 pb-32 overflow-hidden bg-white">
      {/* Ảnh nền xanh CEO_blur — ẨN trên mobile/iPad dọc, chỉ hiện từ màn hình lớn (lg) trở lên */}
      <div className="hidden lg:block absolute top-0 left-0 w-full h-[480px] pointer-events-none z-0">
        <Image
          src="/img_about_us/CEO_blur.svg"
          alt="CEO Blur Background"
          fill
          className="object-cover object-center"
        />
        {/* Gradient mờ dần sang trắng — xóa đường vạch ngang, liền mạch */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-white" />
      </div>

      <div className="container mx-auto px-4 md:px-10 relative z-20">

        {/* --- TIÊU ĐỀ & MÔ TẢ --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          {/* Tiêu đề: chữ xanh dương thương hiệu ở mobile/iPad dọc, trắng ở desktop/iPad ngang (vì desktop có nền xanh CEO_blur) */}
          <h2 className="text-3xl lg:text-5xl font-extrabold text-[#008BBD] lg:text-white mb-6 drop-shadow-md">
            Đội ngũ lãnh đạo
          </h2>
          {/* Mô tả: chữ xám đậm ở mobile, trắng mờ ở desktop */}
          <div className="max-w-3xl mx-auto space-y-2 text-gray-700 lg:text-white/95 font-medium lg:text-lg">
            <p>Con người LifeStyle – Tận tâm, chuyên nghiệp, sáng tạo</p>
            <p>LifeStyle quy tụ đội ngũ trẻ – nhiệt huyết – ham học hỏi.</p>
            <p>Chúng tôi có chuyên môn trong công nghệ, giáo dục, dinh dưỡng, sản xuất – chăm sóc sức khỏe, thiết kế – sáng tạo.</p>
          </div>
        </motion.div>

        {/* --- 2 CEO CARDS --- */}
        {/* --- 2 CEO CARDS — đẩy ra 2 bên trái phải, thu nhỏ lại --- */}
        {/* Layout 2 ảnh CEO: trên mobile/iPad dọc xếp dọc, trên desktop/iPad ngang xếp ngang 2 bên */}
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-end gap-6 relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[240px] lg:w-[360px] aspect-[554/450]"
          >
            <Image src="/img_about_us/CEO_2.svg" alt="CEO" fill className="object-contain drop-shadow-2xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[240px] lg:w-[360px] aspect-[554/450]"
          >
            <Image src="/img_about_us/CEO.svg" alt="CEO" fill className="object-contain drop-shadow-2xl" />
          </motion.div>
        </div>

      </div>

      {/* --- BANNER LIFESTYLE --- */}
      {/* Trên mobile/iPad dọc: chiều cao ngắn 130px; trên desktop/iPad ngang: giữ nguyên 449px */}
      {/* mt-0 trên mobile, lg:mt-[-140px] trên desktop đè lên CEO images */}
      <div className="relative w-full z-10 mt-0 lg:mt-[-140px] bg-[#008BBD]">
        <div className="relative w-full h-[130px] lg:h-[449px]">
          <Image
            src="/img_about_us/CEO_banner.svg"
            alt="Leadership Banner"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* --- QUOTE OVAL OVERLAY --- */}
      {/* mt-0 trên mobile, lg:mt-[-140px] trên desktop mới đè vào banner */}
      <div className="relative flex justify-center mt-0 lg:mt-[-140px] z-30 px-4 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md border-[3px] border-[#008BBD] py-10 px-8 lg:py-20 lg:px-28 max-w-[1000px] w-full text-center shadow-[0_20px_50px_rgba(0,139,189,0.15)] overflow-hidden rounded-[36px] lg:rounded-[50%]"
        >
          <p className="text-sm md:text-base lg:text-lg text-[#273F68] leading-relaxed font-medium">
            &ldquo;Kính gửi Quý đối tác, phụ huynh và những người đồng hành cùng LifeStyle Việt Nam. Tôi tin rằng: một đứa trẻ khỏe mạnh và hạnh phúc hôm nay sẽ tạo nên một thế hệ vững mạnh ngày mai. Đó là lý do LifeStyle Việt Nam ra đời và là kim chỉ nam cho mọi quyết định của chúng tôi. Chúng tôi không chỉ bán sản phẩm, mà xây dựng giải pháp toàn diện cho trẻ và giúp ba mẹ yên tâm hơn trong hành trình nuôi dạy con. Xin trân trọng cảm ơn sự tin yêu và đồng hành của Quý vị.&rdquo;
          </p>
          <p className="mt-6 md:mt-8 text-base md:text-lg font-bold text-[#008BBD] uppercase tracking-wide">
            CEO Vũ Ngọc Đào
          </p>
        </motion.div>
      </div>

    </section>
  );
}
