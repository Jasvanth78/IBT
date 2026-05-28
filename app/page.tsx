import { LandingPage, PartnersClientsSection, ServicesSection, TestimonialsSection, StrategySection, WhyChooseUsSection, SolutionsSection } from '@/src/features/home/components';

export default function Home() {
  return (
    <>
      <LandingPage />
      <ServicesSection />
      <SolutionsSection />
      <StrategySection />
      <WhyChooseUsSection />
      <PartnersClientsSection />
      <TestimonialsSection />
    </>
  );
}
