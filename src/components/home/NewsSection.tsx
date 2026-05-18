import React from 'react';
import Image from 'next/image';

// File: src/components/home/NewsSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị phần "Tin tức nổi bật" với bức ảnh ghép lớn bao gồm các hoạt động của công ty.
// Dùng khi: Nằm dưới phần "Thành tựu đạt được".

export default function NewsSection() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="container mx-auto px-4 md:px-10">
        <h2 className="text-center text-2xl md:text-4xl font-bold text-[#68412F] mb-10">
          Tin tức nổi bật
        </h2>
        
        <div className="w-full max-w-6xl mx-auto flex justify-center">
          <Image 
            src="/images/hot_news_img.svg"
            alt="Tin tức nổi bật"
            width={1200}
            height={800}
            className="w-full h-auto object-contain rounded-xl shadow-sm"
          />
        </div>
      </div>
    </section>
  );
}
