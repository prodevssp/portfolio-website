import React from 'react';

const ContactSection = () => {
	return (
		<section className='py-16 bg-white'>
			<div className='max-w-7xl mx-auto px-6 lg:px-12'>
				{/* Section Title */}
				<div className='text-center'>
					<h2 className='text-orange-500 text-lg font-semibold'>
						Contact Me
					</h2>
					<h3 className='text-4xl font-bold mt-2'>
						I Want To Hear From You
					</h3>
					<p className='text-gray-500 text-lg mt-4'>
						Please fill out the form on this
						section to contact with me. Or
						call between 9:00 a.m. and 8:00
						p.m. ET, Monday through Friday.
					</p>
				</div>

				{/* Content */}
				<div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-12'>
					{/* Contact Info */}
					<div className='space-y-8'>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full'>
								<span className='text-orange-500 text-xl'>
									📍
								</span>
							</div>
							<div>
								<p className='text-xl font-bold'>
									Address
								</p>
								<p className='text-gray-500'>
									20,
									Somewhere
									in world
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 flex items-center justify-center bg-green-100 rounded-full'>
								<span className='text-green-500 text-xl'>
									✉️
								</span>
							</div>
							<div>
								<p className='text-xl font-bold'>
									Email
								</p>
								<p className='text-gray-500'>
									hello@dizme.com
								</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<div className='w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full'>
								<span className='text-purple-500 text-xl'>
									📞
								</span>
							</div>
							<div>
								<p className='text-xl font-bold'>
									Phone
								</p>
								<p className='text-gray-500'>
									+123 456
									7890
								</p>
							</div>
						</div>
					</div>

					{/* Contact Form */}
					<div className='bg-gray-50 rounded-lg p-8 shadow-md'>
						<form>
							<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
								<input
									type='text'
									placeholder='Your Name'
									className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-orange-500'
								/>
								<input
									type='email'
									placeholder='Your Email'
									className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-orange-500'
								/>
								<input
									type='text'
									placeholder='Your Phone'
									className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-orange-500'
								/>
								<input
									type='text'
									placeholder='Subject'
									className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full focus:outline-none focus:ring-2 focus:ring-orange-500'
								/>
							</div>
							<textarea
								rows='4'
								placeholder='Write your message here'
								className='border border-gray-300 rounded-lg px-4 py-3 text-gray-700 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-orange-500'
							></textarea>
							<button
								type='submit'
								className='mt-6 w-full py-3 text-white bg-orange-500 rounded-lg font-semibold hover:bg-orange-600 transition duration-300'
							>
								Submit Now
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ContactSection;
