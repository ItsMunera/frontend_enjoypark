import React from "react";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

const Card = ({ img, title, description, date, type }) => {
  function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  return (
    <>
      <div className="w-ful h-full relative bg-orange-300 rounded-2xl ">
        <img className="w-full h-full object-cover rounded-2xl" src={img} />
        <div className="absolute items-center -top-6 left-4 p-4 bg-green-200 rounded-full">
          <p>{type}</p>
        </div>
        <div className="w-full absolute bottom-0 rounded-2xl bg-[#52898F90] hover:bg-[#1D6069] hover:text-white  p-4 flex flex-col justify-between transition-all duration-300">
          <div>
            <p>{date}</p>
            <p className="bold text-[18px] font-bold">{title}</p>
            <p>{truncateText(description, 100)}</p>
          </div>
          <div className="flex justify-end" >
            <button className="border rounded-full px-4 py-2 flex gap-3 items-center font-semibold cursor-pointer">
              Leggi tutto
              <ArrowForwardIosRoundedIcon fontSize="small" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
