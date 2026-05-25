// File này: Component hiển thị lộ trình tuyển dụng (Recruitment Process).
// Vai trò: Hiển thị 5 bước quy trình tuyển dụng theo thiết kế chuẩn:
//          - Chữ và đường viền màu xanh #008BBD.
//          - Các bước nối với nhau bằng 1 đường line (ngang trên desktop, dọc trên mobile).
//          - Nền sáng với hình mờ phía sau.
// Dùng khi: Được dùng trong trang tuyển dụng /tuyen-dung để mô tả quy trình ứng tuyển.

import Image from 'next/image';

// Dữ liệu 5 bước theo đúng thiết kế
const PROCESS_STEPS = [
  {
    icon: '/img_recruit/mail.svg',
    title: 'Gửi hồ sơ',
    description: 'Bạn có thể nộp CV trực tiếp qua email hoặc mẫu form ứng tuyển online. Đừng ngại kể thêm về bản thân - chúng tôi rất muốn hiểu bạn nhiều hơn những gì nằm trên giấy.',
  },
  {
    icon: '/img_recruit/document.svg',
    title: 'Sàng lọc',
    description: 'Phòng nhân sự và bộ phận chuyên môn sẽ xem xét và lựa chọn những hồ sơ phù hợp để mời phỏng vấn.',
  },
  {
    icon: '/img_recruit/QandA.svg',
    title: 'Phỏng vấn',
    description: 'Chúng tôi trao đổi trực tiếp để hiểu rõ hơn về mục tiêu, năng lực và cách bạn xử lý các tình huống thực tế. Tùy vị trí, bạn có thể được yêu cầu làm bài test ngắn.',
  },
  {
    icon: '/img_recruit/letter.svg',
    title: 'Phản hồi kết quả',
    description: 'Dù được nhận hay không, bạn đều nhận được phản hồi từ chúng tôi. Nếu phù hợp, chúng tôi sẽ gửi thư mời nhận việc và thống nhất thời gian bắt đầu.',
  },
  {
    icon: '/img_recruit/clock.svg',
    title: 'Thời gian',
    description: 'Thời gian xử lý hồ sơ thường giao động từ 2-5 ngày',
  },
] as const;

export default function RecruitmentProcess() {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-white">
      {/* === Hình nền mờ phía sau === */}
      {/* Vai trò: Hiển thị hình nền văn phòng sắc nét phía sau và lớp phủ mỏng để giữ độ tương phản cho chữ */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/img_recruit/recruit_progress.webp"
          alt="Hình nền lộ trình tuyển dụng IruKa"
          fill
          className="object-cover opacity-95"
        />
        {/* Lớp phủ trắng nhẹ 35% để đảm bảo chữ màu xanh hiển thị rõ ràng và không bị rối mắt bởi chi tiết nền */}
        <div className="absolute inset-0 bg-white/35" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        {/* === Tiêu đề === */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 tracking-tight" style={{ color: '#008BBD' }}>
            Quy trình tuyển dụng
          </h2>
          <p className="text-xl md:text-2xl font-semibold" style={{ color: '#008BBD' }}>
            Đơn giản - Minh Bạch - Chuyên Nghiệp
          </p>
        </div>

        {/* === Workflow Layout === */}
        <div className="relative max-w-7xl mx-auto">
          {/* Đường line ngang cho Desktop — nối từ tâm vòng tròn 1 đến vòng tròn 5 */}
          <div 
            className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-[4px] z-0"
            style={{ backgroundColor: '#008BBD', transform: 'translateY(-50%)' }}
          />

          <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-4 relative z-10">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="flex flex-row lg:flex-col items-start lg:items-center text-left lg:text-center flex-1 relative group">
                
                {/* Đường line dọc cho Mobile — vẽ từ tâm vòng này đến tâm vòng kia */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div 
                    className="block lg:hidden absolute top-[60px] left-[60px] w-[4px] z-0"
                    style={{ 
                      backgroundColor: '#008BBD', 
                      transform: 'translateX(-50%)',
                      height: 'calc(100% + 40px)' // 40px tương ứng với gap-10
                    }}
                  />
                )}

                {/* Vòng tròn Icon */}
                <div 
                  className="flex-shrink-0 w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center relative z-10 lg:mb-6 shadow-sm transition-transform duration-300 group-hover:scale-105"
                  style={{ border: '4px solid #008BBD' }}
                >
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={56}
                    height={56}
                    className="drop-shadow-sm"
                  />
                </div>

                {/* Nội dung Bước */}
                <div className="ml-6 lg:ml-0 mt-2 lg:mt-0 flex-1">
                  <h3 className="text-lg md:text-xl font-bold mb-3" style={{ color: '#008BBD' }}>
                    {step.title}
                  </h3>
                  <p className="text-neutral-700 text-sm leading-relaxed max-w-[240px] lg:mx-auto font-medium">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
