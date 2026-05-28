'use client';

// File: src/components/about/CoreValuesSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị 6 giá trị cốt lõi dưới dạng cụm lục giác (Hexagonal Cluster)
//          có thể click để điều hướng sang trang chi tiết Giá trị cốt lõi riêng.
// Dùng khi: Người dùng cuộn đến phần Giá trị cốt lõi trên trang Giới thiệu.

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HexagonProps {
  className?: string;
  bgClass?: string;
  hasBorder?: boolean;
  borderColor?: string;
  borderWidth?: number;
  textColor?: string;
  title: string;
  onClick?: () => void;
  index: number;
}

// React Component vẽ Lục giác đứng (pointed-top) hỗ trợ border tùy chỉnh
const Hexagon = ({
  className = '',
  bgClass = 'bg-[#008BBD]',
  hasBorder = false,
  borderColor = 'bg-[#008BBD]',
  borderWidth = 3,
  textColor = 'text-white',
  title,
  index,
}: HexagonProps) => {
  const clipStyle = {
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
  };

  const formattedTitle = title.split('\n').map((line, i) => (
    <span key={i} className="block">
      {line}
    </span>
  ));

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, zIndex: 30 }}
      className={`absolute w-[190px] h-[220px] cursor-pointer transition-all duration-300 ${className}`}
    >
      {hasBorder ? (
        <div
          className={`absolute inset-0 ${borderColor}`}
          style={clipStyle}
        >
          <div
            className={`absolute ${bgClass} flex flex-col items-center justify-center p-5 text-center`}
            style={{
              ...clipStyle,
              width: `calc(100% - ${borderWidth * 2}px)`,
              height: `calc(100% - ${borderWidth * 2}px)`,
              top: `${borderWidth}px`,
              left: `${borderWidth}px`,
            }}
          >
            <p className={`text-[18px] md:text-[16px] font-bold leading-snug tracking-wide uppercase select-none ${textColor}`}>
              {formattedTitle}
            </p>
          </div>
        </div>
      ) : (
        <div
          className={`absolute inset-0 ${bgClass} flex flex-col items-center justify-center p-5 text-center`}
          style={clipStyle}
        >
          <p className={`text-[18px] md:text-[16px] font-bold leading-snug tracking-wide uppercase select-none ${textColor}`}>
            {formattedTitle}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default function CoreValuesSection() {
  // 6 lục giác xung quanh + 1 lục giác trung tâm
  const hexData = [
    {
      // 1. Top
      title: 'Con người\nlà trọng tâm',
      bgClass: 'bg-white',
      hasBorder: true,
      borderColor: 'bg-[#008BBD]',
      textColor: 'text-[#008BBD]',
      posClass: 'left-[225px] top-[0px]',
    },
    {
      // 2. Top-Right
      title: 'Luôn đổi mới\n& sáng tạo',
      bgClass: 'bg-[#008BBD]',
      hasBorder: false,
      textColor: 'text-white',
      posClass: 'left-[450px] top-[130px]',
    },
    {
      // 3. Bottom-Right
      title: 'Vì khách hàng',
      bgClass: 'bg-white',
      hasBorder: true,
      borderColor: 'bg-[#008BBD]',
      textColor: 'text-[#008BBD]',
      posClass: 'left-[450px] top-[390px]',
    },
    {
      // 4. Bottom
      title: 'Biết ơn',

      bgClass: 'bg-[#008BBD]',
      hasBorder: false,
      textColor: 'text-white',
      posClass: 'left-[225px] top-[520px]',
    },
    {
      // 5. Bottom-Left
      title: 'Đoàn kết \n & hợp tác',
      bgClass: 'bg-white',
      hasBorder: true,
      borderColor: 'bg-[#008BBD]',
      textColor: 'text-[#008BBD]',
      posClass: 'left-[0px] top-[390px]',
    },
    {
      // 6. Top-Left
      title: 'Cùng nhau\nphát triển\n& chia sẻ lợi\nnhuận',
      bgClass: 'bg-[#008BBD]',
      hasBorder: false,
      textColor: 'text-white',
      posClass: 'left-[0px] top-[130px]',
    },
  ];

  return (
    <section className="relative w-full py-16 bg-[#EEF8FC] overflow-hidden">
      

      <div className="container mx-auto px-4 relative z-10">
        
        {/* --- TIÊU ĐỀ SECTION --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <span className="inline-block mb-2.5 px-4 py-1.5 rounded-full bg-[#008BBD]/10 text-[#008BBD] text-xs font-bold uppercase tracking-widest">
            Văn hoá doanh nghiệp
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#273F68] tracking-tight leading-none mb-6">
            Giá Trị Cốt Lõi
          </h1>
          <div className="h-1 w-20 bg-[#008BBD] mx-auto rounded-full" />
        </motion.div>

        {/* --- CỤM LỤC GIÁC TỔ ONG --- */}
        <Link 
          href="/gioi-thieu/gia-tri-cot-loi"
          className="block w-fit mx-auto relative group"
        >
          {/* Container Lục giác: Tự động scale trên mobile để fit vừa chiều ngang màn hình */}
          <div className="relative w-[640px] h-[740px] scale-[0.48] xs:scale-[0.55] sm:scale-[0.68] md:scale-100 origin-center my-[-145px] xs:my-[-120px] sm:my-[-70px] md:my-0 mx-[-166px] xs:mx-[-144px] sm:mx-[-102px] md:mx-0 transition-transform duration-300">
            
            {/* Lục giác trung tâm (GIÁ TRỊ CỐT LÕI) */}
            <Hexagon
              title="GIÁ TRỊ CỐT LÕI"
              bgClass="bg-white"
              hasBorder={true}
              borderColor="bg-[#008BBD]"
              borderWidth={4}
              textColor="text-[#273F68]"
              className="left-[225px] top-[260px] z-20"
              index={0}
            />

            {/* 6 Lục giác xung quanh */}
            {hexData.map((hex, i) => (
              <Hexagon
                key={i}
                title={hex.title}
                bgClass={hex.bgClass}
                hasBorder={hex.hasBorder}
                borderColor={hex.borderColor}
                textColor={hex.textColor}
                className={hex.posClass}
                index={i + 1}
              />
            ))}

          </div>

        </Link>

        {/* Chỉ báo chạm để xem chi tiết trên Mobile */}
        <div className="flex justify-center mt-6 md:hidden relative z-30">
          <Link
            href="/gioi-thieu/gia-tri-cot-loi"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#008BBD] text-white font-bold text-sm shadow-md animate-pulse active:scale-95 transition-all"
          >
            <span>Chạm để xem chi tiết các giá trị</span>
            <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </div>

      </div>
    </section>
  );
}
