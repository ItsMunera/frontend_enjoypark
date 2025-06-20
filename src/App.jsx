import { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router";
import Container from "./components/layouts/Container";
import Header from "./components/layouts/Header";
import ButtonTicket from "./components/ButtonTicket";
import ModalDesk from "./components/ModalDesk";
import Profile from "./components/Profile";
import ModalTel from "./components/ModalTel";

const App = () => {
  const location = useLocation(); // 🔥 tienilo!
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialStep, setInitialStep] = useState(null);

  // ✅ Chiudi modale quando cambia route
  useEffect(() => {
    setIsModalOpen(false);
    setInitialStep(null);
  }, [location]);

  const [modalSource, setModalSource] = useState(null);

  const openModalWithStep = (step, source = null) => {
    if (isModalOpen && modalSource === source) {
      setIsModalOpen(false);
      setInitialStep(null);
      setModalSource(null);
      return;
    }
    setInitialStep(step);
    setIsModalOpen(true);
    setModalSource(source);
  };

  const toggleModal = () => {
    setIsModalOpen((prev) => {
      const newState = !prev;
      if (newState) {
        setInitialStep(1);
        setModalSource("calendar"); // 👈 da icona calendar
      } else {
        setModalSource(null);
      }
      return newState;
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setInitialStep(null);
    setModalSource(null);
  };

  return (
    <>
      <Profile />

      <div className="relative">
        <ButtonTicket
          isOpen={isModalOpen}
          toggleIsOpen={closeModal}
          onClick={() => openModalWithStep(4, "buttonTicket")}
        />
      </div>

      <Container>
        <Outlet />
      </Container>

      <Header
        isModalOpen={isModalOpen}
        modalSource={modalSource}
        toggleModal={toggleModal}
      />

      <ModalDesk
        isOpen={isModalOpen}
        toggleIsOpen={closeModal}
        initialStep={initialStep || 1}
      />

      <ModalTel
        isOpen={isModalOpen}
        toggleIsOpen={closeModal}
        initialStep={initialStep || 1}
      />
    </>
  );
};

export default App;
