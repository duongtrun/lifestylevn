'use client';

import { motion } from "framer-motion";
import { Lightbulb, BookOpen, ShieldCheck, Leaf, Sparkles } from "lucide-react";

// File: src/components/home/DifferenceSection.tsx
// Luồng: Trang chủ (/)
// Vai trò: Hiển thị 5 giá trị khác biệt cốt lõi của công ty — bố cục đối xứng
//          dạng pitch deck (1 thẻ nổi bật + 4 thẻ lưới 2×2) nhằm kêu gọi đầu tư.
// Dùng khi: Người dùng cuộn xuống phần Sự Khác Biệt trên trang chủ.

// Thẻ nổi bật nhất ở giữa (featured)
const featured = {
  id: "tech",
  icon: Lightbulb,
  title: "Công nghệ thông minh",
  subtitle: "Tạo nền khác biệt",
  desc: "Quy trình nghiên cứu, sản xuất và kiểm định sản phẩm đều được công khai và tuân thủ tiêu chuẩn nghiêm ngặt.",
};

// 4 thẻ phụ xếp lưới 2×2 cân đối
const cards = [
  {
    id: "ecosystem",
    icon: Sparkles,
    title: "Tư duy hệ sinh thái",
    subtitle: "Kết nối toàn diện",
    desc: "Quy trình nghiên cứu, sản xuất và kiểm định sản phẩm đều được công khai và tuân thủ tiêu chuẩn nghiêm ngặt.",
  },
  {
    id: "education",
    icon: BookOpen,
    title: "Giáo dục là trọng tâm",
    subtitle: "Kiến tạo giá trị thật",
    desc: "Mang đến các giải pháp phát triển tư duy hiện đại, đồng hành cùng bố mẹ nuôi dưỡng tri thức cho trẻ.",
  },
  {
    id: "safety",
    icon: ShieldCheck,
    title: "An toàn chất lượng",
    subtitle: "Minh bạch tuyệt đối",
    desc: "Quy trình nghiên cứu, sản xuất và kiểm định sản phẩm đều được công khai và tuân thủ tiêu chuẩn nghiêm ngặt.",
  },
  {
    id: "sustainable",
    icon: Leaf,
    title: "Giá trị thật",
    subtitle: "Phát triển bền vững",
    desc: "Quy trình nghiên cứu, sản xuất và kiểm định sản phẩm đều được công khai và tuân thủ tiêu chuẩn nghiêm ngặt.",
  },
];

// Cấu hình animation (hiệu ứng mọc lên tuần tự khi cuộn tới)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 18 },
  },
};

export default function DifferenceSection() {
  return (
    <section
      className="relative w-full py-24 lg:py-32 bg-cover bg-center bg-fixed overflow-hidden"
      style={{ backgroundImage: "url('/images/bg_different.svg')" }}
    >
      {/* Lớp phủ tối gradient để chữ trắng nổi bật trên nền ảnh */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/70"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* ===== TIÊU ĐỀ SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20 text-center space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-primary font-bold tracking-widest text-xs md:text-sm uppercase border border-white/20">
            Giá trị cốt lõi
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight pb-2">
            Sự{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#98C04A] to-[#C0E878]">
              Khác Biệt
            </span>
          </h2>
          <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
            Những giá trị tạo nên bản sắc riêng của Lifestyle Việt Nam
          </p>
        </motion.div>

        {/* ===== THẺ NỔI BẬT (Featured Card) — chiếm giữa, ngang toàn bộ ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-8 lg:mb-10"
        >
          <div className="group relative rounded-[28px] p-[1.5px] bg-gradient-to-r from-[#98C04A] to-[#C0E878] max-w-3xl mx-auto cursor-default">
            <div className="relative rounded-[27px] bg-black/40 backdrop-blur-xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 overflow-hidden group-hover:bg-black/30 transition-colors duration-500">
              {/* Vệt sáng trang trí */}
              <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-gradient-to-br from-[#98C04A] to-[#C0E878] opacity-10 blur-[60px] group-hover:opacity-20 transition-opacity duration-500"></div>

              {/* Icon lớn nổi bật */}
              <div className="shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-[#98C04A] to-[#7AB82D] flex items-center justify-center shadow-lg shadow-primary/20">
                <featured.icon className="w-10 h-10 text-white" strokeWidth={1.8} />
              </div>

              {/* Nội dung text */}
              <div className="text-center md:text-left flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-white leading-snug mb-1">
                  {featured.title}
                </h3>
                <p className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#98C04A] to-[#C0E878] mb-3">
                  {featured.subtitle}
                </p>
                <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-xl">
                  {featured.desc}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ===== LƯỚI 4 THẺ (2×2 đối xứng hoàn hảo) ===== */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-3xl mx-auto"
        >
          {cards.map((item, index) => {
            const Icon = item.icon;
            // Xen kẽ 2 tone: nâu đất và xanh mạ
            const isEven = index % 2 === 0;
            const accent = isEven
              ? "from-[#66493C] to-[#9A735C]"
              : "from-[#98C04A] to-[#7AB82D]";

            return (
              <motion.div
                key={item.id}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`group relative rounded-[28px] p-[1px] bg-gradient-to-br ${accent} cursor-default`}
              >
                <div className="relative h-full rounded-[27px] bg-black/40 backdrop-blur-xl p-7 flex flex-col gap-4 overflow-hidden group-hover:bg-black/30 transition-colors duration-500">
                  {/* Vệt sáng trang trí nhỏ góc trên phải */}
                  <div className={`absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br ${accent} opacity-10 blur-[30px] group-hover:opacity-25 transition-opacity duration-500`}></div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center shadow-md`}>
                    <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-bold text-white leading-snug mb-1">
                      {item.title}
                    </h3>
                    <p className={`text-xs font-semibold bg-clip-text text-transparent bg-gradient-to-r ${accent}`}>
                      {item.subtitle}
                    </p>
                  </div>

                  <p className="text-white/55 text-sm leading-relaxed">
                    {item.desc}
                  </p>

                  {/* Đường kẻ gradient nhỏ ở đáy card — kéo dài khi hover */}
                  <div className={`mt-auto h-[2px] w-10 rounded-full bg-gradient-to-r ${accent} opacity-50 group-hover:w-full group-hover:opacity-100 transition-all duration-700`}></div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
