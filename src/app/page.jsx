import AboutMe from "@/components/AboutMe";
import AchievementsSection from "@/components/AchievementsSection";
import BlogSection from "@/components/BlogSection";
import CertificationSection from "@/components/CertificationSection";
import ContactSection from "@/components/ContactSection";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import NewsletterSection from "@/components/Newsletter";
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
        <AchievementsSection />
        <TestimonialSection />
        <BlogSection />
        <NewsletterSection />
        <ContactSection />
      </main>
    </>
  );
}
