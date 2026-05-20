import type { Metadata } from 'next';
import IrukaCareHero from '@/components/iruka-care/IrukaCareHero';
import IrukaCareAbout from '@/components/iruka-care/IrukaCareAbout';
import IrukaCareWorkflow from '@/components/iruka-care/IrukaCareWorkflow';
import IrukaCareTechnology from '@/components/iruka-care/IrukaCareTechnology';
import IrukaCareProduct from '@/components/iruka-care/IrukaCareProduct';
import IrukaCarePotential from '@/components/iruka-care/IrukaCarePotential';
import IrukaCareMission from '@/components/iruka-care/IrukaCareMission';
import IrukaCareSlogan from '@/components/iruka-care/IrukaCareSlogan';

export const metadata: Metadata = {
  title: 'Iruka Care | Hệ sinh thái Iruka',
  description: 'Chăm sóc và đồng hành cùng bé yêu.',
};

export default function IrukaCarePage() {
  return (
    <main className="w-full flex flex-col">
      <IrukaCareHero />
      <IrukaCareAbout />
      <IrukaCareWorkflow />
      <IrukaCareTechnology />
      <IrukaCareProduct />
      <IrukaCarePotential />
      <IrukaCareMission />
      <IrukaCareSlogan />
    </main>
  );
}
