/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
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
