import AboutMe from "@/components/AboutMe";
import BlogSection from "@/components/BlogSection";
import CertificationSection from "@/components/CertificationSection";
import ContactSection from "@/components/ContactSection";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import PortfolioSection from "@/components/PortfolioSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialSection from "@/components/TestimonialSection";

export default function Home() {
  return (
    <>
      {/*<CustomCursor />*/}
      <main>
        <HeroSection />
        <AboutMe />
        <CertificationSection />
        <PortfolioSection />
        <ServicesSection />
        <TestimonialSection />
        <BlogSection />
        <ContactSection />
      </main>
    </>
  );
}
