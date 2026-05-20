'use client';

// File: src/components/iruka-edu/IrukaEduAbout.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU
// Vai trò: 2 khối nội dung —
//   1) "iruKa Edu là gì?" — nền xanh (iruka_edu_blur), mascot trái + text phải
//   2) "Vì sao chúng tôi xây dựng iruKa Edu?" — nền trắng, text trái + mascot phải
// Dùng khi: Hiển thị ngay dưới tờ giấy "Câu chuyện thương hiệu".

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaEduAbout() {
  return (
    <>
      {/* ====== SECTION 1: iruKa Edu là gì? — có nền blur riêng ====== */}
      <section className="relative w-full overflow-hidden">
        {/* Ảnh nền xanh blur được làm mờ viền trên và dưới để không bị vạch kẻ ngang */}
        <div 
          className="absolute inset-0 z-0 opacity-80"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <Image
            src="/img_iruka_edu/iruka_edu_blur.svg"
            alt="Iruka EDU Background"
            fill
            className="object-cover"
          />
        </div>
        {/* Nội dung: mascot trái + text phải */}
        <div className="relative z-10 container mx-auto px-6 md:px-10 py-16 md:py-24 lg:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 lg:gap-32 max-w-6xl mx-auto">

            {/* Bên trái: Mascot iruKa lớn */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-[280px] h-[254px] md:w-[350px] md:h-[318px] lg:w-[420px] lg:h-[380px] flex-shrink-0"
            >
              <Image
                src="/img_iruka_edu/iruka_edu_hero.svg"
                alt="iruKa Edu Mascot"
                fill
                className="object-contain drop-shadow-xl"
              />
            </motion.div>

            {/* Bên phải: Tiêu đề + nội dung */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#273F68] mb-6">
                iruKa Edu là gì?
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#273F68]/85 leading-relaxed">
                <p>
                  iruKa Edu là nền tảng giáo dục sớm dành cho trẻ 3–10 tuổi, ứng dụng AI,
                  game hóa (gamification) và cá nhân hóa lộ trình học.
                </p>
                <p>
                  Mục tiêu là giúp trẻ tiếp cận kiến thức một cách tự nhiên, hứng thú
                  và không áp lực — &quot;học mà chơi, chơi mà học&quot;.
                </p>
                <p>
                  Nền tảng được phát triển bởi đội ngũ chuyên gia giáo dục, kỹ thuật và tâm lý,
                  đảm bảo tính khoa học – hiện đại – phù hợp với sự phát triển của trẻ nhỏ.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 2: Vì sao chúng tôi xây dựng iruKa Edu? — nền trắng ====== */}
      <section className="relative w-full bg-white py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-20 lg:gap-32 max-w-6xl mx-auto">

            {/* Bên trái: Nội dung text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#273F68] mb-6">
                Vì sao chúng tôi xây dựng iruKa Edu ?
              </h2>
              <div className="space-y-4 text-sm md:text-base text-[#273F68]/80 leading-relaxed">
                <p>
                  Giáo dục sớm chính là giai đoạn vàng để trẻ phát triển trí tuệ,
                  ngôn ngữ, cảm xúc, tư duy.
                </p>
                <p>
                  Mỗi trẻ có cách học khác nhau, nhưng giáo dục truyền thống
                  khó cá nhân hóa.
                </p>
                <p>
                  Trẻ ngày nay tiếp cận công nghệ sớm — nhưng cần một môi
                  trường an toàn, định hướng đúng.
                </p>
                <p>
                  Học qua chơi giúp trẻ phát triển tư duy, kỹ năng xã hội và khả
                  năng ghi nhớ kiến thức tốt hơn.
                </p>
                <p>
                  Gia đình cần một nền tảng tin cậy — khoa học — dễ dùng để
                  đồng hành cùng con mỗi ngày.
                </p>
                <p>
                  iruKa Edu xuất phát từ mong muốn giải quyết những vấn đề
                  đó một cách hiện đại và nhân văn.
                </p>
              </div>
            </motion.div>

            {/* Bên phải: Mascot iruka_care_hero */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative w-[280px] h-[286px] md:w-[340px] md:h-[347px] lg:w-[400px] lg:h-[408px] flex-shrink-0"
            >
              <Image
                src="/img_iruka_edu/iruka_care_hero.svg"
                alt="Vì sao xây dựng iruKa Edu"
                fill
                className="object-contain drop-shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
