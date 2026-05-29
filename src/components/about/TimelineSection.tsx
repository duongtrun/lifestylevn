'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

// File: src/components/about/TimelineSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Trình bày các cột mốc lịch sử phát triển (2017 -> 2025).
//          Bố cục: Trái (danh sách năm click được), Giữa (thanh trượt), Phải (nội dung chi tiết).
// Dùng khi: Ngay dưới phần giới thiệu chung (AboutIntroSection) của trang /gioi-thieu.

const TIMELINE_DATA = [
  {
    year: 2017,
    title: 'Khởi đầu khiêm tốn nhưng đầy định hướng',
    content: [
      'LifeStyle Việt Nam được thành lập trong giai đoạn đầu còn non trẻ, hoạt động chủ yếu trong lĩnh vực phân phối các sản phẩm chăm sóc tóc cao cấp Kasa.',
      'Mục tiêu trọng tâm lúc bấy giờ không phải mở rộng ngay lập tức, mà là:',
      '• Hoàn thiện bộ máy nhân sự\n• Thiết lập quy định – quy trình làm việc chuyên nghiệp và hiệu quả\n• Xây dựng văn hóa – chế độ phúc lợi chuẩn mực\n• Tích lũy nguồn vốn và nguồn khách hàng',
      'Đây là nền móng quan trọng giúp công ty có đủ nội lực để bước vào giai đoạn phát triển sản phẩm riêng trong tương lai.'
    ]
  },
  {
    year: 2019,
    title: 'Chuyển hướng chiến lược: Ra mắt Babego',
    content: [
      'Sau hai năm xây nền, LifeStyle chính thức chuyển sang giai đoạn phát triển sản phẩm dinh dưỡng cho trẻ nhỏ với thương hiệu Babego.',
      'Từ đây, công ty bắt đầu đặt những viên gạch đầu tiên cho mục tiêu dài hạn “phục vụ sức khỏe và sự phát triển của trẻ em Việt Nam”.',
      'Babego nhanh chóng tạo dấu ấn nhờ:',
      '• Công thức phù hợp sinh lý tiêu hóa trẻ Việt\n• Hiệu quả rõ rệt trong cải thiện tiêu hóa – tăng cân\n• Hệ thống phân phối ngày càng mở rộng'
    ]
  },
  {
    year: 2021,
    title: 'Mở rộng thêm dòng sản phẩm Mamigo',
    content: [
      'Mamigo được ghi nhận là một trong những sản phẩm dinh dưỡng hỗ trợ kiểm soát đường huyết an toàn, phù hợp với người tiểu đường tại thị trường Việt Nam.',
      'Sản phẩm đã nhận được nhiều phản hồi tích cực từ cộng đồng người bệnh tiểu đường về hiệu quả hỗ trợ ổn định đường huyết và dễ tiêu hóa.',
      'Năm 2022, nhãn hàng Mamigo đã vượt qua hàng ngàn đề cử, vinh dự được vinh danh trong TOP 100 “Thương hiệu mạnh, sản phẩm, dịch vụ chất lượng cao Asean 2022”.'
    ]
  },
  {
    year: 2024,
    title: 'Manh nha ý tưởng về một hệ sinh thái Mẹ & Bé toàn diện',
    content: [
      'Sau 5 năm phát triển, Babego trở thành thương hiệu cốt lõi của công ty, nhận nhiều giải thưởng uy tín, trở thành thương hiệu quen thuộc của hàng chục nghìn bà mẹ Việt.',
      'Từ nền tảng thành công của Babego, ban lãnh đạo LifeStyle nhận thấy xu hướng phát triển dài hạn của ngành mẹ & bé cần vượt xa hơn chỉ một sản phẩm dinh dưỡng.',
      'Công ty bắt đầu nghiên cứu, lên ý tưởng và đặt những viên gạch đầu tiên cho mô hình hệ sinh thái Mẹ & Bé đa trụ cột, bao gồm:',
      '• Dinh dưỡng\n• Giáo dục\n• Vệ sinh – an toàn',
      'Đây là bước chuyển tư duy chiến lược quan trọng.'
    ]
  },
  {
    year: 2025,
    title: 'Hình thành mô hình 3 trụ cột phát triển',
    content: [
      'Năm 2025 đánh dấu bước ngoặt lớn khi LifeStyle chính thức xây dựng và triển khai 3 thương hiệu trong hệ sinh thái Mẹ & Bé toàn diện:',
      '• Babego – Dinh dưỡng & sức khỏe\nThương hiệu chủ lực với các sản phẩm dinh dưỡng cho trẻ nhỏ.',
      '• Iruka Edu – Giáo dục & phát triển tư duy\nỨng dụng công nghệ AI và phương pháp học thông minh cho trẻ 3–10 tuổi.\nDự án nhanh chóng chứng minh tiềm năng khi lọt Top 8 cuộc thi AI Innovation tại Nhật Bản năm 2025.',
      '• Iruka Care – Sản phẩm vệ sinh & an toàn cho trẻ\nGiải pháp chăm sóc – bảo vệ làn da và vệ sinh cá nhân an toàn cho trẻ nhỏ.',
      'Năm 2025 cũng là năm công ty bắt đầu tái xây dựng hình ảnh thương hiệu, định vị doanh nghiệp theo hướng công nghệ – giáo dục – chăm sóc toàn diện.'
    ]
  },
  {
    year: 2026,
    title: 'Mở rộng hệ sinh thái mạnh mẽ hơn',
    content: [
      'Dựa trên nền tảng 3 trụ cột đã được định hình, LifeStyle dự kiến:',
      '• Mở rộng thêm các sản phẩm chăm sóc sức khỏe & dinh dưỡng chuyên sâu\n• Bổ sung danh mục sản phẩm vệ sinh – chăm sóc da\n• Nâng cấp hệ thống giáo dục Iruka Edu phiên bản 2.0\n• Tăng cường hợp tác với các đối tác – nhà đầu tư chiến lược\n• Mở rộng độ phủ thương hiệu trên toàn quốc',
      'Mục tiêu dài hạn: Trở thành hệ sinh thái Mẹ & Bé tiên phong và uy tín hàng đầu tại Việt Nam.',
      'LifeStyle Việt Nam tin rằng hành trình nuôi dạy con là một hành trình dài – đầy yêu thương và thử thách.',
      'Chúng tôi lựa chọn đồng hành cùng mẹ bằng những sản phẩm chất lượng, những giải pháp giáo dục hiện đại và một hệ sinh thái toàn diện cho sự phát triển của trẻ.'
    ]
  }
];

