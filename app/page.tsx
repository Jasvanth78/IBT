import { LandingPage, PartnersClientsSection, ServicesSection, TestimonialsSection, HomeVideoSection } from '@/src/features/home/components';

export default function Home() {
  return (
    <>
      <HomeVideoSection />
      <LandingPage />
      <ServicesSection />
      <PartnersClientsSection />
      <TestimonialsSection />
    </>
  );
}
