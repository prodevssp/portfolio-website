'use client';
import React, { useState, useEffect } from 'react';
import { FaCircleChevronLeft, FaCircleChevronRight } from 'react-icons/fa6';
import config from '@/lib/config';

const CertificationSection = () => {
	const [currentSlide, setCurrentSlide] = useState(0);
	const [slidesPerView, setSlidesPerView] = useState(1);

	// Update slidesPerView based on window width
	useEffect(() => {
		const updateSlides = () => {
			const width = window.innerWidth;
			console.log('width', width);
			if (width >= 1280) setSlidesPerView(4);
			else if (width >= 1024) setSlidesPerView(3);
			else if (width >= 768) setSlidesPerView(2);
			else setSlidesPerView(1);
		};

		updateSlides();
		window.addEventListener('resize', updateSlides);
		return () => window.removeEventListener('resize', updateSlides);
	}, []);

	const handleNext = () => {
		setCurrentSlide(prev =>
			Math.min(
				prev + slidesPerView,
				config.certificates.length - slidesPerView
			)
		);
	};

	const handlePrev = () => {
		setCurrentSlide(prev => Math.max(prev - slidesPerView, 0));
	};

	return (
		<section className='py-16 pb-32 bg-gray-900 text-white'>
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
					{/* Previous Button */}
					<button
						onClick={handlePrev}
						className='absolute left-4 z-10 bg-gray-700/50 rounded-full p-2'
						disabled={currentSlide === 0}
						aria-label='Previous Slide'
					>
						<FaCircleChevronLeft className='text-white' />
					</button>

					{/* Carousel */}
					<div className='w-full overflow-hidden'>
						<div
							className='flex gap-4 transition-transform duration-300 ease-in-out'
							style={{
								transform: `translateX(-${
									(currentSlide *
										95) /
									slidesPerView
								}%)`,
								width: `${
									(config
										.certificates
										.length -
										1 *
											80) /
									slidesPerView
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
										className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0'
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

					{/* Next Button */}
					<button
						onClick={handleNext}
						className='absolute right-4 z-10 bg-gray-700/50 rounded-full p-2'
						disabled={
							currentSlide >=
							config.certificates
								.length -
								slidesPerView
						}
						aria-label='Next Slide'
					>
						<FaCircleChevronRight className='text-white' />
					</button>
				</div>
			</div>
		</section>
	);
};

export default CertificationSection;
