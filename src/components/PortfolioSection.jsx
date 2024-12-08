'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const PortfolioSection = () => {
	const [activeFilter, setActiveFilter] = useState('All');

	const categories = [
		'All',
		'Youtube',
		'Vimeo',
		'Soundcloud',
		'Popup',
		'Detail',
	];
	const projects = [
		{
			id: 1,
			category: 'Youtube',
			image: '/assets/portfolio/image1.jpg',
		},
		{
			id: 2,
			category: 'Vimeo',
			image: '/assets/portfolio/image2.jpg',
		},
		{
			id: 3,
			category: 'Soundcloud',
			image: '/assets/portfolio/image3.jpg',
		},
		{
			id: 4,
			category: 'Popup',
			image: '/assets/portfolio/image4.jpg',
		},
		{
			id: 5,
			category: 'Detail',
			image: '/assets/portfolio/image5.jpg',
		},
		{
			id: 6,
			category: 'Youtube',
			image: '/assets/portfolio/image6.jpg',
		},
	];

	const filteredProjects =
		activeFilter === 'All'
			? projects
			: projects.filter(
					project =>
						project.category ===
						activeFilter
			  );

	return (
		<section className='py-16 bg-white text-gray-900'>
			<div className='max-w-6xl mx-auto text-center px-4'>
				<h2 className='text-orange-500 text-lg font-semibold'>
					Portfolio
				</h2>
				<h3 className='text-4xl font-bold mt-2'>
					My Amazing Works
				</h3>
				<p className='text-gray-500 text-lg mt-4'>
					Most common methods for designing
					websites that work well on desktop is
					responsive and adaptive design.
				</p>
			</div>

			{/* Filters */}
			<div className='flex justify-center space-x-4 mt-8'>
				{categories.map((category, index) => (
					<button
						key={index}
						onClick={() =>
							setActiveFilter(
								category
							)
						}
						className={`text-lg font-medium ${
							activeFilter ===
							category
								? 'text-orange-500 underline'
								: 'text-gray-500 hover:text-orange-500'
						}`}
					>
						{category}
					</button>
				))}
			</div>

			{/* Portfolio Grid */}
			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12 px-6 lg:px-12'>
				{filteredProjects.map(project => (
					<div
						key={project.id}
						className='relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300'
					>
						<Image
							src={project.image}
							alt={`Project ${project.id}`}
							layout='responsive'
							width={500}
							height={500}
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<span className='text-white text-lg font-medium'>
								View Details
							</span>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default PortfolioSection;
