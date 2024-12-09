'use client';
import React, { useState } from 'react';
import Image from 'next/image';

const PortfolioSection = () => {
	const [activeFilter, setActiveFilter] = useState('All');
	const [selectedProject, setSelectedProject] = useState(null);

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
			image: '/assets/project.png',
			video: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Example YouTube video
			link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
		},
		{
			id: 2,
			category: 'Vimeo',
			image: '/assets/project.png',
			video: 'https://player.vimeo.com/video/76979871', // Example Vimeo video
			link: 'https://vimeo.com/76979871',
		},
		{
			id: 3,
			category: 'Soundcloud',
			image: '/assets/project.png',
			link: 'https://soundcloud.com/',
		},
		{
			id: 4,
			category: 'Popup',
			image: '/assets/project.png',
		},
		{
			id: 6,
			category: 'Youtube',
			image: '/assets/project.png',
			video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
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

	const openModal = project => {
		setSelectedProject(project);
	};

	const closeModal = () => {
		setSelectedProject(null);
	};

	return (
		<section className='py-16 bg-white text-gray-900 dark:bg-slate-900 dark:text-slate-50'>
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
						className='relative group overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer'
						onClick={() =>
							openModal(project)
						}
					>
						<Image
							src={project.image}
							alt={`Project ${project.id}`}
							layout='responsive'
							width={500}
							height={500}
							className='object-cover'
						/>
						<div className='absolute inset-0 bg-slate-900 bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
							<span className='text-slate-50 text-lg font-medium'>
								View Details
							</span>
						</div>
					</div>
				))}
			</div>

			{/* Modal */}
			{selectedProject && (
				<div className='fixed inset-0 bg-slate-900 bg-opacity-70 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full relative'>
						<button
							onClick={closeModal}
							className='absolute top-4 right-4 text-gray-500 hover:text-gray-700'
						>
							✕
						</button>
						{selectedProject.video && (
							<div className='mb-6'>
								<iframe
									width='100%'
									height='315'
									src={
										selectedProject.video
									}
									title='Video Player'
									frameBorder='0'
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
									className='rounded-lg'
								></iframe>
							</div>
						)}
						{selectedProject.link && (
							<p className='text-center'>
								<a
									href={
										selectedProject.link
									}
									target='_blank'
									rel='noopener noreferrer'
									className='text-orange-500 underline'
								>
									Visit
									Link
								</a>
							</p>
						)}
					</div>
				</div>
			)}
		</section>
	);
};

export default PortfolioSection;
