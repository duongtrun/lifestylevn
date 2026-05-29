// File này: Component "Giá trị công ty" — phần cuối trang tuyển dụng.
// Vai trò: Hiển thị tiêu đề "Giá trị công ty / Những điều chúng tôi trân trọng",
//          đoạn mô tả, và slider gồm nhiều card ảnh với overlay text mô tả từng giá trị.
//          Slider dùng Embla Carousel (thư viện đã cài sẵn trong dự án).
// Dùng khi: Nhúng vào cuối trang /tuyen-dung để giới thiệu văn hoá & giá trị IruKa.

'use client';

import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const COMPANY_VALUES = [
  {
    imageDesktop: '/img_recruit/ton_trong_minh_bach.webp',
    imageMobile: '/img_recruit/ton_trong_minh_bach_mobile.webp',
    title: 'Tôn trọng & Minh bạch',
    description:
      'Mọi ý kiến đều được lắng nghe và phản hồi minh bạch. Chúng tôi xây dựng môi trường nơi sự thật là nền tảng của mọi quyết định và sự tôn trọng lẫn nhau là kim chỉ nam cho mọi hành động lâu dài.',
  },
  {
    imageDesktop: '/img_recruit/hoc_hoi.png',
    imageMobile: '/img_recruit/hoc_hoi_mobile.png',
    title: 'Học hỏi & Phát triển',
    description:
      'Bạn có thể bắt đầu từ con số 0 — nhưng nếu sẵn sàng học hỏi và không ngại thử thách, bạn luôn có cơ hội để bứt phá. Chúng tôi hỗ trợ nhân sự bằng phản hồi rõ ràng và lộ trình phát triển.',
  },
  {
    imageDesktop: '/img_recruit/chu_dong_trach_nhiem.webp',
    imageMobile: '/img_recruit/chu_dong_trach_nhiem_mobile.webp',
    title: 'Chủ động & Trách nhiệm',
    description:
      'Chúng tôi đề cao tính chủ động trong công việc và khuyến khích bạn đưa ra sáng kiến. Mỗi cá nhân đều đóng vai trò quan trọng và chịu trách nhiệm cho kết quả chung.',
  },
  {
    imageDesktop: '/img_recruit/gan_ket_ho_tro.png',
    imageMobile: '/img_recruit/gan_ket_ho_tro_mobile.webp',
    title: 'Gắn kết & Hỗ trợ',
    description:
      'Sự đa dạng về góc nhìn và kinh nghiệm là sức mạnh. Chúng tôi luôn hỗ trợ lẫn nhau, làm việc như một khối thống nhất để góp phần vào sứ mệnh lớn — chăm sóc và đồng hành cùng các gia đình Việt.',
  }
];

