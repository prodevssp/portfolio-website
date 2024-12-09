import React from 'react';

const blogs = [
	{
		id: 1,
		category: 'Web Development',
		title: "Jim Morisson Says when the music's over turn off the light",
		date: '23 Dec',
		image: '/assets/project.png', // Replace with your actual image path
	},
	{
		id: 2,
		category: 'Branding',
		title: 'How to be appreciated for your hard work as a developer',
		date: '23 Dec',
		image: '/assets/project.png', // Replace with your actual image path
	},
	{
		id: 3,
		category: 'Social Media',
		title: 'How designers and developers can collaborate better',
		date: '23 Dec',
		image: '/assets/project.png', // Replace with your actual image path
	},
];

const BlogSection = () => {
	return (
		<section className='py-16 bg-slate-50 dark:bg-slate-900'>
			<div className='max-w-6xl mx-auto text-center px-4'>
				<h2 className='text-orange-500 text-lg font-semibold'>
					From My Blog
				</h2>
				<h3 className='text-4xl font-bold mt-2 dark:text-slate-50 text-slate-800'>
					Our Recent Updates, Blog, Tips, Tricks &
					More
				</h3>
			</div>

			<div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 lg:px-12'>
				{blogs.map(blog => (
					<div
						key={blog.id}
						className='relative dark:bg-gray-800 hover:scale-105 bg-slate-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300'
					>
						<img
							src={blog.image}
							alt={blog.title}
							className='w-full h-56 object-cover'
						/>
						<div className='absolute top-4 left-4 bg-green-500 text-slate-50 text-center text-sm px-3 py-1 rounded-md shadow-md'>
							<p>
								{
									blog.date.split(
										' '
									)[0]
								}
							</p>
							<p>
								{
									blog.date.split(
										' '
									)[1]
								}
							</p>
						</div>
						<div className='p-6'>
							<p className='text-orange-500 font-semibold'>
								{blog.category}
							</p>
							<h4 className='text-xl font-bold dark:text-slate-50 text-gray-900 mt-2'>
								{blog.title}
							</h4>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default BlogSection;
