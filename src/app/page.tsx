import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import EcosystemSection from "@/components/home/EcosystemSection";
import DifferenceSection from "@/components/home/DifferenceSection";
import AchievementSection from "@/components/home/AchievementSection";
import NewsSection from "@/components/home/NewsSection";
import PartnerSection from "@/components/home/PartnerSection";
import { getPosts, getPostsByCategorySlug } from "@/lib/wp-api";

export default async function Home() {
  // Lấy 5 bài viết mới nhất thuộc danh mục "Tin tức" (ID: 10) cho phần tin tức nổi bật ở trang chủ
  const posts = await getPosts(5, 10);

  // Lấy 7 bài viết thuộc danh mục "Thành tựu" (slug: "thanh-tuu") cho phần thành tựu đạt được ở trang chủ
  const achievements = await getPostsByCategorySlug('thanh-tuu', 7);

  return (
    <main className="flex-1 w-full flex flex-col overflow-hidden">
      <Hero />
      <AboutSection />
      <EcosystemSection />
      <DifferenceSection />
      <AchievementSection achievements={achievements} />
      <NewsSection posts={posts} />
      <PartnerSection />
    </main>
  );
}
