'use client';
import React, { useState } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import config from '@/lib/config';

const CertificationSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);

	// Responsive slide calculation
	const getSlidesPerView = () => {
		if (typeof window !== 'undefined') {
			const width = window.innerWidth;
			if (width >= 1024) return 4;
			if (width >= 640) return 2;
			return 1;
		}
		return 1;
	};

	const handleNext = () => {
		const slidesPerView = getSlidesPerView();
		setCurrentSlide(prev =>
			Math.min(
				prev + slidesPerView,
				config.certificates.length - slidesPerView
			)
		);
	};

	const handlePrev = () => {
		const slidesPerView = getSlidesPerView();
		setCurrentSlide(prev => Math.max(prev - slidesPerView, 0));
	};

	return (
		<section className='py-16 bg-gray-900 text-white'>
			<div className='max-w-7xl mx-auto px-6 text-center'>
				<h2 className='text-4xl font-bold text-orange-500'>
					Certification
				</h2>
				<p className='text-2xl text-gray-400 mt-2'>
					My Amazing Works
				</p>
			</div>

			<div className='mt-12 relative'>
				<div className='flex items-center justify-center'>
					<button
						onClick={handlePrev}
						className='absolute left-4 z-10 bg-gray-700/50 rounded-full p-2'
						disabled={currentSlide === 0}
					>
						<FaCircleChevronLeft className='text-white' />
					</button>

					<div className='w-full overflow-hidden'>
						<div
							className='flex transition-transform duration-300 ease-in-out'
							style={{
								transform: `translateX(-${
									currentSlide *
									(100 /
										getSlidesPerView())
								}%)`,
								width: `${
									config
										.certificates
										.length *
									100
								}%`,
							}}
						>
							{config.certificates.map(
								(
									certificate,
									index
								) => (
									<div
										key={
											index
										}
										className='w-full sm:w-1/2 lg:w-1/4 px-4 flex-shrink-0'
									>
										<div className='bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition transform duration-300'>
											<img
												src={
													certificate.image
												}
												alt={
													certificate.title
												}
												className='h-56 object-cover w-full'
											/>
											<div className='p-4'>
												<h3 className='text-xl font-bold text-white'>
													{
														certificate.title
													}
												</h3>
												<p className='text-gray-400 text-sm mt-2'>
													{
														certificate.description
													}
												</p>
												<a
													href={
														certificate.link
													}
													target='_blank'
													rel='noopener noreferrer'
													className='inline-block mt-4 px-4 py-2 text-sm font-semibold text-orange-500 border border-orange-500 rounded hover:bg-orange-500 hover:text-white transition'
												>
													View
													Certificate
												</a>
											</div>
										</div>
									</div>
								)
							)}
						</div>
					</div>

					<button
						onClick={handleNext}
						className='absolute right-4 z-10 bg-gray-700/50 rounded-full p-2'
						disabled={
							currentSlide >=
							config.certificates
								.length -
								getSlidesPerView()
						}
					>
						<FaCircleChevronRight className='text-white' />
					</button>
				</div>
			</div>
		</section>
	);
};

export default CertificationSection;
