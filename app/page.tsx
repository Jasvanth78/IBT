import {
  LandingPage, 
  ServicesSection,
  RecentWorkSection,
  StatsDarkSection,
  PartnersClientsSection, 
  PartnerCollegesSection,
  TestimonialsSection, 
  CTASection
} from '@/src/features/home/components';

export default function Home() {
  return (
    <>
      <LandingPage />
      <ServicesSection />
      <RecentWorkSection />
      <StatsDarkSection />
      <PartnersClientsSection />
      <PartnerCollegesSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
