import React from "react";
import { motion } from "framer-motion";

const ButtonTicket = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer "
    >
      <motion.div
      onClick={onClick}
      initial={{ x: "80%" }}
      animate={{ x: "80%" }}
      whileHover={{ x: "0%" }}
      transition={{ type: "tween", duration: 0.5 }} className="fixed top-24 lg:top-28 right-0 z-40">
        <div className="absolute -left-5 top-2 w-6 h-5 p-5 bg-white rounded-full pointer-events-none circleTicket"></div>
        <div className="bg-[#1D6069] flex" >
          <div className="p-4"></div>
          <div className="border-r-2 border-dashed border-white"></div>
          <div className="p-4">
            <p className="font-bold text-white text-[14px] md:text-[18px]">
              Acquista biglietto
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ButtonTicket;
