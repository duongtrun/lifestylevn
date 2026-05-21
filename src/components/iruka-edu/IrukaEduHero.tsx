'use client';

// File: src/components/iruka-edu/IrukaEduHero.tsx
// Luồng: Trang Hệ sinh thái > Iruka EDU (/he-sinh-thai/iruka-edu)
// Vai trò: Hero banner — hiển thị ảnh nền banner_iruka_edu.svg full-width phía trên,
//          bên trái là tiêu đề + tagline, bên phải là mascot hero_banner.svg.
//          Phía dưới là phần "Câu chuyện thương hiệu" trên nền trắng.
// Dùng khi: Người dùng vào trang Iruka EDU từ menu hoặc link hệ sinh thái.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaEduHero() {
  return (
    <>
      {/* ====== HERO BANNER ====== */}
      <section className="relative w-full overflow-hidden">
        {/* --- Ảnh nền banner full-width --- */}
        <div className="relative w-full h-[650px] md:h-[850px] lg:h-[1000px]">
          <Image
            src="/img_iruka_edu/banner_iruka_edu.webp"
            alt="Iruka EDU Banner"
            fill
            className="object-cover object-center"
            priority
          />

          {/* --- Overlay nội dung: text trái + mascot phải --- */}
          <div className="absolute inset-0 z-10 flex items-center">
            <div className="container mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-0 md:-mt-[250px]">

              {/* Bên trái: Tiêu đề + tagline */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-lg text-center md:text-left"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#273F68] leading-tight mb-4">
                  IRUKA EDU
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl font-bold text-[#273F68]/80 uppercase tracking-wide leading-snug">
                  Nền tảng giáo dục sớm<br />
                  ứng dụng AI<br />
                  cho trẻ 3–11 tuổi
                </p>
              </motion.div>

              {/* Bên phải: Mascot hero_banner.svg */}
              <motion.div
                initial={{ opacity: 0, x: 40, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative w-[220px] h-[250px] md:w-[300px] md:h-[340px] lg:w-[380px] lg:h-[430px] flex-shrink-0"
              >
                <Image
                  src="/img_iruka_edu/hero_banner.webp"
                  alt="Iruka EDU Mascot"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ====== CÂU CHUYỆN THƯƠNG HIỆU — đè lên banner ====== */}
      {/* Mobile: -mt-[100px] để tạo khoảng cách ~30-50px dưới mascot; Desktop: -mt-[250px] giữ nguyên thiết kế gốc */}
      <div className="relative z-20 w-full flex justify-center -mt-[100px] md:-mt-[250px] pb-16">
        {/* Nền trắng bắt đầu từ 100px (mobile) / 250px (desktop) trở đi */}
        <div className="absolute top-[100px] md:top-[250px] left-0 right-0 bottom-0 bg-white -z-10" />
        
        <section className="relative z-10 w-full max-w-[1200px] h-auto bg-white py-10 lg:py-14 px-10 md:px-16 rounded-[10px] shadow-[0_0px_40px_rgba(0,0,0,0.08)] mx-4">

        <div className="container mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            {/* Tiêu đề */}
            <h2 className="text-2xl md:text-4xl font-extrabold text-[#008BBD] mb-8 text-center md:text-left">
              Câu chuyện thương hiệu iruKa
            </h2>

            {/* Nội dung: tăng cỡ chữ lên text-base (16px) trên mobile cho dễ đọc, text-lg (18px) trên desktop */}
            <div className="space-y-5 text-base md:text-lg text-[#273F68]/80 leading-relaxed">
              <p>
                Trong văn hóa Nhật Bản, cá heo – &quot;iruKa&quot; là biểu tượng của trí tuệ, sự dẫn dắt và bảo vệ.
                Cá heo nuôi dạy con bằng cách học qua chơi, bằng sự tương tác tự nhiên và kiên nhẫn –
                đúng với bản chất của quá trình giáo dục sớm.
              </p>
              <p>
                Từ tinh thần ấy, chúng tôi xây dựng iruKa Edu.
              </p>
              <p>
                Quan sát trẻ em ngày nay, chúng tôi nhận ra rằng mỗi trẻ đều có tiềm năng riêng, chỉ khác nhau ở cách học –
                tốc độ học – cảm hứng học. Giáo dục truyền thống lại thường đi theo khuôn mẫu chung,
                khiến nhiều trẻ áp lực và thiếu hứng thú.
              </p>
              <p>
                Từ câu hỏi: &quot;Làm sao để trẻ được học theo cách của chính mình?&quot;
              </p>
              <p>
                iruKa Edu ra đời như một người bạn đồng hành thông minh — cá nhân hóa, hiện đại và đầy cảm hứng.
              </p>
              <p>
                Cũng như cách đàn cá heo luôn bơi cạnh nhau, iruKa Edu tin rằng giáo dục cần sự đồng hành
                của trẻ – gia đình – nhà trường – công nghệ. Công nghệ không thay thế con người,
                nhưng giúp mỗi đứa trẻ có một lộ trình học phù hợp nhất với chính mình.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </>
  );
}
