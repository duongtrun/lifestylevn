'use client';

// File: src/components/iruka-care/IrukaCareAbout.tsx
// Luồng: Trang Hệ sinh thái > Iruka Care
// Vai trò: 3 khối nội dung —
//   1) "Câu chuyện ra đời" — thẻ trắng đè lên viền banner
//   2) "iruKa Care là gì?" — nền xanh, mascot trái + text phải
//   3) "Vì sao chúng tôi xây dựng iruKa Care ?" — nền trắng/xanh nhạt, text trái + mascot phải
// Dùng khi: Hiển thị ngay dưới Hero banner.

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function IrukaCareAbout() {
  return (
    <div className="w-full bg-white relative">
      {/* ====== SECTION 1: Câu chuyện ra đời ====== */}
      <section className="relative w-full z-30 px-4 md:px-10 -mt-20 md:-mt-32 lg:-mt-40 flex justify-center pb-8 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-[32px] shadow-[0_10px_50px_rgba(0,0,0,0.15)] p-8 md:p-14 lg:p-20 max-w-[1200px] w-full"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#005A8C] mb-3 text-center md:text-left">
            Câu chuyện ra đời:
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#005A8C] mb-8 md:mb-10 text-center md:text-left">
            Bảo vệ từng khoảnh khắc lớn khôn của trẻ
          </h3>
          <div className="space-y-5 text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed font-medium">
            <p>
              Trẻ nhỏ khám phá thế giới bằng đôi tay chạm vào mọi thứ, bằng những bước chạy không ngừng, bằng nụ cười và sự tò mò vô tận.
              Nhưng đi kèm với đó luôn là vi khuẩn – bụi bẩn – mồ hôi – chất bám dính – nấm khuẩn mà mắt thường không thể nhìn thấy.
            </p>
            <p>
              Chúng tôi – những người làm cha mẹ, làm thầy cô, làm sản phẩm – đều hiểu rằng: Điều mong manh nhất cần được bảo vệ nhiều nhất.
            </p>
            <p>
              Tuy nhiên, thị trường hiện nay lại tồn tại rất nhiều sản phẩm vệ sinh không đạt chuẩn, chứa chất tẩy rửa mạnh, hương liệu hóa học, paraben... khiến làn da nhạy cảm của trẻ dễ bị kích ứng, khô rát, viêm nhiễm, và càng khiến phụ huynh lo lắng.
            </p>
            <p>
              Từ trăn trở đó, iruKa Care ra đời với sứ mệnh tạo nên những sản phẩm vệ sinh an toàn tuyệt đối, giúp trẻ tự do vui chơi – khám phá – trưởng thành, mà bố mẹ luôn cảm thấy yên tâm.
            </p>
            <p>
              iruKa Care không chỉ là sản phẩm, mà là triết lý chăm sóc, dựa trên ba giá trị cốt lõi:
            </p>
            <p className="font-bold text-[#005A8C] text-lg md:text-xl lg:text-2xl mt-4">
              An toàn – Lành tính – Hiệu quả thực sự.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ====== SECTION 2: iruKa Care là gì? ====== */}
      <section className="relative w-full overflow-hidden bg-white">
        {/* Background ảnh blur */}
        <div 
          className="absolute inset-0 z-0 opacity-100 hidden lg:block"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        >
          <Image
            src="/img_iruka_care/iruka_care_blur.svg"
            alt="Iruka Care Background Blur"
            fill
            className="object-cover"
          />
        </div>
        <div className="relative z-10 container mx-auto px-6 md:px-10 pt-10 pb-4 md:py-24 lg:py-32">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-20 lg:gap-32 max-w-6xl mx-auto">
            {/* Bên trái: Mascot 1 */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] flex-shrink-0"
            >
              <Image
                src="/img_iruka_care/iruka_care_mascot_1.webp"
                alt="iruKa Care Mascot 1"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 drop-shadow-sm text-[#005A8C] lg:text-white">
                iruKa Care là gì?
              </h2>
              <p className="text-sm md:text-base leading-relaxed mb-4 font-medium text-gray-700 lg:text-white/90">
                iruKa Care là thương hiệu vệ sinh - chăm sóc - bảo vệ dành cho trẻ từ sơ sinh đến 10 tuổi, được phát triển trên nền tảng:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm md:text-base leading-relaxed font-medium text-gray-700 lg:text-white/90">
                <li>Công thức sạch - an toàn tuyệt đối</li>
                <li>Nguồn thành phần lành tính, có chọn lọc</li>
                <li>Ứng dụng công nghệ đạt chuẩn Nhật - Châu Âu</li>
                <li>Kiểm nghiệm nghiêm ngặt bởi đội ngũ chuyên môn</li>
              </ul>
              <p className="text-sm md:text-base leading-relaxed mt-4 font-medium text-gray-700 lg:text-white/90">
                iruKa Care hướng đến mục tiêu trở thành dòng sản phẩm vệ sinh đáng tin cậy nhất cho các gia đình Việt, đồng hành cùng hành trình lớn khôn của trẻ.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====== SECTION 3: Vì sao chúng tôi xây dựng iruKa Care ? ====== */}
      <section className="relative w-full bg-white pt-4 pb-10 md:py-24 lg:py-32">
        <div className="container mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 md:gap-20 lg:gap-32 max-w-6xl mx-auto">
            {/* Bên phải: Mascot 2 */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative w-[280px] h-[280px] md:w-[350px] md:h-[350px] lg:w-[420px] lg:h-[420px] flex-shrink-0"
            >
              <Image
                src="/img_iruka_care/iruka_care_mascot_2.svg"
                alt="iruKa Care Mascot 2"
                fill
                className="object-contain drop-shadow-xl"
              />
            </motion.div>

            {/* Bên trái: Text */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="flex-1"
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#005A8C] mb-8">
                Vì sao chúng tôi xây dựng iruKa Care ?
              </h2>
              <div className="space-y-6 text-sm md:text-base text-gray-700 leading-relaxed font-medium">
                <div>
                  <h4 className="font-bold flex items-start gap-2">
                    <span className="text-[#005A8C]">•</span> 
                    <span>Vì trẻ nhỏ xứng đáng được bảo vệ một cách tinh tế và khoa học</span>
                  </h4>
                  <p className="pl-4 mt-1 opacity-80">Da trẻ mỏng gấp 5 lần da người lớn, hàng rào bảo vệ còn yếu -&gt; rất dễ kích ứng. Chúng tôi muốn tạo ra sản phẩm không chỉ sạch - mà phải an toàn ở cấp độ cao nhất.</p>
                </div>
                <div>
                  <h4 className="font-bold flex items-start gap-2">
                    <span className="text-[#005A8C]">•</span> 
                    <span>Vì phụ huynh cần một thương hiệu có thể tin tưởng trọn vẹn</span>
                  </h4>
                  <p className="pl-4 mt-1 opacity-80">Khi hàng giả - hàng nhái - hóa chất độc hại tràn lan, phụ huynh cần một lựa chọn minh bạch, đáng tin, có cam kết rõ ràng.</p>
                </div>
                <div>
                  <h4 className="font-bold flex items-start gap-2">
                    <span className="text-[#005A8C]">•</span> 
                    <span>Vì thị trường Việt Nam thiếu một hệ sinh thái vệ sinh hoàn chỉnh cho trẻ</span>
                  </h4>
                  <p className="pl-4 mt-1 opacity-80">Chúng tôi không muốn phát triển vài sản phẩm lẻ tẻ. iruKa Care được định hướng trở thành bộ giải pháp toàn diện, giúp phụ huynh dễ dàng đồng bộ hóa mọi thói quen vệ sinh cho trẻ.</p>
                </div>
                <div>
                  <h4 className="font-bold flex items-start gap-2">
                    <span className="text-[#005A8C]">•</span> 
                    <span>Vì giá trị bền vững bắt đầu từ thói quen vệ sinh đúng</span>
                  </h4>
                  <p className="pl-4 mt-1 opacity-80">Bảo vệ trẻ khỏi vi khuẩn - kích ứng - bệnh lý da liễu là bước nền quan trọng giúp trẻ phát triển thể chất và miễn dịch khỏe mạnh.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
