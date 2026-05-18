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
      {/* --- NỀN CEO_BLUR.SVG — chỉ phủ vùng tiêu đề, không kéo dài xuống dưới --- */}
      <div className="absolute top-0 left-0 w-full h-[320px] md:h-[380px] lg:h-[420px] pointer-events-none z-0">
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
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md">
            Đội ngũ lãnh đạo
          </h2>
          <div className="max-w-3xl mx-auto space-y-2 text-white/95 font-medium md:text-lg">
            <p>Con người LifeStyle – Tận tâm, chuyên nghiệp, sáng tạo</p>
            <p>LifeStyle quy tụ đội ngũ trẻ – nhiệt huyết – ham học hỏi.</p>
            <p>Chúng tôi có chuyên môn trong công nghệ, giáo dục, dinh dưỡng, sản xuất – chăm sóc sức khỏe, thiết kế – sáng tạo.</p>
          </div>
        </motion.div>

        {/* --- 2 CEO CARDS --- */}
        {/* --- 2 CEO CARDS — đẩy ra 2 bên trái phải, thu nhỏ lại --- */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[240px] md:w-[300px] lg:w-[360px] aspect-[554/450]"
          >
            <Image src="/img_about_us/CEO_2.svg" alt="CEO" fill className="object-contain drop-shadow-2xl" />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-[240px] md:w-[300px] lg:w-[360px] aspect-[554/450]"
          >
            <Image src="/img_about_us/CEO.svg" alt="CEO" fill className="object-contain drop-shadow-2xl" />
          </motion.div>
        </div>

      </div>

      {/* --- BANNER LIFESTYLE — nền xanh dương, thu nhỏ --- */}
      <div className="relative w-full z-10 mt-[-60px] md:mt-[-100px] lg:mt-[-140px] bg-[#008BBD]">
        <div className="relative w-full h-[449px]">
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
      <div className="relative flex justify-center mt-[-60px] md:mt-[-100px] lg:mt-[-140px] z-30 px-4">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md border-[3px] border-[#008BBD] py-10 px-6 md:py-16 md:px-16 lg:py-20 lg:px-24 max-w-[1000px] text-center shadow-[0_20px_50px_rgba(0,139,189,0.15)]"
          style={{ borderRadius: '50% / 50%' }}
        >
          <p className="text-sm md:text-base lg:text-lg text-[#273F68] leading-relaxed font-medium">
            &ldquo;Kính gửi Quý đối tác, Quý phụ huynh và những người đồng hành cùng LifeStyle Việt Nam. <br />
            Tôi tin rằng: một đứa trẻ khỏe mạnh và hạnh phúc hôm nay sẽ tạo nên một thế hệ vững <br className="hidden md:block" />
            mạnh ngày mai - đó là lý do LifeStyle Việt Nam ra đời và là kim chỉ nam cho mọi quyết định <br className="hidden md:block" />
            của chúng tôi. Chúng tôi không chỉ bán sản phẩm, mà xây dựng giải pháp toàn diện cho trẻ <br className="hidden md:block" />
            và giúp ba mẹ yên tâm hơn trong hành trình nuôi dạy con. <br />
            Xin trân trọng cảm ơn sự tin yêu và đồng hành của Quý vị.&rdquo;
          </p>
          <p className="mt-6 md:mt-8 text-base md:text-lg font-bold text-[#008BBD] uppercase tracking-wide">
            CEO Vũ Ngọc Đảo
          </p>
        </motion.div>
      </div>

    </section>
  );
}
