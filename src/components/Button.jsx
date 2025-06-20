import React from "react";
import { Link } from "react-router-dom";

const Button = ({ children, variant, to, input, disabled }) => {
  return (
    <>
      {input ? (
        <button
          disabled={disabled}
          to={to}
          className={`${
            variant ? "bg-white  text-[#1D6069]" : " text-white bg-[#1D6069] "
          } px-4 py-2 border-2  w-full flex items-center justify-center  border-[#1D6069]  rounded-2xl font-semibold cursor-pointer ${disabled ? "opacity-90" : ""
          }`}
          type="submit"
        >
          {children}
        </button>
      ) : (
        <Link
          to={to}
          className={`${
            variant ? "bg-white  text-[#1D6069]" : " text-white bg-[#1D6069] "
          } px-4 py-2 border-2  w-full flex items-center justify-center  border-[#1D6069]  rounded-2xl font-semibold`}
        >
          {children}
        </Link>
      )}
    </>
  );
};

export default Button;
