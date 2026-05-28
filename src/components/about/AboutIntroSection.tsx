'use client';

import Image from "next/image";
import { motion } from "framer-motion";

// File: src/components/about/AboutIntroSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Giới thiệu chi tiết Lifestyle Việt Nam — logo bên trái trong khung trắng,
//          text mô tả chi tiết bên phải với màu chủ đạo xanh dương #008BBD.
//          Tái sử dụng cấu trúc từ AboutSection nhưng tone màu khác biệt.
// Dùng khi: Ngay dưới Hero Banner của trang /gioi-thieu.

export default function AboutIntroSection() {
  return (
    <section className="relative w-full py-20 lg:py-28 overflow-hidden bg-[#EEF8FC]">
      {/* Blob trang trí — làm phong phú nền xanh dương nhạt */}
      <div className="absolute top-[5%] -right-[5%] w-[500px] h-[500px] rounded-full bg-[#008BBD]/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute -bottom-[10%] -left-[5%] w-[450px] h-[450px] rounded-full bg-[#008BBD]/10 blur-[80px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-white/40 blur-[60px] pointer-events-none"></div>
      {/* Đường kẻ trang trí nhẹ bên trái */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-[#008BBD]/30 to-transparent pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Cột trái: Logo trong khung trắng nổi — giống ảnh thiết kế */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative flex items-center justify-center min-w-0"
          >
            {/* Ảnh hiển thị trực tiếp không khung */}
            <div className="relative w-full max-w-[420px] lg:max-w-[480px] aspect-[3/4]">
              <motion.div
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.4 }}
                className="relative w-full h-full flex justify-center items-center"
              >
                <Image
                  src="/img_about_us/lifestyle_about_us.svg"
                  alt="Lifestyle Vietnam Logo"
                  fill
                  className="object-contain drop-shadow-sm"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Cột phải: Text Content chi tiết */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex flex-col justify-center space-y-6 min-w-0"
          >
            {/* Tiêu đề màu xanh dương */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#008BBD] leading-snug">
                LifeStyle Việt Nam
              </h2>
              {/* Đường kẻ dưới tiêu đề */}
              <div className="h-[3px] w-16 bg-gradient-to-r from-[#008BBD] to-[#5CC8EC] rounded-full"></div>
            </div>

            {/* Đoạn mô tả chi tiết */}
            <div className="space-y-4 text-gray-600 text-sm md:text-base leading-relaxed">
              <p>
                LifeStyle Việt Nam (tên đầy đủ là Công ty TNHH Thương mại Dịch vụ LifeStyle Việt Nam) là doanh nghiệp theo đuổi tầm nhìn xây dựng Hệ sinh thái Mẹ &amp; Bé toàn diện, tiên phong trong việc ứng dụng công nghệ, giáo dục và khoa học dinh dưỡng để mang đến giải pháp nuôi dạy trẻ một cách thông minh – an toàn – lành mạnh.
              </p>
              <p>
                Từ năm 2017 đến nay, LifeStyle Việt Nam đã định hướng phát triển các sản phẩm và dịch vụ chất lượng cao dành cho trẻ nhỏ và gia đình Việt, dựa trên ba trụ cột chính:
              </p>

              {/* Danh sách trụ cột — có icon gạch xanh */}
              <ul className="space-y-2.5">
                {[
                  "Dinh dưỡng & chăm sóc sức khỏe (Babego)",
                  "Vệ sinh – an toàn trẻ em (iruKa Care)",
                  "Giáo dục – phát triển tư duy (iruKa Edu)",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1.5 shrink-0 w-2 h-2 rounded-full bg-[#008BBD]"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>

              <p>
                Chúng tôi tin rằng một đứa trẻ khỏe mạnh và hạnh phúc là nền tảng của một thế hệ tương lai tốt đẹp hơn.
              </p>

              {/* Khối triết lý nổi bật */}
              <div className="p-5 rounded-2xl bg-[#008BBD]/5 border border-[#008BBD]/15">
                <p className="text-gray-700 leading-relaxed">
                  Với triết lý{" "}
                  <span className="font-bold text-[#008BBD]">
                    &quot;làm từ tế&quot;
                  </span>
                  , LifeStyle luôn đặt chất lượng sản phẩm và giá trị thật lên hàng đầu, lấy nhu cầu của trẻ và sự đồng hành từ mẹ làm trung tâm.
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
