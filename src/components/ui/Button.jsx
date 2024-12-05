import React from "react";

const Button = ({ children }) => {
	return (
		<button className="px-6 py-2  text-white bg-primary-500 rounded-full shadow hover:bg-primary-600 transition font-semibold">
			{children}
		</button>
	);
};

export default Button;
