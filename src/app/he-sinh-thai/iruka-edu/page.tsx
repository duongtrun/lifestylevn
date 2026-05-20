import IrukaEduHero from "@/components/iruka-edu/IrukaEduHero";
import IrukaEduAbout from "@/components/iruka-edu/IrukaEduAbout";
import IrukaEduWorkflow from "@/components/iruka-edu/IrukaEduWorkflow";
import IrukaEduTech from "@/components/iruka-edu/IrukaEduTech";
import IrukaEduCoreContent from "@/components/iruka-edu/IrukaEduCoreContent";
import IrukaEduPotential from "@/components/iruka-edu/IrukaEduPotential";
import IrukaEduMission from "@/components/iruka-edu/IrukaEduMission";
import IrukaEduSlogan from "@/components/iruka-edu/IrukaEduSlogan";

// File: src/app/he-sinh-thai/iruka-edu/page.tsx
// Luồng: Route /he-sinh-thai/iruka-edu
// Vai trò: Trang giới thiệu sản phẩm Iruka EDU trong hệ sinh thái Lifestyle.
//          Kế thừa Header + Footer từ layout gốc, chỉ cần ghép các section nội dung.
// Dùng khi: Người dùng nhấn vào card Iruka EDU ở trang Giới thiệu hoặc menu.

export const metadata = {
  title: "Iruka EDU | Nền tảng giáo dục sớm ứng dụng AI",
  description:
    "Iruka EDU — Nền tảng giáo dục sớm ứng dụng AI cho trẻ 3–11 tuổi. Cá nhân hóa lộ trình học, game hóa và nhiều tính năng chuyên gia.",
};

export default function IrukaEduPage() {
  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Hero Banner + Câu chuyện thương hiệu */}
      <IrukaEduHero />

      {/* ===== KHỐI NỀN TRẮNG CHUNG — chứa tất cả section bên dưới ===== */}
      <div className="bg-white w-full">
        {/* iruKa Edu là gì? + Vì sao xây dựng? */}
        <IrukaEduAbout />

        {/* iruKa Edu hoạt động như thế nào? — 4 bước workflow */}
        <IrukaEduWorkflow />
      </div>

      {/* Nền tảng công nghệ và điểm khác biệt */}
      <IrukaEduTech />

      {/* Nội dung giáo dục cốt lõi */}
      <IrukaEduCoreContent />

      {/* Tiềm năng phát triển */}
      <IrukaEduPotential />

      {/* Tầm nhìn, Sứ mệnh & Cam kết */}
      <IrukaEduMission />

      {/* Slogan chốt trang */}
      <IrukaEduSlogan />
    </main>
  );
}
