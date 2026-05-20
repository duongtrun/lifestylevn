import type { Metadata } from 'next';
import BabegoHero from '@/components/babego/BabegoHero';
import BabegoOrigin from '@/components/babego/BabegoOrigin';
import BabegoAchievement from '@/components/babego/BabegoAchievement';
import BabegoProduct from '@/components/babego/BabegoProduct';
import BabegoAdvantage from '@/components/babego/BabegoAdvantage';
import BabegoMission from '@/components/babego/BabegoMission';
import BabegoSlogan from '@/components/babego/BabegoSlogan';

export const metadata: Metadata = {
  title: 'Babego | Hệ sinh thái Iruka',
  description: 'Dinh dưỡng chuyên sâu cho trẻ em Việt.',
};

export default function BabegoPage() {
  return (
    <main className="w-full flex flex-col bg-[#F5FBF5]">
      <BabegoHero />
      <BabegoOrigin />
      <BabegoAchievement />
      <BabegoProduct />
      <BabegoAdvantage />
      <BabegoMission />
      <BabegoSlogan />
    </main>
  );
}
