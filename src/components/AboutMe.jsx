import config from '@/lib/config';
import React from 'react';

const AboutMe = () => {
	return (
		<section className='h-screen bg-gray-900 text-white flex items-center justify-center px-8'>
			<div className='flex flex-wrap lg:flex-nowrap items-center gap-12 w-full max-w-6xl'>
				{/* Left Content with Image and Stats */}
				<div className='relative w-full lg:w-1/2 flex items-center justify-center'>
					{/* Background Image */}
					{/* <div
						className='w-96 h-96 bg-center bg-cover rounded-full'
						style={{
							backgroundImage:
								"url('/assets/brushes/1.png')",
							clipPath: 'polygon(20% 0%, 80% 0%, 100% 50%, 80% 100%, 20% 100%, 0% 50%)',
						}}
					></div> */}

					{/* Stats */}
					<div className='absolute top-10 left-10 bg-gray-800 px-4 py-2 rounded-lg text-center'>
						<p className='text-3xl font-bold text-green-400'>
							18
						</p>
						<p className='text-sm'>
							Years of Success
						</p>
					</div>
					<div className='absolute bottom-10 right-10 bg-gray-800 px-4 py-2 rounded-lg text-center'>
						<p className='text-3xl font-bold text-purple-400'>
							9K
						</p>
						<p className='text-sm'>
							Total Projects
						</p>
					</div>
				</div>

				{/* Right Content with Text */}
				<div className='w-full lg:w-1/2 flex flex-col space-y-6'>
					<h2 className='text-orange-500 text-lg font-semibold'>
						{config.about.heading}
					</h2>
					<h1 className='text-4xl lg:text-6xl font-bold'>
						{config.about.subHeading}
					</h1>
					<p className='text-gray-400'>
						{config.about.paragraph}
					</p>
					<button className='px-6 py-3 bg-orange-500 text-white rounded-lg text-lg font-semibold hover:bg-orange-600 transition'>
						{config.about.cta}
					</button>
				</div>
			</div>
		</section>
	);
};

export default AboutMe;
