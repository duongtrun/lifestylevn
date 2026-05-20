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
        <div className="relative w-full h-[650px] md:h-[850px] lg:h-[950px]">
          <Image
            src="/img_babego/babego_banner.webp"
            alt="Babego Banner"
            fill
            className="object-cover object-top"
            priority
          />

          {/* --- Khối mờ ở giữa --- */}
          <div className="absolute inset-0 z-10 flex items-center justify-center -mt-[150px] md:-mt-[250px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative w-[90%] md:w-[70%] lg:w-[60%] max-w-[900px] aspect-[21/9] flex items-center justify-center"
            >
              <Image 
                src="/img_babego/babego_blur_banner.svg" 
                alt="Babego Blur Background" 
                fill 
                className="object-contain drop-shadow-xl" 
                priority
              />
              <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-20">
                <h1 className="text-[32px] md:text-[56px] lg:text-[72px] font-bold text-white mb-2 md:mb-4 drop-shadow-md">
                  BABEGO
                </h1>
                <h2 className="text-xs sm:text-sm md:text-lg lg:text-xl font-medium text-white tracking-wide drop-shadow-md uppercase">
                  Dinh dưỡng chuyên sâu cho trẻ em Việt
                </h2>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== CÂU CHUYỆN THƯƠNG HIỆU ====== */}
      <section className="relative w-full py-16 md:py-24 overflow-visible flex justify-center mt-[-2px]">
        {/* Nền xanh blur */}
        <div className="absolute inset-0 z-0 flex justify-center">
          <Image 
            src="/img_babego/babego_blur_brand_story.svg" 
            alt="Babego Blur Background Story" 
            fill 
            className="object-cover object-center" 
          />
        </div>

        <div className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-end px-4 md:px-8 mt-10 md:mt-20">
          
          {/* Mascot bên trái (to hơn và đè lên viền hộp) */}
          <motion.div
            initial={{ opacity: 0, x: -40, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-[300px] md:w-[450px] lg:w-[500px] flex-shrink-0 relative z-20 md:absolute md:left-[-50px] lg:left-[-100px] md:bottom-0 mb-[-50px] md:mb-0"
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
            className="w-full md:w-[736px] bg-white rounded-[15px] p-8 md:p-12 lg:p-12 shadow-[0_15px_50px_rgba(45,122,58,0.15)] relative z-10 md:ml-auto"
          >
            {/* Logo Babego (Nổi ra ngoài góc phải trên) */}
            <div className="absolute top-[-30px] right-[-40px] md:top-[-100px] md:right-[-120px] w-[180px] h-[120px] md:w-[329px] md:h-[269px] z-20 pointer-events-none">
              <Image 
                src="/img_babego/babego_logo.webp" 
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
                "Mỗi đứa trẻ đều xứng đáng có một điểm khởi đầu khỏe mạnh."
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
                <li>Không làm sữa "cỏ", không làm sản phẩm thời vụ - Babego phải bền vững và tử tế.</li>
              </ul>
            </div>
          </motion.div>

        </div>
      </section>
    </>
  );
}
