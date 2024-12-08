'use client';
import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
	const secondaryCursor = useRef(null);
	const mainCursor = useRef(null);

	useEffect(() => {
		const handleMouseMove = event => {
			const { clientX, clientY } = event;

			// Update both cursors directly
			const mouseX = clientX;
			const mouseY = clientY;

			// Secondary cursor
			secondaryCursor.current.style.transform = `translate3d(${
				mouseX - secondaryCursor.current.clientWidth / 2
			}px, ${
				mouseY -
				secondaryCursor.current.clientHeight / 2
			}px, 0)`;

			// Main cursor
			mainCursor.current.style.transform = `translate3d(${
				mouseX - mainCursor.current.clientWidth / 2
			}px, ${
				mouseY - mainCursor.current.clientHeight / 2
			}px, 0)`;
		};

		document.addEventListener('mousemove', handleMouseMove);
		return () => {
			document.removeEventListener(
				'mousemove',
				handleMouseMove
			);
		};
	}, []);

	useEffect(() => {
		const hoverElements = document.querySelectorAll(
			'a, button, .hover-target'
		);

		const handleMouseEnter = () => {
			secondaryCursor.current.classList.add(
				'scale-125',
				'bg-orange-500'
			);
		};
		const handleMouseLeave = () => {
			secondaryCursor.current.classList.remove(
				'scale-125',
				'bg-orange-500'
			);
		};

		hoverElements.forEach(el => {
			el.addEventListener('mouseenter', handleMouseEnter);
			el.addEventListener('mouseleave', handleMouseLeave);
		});

		return () => {
			hoverElements.forEach(el => {
				el.removeEventListener(
					'mouseenter',
					handleMouseEnter
				);
				el.removeEventListener(
					'mouseleave',
					handleMouseLeave
				);
			});
		};
	}, []);

	return (
		<div>
			{/* Secondary Circle */}
			<div
				ref={secondaryCursor}
				className='fixed z-50 w-6 h-6 rounded-full bg-orange-300 opacity-75 pointer-events-none transition-transform duration-75'
				style={{ transform: 'translate3d(0, 0, 0)' }}
			></div>

			{/* Main Dot */}
			<div
				ref={mainCursor}
				className='fixed z-50 w-2 h-2 rounded-full bg-orange-500 pointer-events-none'
				style={{ transform: 'translate3d(0, 0, 0)' }}
			></div>
		</div>
	);
};

export default CustomCursor;
