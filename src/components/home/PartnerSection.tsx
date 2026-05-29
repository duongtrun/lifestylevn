import React from 'react';
import Image from 'next/image';

// File: src/components/home/PartnerSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị tiêu đề, lời ngỏ và logo các đối tác chiến lược (CVI, Hadu).
// Dùng khi: Nằm ở cuối trang chủ, ngay trên Footer (dưới phần Tin tức nổi bật).

export default function PartnerSection() {
  return (
    <section className="w-full py-10 bg-[#fafafa]">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-[#68412F] mb-6">
          Đối tác & đồng hành
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 text-sm md:text-base leading-relaxed px-4">
          LifeStyle Việt Nam tự hào được đồng hành cùng nhiều đối tác uy tín trong lĩnh vực giáo dục, y tế,
          phân phối và công nghệ. Chúng tôi luôn tìm kiếm những đối tác có chung tầm nhìn, để cùng kiến tạo
          những giá trị bền vững dành cho trẻ em Việt Nam.
        </p>
        
        {/* <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <Image 
            src="/images/CVI.svg"
            alt="Đối tác CVI Pharma"
            width={250}
            height={100}
            className="w-48 md:w-64 h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
          <Image 
            src="/images/hadu.svg"
            alt="Đối tác HADU Pharma"
            width={250}
            height={100}
            className="w-48 md:w-64 h-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </div> */}
      </div>
    </section>
  );
}
