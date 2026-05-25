import AboutHero from "@/components/about/AboutHero";
import AboutIntroSection from "@/components/about/AboutIntroSection";
import TimelineSection from "@/components/about/TimelineSection";
import AboutAchievement from "@/components/about/AboutAchievement";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import EcosystemSection from "@/components/about/EcosystemSection";
import LeadershipSection from "@/components/about/LeadershipSection";

// File: src/app/gioi-thieu/page.tsx
// Luồng: Route /gioi-thieu
// Vai trò: Trang Giới thiệu công ty — ghép các section theo kế hoạch.
//          Hiện tại đang ở Scope 5: Thêm phần Tầm nhìn & Sứ mệnh.
// Dùng khi: Người dùng bấm vào "Giới thiệu" trên thanh menu điều hướng.

export const metadata = {
  title: "Về Chúng Tôi | Lifestyle Việt Nam",
  description:
    "Lifestyle Việt Nam — Kiến tạo hệ sinh thái Mẹ & Bé toàn diện. Tìm hiểu về sứ mệnh, tầm nhìn và hành trình phát triển của chúng tôi.",
};

export default function GioiThieuPage() {
  return (
    <main className="flex-1 w-full flex flex-col">
      {/* Scope 1: Hero Banner */}
      <AboutHero />

      {/* Scope 2: Giới thiệu công ty (logo + text chi tiết) */}
      <AboutIntroSection />

      {/* Scope 2b: Timeline */}
      <TimelineSection />
      
      {/* Scope 3: Achievement */}
      {/* <AboutAchievement /> */}

      {/* Scope 4: Core Values */}
      <CoreValuesSection />

      {/* Scope 5: Vision & Mission & Philosophy */}
      <VisionMissionSection />

      {/* Scope 6: Ecosystem */}
      {/* <EcosystemSection /> */}

      {/* Scope 7: Leadership */}
      <LeadershipSection />

      {/* Scope 8: CTA sẽ thêm vào đây */}
    </main>
  );
}
