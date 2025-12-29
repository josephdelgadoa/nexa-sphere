import Hero from "@/components/home/Hero";
import TrustedBy from "@/components/home/TrustedBy";
import ServicesOverview from "@/components/home/ServicesOverview";
import Process from "@/components/home/Process";
import AISection from "@/components/home/AISection";
import Testimonials from "@/components/home/Testimonials";
import CTA from "@/components/home/CTA";
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Home');
  return (
    <div className="flex flex-col min-h-screen">
      <Hero
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        cta={t('cta')}
      />
      <TrustedBy />
      <ServicesOverview />
      <Process />
      <AISection />
      <Testimonials />
      <CTA />
    </div>
  );
}
