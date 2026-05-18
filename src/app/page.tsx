import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import DifferenceSection from "@/components/home/DifferenceSection";
import AchievementSection from "@/components/home/AchievementSection";
import NewsSection from "@/components/home/NewsSection";
import PartnerSection from "@/components/home/PartnerSection";

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col">
      <Hero />
      <AboutSection />
      <EcosystemSection />
      <DifferenceSection />
      <AchievementSection />
      <NewsSection />
      <PartnerSection />
    </main>
  );
}
