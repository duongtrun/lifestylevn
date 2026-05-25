'use client';

import { useState } from 'react';
import { motion, AnimatePresence, Variants } from "framer-motion";
import Image from 'next/image';
import { Lightbulb, BookOpen, ShieldCheck, Leaf, Sparkles } from "lucide-react";

// Dữ liệu 5 giá trị cốt lõi / sự khác biệt
const DIFFERENCES = [
  {
    id: "tech",
    tabName: "Công nghệ",
    title: "Công nghệ thông minh",
    subtitle: "Tạo nền khác biệt",
    desc: "Chúng tôi tiên phong ứng dụng trí tuệ nhân tạo (AI) và công nghệ hiện đại vào giáo dục, chăm sóc sức khỏe và dinh dưỡng để tối ưu hóa hành trình khôn lớn của trẻ. Công nghệ AI giúp cá nhân hóa lộ trình học tập, tự động phân tích thế mạnh và nhịp độ tiếp thu của từng bé để đưa ra phương pháp phù hợp nhất mà không gây áp lực. Trong chăm sóc sức khỏe, ứng dụng thông minh hỗ trợ cha mẹ theo dõi thể chất và đề xuất thực đơn dinh dưỡng khoa học dựa trên dữ liệu thực tế. Nhờ đó, việc nuôi dạy con trở nên khoa học, hiệu quả và hiện đại hơn bao giờ hết.",
    icon: Lightbulb,
    image: "/images/different_Ai_bg.png",
    color: "from-[#98C04A] to-[#C0E878]",
    glowBg: "rgba(152, 192, 74, 0.2)",
  },
  {
    id: "education",
    tabName: "Giáo dục",
    title: "Giáo dục là trọng tâm",
    subtitle: "Kiến tạo giá trị thật",
    desc: "Chúng tôi đặt giáo dục làm nền tảng cốt lõi cho mọi giải pháp phát triển tư duy hiện đại. Thay vì hướng trẻ theo lối học vẹt hay lý thuyết suông để chạy theo điểm số ngắn hạn, chúng tôi tập trung khơi dậy trí tò mò tự nhiên, rèn luyện tư duy phản biện và trang bị kỹ năng thực tế thế kỷ 21. Đặc biệt, chúng tôi đóng vai trò là người bạn đồng hành tin cậy cùng bố mẹ, chia sẻ tri thức khoa học giúp thấu hiểu sâu sắc từng giai đoạn phát triển của con. Mỗi bài học được thiết kế đều nhằm kiến tạo những giá trị thực học - thực hành, nuôi dưỡng nhân cách vững vàng để trẻ tự tin làm chủ tương lai.",
    icon: BookOpen,
    image: "/images/education_Ai.png",
    color: "from-[#6366F1] to-[#A855F7]",
    glowBg: "rgba(99, 102, 241, 0.2)",
  },
  {
    id: "ecosystem",
    tabName: "Hệ sinh thái",
    title: "Tư duy hệ sinh thái",
    subtitle: "Kết nối toàn diện",
    desc: "Sự khôn lớn của một đứa trẻ là một quá trình liên kết hữu cơ không thể tách rời giữa thể chất, trí tuệ và tinh thần. Thấu hiểu điều đó, chúng tôi kiến tạo một hệ sinh thái toàn diện kết nối chặt chẽ ba trụ cột: Dinh dưỡng – Chăm sóc sức khỏe – Giáo dục. Thay vì sử dụng nhiều dịch vụ rời rạc, cha mẹ giờ đây có một giải pháp đồng bộ và trọn gói. Dữ liệu thể trạng của trẻ là cơ sở để thiết kế hoạt động học tập phù hợp, ngược lại giáo dục giúp trẻ nâng cao ý thức tự chăm sóc bản thân. Đây chính là bệ phóng giúp trẻ phát triển khỏe mạnh toàn diện và cân bằng.",
    icon: Sparkles,
    image: "/images/tu_duy_he_sinh_thai.jpg",
    color: "from-[#0EA5E9] to-[#22D3EE]",
    glowBg: "rgba(14, 165, 233, 0.2)",
  },
 
  {
    id: "sustainable",
    tabName: "Giá trị thật",
    title: "Giá trị thật",
    subtitle: "Phát triển bền vững",
    desc: 'Chúng tôi kiên định lựa chọn con đường phát triển bền vững dựa trên những giá trị thực tế, đo lường được thay vì những lời quảng cáo hào nhoáng. "Giá trị thật" được đo bằng sự tiến bộ thực sự, tình yêu học hỏi và hệ miễn dịch khỏe mạnh của trẻ qua mỗi ngày. Triết lý "phát triển bền vững" còn được thể hiện qua việc ưu tiên sử dụng nguyên liệu thân thiện môi trường trong sản xuất và lồng ghép ý thức bảo vệ thiên nhiên, trách nhiệm cộng đồng vào các bài học giáo dục. Chúng tôi cam kết đầu tư dài hạn để đồng hành cùng thế hệ trẻ Việt Nam phát triển xanh và bền vững.',
    icon: Leaf,
    image: "/images/gia_tri_that.jpg",
    color: "from-[#EC4899] to-[#F43F5E]",
    glowBg: "rgba(236, 72, 153, 0.2)",
  },
   {
    id: "safety",
    tabName: "An toàn",
    title: "An toàn chất lượng",
    subtitle: "Minh bạch tuyệt đối",
    desc: "Sự an toàn của trẻ em là giới hạn đỏ tuyệt đối mà chúng tôi không bao giờ thỏa hiệp. Mọi sản phẩm, dịch vụ trong hệ sinh thái đều tuân thủ quy trình kiểm định chất lượng khắt khe nhất của các tổ chức uy tín trong và ngoài nước. Đi đôi với chất lượng vượt trội là sự minh bạch tuyệt đối thông tin. Chúng tôi tiên phong công khai nguồn gốc nguyên liệu, thành phần dinh dưỡng và cơ sở khoa học của phương pháp giáo dục. Bằng sự chân thực và tinh thần chịu trách nhiệm cao nhất, chúng tôi mang đến sự an tâm tuyệt đối và xây dựng niềm tin trọn vẹn từ phụ huynh.",
    icon: ShieldCheck,
    image: "/images/an_toan_chat_luong.jpg",
    color: "from-[#F97316] to-[#FACC15]",
    glowBg: "rgba(249, 115, 22, 0.2)",
  },
];

