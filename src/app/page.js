import AboutMe from '@/components/aboutMe';
import HeroSection from '@/components/heroSection';
import Image from 'next/image';

export default function Home() {
	return (
		<main>
			<HeroSection />
			<AboutMe />
		</main>
	);
}
