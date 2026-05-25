'use client';

// File: src/app/gioi-thieu/gia-tri-cot-loi/page.tsx
// Luồng: Chi tiết Giá trị cốt lõi (/gioi-thieu/gia-tri-cot-loi)
// Vai trò: Trưng bày chi tiết chiều sâu 6 giá trị cốt lõi của Lifestyle Việt Nam.
// Dùng khi: Người dùng click vào cụm lục giác tổ ong ở phần Giá trị cốt lõi.

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
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
    quote: 'Con người là nền tảng của mọi giá trị bền vững tại LifeStyle.',
    icon: Heart,
    color: '#008BBD',
    bgLight: 'bg-rose-50/50',
    imageDesktop: '/img_core_value/con_nguoi.png',
    imageMobile: '/img_core_value/con_nguoi_mobile.png',
    details: [
      'Chúng tôi tin rằng một doanh nghiệp chỉ có thể phát triển mạnh khi từng cá nhân trong đó được trân trọng, được tạo điều kiện học tập, được trao quyền và được ghi nhận.',
      'LifeStyle đầu tư vào con người không chỉ bằng đào tạo kiến thức, mà bằng môi trường để mỗi người dám thử – dám sai – dám trưởng thành.',
      'Ở đây, mỗi cá nhân đều là một mắt xích quan trọng, có vai trò ảnh hưởng đến sản phẩm và giá trị mang đến cho cộng đồng Mẹ & Bé.',
      'Với LifeStyle, xây người trước – xây hệ sinh thái sau.'
    ]
  },
  {
    id: 2,
    num: '02',
    title: 'Đổi mới & sáng tạo',
    quote: 'Đổi mới không phải là khẩu hiệu – đó là trách nhiệm.',
    icon: Lightbulb,
    color: '#008BBD',
    bgLight: 'bg-amber-50/50',
    imageDesktop: '/img_core_value/sang_tao.png',
    imageMobile: '/img_core_value/sang_tao_mobile.png',
    details: [
      'Trong lĩnh vực Mẹ & Bé, nơi yêu cầu sự an toàn tuyệt đối nhưng cũng cần sự cập nhật liên tục, sáng tạo chính là chìa khóa để tạo ra khác biệt thật sự.',
      'LifeStyle xem sự đổi mới như một tiêu chuẩn bắt buộc:',
      '- Đổi mới công nghệ',
      '- Đổi mới sản phẩm',
      '- Đổi mới quy trình',
      '- Đổi mới tư duy',
      'Chúng tôi khuyến khích mỗi cá nhân đặt câu hỏi: “Làm thế nào để tốt hơn hôm qua?”',
      'Sáng tạo giúp sản phẩm tốt hơn - Đổi mới giúp doanh nghiệp đi xa hơn.'
    ]
  },
  {
    id: 3,
    num: '03',
    title: 'Vì khách hàng – Tạo giá trị thật',
    quote: 'Khách hàng không chỉ là người mua hàng, mà là người đồng hành cùng chúng tôi trong sứ mệnh nuôi lớn một thế hệ tương lai.',
    icon: Target,
    color: '#008BBD',
    bgLight: 'bg-sky-50/50',
    imageDesktop: '/img_core_value/vi_khach_hang.png',
    imageMobile: '/img_core_value/vi_khach_hang_mobile.png',
    details: [
      'LifeStyle luôn đặt câu hỏi:',
      '- “Giải pháp này có thực sự tốt cho trẻ không?”',
      '- “Sản phẩm này có an toàn tuyệt đối chưa?”',
      '- “Giá trị chúng tôi tạo ra có đủ chân thật và ý nghĩa không?”',
      'Chúng tôi cam kết:',
      '- Thành phần sản phẩm rõ ràng',
      '- Thông tin minh bạch',
      '- Giá trị thực – không phóng đại',
      '- Vì lợi ích lâu dài của trẻ nhỏ',
      'Khách hàng tin tưởng LifeStyle vì chúng tôi chọn con đường làm đúng – làm thật, dù nhiều khi đó là con đường khó hơn.',
      'Khi giá trị thật được đặt lên hàng đầu, sản phẩm tự nhiên sẽ được lựa chọn.'
    ]
  },
  {
    id: 4,
    num: '04',
    title: 'Biết ơn – Trân trọng',
    quote: 'Chúng tôi xây dựng văn hoá biết ơn từ những điều nhỏ nhất: nỗ lực của nhân sự, sự đồng hành của lãnh đạo, niềm tin của khách hàng và cả những góp ý giúp chúng tôi tốt hơn mỗi ngày.',
    icon: HeartHandshake,
    color: '#008BBD',
    bgLight: 'bg-violet-50/50',
    imageDesktop: '/img_core_value/biet_on.png',
    imageMobile: '/img_core_value/biet_on_mobile.png',
    details: [
      '- Biết ơn tạo ra sự khiêm tốn.',
      '- Trân trọng giúp chúng tôi đối xử với nhau công bằng, văn minh, không phán xét.',
      'Chúng tôi mong muốn từng thành viên cũng mang tinh thần này:',
      '- Biết ơn người trao cho mình cơ hội',
      '- Biết ơn đồng đội cùng tiến bộ',
      '- Biết ơn khách hàng đã tin tưởng',
      'Khi văn hoá biết ơn tồn tại, năng lượng tích cực lan tỏa và hiệu quả làm việc được nhân lên.'
    ]
  },
  {
    id: 5,
    num: '05',
    title: 'Đoàn kết & hợp tác',
    quote: 'LifeStyle tin vào sức mạnh của sự kết nối.',
    icon: Home,
    color: '#008BBD',
    bgLight: 'bg-indigo-50/50',
    imageDesktop: '/img_core_value/doan_ket.png',
    imageMobile: '/img_core_value/doan_ket_mobile.png',
    details: [
      'Một cá nhân giỏi có thể tạo ra kết quả tốt, nhưng một đội ngũ đoàn kết sẽ tạo ra thành tựu bền vững.',
      'Chúng tôi xây dựng môi trường không đổ lỗi – không chia rẽ – không cạnh tranh nội bộ.',
      'Thay vào đó, mỗi cá nhân đều hiểu mình đang cùng hướng về một mục tiêu chung: xây dựng hệ sinh thái Mẹ & Bé toàn diện và tử tế.',
      'Sự hợp tác giữa các bộ phận – giữa con người và công nghệ – giữa sản phẩm và giá trị cộng đồng chính là điểm khác biệt của LifeStyle.',
      'Đoàn kết giúp chúng tôi mạnh hơn, vững hơn và đi nhanh hơn trên hành trình dài.'
    ]
  },
  {
    id: 6,
    num: '06',
    title: 'Cùng phát triển – Chia sẻ lợi nhuận',
    quote: 'LifeStyle không xem thành công là công của một cá nhân.',
    icon: TrendingUp,
    color: '#008BBD',
    bgLight: 'bg-emerald-50/50',
    imageDesktop: '/img_core_value/chia_se_loi_nhuan.png',
    imageMobile: '/img_core_value/chia_se_loi_nhuan_mobile.png',
    details: [
      'Đó là kết quả của cả một tập thể cùng nỗ lực, cùng chịu trách nhiệm và cùng tạo ra giá trị.',
      'Vì vậy, chúng tôi muốn mỗi thành viên cảm nhận rõ:',
      '- Nếu bạn nỗ lực – bạn sẽ nhận lại xứng đáng.',
      '- Nếu bạn đóng góp – bạn sẽ được ghi nhận.',
      '- Nếu bạn muốn phát triển – doanh nghiệp sẽ đồng hành.',
      'Chúng tôi hướng đến môi trường nơi mọi người:',
      '- Được trao quyền',
      '- Được chia sẻ cơ hội',
      '- Được đền đáp bằng giá trị thật',
      '- Được nhìn thấy con đường phát triển rõ ràng',
      'Cùng nhau phát triển, cùng nhau hưởng thành quả – đó là cách LifeStyle xây dựng sự gắn bó lâu dài.'
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
            trong hành trình kiến tạo hệ sinh thái chăm sóc Mẹ & Bé của LifeStyle Việt Nam.
          </p>
          <div className="h-1 w-20 bg-[#008BBD] mx-auto rounded-full mt-6" />
        </motion.div>
      </div>

      {/* DANH SÁCH CHI TIẾT 6 GIÁ TRỊ */}
      <div className="container mx-auto px-4 md:px-10 space-y-12 md:space-y-16 max-w-5xl">
        {valuesDetail.map((value, idx) => {
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
              
              {/* Cột Trái hoặc Phải tùy index chẵn lẻ: Hình ảnh thay thế cho khung cũ */}
              <div className={`col-span-1 md:col-span-4 flex justify-center ${
                isEven ? 'md:order-1' : 'md:order-12'
              }`}>
                <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#008BBD]/10 w-[338px] h-[220px] md:w-[319px] md:h-[260px] flex-shrink-0">
                  {/* Ảnh Desktop */}
                  <div className="hidden md:block absolute inset-0 w-full h-full">
                    <Image
                      src={value.imageDesktop}
                      alt={value.title}
                      fill
                      sizes="319px"
                      className="object-cover"
                    />
                  </div>
                  {/* Ảnh Mobile */}
                  <div className="block md:hidden absolute inset-0 w-full h-full">
                    <Image
                      src={value.imageMobile}
                      alt={value.title}
                      fill
                      sizes="338px"
                      className="object-cover"
                    />
                  </div>
                </div>
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
                  {value.details.map((detail, dIdx) => {
                    const isSubItem = detail.startsWith('- ');
                    const cleanText = isSubItem ? detail.substring(2) : detail;
                    return (
                      <li 
                        key={dIdx} 
                        className={`flex items-start gap-2.5 text-neutral-600 text-sm md:text-base leading-relaxed ${
                          isSubItem ? 'pl-6' : ''
                        }`}
                      >
                        {isSubItem ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#008BBD] shrink-0 mt-2 mx-1.5" />
                        ) : (
                          <CheckCircle2 size={18} className="text-[#008BBD] shrink-0 mt-0.5" />
                        )}
                        <span>{cleanText}</span>
                      </li>
                    );
                  })}
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
