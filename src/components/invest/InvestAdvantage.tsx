'use client';

// File: src/components/invest/InvestAdvantage.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Hiển thị 5 lợi thế cạnh tranh của IruKa (kế thừa layout từ Iruka Edu Tech)
// Dùng khi: Muốn nhấn mạnh lý do vì sao nên đầu tư/hợp tác với IruKa

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const advantageData = [
  // Cột 1 (Trái)
  {
    id: 1,
    col: 1,
    icon: "/invest_img/puzzle_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-3 text-base md:text-lg lg:text-[19px] leading-snug">Đội ngũ trẻ – linh hoạt – tốc độ triển khai nhanh</h4>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 mb-2">
          LifeStyle sở hữu đội ngũ:
        </p>
        <ul className="text-sm md:text-[15px] lg:text-base text-white/90 space-y-1 list-disc pl-4 mb-3">
          <li>Tư duy startup</li>
          <li>Mạnh về vận hành – truyền thông – sản xuất nội dung</li>
          <li>Sẵn sàng thích nghi và đổi mới</li>
        </ul>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 font-medium">
          → Giảm đáng kể chi phí thử nghiệm và rút ngắn thời gian ra mắt sản phẩm.
        </p>
      </>
    )
  },
  {
    id: 2,
    col: 1,
    icon: "/invest_img/professional_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-3 text-base md:text-lg lg:text-[19px] leading-snug">Sản phẩm an toàn – minh bạch – kiểm định rõ ràng</h4>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 leading-relaxed">
          Dù là dinh dưỡng, vệ sinh hay giáo dục, LifeStyle đều theo đuổi triết lý: "Giá trị thật – Phát triển bền vững – Minh bạch tuyệt đối."<br/>
          Đây là lợi thế rất lớn trong giai đoạn thị trường mẹ & bé cạnh tranh phức tạp.
        </p>
      </>
    )
  },
  // Cột 2 (Giữa)
  {
    id: 3,
    col: 2,
    icon: "/invest_img/AI_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-3 text-base md:text-lg lg:text-[19px] leading-snug">Chiến lược chuyển đổi số – công nghệ hóa</h4>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 mb-3 leading-relaxed">
          IruKa Edu đang tham dự cuộc thi công nghệ tại Nhật và lọt vào top đầu vòng chấm điểm ý tưởng, cho thấy tiềm năng quốc tế và chất lượng sản phẩm.
        </p>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 mb-2">
          Nền tảng được phát triển theo hướng:
        </p>
        <ul className="text-sm md:text-[15px] lg:text-base text-white/90 space-y-1 list-disc pl-4">
          <li>AI-first (cá nhân hóa, phân tích dữ liệu, gợi ý nội dung)</li>
          <li>Gamification trong giáo dục</li>
          <li>Mô hình subscription bền vững</li>
        </ul>
      </>
    )
  },
  // Cột 3 (Phải)
  {
    id: 4,
    col: 3,
    icon: "/invest_img/shield_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-3 text-base md:text-lg lg:text-[19px] leading-snug">Hệ sinh thái toàn diện – đáp ứng nhu cầu thực của thị trường</h4>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 mb-3 leading-relaxed">
          LifeStyle là một trong số rất ít doanh nghiệp tại Việt Nam xây dựng mô hình kết hợp Giáo dục – Dinh dưỡng – Vệ sinh an toàn trong một hệ thống thống nhất.
        </p>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 mb-2">
          Điều này giúp:
        </p>
        <ul className="text-sm md:text-[15px] lg:text-base text-white/90 space-y-1 list-disc pl-4">
          <li>Tăng khách hàng xuyên suốt các giai đoạn của trẻ (0-10 tuổi)</li>
          <li>Tối ưu dữ liệu hành vi để phát triển sản phẩm</li>
          <li>Tạo vòng lặp tăng trưởng bền vững</li>
        </ul>
      </>
    )
  },
  {
    id: 5,
    col: 3,
    icon: "/invest_img/brain_img.webp",
    content: (
      <>
        <h4 className="font-bold text-white mb-3 text-base md:text-lg lg:text-[19px] leading-snug">Kinh nghiệm lâu năm và nền tảng khách hàng sẵn có</h4>
        <ul className="text-sm md:text-[15px] lg:text-base text-white/90 space-y-1.5 list-disc pl-4 mb-3">
          <li>Babego có mặt từ 2019, được hàng chục nghìn mẹ Việt tin dùng</li>
          <li>Mạng lưới đại lý – nhà thuốc – cửa hàng mẹ & bé trên toàn quốc</li>
          <li>Cộng đồng phụ huynh lớn mạnh từ hệ thống fanpage & media của công ty</li>
        </ul>
        <p className="text-sm md:text-[15px] lg:text-base text-white/90 font-medium">
          → Tạo lợi thế lớn khi mở rộng sản phẩm mới.
        </p>
      </>
    )
  }
];

export default function InvestAdvantage() {
  return (
    <section className="relative w-full overflow-hidden bg-[#0A3D73] py-16 md:py-24">
      {/* Background Image: tech_different.svg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_iruka_edu/tech_different.svg"
          alt="Tech Different Background"
          fill
          className="object-cover object-top opacity-90"
        />
      </div>

      <div className="relative z-10 w-full">
        {/* Title box (stick to left) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white inline-block py-4 pr-10 pl-6 md:pr-16 md:pl-10 lg:pl-16 xl:pl-32 mb-12 shadow-lg"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#005A8C]">
            Lợi thế cạnh tranh
          </h2>
        </motion.div>

        {/* 3 Columns Layout */}
        <div className="container mx-auto px-6 md:px-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10">
            
            {/* Cột 1 */}
            <div className="flex flex-col gap-6 lg:gap-10 h-full">
              {advantageData.filter(d => d.col === 1).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.1} isStretch={true} />
              ))}
            </div>

            {/* Cột 2 (Căn giữa theo chiều dọc) */}
            <div className="flex flex-col justify-center gap-6 lg:gap-10 mt-6 lg:mt-0">
              {advantageData.filter(d => d.col === 2).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.3} isStretch={false} />
              ))}
            </div>

            {/* Cột 3 */}
            <div className="flex flex-col gap-6 lg:gap-10 mt-6 lg:mt-0 h-full">
              {advantageData.filter(d => d.col === 3).map((item, index) => (
                <TechCard key={item.id} icon={item.icon} content={item.content} index={index} delay={0.5} isStretch={true} />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Sub-component cho mỗi Card
function TechCard({ icon, content, index, delay, isStretch = false }: { icon?: string, content: React.ReactNode, index: number, delay: number, isStretch?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay + index * 0.15 }}
      className={`relative w-full rounded-2xl overflow-hidden shadow-xl flex flex-col ${isStretch ? 'flex-1' : ''}`}
    >
      {/* Background bg_text_tech.svg */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_iruka_edu/bg_text_tech.svg"
          alt="Tech Text Background"
          fill
          className="object-cover"
        />
        {/* Overlay một lớp đen/xanh mỏng để chữ trắng dễ đọc hơn trên nền svg */}
        <div className="absolute inset-0 bg-[#001D4A]/40 mix-blend-multiply" />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 flex-1 flex flex-col justify-start">
        {icon && (
          <div className="flex justify-center w-full mb-5">
            <div className="relative w-[50px] h-[50px] md:w-[70px] md:h-[70px]">
              <Image src={icon} alt="Tech Icon" fill className="object-contain drop-shadow-md" />
            </div>
          </div>
        )}
        <div className="text-left w-full">
          {content}
        </div>
      </div>
    </motion.div>
  );
}
