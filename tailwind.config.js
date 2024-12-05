/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				"primary-50": "var(--primary-50)",
				"primary-100": "var(--primary-100)",
				"primary-200": "var(--primary-200)",
				"primary-300": "var(--primary-300)",
				"primary-400": "var(--primary-400)",
				"primary-500": "var(--primary-500)",
				"primary-600": "var(--primary-600)",
				"primary-700": "var(--primary-700)",
				"primary-800": "var(--primary-800)",
				"primary-900": "var(--primary-900)",
				"primary-950": "var(--primary-950)",
			},
		},
		keyframes: {
			scroll: {
				"0%": { transform: "translateY(0)" },
				"30%": { transform: "translateY(60px)" },
			},
		},
		animation: {
			scroll: "scroll 2s ease infinite",
		},
	},
	plugins: [],
};
