import config from "@/lib/config";
import React from "react";
import Button from "./ui/Button";
import Image from "next/image";

const AboutMe = () => {
  return (
		<section className='min-h-screen text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-[#2C2D33] flex items-center justify-center px-4 py-12 md:px-10'>
			<div className='flex flex-col lg:flex-row items-center gap-12 w-full max-w-6xl'>
				{/* Left Content with Image and Stats */}
				<div className='relative w-full lg:w-1/2 flex items-center justify-center'>
					{/* Background Image */}
					<Image
						src={'/assets/avatar.svg'}
						alt='avatar'
						width={400}
						height={400}
						className='w-40 sm:w-48 md:w-64 lg:w-full max-w-sm'
					/>

					{/* Stats */}
					<div className='absolute top-4 left-4 bg-gray-800 bg-opacity-75 px-3 py-2 rounded-lg text-center'>
						<p className='text-2xl font-bold text-green-400'>
							18
						</p>
						<p className='text-xs sm:text-sm'>
							Years of Success
						</p>
					</div>
					<div className='absolute bottom-4 right-4 bg-gray-800 bg-opacity-75 px-3 py-2 rounded-lg text-center'>
						<p className='text-2xl font-bold text-purple-400'>
							9K
						</p>
						<p className='text-xs sm:text-sm'>
							Total Projects
						</p>
					</div>
				</div>

				{/* Right Content with Text */}
				<div className='w-full lg:w-1/2 flex flex-col space-y-6 text-center lg:text-left'>
					<h2 className='text-orange-500 text-lg sm:text-xl font-semibold'>
						{config.about.heading}
					</h2>
					<h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-50'>
						{config.about.subHeading}
					</h1>
					<p className='text-base sm:text-lg md:text-xl text-slate-800 dark:text-gray-400'>
						{config.about.paragraph}
					</p>

					<Button className='self-center lg:self-start'>
						{config.about.cta}
					</Button>
				</div>
			</div>
		</section>
  );
};

export default AboutMe;
