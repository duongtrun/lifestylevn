'use client';

// File: src/app/gioi-thieu/gia-tri-cot-loi/page.tsx
// Luồng: Chi tiết Giá trị cốt lõi (/gioi-thieu/gia-tri-cot-loi)
// Vai trò: Trưng bày chi tiết chiều sâu 6 giá trị cốt lõi của Lifestyle Việt Nam.
// Dùng khi: Người dùng click vào cụm lục giác tổ ong ở phần Giá trị cốt lõi.

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Heart, 
  Lightbulb, 
  TrendingUp, 
  Target, 
  Home, 
  HeartHandshake, 
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const valuesDetail = [
  {
    id: 1,
    num: '01',
    title: 'Con người là trọng tâm',
    quote: 'Mọi thành công của doanh nghiệp đều bắt nguồn từ sự phát triển toàn diện của mỗi cá nhân.',
    icon: Heart,
    color: '#008BBD',
    bgLight: 'bg-rose-50/50',
    details: [
      'Tôn trọng và đề cao sự khác biệt cá nhân, tạo không gian tự do sáng tạo cho mỗi nhân sự.',
      'Đào tạo và định hướng phát triển nghề nghiệp rõ ràng, đồng hành cùng sự thăng tiến của nhân viên.',
      'Chính sách phúc lợi ưu việt, luôn quan tâm đến đời sống tinh thần và vật chất của người lao động.'
    ]
  },
  {
    id: 2,
    num: '02',
    title: 'Luôn đổi mới & sáng tạo',
    quote: 'Không ngừng cải tiến, học hỏi cái mới để tiên phong kiến tạo giải pháp đột phá.',
    icon: Lightbulb,
    color: '#008BBD',
    bgLight: 'bg-amber-50/50',
    details: [
      'Khuyến khích tư duy đổi mới, thử nghiệm các công nghệ và giải pháp giáo dục, chăm sóc hiện đại.',
      'Sẵn sàng học hỏi từ thực tiễn, lắng nghe góp ý từ chuyên gia để hoàn thiện hệ sinh thái.',
      'Văn hóa chấp nhận sai sót trong thử nghiệm sáng tạo để đúc kết bài học giá trị.'
    ]
  },
  {
    id: 3,
    num: '03',
    title: 'Cùng nhau phát triển & chia sẻ lợi nhuận',
    quote: 'Thành công bền vững là khi các bên liên kết cùng có lợi và chia sẻ giá trị thật.',
    icon: TrendingUp,
    color: '#008BBD',
    bgLight: 'bg-emerald-50/50',
    details: [
      'Xây dựng chính sách chiết khấu, chia sẻ lợi nhuận công bằng, hấp dẫn với đối tác và đại lý.',
      'Cam kết chất lượng thực tế trên mọi dòng sản phẩm, tạo uy tín kinh doanh vững chắc.',
      'Đồng hành hỗ trợ đại lý từ khâu kỹ năng, marketing đến vận hành để cùng phát triển.'
    ]
  },
  {
    id: 4,
    num: '04',
    title: 'Vì khách hàng',
    quote: 'Lấy sự an tâm của ba mẹ và nụ cười của trẻ nhỏ làm kim chỉ nam cho mọi hoạt động.',
    icon: Target,
    color: '#008BBD',
    bgLight: 'bg-sky-50/50',
    details: [
      'Nghiên cứu sâu sắc nhu cầu thực tế của mẹ và bé tại Việt Nam để đưa ra giải pháp phù hợp.',
      'Dịch vụ tư vấn y tế, hỗ trợ khách hàng hoạt động 24/7 chân thành, tận tâm từ đội ngũ chuyên gia.',
      'Đảm bảo quy trình kiểm soát chất lượng đầu vào nghiêm ngặt nhất cho mọi sản phẩm.'
    ]
  },
  {
    id: 5,
    num: '05',
    title: 'Tình thân gia đình',
    quote: 'Lifestyle không chỉ là nơi làm việc, đây là ngôi nhà chung gắn kết yêu thương.',
    icon: Home,
    color: '#008BBD',
    bgLight: 'bg-indigo-50/50',
    details: [
      'Môi trường làm việc thân thiện, hòa đồng, không phân cấp bậc xa cách.',
      'Các thành viên gắn kết như người nhà, sẵn sàng hỗ trợ, chia sẻ gánh nặng công việc.',
      'Tổ chức thường niên các hoạt động dã ngoại, ngày hội gia đình để gắn kết người thân của nhân sự.'
    ]
  },
  {
    id: 6,
    num: '06',
    title: 'Biết ơn',
    quote: 'Trân quý quá khứ, biết ơn hiện tại và hướng về tương lai cùng những người bạn đồng hành.',
    icon: HeartHandshake,
    color: '#008BBD',
    bgLight: 'bg-violet-50/50',
    details: [
      'Biết ơn đối tác, đại lý đã tin tưởng và kết nối sản phẩm tới hàng triệu người tiêu dùng.',
      'Tri ân sự tin yêu bền bỉ của hàng triệu gia đình Việt đã lựa chọn hệ sinh thái Lifestyle.',
      'Luôn ghi nhớ và vinh danh những cống hiến thầm lặng của từng cá nhân trong đội ngũ.'
    ]
  }
];

