import React from 'react';

const services = [
	{
		title: 'Creative Design',
		price: '$99',
		description:
			'Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development',
		icon: '/assets/avatar.png', // Replace with your actual icon path
	},
	{
		title: 'Graphic Design',
		price: '$199',
		description:
			'Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development',
		icon: '/assets/avatar.png', // Replace with your actual icon path
	},
	{
		title: 'UI/UX Design',
		price: '$299',
		description:
			'Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development',
		icon: '/assets/avatar.png', // Replace with your actual icon path
	},
	{
		title: 'Web Design',
		price: '$399',
		description:
			'Web design refers to the design of websites that are displayed on the internet. It usually refers to the user experience aspects of website development',
		icon: '/assets/avatar.png', // Replace with your actual icon path
	},
];

const ServicesSection = () => {
	return (
		<section className='py-16 bg-slate-50 dark:bg-slate-900 dark:text-slate-50'>
			<div className='max-w-6xl mx-auto text-center px-4'>
				<h2 className='text-orange-500 text-lg font-semibold'>
					Services
				</h2>
				<h3 className='text-4xl font-bold mt-2'>
					What I Do for Clients
				</h3>
				<p className='text-gray-500 text-lg mt-4'>
					Most common methods for designing
					websites that work well on desktop is
					responsive and adaptive design.
				</p>
			</div>
			<div className='mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-6 lg:px-12'>
				{services.map((service, index) => (
					<div
						key={index}
						className='bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300'
					>
						<div className='flex items-center space-x-4'>
							<div className='w-20 h-20 rounded-full flex items-center justify-center'>
								<img
									src={
										service.icon
									}
									alt={
										service.title
									}
									className='h-full w-full object-contain rounded-full'
								/>
							</div>
							<div>
								<h4 className='text-xl font-bold text-slate-900'>
									{
										service.title
									}
								</h4>
								<p className='text-orange-500 font-medium'>
									Starts
									from{' '}
									{
										service.price
									}
								</p>
							</div>
						</div>
						<p className='text-gray-500 mt-4 text-sm'>
							{service.description}
						</p>
					</div>
				))}
			</div>
		</section>
	);
};

export default ServicesSection;
