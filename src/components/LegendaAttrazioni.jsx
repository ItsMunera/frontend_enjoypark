import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import attrazioni from "./data/attrazioni";


const LegendaAttrazioni = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed top-48 lg:top-40 z-[100]">
      
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="bg-[#1D6069] hover:bg-[#154b53] text-white p-4 rounded-full shadow-lg flex items-center justify-center"
        title="Legenda attrazioni"
        aria-expanded={isOpen}
        aria-controls="legenda-content"
      >
        <FaMapMarkerAlt className="text-lg" />
      </button>

      {/* Legenda animata */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="legenda"
            id="legenda-content"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25 }}
            className="mt-2 w-72 bg-white shadow-xl rounded-xl p-4 border border-gray-200 z-100"
          >
            <h3 className="text-base font-semibold mb-2 text-gray-800">
              Legenda Attrazioni
            </h3>
            <ul className="space-y-2 max-h-64 overflow-y-auto">
              {attrazioni.map(({ id, title }) => (
                <motion.li
                  key={id}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center space-x-3 cursor-pointer"
                  onClick={() => {
                    onSelect(id);
                    setIsOpen(false);
                  }}
                >
                  <div className="bg-[#1D6069] text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold">
                    {id}
                  </div>
                  <span className="text-sm text-gray-700">{title}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LegendaAttrazioni;
