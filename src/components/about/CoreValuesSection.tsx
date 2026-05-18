'use client';

// File: src/components/about/CoreValuesSection.tsx
// Luồng: Trang Giới thiệu (/gioi-thieu)
// Vai trò: Hiển thị 6 giá trị cốt lõi với màu chủ đạo #008BBD — nền sáng #EEF8FC,
//          card trắng viền xanh, icon #008BBD, hiệu ứng hover nổi nhẹ.
// Dùng khi: Người dùng cuộn xuống phần Giá trị cốt lõi.

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Lightbulb, TrendingUp, Target, Home, HeartHandshake } from 'lucide-react';

// Dữ liệu 6 giá trị cốt lõi
const coreValues = [
  {
    id: 1,
    title: 'Con người là trọng tâm',
    description: 'Chúng tôi luôn đặt con người lên hàng đầu, trân trọng và phát triển nhân tài làm nền tảng vững chắc.',
    icon: Heart,
  },
  {
    id: 2,
    title: 'Luôn đổi mới & sáng tạo',
    description: 'Không ngừng học hỏi, cải tiến để mang lại những giải pháp đột phá và giá trị vượt trội.',
    icon: Lightbulb,
  },
  {
    id: 3,
    title: 'Cùng nhau phát triển & chia sẻ lợi nhuận',
    description: 'Xây dựng mối quan hệ hợp tác bền vững, cùng hướng tới thành công và chia sẻ thành quả.',
    icon: TrendingUp,
  },
  {
    id: 4,
    title: 'Vì khách hàng',
    description: 'Lấy sự hài lòng của khách hàng làm thước đo cho mọi nỗ lực và cam kết chất lượng.',
    icon: Target,
  },
  {
    id: 5,
    title: 'Tinh thần gia đình',
    description: 'Môi trường làm việc ấm áp, gắn kết, yêu thương và hỗ trợ lẫn nhau như những thành viên trong gia đình.',
    icon: Home,
  },
  {
    id: 6,
    title: 'Biết ơn',
    description: 'Trân trọng từng cơ hội, biết ơn đối tác, khách hàng và đồng nghiệp đã cùng đồng hành.',
    icon: HeartHandshake,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function CoreValuesSection() {
  return (
    // Nền sáng #EEF8FC — đồng bộ với toàn trang Giới thiệu
    <section className="relative w-full py-20 lg:py-32 bg-[#EEF8FC] overflow-hidden">

      {/* Họa tiết blob mờ trang trí góc — cùng tông màu chủ đạo */}
      <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-[#008BBD]/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#008BBD]/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-10 relative z-10">

        {/* --- TIÊU ĐỀ --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 lg:mb-20"
        >
          {/* Badge nhỏ phía trên */}
          <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-[#008BBD]/10 text-[#008BBD] text-xs font-semibold uppercase tracking-widest">
            Văn hoá doanh nghiệp
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-[#273F68] mb-4">
            Giá Trị Cốt Lõi
          </h2>
          {/* Đường kẻ accent */}
          <div className="h-1 w-20 bg-[#008BBD] mx-auto rounded-full" />
        </motion.div>

        {/* --- LƯỚI 6 CARD --- */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {coreValues.map((value) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.id}
                variants={itemVariants}
                // Hover: nhấc lên + đổ bóng xanh nhẹ
                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,139,189,0.18)' }}
                transition={{ duration: 0.3 }}
                className="group bg-white rounded-2xl p-7 border border-[#008BBD]/20
                           flex flex-col items-center text-center cursor-default
                           shadow-sm hover:border-[#008BBD]/60 transition-colors duration-300"
              >
                {/* Vòng tròn icon */}
                <div className="w-16 h-16 rounded-full bg-[#008BBD]/10 flex items-center justify-center mb-5
                                group-hover:bg-[#008BBD] transition-colors duration-400">
                  <Icon
                    className="w-8 h-8 text-[#008BBD] group-hover:text-white transition-colors duration-400"
                  />
                </div>

                {/* Số thứ tự nhỏ */}
                <span className="text-xs font-bold text-[#008BBD]/50 tracking-widest uppercase mb-1">
                  0{value.id}
                </span>

                {/* Tiêu đề */}
                <h3 className="text-lg font-bold text-[#273F68] mb-3 leading-snug">
                  {value.title}
                </h3>

                {/* Mô tả */}
                <p className="text-slate-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
