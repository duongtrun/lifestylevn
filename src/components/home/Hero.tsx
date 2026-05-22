"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Leaf, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

// File này: Component Hero (Phần đầu trang chủ)
// Vai trò: Khu vực Banner chính giới thiệu dự án với ảnh mẹ và bé, nút khám phá và các icon nổi (floating).
// Dùng khi: Render ở phần đầu tiên của màn hình Home (page.tsx).

export default function Hero() {
  return (
    <section className="relative w-full min-h-[600px] lg:h-[85vh] flex items-center overflow-hidden bg-gradient-to-r from-emerald-50/80 to-white">
      {/* Background Image Placeholder */}
      {/* Anh Đào lưu ý: Em đang dùng ảnh mạng (Unsplash) làm ví dụ. Sau này anh có ảnh gốc thì thay link vào nhé */}
      <div 
        className="absolute inset-0 z-0 opacity-40 md:opacity-100 md:w-[60%] md:left-[40%] pointer-events-none bg-cover bg-center md:bg-right"
        style={{ 
          backgroundImage: 'url("https://images.unsplash.com/photo-1544281679-4148e69e3cb1?q=80&w=1200&auto=format&fit=crop")',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 30%)',
          maskImage: 'linear-gradient(to right, transparent, black 30%)',
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4 grid md:grid-cols-2 gap-8 items-center h-full">
        {/* Left Content */}
        <div className="max-w-xl space-y-6 pt-10 pb-20 md:py-0">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-extrabold tracking-widest text-base md:text-lg lg:text-xl uppercase"
          >
            LIFESTYLE VIỆT NAM
          </motion.p>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-[#66493C] to-[#9A735C] leading-[1.2] pb-2"
          >
            <span className="block">KIẾN TẠO HỆ SINH THÁI</span>
            <span className="block">MẸ VÀ BÉ</span>
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="pt-6"
          >
            <Link 
              href="/gioi-thieu" 
              className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-primary px-8 text-base font-medium text-white hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/25 group"
            >
              Khám phá ngay <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Right Content - Floating Elements (Visible mostly on desktop) */}
        <div className="hidden md:flex relative h-full items-center justify-center min-h-[500px]">
          
          {/* Left Floating Icon (Book/Lightbulb) */}
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[10%] top-[30%] -translate-x-1/2 flex items-center justify-center w-24 h-24 rounded-full bg-white/80 backdrop-blur-md shadow-2xl shadow-teal-500/10 border-4 border-white text-teal-500 z-20"
          >
            <BookOpen className="w-10 h-10" />
          </motion.div>

          {/* Bottom Floating Icon (Drop/Leaf) */}
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[45%] flex items-center justify-center w-32 h-32 rounded-full bg-white/80 backdrop-blur-md shadow-2xl shadow-primary/20 border-4 border-white text-primary z-30"
          >
            <Leaf className="w-14 h-14" />
          </motion.div>

          {/* Right Floating Icon (Shield/Drop) */}
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute right-[5%] top-[45%] flex items-center justify-center w-28 h-28 rounded-full bg-white/80 backdrop-blur-md shadow-2xl shadow-cyan-500/20 border-4 border-white text-cyan-500 z-20"
          >
            <ShieldCheck className="w-12 h-12" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
