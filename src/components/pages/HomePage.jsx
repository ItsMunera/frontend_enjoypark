import React, { useState } from "react";
import ModalAttrazione from "../ModalAttrazioni";
import LegendaAttrazioni from "../LegendaAttrazioni";

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAttrazioneId, setSelectedAttrazioneId] = useState(null);

  const openModal = (id) => {
    setSelectedAttrazioneId(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedAttrazioneId(null);
  };

  return (
    <>
      {/* Passo la funzione openModal a Legenda per aprire la modale */}
      <LegendaAttrazioni onSelect={openModal} />

      <div className="w-full h-[100vh] flex justify-center items-center relative">
        <div className="relative w-full">
          <img className="w-full h-full" src="/imgs/baseParco.svg" />
          <img
            className="w-full h-full absolute z-40 pointer-events-none top-0"
            src="/imgs/altro.svg"
          />

          {/* Zona 1 */}
          <div
            onClick={() => openModal(1)}
            className="absolute top-[15.888888%] right-[8.66666666%] w-[32%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaBambini.svg" />
            <div className="absolute -top-8 right-0 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[14px] md:text-[18px] text-white">
                1
              </p>
            </div>
          </div>

          {/* Zona 2 */}
          <div
            onClick={() => openModal(2)}
            className="absolute top-[35.666666%] left-[6.66666666%] w-[25%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaToboga.svg" />
            <div className="absolute top-0 left-0 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[12px] md:text-[18px] text-white">
                2
              </p>
            </div>
          </div>

          {/* Altre zone simili */}
          <div
            onClick={() => openModal(3)}
            className="absolute top-[10.666666%] left-[15.8888888%] w-[20%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaRelax.svg" />
            <div className="absolute -top-6 left-0 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[14px] md:text-[18px] text-white">
                3
              </p>
            </div>
          </div>

          <div
            onClick={() => openModal(4)}
            className="absolute top-[-2%] right-[25%] w-[25%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaScivolo.svg" />
            <div className="absolute -top-9 right-0 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[14px] md:text-[18px] text-white">
                4
              </p>
            </div>
          </div>

          <div
            onClick={() => openModal(5)}
            className="absolute top-[35%] right-[36%] w-[24%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaEventi.svg" />
            <div className="absolute -bottom-4 -right-6 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[14px] md:text-[18px] text-white">
                5
              </p>
            </div>
          </div>

          <div
            onClick={() => openModal(6)}
            className="absolute bottom-[9%] left-[21%] w-[30%] hover:scale-125 transition-all duration-300 hover:z-50 cursor-pointer"
          >
            <img className="w-full" src="/imgs/zonaCibo.svg" />
            <div className="absolute -bottom-8 -left-4 bg-[#1D6069] p-2 md:p-4 z-[60] rounded-full border-white border-1 md:border-3">
              <p className="font-bold text-[14px] md:text-[18px] text-white">
                6
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modale */}
      <ModalAttrazione
        isOpen={isModalOpen}
        onClose={closeModal}
        selectedId={selectedAttrazioneId}
      />
    </>
  );
};

export default HomePage;
