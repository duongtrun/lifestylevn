'use client';

// File: src/components/invest/InvestDetails.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Trình bày chi tiết tầm nhìn, định hướng, mô hình hợp tác, cam kết và lời mời
// Dùng khi: Hiển thị ngay dưới phần Lợi thế cạnh tranh

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function InvestDetails() {
  return (
    <section className="w-full pt-16 pb-8 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl space-y-12 md:space-y-24">
        
        {/* Block 1: Tầm nhìn dài hạn - Định hướng phát triển */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-6/12 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#008BBD] mb-6 leading-[1.3]">
              Tầm nhìn dài hạn<br />
              Định hướng phát triển
            </h2>
            <div className="text-gray-800 space-y-4 text-base md:text-lg lg:text-[19px] leading-relaxed">
              <p>
                LifeStyle Việt Nam không theo đuổi tăng trưởng bằng mọi giá.<br />
                Chúng tôi lựa chọn con đường phát triển có chiều sâu, bền vững và phù hợp với giá trị cốt lõi.
              </p>
              <p className="font-medium">Trong 3-5 năm tới, LifeStyle Việt Nam hướng tới:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#008BBD]">
                <li>Trở thành doanh nghiệp sở hữu hệ sinh thái Mẹ & Bé dựa trên tri thức và công nghệ</li>
                <li>Kết nối chặt chẽ giữa sản phẩm – giáo dục – dữ liệu</li>
                <li>Đóng góp tích cực vào sự phát triển toàn diện của trẻ em Việt Nam</li>
              </ul>
              <p className="font-medium mt-4">Lộ trình phát triển được xác định rõ:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#008BBD]">
                <li><strong>2025-2026:</strong> Chuẩn hóa hệ thống, tái cấu trúc, đầu tư nền tảng công nghệ</li>
                <li><strong>2026-2028:</strong> Mở rộng hệ sinh thái, scale sản phẩm chủ lực</li>
                <li><strong>Sau 2028:</strong> Hợp tác quốc tế, mở rộng thị trường khu vực</li>
              </ul>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 relative h-[300px] md:h-[350px]"
          >
            <Image 
              src="/invest_img/tam_nhin_dai_han.webp" 
              alt="Định hướng phát triển" 
              fill 
              className="object-cover rounded-2xl shadow-md" 
            />
          </motion.div>
        </div>

        {/* Block 2: Mô hình hợp tác và đầu tư */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex justify-center"
        >
          <div className="w-full md:w-3/4 lg:w-2/3 flex flex-col items-center md:items-start text-left">
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#008BBD] mb-6 w-full md:text-center">
              Mô hình hợp tác và đầu tư
            </h2>
            <div className="text-gray-800 space-y-4 text-base md:text-lg lg:text-[19px] leading-relaxed w-full">
              <p>LifeStyle Việt Nam mở rộng hợp tác theo hướng linh hoạt và dài hạn, bao gồm:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#008BBD] mx-auto md:w-[80%]">
                <li>Đầu tư vốn theo từng dự án hoặc sản phẩm</li>
                <li>Đồng phát triển sản phẩm giáo dục – công nghệ</li>
                <li>Hợp tác chiến lược về công nghệ, nội dung, phân phối</li>
                <li>Cố vấn chuyên môn trong lĩnh vực giáo dục, AI, vận hành</li>
              </ul>
              <p className="font-medium mt-6 text-center text-[#005A8C]">
                Chúng tôi ưu tiên những mô hình hợp tác mang tính đồng hành, cùng chia sẻ rủi ro, giá trị và tầm nhìn dài hạn.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Block 3: Cam kết với đối tác & nhà đầu tư */}
        <div className="flex flex-col lg:flex-row gap-10 items-stretch justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-6/12 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#008BBD] mb-6 leading-[1.3]">
              Cam kết với đối tác & nhà đầu tư
            </h2>
            <div className="text-gray-800 space-y-4 text-base md:text-lg lg:text-[19px] leading-relaxed">
              <p>Khi hợp tác cùng LifeStyle Việt Nam, chúng tôi cam kết:</p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#008BBD]">
                <li>Minh bạch về pháp lý, tài chính và vận hành</li>
                <li>Rõ ràng quyền lợi – trách nhiệm – lộ trình hợp tác</li>
                <li>Tôn trọng chuyên môn và giá trị cốt lõi của đối tác</li>
                <li>Không đánh đổi uy tín và giá trị dài hạn để lấy lợi ích ngắn hạn</li>
              </ul>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-5/12 relative h-[250px] md:h-[450px]"
          >
          <Image 
            src="/invest_img/commitment.webp" 
            alt="Cam kết" 
            fill 
            className="object-cover rounded-2xl shadow-md" 
          />
          </motion.div>
        </div>

        {/* Block 4: Chúng tôi tìm kiếm... */}
        <div className="flex flex-col-reverse lg:flex-row gap-10 items-stretch justify-between">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-5/12 relative h-[250px] md:h-[450px]"
          >
          <Image 
            src="/invest_img/how.webp" 
            alt="How to find partners" 
            fill 
            className="object-cover rounded-2xl shadow-md" 
          />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-6/12 flex flex-col justify-center"
          >
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#008BBD] mb-6 leading-[1.3]">
              Chúng tôi tìm kiếm nhà đầu tư<br />& đối tác như thế nào?
            </h2>
            <div className="text-gray-800 space-y-4 text-base md:text-lg lg:text-[19px] leading-relaxed">
              <p>
                LifeStyle Việt Nam không tìm kiếm đối tác bằng mọi giá.<br />
                Chúng tôi mong muốn đồng hành cùng những cá nhân, tổ chức:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 marker:text-[#008BBD]">
                <li>Có chung niềm tin vào giáo dục và giá trị nhân văn</li>
                <li>Hiểu rằng phát triển bền vững cần thời gian và sự kiên định</li>
                <li>Sẵn sàng cùng xây dựng, không chỉ đầu tư rồi rút lui</li>
                <li>Tôn trọng con người, tri thức và sự tử tế trong kinh doanh</li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Block 5: Lời mời đồng hành */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl pt-0 md:pt-6"
        >
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-bold text-[#008BBD] mb-6 leading-[1.3]">
            Lời mời đồng hành
          </h2>
          <div className="text-gray-800 space-y-4 text-base md:text-lg lg:text-[19px] leading-relaxed">
            <p>
              Chúng tôi tin rằng, những giá trị bền vững không thể xây dựng một mình.<br />
              Nếu bạn chia sẻ cùng tầm nhìn về giáo dục, công nghệ và tương lai của trẻ em, LifeStyle Việt Nam sẵn sàng mở ra những cuộc đối thoại nghiêm túc, minh bạch và dài hạn.
            </p>
            <p className="font-bold text-lg mt-4 text-[#0A3D73]">
              Không chỉ là đầu tư – đó là sự đồng hành.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