export default function CompanyValues() {
  // Khởi tạo Embla Carousel với chế độ vòng lặp và tự động chạy (autoplay) mỗi 3 giây
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,          // Xoay vòng — hết slide cuối quay về slide đầu
      align: 'start',      // Canh lề trái khi ít hơn 3 item hiển thị
      slidesToScroll: 1,   // Mỗi lần nhấn mũi tên chạy 1 slide
    },
    [Autoplay({ delay: 4000, stopOnInteraction: true })] // Tự chạy mỗi 4 giây, dừng khi user thao tác
  );

  // State theo dõi index slide hiện tại để tô màu dot navigation bên dưới
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Hàm chạy về slide trước — gắn vào nút mũi tên trái
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  // Hàm chạy sang slide tiếp theo — gắn vào nút mũi tên phải
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Hàm nhảy đến slide cụ thể khi user bấm vào dot
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi]
  );

  // Theo dõi sự kiện chọn slide để cập nhật dot đang active
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);

    // Cleanup: gỡ event listener khi component unmount
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <section className="w-full py-16 md:py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">

        {/* === Phần tiêu đề === */}
        <div className="text-center mb-10">
          {/* Dòng tiêu đề nhỏ */}
          <p
            className="text-xl md:text-2xl font-semibold mb-1"
            style={{ color: '#008BBD' }}
          >
            Giá trị công ty
          </p>
          {/* Dòng tiêu đề lớn in đậm */}
          <h2
            className="text-3xl md:text-4xl font-bold mb-6 tracking-tight"
            style={{ color: '#008BBD' }}
          >
            Những điều chúng tôi trân trọng
          </h2>
          {/* Đoạn mô tả dưới tiêu đề */}
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Tại LifeStyle Việt Nam, con người luôn là trung tâm của mọi sự phát triển. Chúng tôi
            không chỉ xây dựng một doanh nghiệp – mà còn xây dựng một môi trường nơi mỗi cá
            nhân được tôn trọng, lắng nghe và phát triển đúng với năng lực và đam mê của mình.
          </p>
        </div>

        {/* === Slider Embla Carousel === */}
        {/* overflow-hidden: ẩn phần thừa — đặt trên wrapper ngoài để Embla tính đúng khoảng cách */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* ml-[-20px] bu bù phần padding của slide đầu tiên, giữ layout sạch */}
          <div className="flex -ml-5">
            {COMPANY_VALUES.map((value, index) => (
              <div
                key={index}
                className="flex-none min-w-0 pl-5 w-full sm:w-1/2 lg:w-1/3"
              >
                {/* Card ảnh với overlay text phía dưới */}
                <div className="relative h-[320px] md:h-[360px] rounded-2xl overflow-hidden group cursor-pointer">

                  {/* Ảnh nền card cho Desktop */}
                  <img
                    src={value.imageDesktop}
                    alt={value.title}
                    className="hidden md:block absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Ảnh nền card cho Mobile */}
                  <img
                    src={value.imageMobile}
                    alt={value.title}
                    className="block md:hidden absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Text overlay dạng glassmorphism giống phần Tầm nhìn, hiển thị bên phải cách 5px */}
                  <div className="absolute top-[5px] bottom-[5px] right-[5px] left-auto w-[calc(65%-80px)] sm:w-[60%] md:w-[calc(55%-20px)] lg:w-[calc(50%-20px)] z-20">
                    <div className="bg-white/60 backdrop-blur-md border border-white/60 rounded-xl p-3 md:p-6 h-full shadow-lg flex flex-col justify-center">
                      <h3 className="text-[#005A8C] font-extrabold text-sm md:text-base mb-1.5 md:mb-2 leading-tight">
                        {value.title}
                      </h3>
                      <p className="text-black text-[10px] md:text-xs leading-relaxed font-medium">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Navigation: nút mũi tên + chấm dots bên dưới === */}
        <div className="flex items-center justify-center gap-6 mt-8">

          {/* Nút mũi tên trái — nền xanh cố định, icon màu trắng luôn, hover đậm hơn nhẹ */}
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Xem giá trị trước"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:brightness-90 active:scale-95"
            style={{ backgroundColor: '#008BBD' }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots chỉ vị trí slide hiện tại */}
          <div className="flex items-center gap-2">
            {COMPANY_VALUES.map((_, dotIndex) => (
              <button
                key={dotIndex}
                type="button"
                onClick={() => scrollTo(dotIndex)}
                aria-label={`Chuyển đến slide ${dotIndex + 1}`}
                className="transition-all duration-300 rounded-full"
                style={{
                  // Dot đang active thì to hơn và đậm màu xanh, còn lại nhỏ và xám
                  width: selectedIndex === dotIndex ? '28px' : '8px',
                  height: '8px',
                  backgroundColor:
                    selectedIndex === dotIndex ? '#008BBD' : '#D1D5DB',
                }}
              />
            ))}
          </div>

          {/* Nút mũi tên phải — nền xanh cố định, icon màu trắng luôn, hover đậm hơn nhẹ */}
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Xem giá trị tiếp theo"
            className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all duration-200 hover:brightness-90 active:scale-95"
            style={{ backgroundColor: '#008BBD' }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
