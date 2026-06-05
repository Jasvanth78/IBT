import {
  LandingPage, 
  SolutionsSection, 
  WhyChooseUsSection, 
  RecentWorkSection,
  HowWeWorkSection,
  StatsDarkSection,
  PartnersClientsSection, 
  TestimonialsSection, 
  CTASection
} from '@/src/features/home/components';

export default function Home() {
  return (
    <>
      <LandingPage />
      <SolutionsSection />
      <WhyChooseUsSection />
      <RecentWorkSection />
      <HowWeWorkSection />
      <StatsDarkSection />
      <PartnersClientsSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