export default function TimelineSection() {
  const [activeIndex, setActiveIndex] = useState(2); // Mặc định chọn 2021 (index 2)

  const handlePrev = () => { // Hàm chuyển về mốc thời gian trước đó
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => { // Hàm chuyển tới mốc thời gian tiếp theo
    setActiveIndex((prev) => (prev < TIMELINE_DATA.length - 1 ? prev + 1 : prev));
  };

  const activeData = TIMELINE_DATA[activeIndex];

  return (
    <section className="relative w-full py-12 lg:py-16 overflow-hidden bg-gray-50">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Image 
          src="/img_about_us/bg_timeline.webp"
          alt="Timeline background"
          fill
          className="object-cover object-center opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Tiêu đề phần Lịch sử hình thành */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-[#273F68] tracking-tight mb-4">
            Lịch sử hình thành và phát triển
          </h2>
          <div className="h-1 w-20 bg-[#008BBD] mx-auto rounded-full" />
        </motion.div>

        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row items-stretch gap-8 lg:gap-16">
          
          {/* Cột trái: Danh sách Năm (Years) - BẢN TRƯỢT NGANG CHO MOBILE */}
          <div className="flex lg:hidden flex-row items-center justify-center w-full gap-4 py-6 z-10">
            {/* Nút sang trái */}
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
              aria-label="Năm trước"
            >
              <ChevronLeft size={32} strokeWidth={2.5} />
            </button>

            {/* Các năm hiển thị nằm ngang */}
            <div className="flex items-center justify-center h-20 w-[240px] relative overflow-hidden">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex; // Khoảng cách chênh lệch index (-1, 0, 1)
                
                // Chỉ hiển thị năm hiện tại và 2 năm lân cận
                if (Math.abs(offset) > 1) return null;

                return (
                  <motion.div
                    key={item.year}
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.65,
                      opacity: isActive ? 1 : 0.4,
                      x: offset * 80, // Giãn cách ngang giữa các năm
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#008BBD] text-4xl' : 'text-gray-400 text-3xl hover:text-gray-600'}`}>
                      {item.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Nút sang phải */}
            <button 
              onClick={handleNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className={`p-2 transition-colors ${activeIndex === TIMELINE_DATA.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
              aria-label="Năm sau"
            >
              <ChevronRight size={32} strokeWidth={2.5} />
            </button>
          </div>

          {/* Cột trái: Danh sách Năm (Years) - BẢN DỌC TRÊN DESKTOP */}
          <div className="hidden lg:flex flex-none flex-col items-center justify-center w-48 gap-4 py-10 z-10">
            {/* Nút lên */}
            <button 
              onClick={handlePrev}
              disabled={activeIndex === 0}
              className={`p-2 transition-colors ${activeIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
              aria-label="Lên trên"
            >
              <ChevronUp size={32} strokeWidth={2.5} />
            </button>

            {/* Các năm xếp dọc */}
            <div className="flex flex-col items-center justify-center h-[280px] w-full relative">
              {TIMELINE_DATA.map((item, index) => {
                const isActive = index === activeIndex;
                const offset = index - activeIndex; // Khoảng cách chênh lệch index (-1, 0, 1)
                
                // Chỉ hiển thị năm hiện tại và 2 năm lân cận
                if (Math.abs(offset) > 1) return null;

                return (
                  <motion.div
                    key={item.year}
                    initial={false}
                    animate={{ 
                      scale: isActive ? 1 : 0.6,
                      opacity: isActive ? 1 : 0.4,
                      y: offset * 80, // Giãn cách dọc giữa các năm
                      zIndex: isActive ? 10 : 1
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="absolute cursor-pointer"
                    onClick={() => setActiveIndex(index)}
                  >
                    <span className={`font-bold transition-colors duration-300 ${isActive ? 'text-[#008BBD] text-6xl md:text-7xl lg:text-8xl' : 'text-gray-400 text-5xl md:text-6xl hover:text-gray-600'}`}>
                      {item.year}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Nút xuống */}
            <button 
              onClick={handleNext}
              disabled={activeIndex === TIMELINE_DATA.length - 1}
              className={`p-2 transition-colors ${activeIndex === TIMELINE_DATA.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-[#008BBD] hover:text-[#5CC8EC] cursor-pointer'}`}
              aria-label="Xuống dưới"
            >
              <ChevronDown size={32} strokeWidth={2.5} />
            </button>
          </div>

          {/* Cột giữa: Đường kẻ thanh trượt */}
          <div className="hidden lg:flex flex-none w-1 relative bg-gray-300 rounded-full my-10">
            <motion.div 
              className="absolute left-0 right-0 bg-[#008BBD] rounded-full w-1.5 -ml-[1px]"
              initial={false}
              animate={{ 
                top: `${(activeIndex / (TIMELINE_DATA.length - 1)) * 100}%`,
                height: '80px',
                marginTop: '-40px' // Căn giữa track marker
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          </div>

          {/* Cột phải: Nội dung chi tiết */}
          <div className="w-full lg:flex-1 flex flex-col justify-start h-auto min-h-[320px] lg:h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="space-y-6 my-auto"
              >
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#008BBD] leading-snug">
                  {activeData.title}
                </h3>
                
                <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
                  {activeData.content.map((paragraph, idx) => (
                    <p key={idx} className={paragraph.startsWith('•') ? 'pl-4 whitespace-pre-line text-gray-700 font-medium' : ''}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
