'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

// File: src/components/babego/BabegoProduct.tsx
// Luồng: Trang Hệ sinh thái > Babego
// Vai trò: Trình bày các sản phẩm nổi bật của Babego (khối zigzag).

export default function BabegoProduct() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden">
      {/* Nền xanh blur (Tái sử dụng background mờ giống Câu chuyện thương hiệu) */}
      <div className="absolute inset-0 z-0 flex justify-center opacity-70">
        <Image 
          src="/img_babego/babego_blur_brand_story.svg" 
          alt="Babego Blur Background Products" 
          fill 
          className="object-cover object-center" 
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 max-w-[1100px] flex flex-col gap-12 md:gap-16">
        
        {/* Block 1: Ảnh trái, Chữ phải */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="w-full flex flex-col md:flex-row bg-white rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(0,114,76,0.1)]"
        >
          {/* Ảnh bên trái */}
          <div className="w-full md:w-[45%] relative aspect-[4/3] md:aspect-auto md:min-h-[350px]">
            <Image 
              src="/img_babego/babego_production1.webp" 
              alt="Babego - Dinh dưỡng từ thảo dược chùm ngây" 
              fill 
              className="object-cover object-center" 
            />
          </div>
          
          {/* Nội dung bên phải */}
          <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-extrabold text-[#00724C] mb-6 leading-tight">
              Babego - Dinh dưỡng từ thảo dược chùm ngây
            </h3>
            <ul className="space-y-4 text-[#444444] text-sm md:text-base font-medium">
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00724C] flex-shrink-0" />
                Hỗ trợ ăn ngon
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00724C] flex-shrink-0" />
                Cải thiện tiêu hóa, giảm táo bón
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00724C] flex-shrink-0" />
                Hỗ trợ tăng cân ổn định
              </li>
              <li className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00724C] flex-shrink-0" />
                Công thức lành tính, dễ hấp thu
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Block 2: Chữ trái, Ảnh phải */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full flex flex-col-reverse md:flex-row bg-white rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(0,114,76,0.1)]"
        >
          {/* Nội dung bên trái */}
          <div className="w-full md:w-[55%] p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h3 className="text-xl md:text-2xl lg:text-[28px] font-extrabold text-[#00724C] mb-6 leading-tight">
              Babego Gold - Công thức cải tiến chuyên sâu
            </h3>
            <div className="space-y-4 text-[#444444] text-sm md:text-base">
              <p>
                <strong className="text-[#00724C]">Tiêu hóa khỏe:</strong> Chất xơ hòa tan, lợi khuẩn, HMO hỗ trợ đường ruột nhạy cảm.
              </p>
              <p>
                <strong className="text-[#00724C]">Miễn dịch mạnh:</strong> Vitamin A, C, D3, kẽm giúp trẻ ít ốm và phục hồi tốt.
              </p>
              <p>
                <strong className="text-[#00724C]">Tăng cân dễ:</strong> Tỷ lệ dinh dưỡng cân đối, giúp hấp thu nhanh, không gây nặng bụng.
              </p>
              <p>
                <strong className="text-[#00724C]">Hỗ trợ chiều cao:</strong> Canxi - D3 - K2 giúp phát triển xương chắc khỏe.
              </p>
            </div>
          </div>

          {/* Ảnh bên phải */}
          <div className="w-full md:w-[45%] relative aspect-[4/3] md:aspect-auto md:min-h-[350px]">
            <Image 
              src="/img_babego/babego_production2.webp" 
              alt="Babego Gold - Công thức cải tiến chuyên sâu" 
              fill 
              className="object-cover object-center" 
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