const slideVariants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 50 : direction < 0 ? -50 : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 50 : direction > 0 ? -50 : 0,
    opacity: 0,
    transition: {
      x: { type: "spring" as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.25 }
    }
  })
};

export default function DifferenceSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const handleTabChange = (newIdx: number) => {
    const newDir = newIdx > activeIdx ? 1 : -1;
    setActiveIdx(newIdx);
    setPage([newIdx, newDir]);

    // Cuộn tab active vào giữa màn hình trên di động
    setTimeout(() => {
      const activeEl = document.getElementById(`diff-tab-${newIdx}`);
      if (activeEl) {
        activeEl.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }, 50);
  };

  const activeItem = DIFFERENCES[activeIdx];
  const ActiveIcon = activeItem.icon;

  return (
    <section
      className="relative w-full py-12 lg:py-16 bg-[#008BBD]/20 overflow-hidden"
    >

      <div className="container mx-auto px-4 relative z-10 max-w-6xl">

        {/* ===== TIÊU ĐỀ SECTION ===== */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center space-y-4"
        >
          {/* <span className="inline-block px-4 py-1.5 rounded-full bg-[#008BBD]/10 backdrop-blur-sm text-[#008BBD] font-bold tracking-widest text-xs md:text-sm uppercase border border-[#008BBD]/20">
            Giá trị cốt lõi
          </span> */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#008bbd] leading-tight tracking-tight pb-2">
            Sự{" "}
            <span className="bg-gradient-to-r from-[#008bbd] to-[#00b4d8] bg-clip-text text-transparent">
              Khác Biệt
            </span>
          </h2>
          <p className="text-neutral-900 font-medium text-base md:text-lg max-w-xl mx-auto">
            Khát vọng kiến tạo thế hệ trẻ Việt Nam toàn diện và vững vàng

          </p>
        </motion.div>

        {/* ===== THANH CHỌN TABS (PILLS) ===== */}
        <div className="flex flex-col items-center mb-10">
          <div
            className="flex flex-row p-1.5 bg-white/60 backdrop-blur-md rounded-full border border-neutral-200/60 max-w-full overflow-x-auto scrollbar-none gap-1 md:gap-2"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {DIFFERENCES.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIdx === index;
              return (
                <button
                  key={item.id}
                  id={`diff-tab-${index}`}
                  onClick={() => handleTabChange(index)}
                  className={`relative px-3 py-2 md:px-5 md:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 whitespace-nowrap flex items-center gap-2 cursor-pointer outline-none z-10 ${isActive ? 'text-[#008bbd]' : 'text-neutral-500 hover:text-neutral-800'
                    }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="absolute inset-0 bg-white rounded-full -z-10 shadow-md"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <Icon className="w-4 h-4 md:w-4.5 md:h-4.5" />
                  <span>{item.tabName}</span>
                </button>
              );
            })}
          </div>

          {/* Dots navigation for mobile viewports */}
          <div className="flex items-center justify-center gap-2.5 mt-4 md:hidden">
            <button
              onClick={() => handleTabChange(0)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx < 2 ? 'bg-[#008bbd] w-6' : 'bg-[#008bbd]/30 w-2'
              }`}
              aria-label="Xem nhóm tab 1"
            />
            <button
              onClick={() => handleTabChange(2)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIdx >= 2 ? 'bg-[#008bbd] w-6' : 'bg-[#008bbd]/30 w-2'
              }`}
              aria-label="Xem nhóm tab 2"
            />
          </div>
        </div>

        {/* ===== KHỐI NỘI DUNG SLIDER (CARD) ===== */}
        <div className="relative w-full max-w-5xl mx-auto">
          {/* Quầng sáng màu dynamic chuyển động phía sau card */}
          <div
            className="absolute -inset-4 md:-inset-10 rounded-[40px] opacity-20 blur-[80px] transition-all duration-1000 -z-10 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeItem.glowBg} 0%, transparent 60%)`
            }}
          />

          <div className="relative overflow-hidden rounded-[32px] bg-white border border-neutral-100/80 shadow-2xl">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIdx}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="p-8 md:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch"
              >
                {/* Cột trái: Text */}
                <div className="lg:col-span-7 flex flex-col space-y-4 md:space-y-6 text-left justify-center">
                  <div>
                    <span className={`inline-block text-xs md:text-sm font-bold uppercase tracking-widest bg-clip-text text-transparent bg-gradient-to-r ${activeItem.color} mb-2`}>
                      {activeItem.subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-800 leading-tight">
                      {activeItem.title}
                    </h3>
                  </div>

                  <p className="text-neutral-800 text-base md:text-lg leading-relaxed">
                    {activeItem.desc}
                  </p>

                  {/* Đường kẻ ngang viền chuyển sắc */}
                  <div className="w-16 h-1 rounded-full bg-neutral-100 overflow-hidden">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${activeItem.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    />
                  </div>
                </div>

                {/* Cột phải: Hình ảnh + Badge icon đè */}
                <div className="lg:col-span-5 relative mt-4 lg:mt-0 pl-4 lg:pl-0 w-full flex">
                  <div className="relative w-full min-h-[300px] rounded-3xl overflow-hidden border border-neutral-200/50 shadow-xl group bg-neutral-50 flex-1">
                    <Image
                      src={activeItem.image}
                      alt={activeItem.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                  </div>

                  {/* Floating Badge */}
                  <div
                    className="absolute bottom-6 -left-2 sm:-left-4 md:-left-6 w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl bg-white shadow-2xl flex items-center justify-center border border-neutral-100 transition-all duration-300 hover:scale-110 hover:rotate-3 z-20"
                  >
                    <ActiveIcon
                      className="w-8 h-8 md:w-10 md:h-10"
                      style={{
                        color: activeItem.id === 'tech' ? '#98C04A' :
                          activeItem.id === 'ecosystem' ? '#0EA5E9' :
                            activeItem.id === 'education' ? '#6366F1' :
                              activeItem.id === 'safety' ? '#F97316' :
                                '#EC4899'
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
