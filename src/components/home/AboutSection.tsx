'use client';

import Image from "next/image";
import { motion } from "framer-motion";

// File: src/components/home/AboutSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Giới thiệu chung về Lifestyle Việt Nam kèm logo.
// Dùng khi: Hiển thị trên trang chủ ngay dưới phần Hero.

export default function AboutSection() {
  return (
    <section className="relative w-full py-10 overflow-hidden bg-[#008BBD]/20">


      <div className="container mx-auto px-4 relative z-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Cột trái: Image Box */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center min-h-[350px] lg:min-h-[450px] min-w-0"
          >
            {/* Vòng nền phát sáng mềm phía sau Logo */}
            <div className="absolute inset-0 bg-white/40 rounded-full blur-[40px] scale-75"></div>
            
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
              className="relative z-10 w-full max-w-md flex justify-center items-center"
            >
              <Image 
                src="/images/lifestyle.svg"
                alt="Lifestyle Vietnam Logo"
                width={400}
                height={200}
                className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(152,192,74,0.15)]"
              />
            </motion.div>
          </motion.div>

          {/* Cột phải: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-8 min-w-0"
          >
            <div className="space-y-3">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#008BBD]/10 text-[#008BBD] font-bold tracking-widest text-xs md:text-sm uppercase">
                Về chúng tôi
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#008BBD] break-words tracking-tight leading-[1.2] pb-2">
                LifeStyle Việt Nam
              </h2>
            </div>
            
            <div className="space-y-5 text-gray-600 text-base md:text-lg leading-relaxed font-medium">
              <p>
                LifeStyle Việt Nam là doanh nghiệp tiên phong tại Việt Nam trong việc xây dựng hệ sinh thái toàn diện dành cho Mẹ & Bé.
              </p>
              <div className="p-6 rounded-[24px] bg-white/60 backdrop-blur-md border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                <p>
                  Với triết lý <span className="font-bold text-[#008BBD]">"Hợp tác - Phát triển - Chia sẻ giá trị thật"</span>, chúng tôi cam kết tạo ra những sản phẩm và giải pháp vừa an toàn - hiệu quả, vừa mang tính nhân văn trong hành trình nuôi dạy trẻ.
                </p>
              </div>
              <p className="text-gray-500">
                Chúng tôi tin rằng trẻ em phát triển tốt nhất khi được chăm sóc đồng bộ từ dinh dưỡng - sức khỏe - vệ sinh - giáo dục. Vì vậy, hệ sinh thái LifeStyle được xây dựng nhằm mang đến một môi trường phát triển toàn diện cho trẻ, đồng hành cùng mẹ trong từng bước trưởng thành của con.
              </p>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
