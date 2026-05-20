import { Metadata } from 'next';
import InvestHero from '@/components/invest/InvestHero';
import InvestOpportunity from '@/components/invest/InvestOpportunity';
import InvestAdvantage from '@/components/invest/InvestAdvantage';
import InvestDetails from '@/components/invest/InvestDetails';
import InvestQuote from '@/components/invest/InvestQuote';

// File: src/app/dau-tu/page.tsx
// Luồng: Trang Đối tác & Nhà đầu tư (/dau-tu)
// Vai trò: Trang chính tập hợp các section giới thiệu về đầu tư, đối tác.

export const metadata: Metadata = {
  title: 'Đối tác & Nhà đầu tư | IruKa Lifestyle',
  description: 'Cơ hội đồng hành cùng IruKa Lifestyle - Hệ sinh thái Mẹ & Bé hàng đầu Việt Nam.',
};

export default function InvestPage() {
  return (
    <main className="w-full flex flex-col min-h-screen bg-white">
      <InvestHero />
      <InvestOpportunity />
      <InvestAdvantage />
      <InvestDetails />
      <InvestQuote />
    </main>
  );
}
