import AboutMe from '@/components/aboutMe';
import CertificationSection from '@/components/CertificationSection';
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
		</main>
	);
}
