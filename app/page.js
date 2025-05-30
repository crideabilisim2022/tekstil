import AboutSection from "@/components/widgets/about-us";
import BrandCarousel from "@/components/widgets/brands";
import CardsSection from "@/components/widgets/card";
import CounterSection from "@/components/widgets/company";
import HeroSlider from "@/components/widgets/hero";
import CertificatesExportSection from "@/components/widgets/world-export";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <AboutSection />
      <CardsSection />
      <CounterSection />
      <CertificatesExportSection />
      <BrandCarousel />
    </>
  );
}
