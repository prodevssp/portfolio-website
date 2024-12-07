import AboutMe from '@/components/aboutMe';
import CertificationSection from '@/components/CertificationSection';
import HeroSection from '@/components/heroSection';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<AboutMe />
			<CertificationSection />
		</main>
	);
}
