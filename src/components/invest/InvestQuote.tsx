'use client';

// File: src/components/invest/InvestQuote.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Trích dẫn lời CEO kết thúc trang
// Dùng khi: Đặt ở cuối trang Đối tác & Đầu tư

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function InvestQuote() {
  return (
    <section className="w-full pt-16 pb-24 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 max-w-[1250px] relative z-10 flex justify-center items-center">
        
        {/* Vòng cung oval bao quanh */}
        <div className="relative w-full max-w-[1250px] md:aspect-[1250/540] flex items-center justify-center py-8 px-4 md:py-10 md:px-24">
          
          {/* Ảnh oval background */}
          <div className="absolute inset-0 z-10 pointer-events-none hidden md:block">
            <Image 
              src="/invest_img/bg_investment.svg" 
              alt="Oval frame" 
              fill 
              className="object-contain" 
              priority
            />
          </div>

          {/* Blur màu xanh đằng sau chữ (Hiệu ứng liền khối mượt mà không bị cắt viền) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] max-w-[800px] z-0 bg-[#008BBD] opacity-[0.15] blur-[100px] rounded-[100%] pointer-events-none">
          </div>

          {/* Nội dung Quote */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-20 w-full max-w-[700px] flex flex-col items-center"
          >
            <div className="w-full relative px-6 md:px-12">
              {/* Dấu ngoặc kép mở */}
              <span className="absolute top-[-15px] left-0 md:left-4 text-3xl md:text-4xl text-gray-800 font-serif leading-none">“</span>
              
              <div className="text-gray-800 text-[12px] sm:text-xs md:text-[14px] lg:text-[15px] leading-relaxed space-y-2.5 mt-2 text-left font-medium">
                <p>
                  Hôm nay, khi công nghệ thay đổi thế giới, chúng tôi lựa chọn bước đi mạnh mẽ hơn:{" "}
                  <br className="hidden md:block" />
                  ứng dụng AI và mô hình hệ sinh thái để mang đến giải pháp toàn diện cho trẻ nhỏ.
                </p>
                <p>
                  Chúng tôi tin rằng LifeStyle Việt Nam đang đứng trước thời cơ quan trọng để bứt phá,{" "}
                  <br className="hidden md:block" />
                  và chúng tôi mong muốn được đồng hành cùng những nhà đầu tư có chung tầm nhìn:
                </p>
                <p className="font-bold text-black text-[13px] sm:text-sm md:text-[15px] lg:text-[16px]">
                  Tạo ra giá trị thật, bền vững và nhân văn cho xã hội.
                </p>
                <p>
                  Rất mong được hợp tác cùng Quý vị trên hành trình xây dựng tương lai tốt đẹp hơn cho{" "}
                  <br className="hidden md:block" />
                  thế hệ trẻ.
                </p>
              </div>

              {/* Phần chữ ký và dấu ngoặc kép đóng */}
              <div className="w-full flex justify-end mt-3 relative">
                <div className="text-right pr-6 md:pr-10">
                  <p className="text-gray-800 text-[11px] sm:text-xs md:text-sm">Trân trọng,</p>
                  <p className="font-bold text-black text-sm sm:text-base mt-0.5">CEO Vũ Ngọc Đào</p>
                </div>
                <span className="absolute top-[-10px] right-0 md:right-4 text-3xl md:text-4xl text-gray-800 font-serif leading-none">”</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
