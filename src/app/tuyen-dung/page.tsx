// File này: Trang Tuyển dụng (Careers Page).
// Vai trò: Hiển thị banner tuyển dụng + logo overlay ở hero section,
//          bên dưới là danh sách vị trí, phần Giá trị công ty (slider ảnh), và Lộ trình tuyển dụng.
// Dùng khi: Khách truy cập /tuyen-dung để xem cơ hội nghề nghiệp tại IruKa.

import { getJobs } from '@/lib/wp-api';
import JobSearchSection from '@/components/careers/JobSearchSection';
import CompanyValues from '@/components/careers/CompanyValues';
import RecruitmentProcess from '@/components/careers/RecruitmentProcess';
import { BriefcaseBusiness } from 'lucide-react';

export const metadata = {
  title: 'Tuyển dụng | IruKa Group',
  description: 'Gia nhập đội ngũ IruKa - Nơi ươm mầm tài năng và kiến tạo tương lai dinh dưỡng, giáo dục cho thế hệ trẻ Việt Nam.',
};

export default async function CareersPage() {
  // Lấy danh sách 20 vị trí tuyển dụng mới nhất từ API
  const jobs = await getJobs(20);

  return (
    <main className="min-h-screen bg-neutral-50">
      {/* === Hero Banner Section ===
          Banner tuyển dụng full-width + logo overlay ở giữa.
          Banner gốc 1440×746, logo gốc 390×260. */}
      <section className="relative w-full overflow-hidden">
        {/* Ảnh banner nền — giữ tỷ lệ gốc, tràn full chiều ngang */}
        <img
          src="/img_recruit/recruit_banner.svg"
          alt="Banner tuyển dụng IruKa Group — hình ảnh đội ngũ và môi trường làm việc"
          className="w-full h-auto block"
          loading="eager"
        />

        {/* Logo overlay — đặt giữa trung tâm banner, kích thước responsive */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/img_recruit/recruit_logo.svg"
            alt="Logo tuyển dụng IruKa — Cùng kiến tạo tương lai"
            className="w-[60%] sm:w-[45%] md:w-[35%] lg:w-[27%] h-auto drop-shadow-2xl"
            loading="eager"
          />
        </div>
      </section>

      {/* === Giới thiệu ngắn bên dưới banner === */}
      <section className="container mx-auto px-4 py-12 md:py-16 text-center max-w-3xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-6">
          <BriefcaseBusiness className="w-4 h-4" />
          <span>Cơ Hội Nghề Nghiệp</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 tracking-tight">
          Cùng IruKa kiến tạo tương lai
        </h1>
        <p className="text-lg text-neutral-600 leading-relaxed">
          Chúng tôi luôn tìm kiếm những người đồng hành đầy nhiệt huyết, sẵn sàng tạo ra những giá trị bền vững cho hệ sinh thái Mẹ & Bé lớn nhất Việt Nam.
        </p>
      </section>

      {/* === Khu vực tìm kiếm + danh sách vị trí tuyển dụng ===
          Client Component: cho phép gõ keyword lọc vị trí theo tên/địa điểm/kinh nghiệm */}
      <JobSearchSection jobs={jobs} />

      {/* === Section Lộ Trình Tuyển Dụng ===
          Hiển thị 5 bước quy trình tuyển dụng với icon SVG + hình nền */}
      <RecruitmentProcess />

      {/* === Section Giá Trị Công Ty ===
          Slider ảnh hiển thị 5 giá trị cốt lõi của IruKa — đặt cuối cùng, anh thay ảnh thật sau */}
      <CompanyValues />
    </main>
  );
}
