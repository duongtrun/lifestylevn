'use client';

// File: src/components/babego/BabegoHero.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Hero banner và phần Câu chuyện thương hiệu.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BabegoHero() {
  return (
    <>
      {/* ====== HERO BANNER ====== */}
      <section className="relative w-full overflow-hidden">
        {/* --- Ảnh nền banner full-width --- */}
        <div className="relative w-full h-[650px] md:h-[850px] lg:h-[1000px]">
          <Image
            src="/img_babego/babego_banner.svg"
            alt="Babego Banner"
            fill
            className="object-cover object-center"
            priority
          />

          {/* --- Overlay nội dung: text trái + mascot phải --- */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="container mx-auto px-6 lg:px-10 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-[180px] xl:gap-[300px] mt-0 lg:-mt-[250px]">

              {/* Bên trái: Tiêu đề + tagline */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg text-center lg:text-left"
              >
                <h1 className="text-4xl lg:text-8xl font-extrabold text-white leading-tight mb-4 drop-shadow-md">
                  BABEGO
                </h1>
                <p className="text-lg lg:text-2xl font-bold text-white/90 uppercase tracking-wide leading-snug drop-shadow-md">
                  Chuyên gia dinh dưỡng<br />
                  cho trẻ em Việt
                </p>
              </motion.div>

              {/* Bên phải: Mascot babego_mascot.svg */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-[220px] h-[250px] sm:w-[300px] sm:h-[340px] lg:w-[400px] lg:h-[450px] flex-shrink-0"
              >
                <Image
                  src="/img_babego/babego_mascot.webp"
                  alt="Babego Mascot"
                  fill
                  className="object-contain drop-shadow-2xl"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CÂU CHUYỆN THƯƠNG HIỆU ====== */}
      <section className="relative w-full py-16 md:py-24 overflow-hidden flex justify-center mt-[-2px]">
        {/* Nền xanh blur */}
        <div className="absolute inset-0 z-0 flex justify-center">
          <Image 
            src="/img_babego/babego_blur_brand_story.svg" 
            alt="Babego Blur Background Story" 
            fill 
            className="object-cover object-center" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] flex flex-col lg:flex-row items-center justify-end px-4 md:px-8 mt-10 lg:mt-20">
          
          {/* Mascot bên trái (to hơn và đè lên viền hộp) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-[260px] sm:w-[340px] lg:w-[500px] flex-shrink-0 relative z-20 lg:absolute lg:left-[-50px] xl:left-[-100px] lg:bottom-0 mb-[-30px] lg:mb-0"
          >
            <Image
              src="/img_babego/babego_mascot.webp"
              alt="Babego Mascot"
              width={500}
              height={600}
              className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]"
            />
          </motion.div>

          {/* Nội dung bên phải (hộp trắng) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[736px] bg-white rounded-[15px] pt-16 pb-8 px-6 sm:px-8 lg:p-12 shadow-[0_15px_50px_rgba(45,122,58,0.15)] relative z-10 lg:ml-auto"
          >
            {/* Logo Babego (Nổi ra ngoài góc phải trên) */}
            <div className="absolute top-[-30px] right-[-10px] sm:top-[-40px] sm:right-[-10px] lg:top-[-100px] lg:right-[-120px] w-[140px] h-[95px] sm:w-[200px] sm:h-[140px] lg:w-[329px] lg:h-[269px] z-20 pointer-events-none">
              <Image 
                src="/img_babego/babego_logo.svg" 
                alt="Babego Logo" 
                fill 
                className="object-contain" 
              />
            </div>

            <div className="mb-6 md:mb-8 pr-[120px] md:pr-0 relative z-10">
              <h2 className="text-2xl md:text-4xl lg:text-[40px] font-extrabold text-[#00724C]">
                Câu chuyện thương hiệu
              </h2>
            </div>

            <div className="space-y-4 text-sm md:text-base text-[#444444] leading-relaxed">
              <p>
                Babego được xây dựng từ niềm tin rằng:
              </p>
              <p className="italic font-medium">
                &ldquo;Mỗi đứa trẻ đều xứng đáng có một điểm khởi đầu khỏe mạnh.&rdquo;
              </p>
              <p>
                Trong hành trình đồng hành cùng cộng đồng mẹ & bé, đội ngũ LifeStyle Việt Nam nhận ra một thực tế kéo dài nhiều năm:
              </p>
              <p>
                Rất nhiều trẻ Việt gặp các vấn đề về tiêu hóa, hấp thu, biếng ăn, chậm tăng cân. Trong khi đó, thị trường tồn tại không ít sản phẩm dinh dưỡng không rõ ràng.
              </p>
              <p>
                Vì vậy, Babego được ra đời với triết lý rõ ràng:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-[#444444]">
                <li>Sản phẩm phải thật - hiệu quả phải thật - giá trị phải thật.</li>
                <li>Không chạy theo quảng cáo rầm rộ mà tập trung vào chất lượng cốt lõi.</li>
                <li>Không làm sữa &ldquo;cỏ&rdquo;, không làm sản phẩm thời vụ - Babego phải bền vững và tử tế.</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
