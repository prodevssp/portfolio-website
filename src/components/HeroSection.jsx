import { basicDetails } from '@/lib/constants';
import Image from 'next/image';

export default function HeroSection() {
	return (
		<section className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-white via-[#f7f5f7] to-[#e4ddee]'>
			<div className='flex flex-col items-start space-y-4'>
				<h2 className='text-2xl text-orange-600'>
					Hello, I&apos;m
				</h2>
				<h1 className='text-6xl font-bold text-black'>
					{basicDetails.name}
				</h1>
				<p className='text-lg text-gray-500'>
					A{' '}
					<span className='text-green-600'>
						{basicDetails.role}
					</span>{' '}
					From{' '}
					<span className='text-blue-600'>
						{basicDetails.location}
					</span>
				</p>
				<p className='text-gray-500 max-w-md'>
					{basicDetails.about}
				</p>
				<button className='px-6 py-2 mt-4 text-white bg-orange-500 rounded-full shadow hover:bg-orange-600'>
					About Me
				</button>
			</div>

			{/* <div className=' right-24 flex items-center space-x-4'>
				<div className='p-2 bg-yellow-300 rounded-full'>
					Ai
				</div>
				<div className='p-2 bg-blue-600 text-white rounded-full'>
					Ps
				</div>
				<div className='p-2 bg-white border border-gray-300 rounded-full'>
					<Image
						src='/figma-icon.png'
						alt='Figma'
						width={24}
						height={24}
					/>
				</div>
			</div> */}
		</section>
	);
}
