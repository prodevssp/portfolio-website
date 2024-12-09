import config from '@/lib/config';
import Image from 'next/image';
import Button from './ui/Button';
import MouseScrollAnimation from './ui/MouseScrollAnimation';
import { FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { IoMdMail } from 'react-icons/io';

export default function HeroSection() {
	return (
		<section
			className='h-screen flex items-center justify-center bg-no-repeat bg-cover bg-center '
			style={{
				backgroundImage:
					"url('/assets/backgrounds/hero-bg.jpg')",
			}}
		>
			<div className='max-w-6xl flex items-center justify-between w-full'>
				<div className='flex flex-col items-start space-y-4'>
					<h2 className='lg:text-2xl xl:text-3xl text-primary-500 font-semibold'>
						Hello, I&apos;m
					</h2>
					<h1 className='lg:text-6xl xl:text-7xl font-medium text-black'>
						{config.basicDetails.name}
					</h1>
					<p className='lg:text-xl xl:text-2xl text-gray-500'>
						A{' '}
						<span className='text-green-600'>
							{
								config
									.basicDetails
									.role
							}
						</span>{' '}
						From{' '}
						<span className='text-blue-600'>
							{
								config
									.basicDetails
									.location
							}
						</span>
					</p>
					<p className='text-gray-500 max-w-md lg:text-lg xl:text-xl'>
						{config.basicDetails.about}
					</p>
					<div className='flex gap-4 items-center mt-6'>
						<Button>About me</Button>
						<div className='flex gap-3 items-center'>
							<div>
								<a
									href={
										config
											.socials
											.linkedin
									}
									target='_blank'
								>
									<FaLinkedinIn
										size={
											25
										}
									/>
								</a>
							</div>
							<div>
								<a
									href={
										config
											.socials
											.github
									}
									target='_blank'
								>
									<FaGithub
										size={
											25
										}
									/>
								</a>
							</div>
							<div>
								<a
									href={
										config
											.socials
											.mail
									}
									target='_blank'
								>
									<IoMdMail
										size={
											25
										}
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
				<div>
					<Image
						src={'/assets/avatar.svg'}
						alt='avatar'
						width={400}
						height={400}
					/>
				</div>
			</div>
			<MouseScrollAnimation />
		</section>
	);
}