export default function CoreValuesDetailPage() {
  return (
    <main className="flex-1 w-full bg-[#EEF8FC] py-12 md:py-20 overflow-hidden">
      
      {/* BREADCRUMB & QUAY LẠI */}
      <div className="container mx-auto px-4 md:px-10 mb-8 md:mb-12">
        <Link 
          href="/gioi-thieu" 
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-[#008BBD] text-sm font-bold transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Quay lại trang Giới thiệu
        </Link>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mt-4 text-xs text-neutral-400 font-medium">
          <Link href="/" className="hover:text-neutral-600">Trang chủ</Link>
          <ChevronRight size={12} />
          <Link href="/gioi-thieu" className="hover:text-neutral-600">Giới thiệu</Link>
          <ChevronRight size={12} />
          <span className="text-[#008BBD] font-bold">Giá trị cốt lõi</span>
        </div>
      </div>

      {/* HEADER BANNER */}
      <div className="container mx-auto px-4 md:px-10 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto space-y-4"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#008BBD]/10 text-[#008BBD] text-xs font-bold uppercase tracking-widest">
            Văn hoá doanh nghiệp
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-[#273F68] tracking-tight leading-tight">
            Chiều Sâu Giá Trị Cốt Lõi
          </h1>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            Hệ giá trị định hình phong cách làm việc, văn hóa ứng xử và định hướng chiến lược dài hạn 
            trong hành trình kiến tạo hệ sinh thái chăm sóc Mẹ & Bé của Lifestyle Việt Nam.
          </p>
          <div className="h-1 w-20 bg-[#008BBD] mx-auto rounded-full mt-6" />
        </motion.div>
      </div>

      {/* DANH SÁCH CHI TIẾT 6 GIÁ TRỊ */}
      <div className="container mx-auto px-4 md:px-10 space-y-12 md:space-y-16 max-w-5xl">
        {valuesDetail.map((value, idx) => {
          const IconComponent = value.icon;
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6 }}
              className={`bg-white rounded-3xl p-6 md:p-10 border border-[#008BBD]/10 shadow-[0_10px_30px_rgba(0,139,189,0.04)]
                          grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center`}
            >
              
              {/* Cột Trái hoặc Phải tùy index chẵn lẻ: Icon & Số thứ tự lớn */}
              <div className={`col-span-1 md:col-span-4 flex flex-col items-center text-center justify-center p-6 rounded-2xl ${value.bgLight} ${
                isEven ? 'md:order-1' : 'md:order-12'
              }`}>
                {/* Số thứ tự lớn mờ ảo */}
                <span className="text-6xl md:text-7xl font-black text-[#008BBD]/15 select-none font-mono">
                  {value.num}
                </span>
                
                {/* Vòng tròn Icon lớn */}
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center -mt-6 border border-[#008BBD]/10">
                  <IconComponent size={36} className="text-[#008BBD]" />
                </div>

                <span className="text-xs font-bold text-[#008BBD] uppercase mt-4 tracking-widest">
                  Lifestyle Value
                </span>
              </div>

              {/* Cột Chi tiết nội dung */}
              <div className={`col-span-1 md:col-span-8 space-y-5 ${
                isEven ? 'md:order-12' : 'md:order-1'
              }`}>
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#273F68]">
                  {value.title}
                </h2>
                
                {/* Quote tôn vinh giá trị */}
                <p className="text-sm md:text-base font-semibold text-[#008BBD] italic pl-4 border-l-4 border-[#008BBD]/40 leading-relaxed bg-[#EEF8FC]/50 py-2 pr-2 rounded-r-lg">
                  "{value.quote}"
                </p>

                {/* Danh sách đặc điểm diễn giải */}
                <ul className="space-y-3 pt-2">
                  {value.details.map((detail, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2.5 text-neutral-600 text-sm md:text-base leading-relaxed">
                      <CheckCircle2 size={18} className="text-[#008BBD] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          );
        })}
      </div>

      {/* FOOTER ĐIỀU HƯỚNG LIÊN HỆ */}
      <div className="container mx-auto px-4 md:px-10 mt-16 md:mt-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white border border-[#008BBD]/20 rounded-3xl p-8 shadow-lg space-y-6"
        >
          <div className="w-12 h-12 bg-[#008BBD]/10 rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck size={26} className="text-[#008BBD]" />
          </div>
          <h3 className="text-xl font-bold text-[#273F68]">
            Đồng hành cùng sự tử tế và giá trị thật!
          </h3>
          <p className="text-neutral-500 text-xs md:text-sm leading-relaxed">
            Chúng tôi luôn tìm kiếm những cộng sự tài năng và các đối tác tâm huyết có cùng 
            tư duy giá trị để đồng lòng xây dựng hệ sinh thái Mẹ & Bé hạnh phúc hơn.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link 
              href="/lien-he"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#008BBD] hover:bg-[#00749e] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
            >
              Liên hệ hợp tác
            </Link>
            <Link 
              href="/tuyen-dung"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-white hover:bg-[#EEF8FC] text-[#008BBD] border border-[#008BBD] font-bold text-xs transition-all cursor-pointer"
            >
              Gia nhập đội ngũ
            </Link>
          </div>
        </motion.div>
      </div>

    </main>
  );
}
