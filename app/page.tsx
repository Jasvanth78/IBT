import {
  LandingPage, PartnersClientsSection, ServicesSection, TestimonialsSection, RecentWorkSection,
  WhyChooseUsSection, SolutionsSection, CTASection, HowWeWorkSection
} from '@/src/features/home/components';

export default function Home() {
  return (
    <>
      <LandingPage />
      <RecentWorkSection />
      <HowWeWorkSection />
      <SolutionsSection />
      <WhyChooseUsSection />
      <PartnersClientsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
