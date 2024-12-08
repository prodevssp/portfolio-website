import AboutMe from '@/components/aboutMe';
import BlogSection from '@/components/BlogSection';
import CertificationSection from '@/components/CertificationSection';
import ContactSection from '@/components/ContactSection';
import HeroSection from '@/components/heroSection';
import PortfolioSection from '@/components/PortfolioSection';
import ServicesSection from '@/components/ServicesSection';
import TestimonialSection from '@/components/TestimonialSection';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<AboutMe />
			<CertificationSection />
			<PortfolioSection />
			<ServicesSection />
			<TestimonialSection />
			<BlogSection />
			<ContactSection	/>
		</main>
	);
}
