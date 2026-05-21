'use client';

import Image from "next/image";
import { motion, Variants } from "framer-motion";

// File: src/components/home/EcosystemSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị 3 thương hiệu con theo phong cách thẻ nổi 3D sang trọng.
// Dùng khi: Hiển thị trên trang chủ ngay dưới phần About.

export default function EcosystemSection() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 20 }
    },
  };

  return (
    <section className="relative w-full py-24 lg:py-32 overflow-hidden bg-white">
      {/* Nền lượn sóng/blob nhạt tạo cảm giác nhẹ nhàng */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-cream to-white pointer-events-none"></div>
      <div className="absolute -top-40 right-[-10%] w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-sage-light/80 blur-[80px] pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header Text */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-20 text-center space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary-dark font-bold tracking-widest text-xs md:text-sm uppercase">
            Khám phá
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-5xl font-extrabold leading-tight tracking-tight pb-2">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#66493C] to-[#9A735C]">Hệ sinh thái </span>
            <br className="md:hidden" />
            <span className="text-primary-dark">Lifestyle Việt Nam</span>
          </h2>
        </motion.div>

        {/* Logos Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 items-center justify-items-center max-w-6xl mx-auto"
        >
          {/* Vòng lặp 3 Card Thương Hiệu */}
          {[
            { id: 'iruka_edu', src: '/images/iruka_edu.svg', alt: 'IruKa Edu', delay: 0 },
            { id: 'babego', src: '/images/babego.webp', alt: 'Babego', delay: 0.1 },
            { id: 'iruka_care', src: '/images/iruka_care.svg', alt: 'IruKa Care', delay: 0.2 },
          ].map((item) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              // Thay đổi aspect-[4/5] (quá cao) thành aspect-[1.6] (hình chữ nhật nằm ngang) giúp ôm sát logo nằm ngang hơn
              className="relative group flex flex-col items-center w-full max-w-[320px] aspect-[1.6]"
            >
              {/* Thẻ nền trắng bo góc mềm, bóng đổ sang trọng */}
              <div className="absolute inset-0 bg-white rounded-[24px] shadow-[0_15px_45px_rgba(0,0,0,0.05)] border border-gray-100 group-hover:shadow-[0_25px_55px_rgba(152,192,74,0.12)] group-hover:border-primary/20 transition-all duration-500"></div>
              
              {/* Nội dung bên trong thẻ */}
              <div className="relative z-10 w-full h-full flex flex-col justify-center items-center p-6">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Glow mờ đằng sau logo */}
                  <div className="absolute w-[80%] h-[80%] bg-primary/5 rounded-full blur-[20px] group-hover:bg-primary/10 transition-colors duration-500"></div>
                  <Image 
                    src={item.src}
                    alt={item.alt}
                    width={200}
                    height={80}
                    // Loại bỏ aspect-square của khung chứa cũ, cho logo chiếm tỉ lệ w-[75%] để lấp đầy khoảng trống vừa vặn
                    className="relative z-10 w-[75%] h-auto object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
