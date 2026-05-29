'use client';

// File: src/components/invest/InvestOpportunity.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Giới thiệu cơ hội đầu tư cùng IruKa, có hình ảnh minh hoạ
// Dùng khi: Hiển thị ngay dưới phần Hero.

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function InvestOpportunity() {
  return (
    <section className="relative w-full py-16 md:py-24 bg-white overflow-hidden">
      {/* Background decoration (blur) */}
      <div className="absolute top-0 left-0 w-[120%] md:w-[80%] h-[600px] md:h-[800px] -z-10 pointer-events-none opacity-90 -translate-x-10 -translate-y-10">
        <Image
          src="/invest_img/invest_blur_opp.svg"
          alt="background blur"
          fill
          className="object-cover object-left-top"
          priority
        />
      </div>

      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Phần 1: Ảnh trái - Text phải */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 mb-20 items-stretch">
          
          {/* Cột trái: Hình ảnh */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-5/12 shrink-0 relative min-h-[300px] lg:min-h-[400px] self-stretch"
          >
            <Image
              src="/invest_img/opportunity.png"
              alt="Cơ hội đầu tư"
              fill
              className="object-cover shadow-lg rounded-2xl"
            />
          </motion.div>

          {/* Cột phải: Nội dung */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-7/12 pt-0 md:pt-4 flex flex-col justify-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#008BBD]">
              Cơ hội
            </h2>
            
            <div className="text-gray-800 leading-[1.7] space-y-4 text-[15px] md:text-base">
              <p>
                LifeStyle Việt Nam đang bước vào giai đoạn chuyển mình quan trọng, từ mô hình doanh nghiệp thương mại truyền thống sang doanh nghiệp sở hữu hệ sinh thái Mẹ & Bé toàn diện với trọng tâm là Giáo dục – Công nghệ – Sản phẩm chăm sóc an toàn
              </p>
              <p>
                Trong quá trình phát triển, LifeStyle Việt Nam đã xây dựng được:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-gray-500">
                <li>Tệp khách hàng ổn định và uy tín thương hiệu trên thị trường</li>
                <li>Các dòng sản phẩm có chứng nhận, được báo chí & chuyên gia ghi nhận</li>
                <li>Một đội ngũ trẻ với tinh thần học hỏi, đổi mới và sẵn sàng thích nghi</li>
                <li>Nền tảng vận hành linh hoạt, phù hợp để chuyển đổi sang mô hình công nghệ – giáo dục</li>
              </ul>
            </div>
          </motion.div>

        </div>

        {/* Phần 2: Text trái - Ảnh phải */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-stretch">
          
          {/* Cột trái: Nội dung */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="w-full lg:w-7/12 flex flex-col justify-center"
          >
            <div className="text-gray-800 leading-[1.7] space-y-4 text-[15px] md:text-base">
              <p>
                Hiện tại, chúng tôi không chỉ mở rộng hệ sinh thái, mà còn tham gia vào những lĩnh vực mới, nơi công nghệ – đặc biệt là AI – đang tạo ra thay đổi mạnh mẽ trên toàn cầu.
                <br />
                Sự chuyển mình này đi kèm với khó khăn, thách thức và cả rủi ro, nhưng đồng thời lại mở ra cơ hội bứt phá:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-gray-500">
                <li>Cơ hội tiếp cận tri thức & công nghệ quốc tế</li>
                <li>Cơ hội mở rộng hợp tác với các nhà đầu tư, doanh nghiệp giáo dục – công nghệ trong và ngoài nước</li>
                <li>Cơ hội định vị lại doanh nghiệp, hướng đến phát triển bền vững và tạo giá trị thực cho cộng đồng</li>
              </ul>
              <p>
                Giáo dục và công nghệ – đặc biệt là AI trong giáo dục (AI EdTech) – đang là xu hướng không chỉ tại Việt Nam mà trên toàn cầu.
                <br />
                Nắm bắt được xu thế đó, LifeStyle Việt Nam lựa chọn đổi mới, thích ứng và tiến lên, mở ra một chặng đường phát triển mới cho hệ sinh thái Mẹ & Bé.
              </p>
              <p>
                Đây là thời điểm chiến lược để đồng hành, khi chúng tôi đang từng bước chuẩn hóa hệ thống, đầu tư công nghệ, mở rộng sản phẩm và tìm kiếm các đối tác – nhà đầu tư có cùng tầm nhìn, để biến triết lý "Giá trị thật - Bền vững - Nhân văn" thành hiện thực.
              </p>
            </div>
          </motion.div>

          {/* Cột phải: Hình ảnh */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="w-full lg:w-5/12 shrink-0 relative min-h-[300px] lg:min-h-[450px] self-stretch"
          >
            <Image
              src="/invest_img/transformation.png"
              alt="Hợp tác đầu tư"
              fill
              className="object-cover shadow-lg object-center rounded-2xl"
            />
          </motion.div>

        </div>

      </div>
    </section>
  );
}
