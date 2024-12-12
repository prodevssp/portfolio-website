import React from "react";

const Button = ({ children, sx }) => {
  return (
    <button
      className={`px-6 py-3 text-slate-50  bg-orange-500 rounded-lg shadow hover:bg-primary-600 transition font-semibold lg:text-lg xl:text-xl ${sx}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
