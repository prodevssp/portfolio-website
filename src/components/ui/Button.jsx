import React from "react";

const Button = ({ children, sx, className, onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 md:px-4 md:py-2 text-slate-50 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 font-semibold text-xs md:text-sm lg:text-base xl:text-lg ${sx} ${className}`}
      type="submit"
    >
      {children}
    </button>
  );
};

export default Button;
