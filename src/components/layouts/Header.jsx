import { NavLink } from "react-router";
import AttractionIcon from "../../assets/icons/AttractionIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import EventIcon from "../../assets/icons/EventIcon";
import SupportIcon from "../../assets/icons/SupportIcon";

const Header = ({ isModalOpen, modalSource, toggleModal }) => {
  const isCalendarActive = isModalOpen && modalSource === "calendar";

  return (
    <>
      <div className="w-full p-4 flex justify-center fixed bottom-0">
        <div className="w-[100%] sm:w-[480px] bg-[#1D6069] rounded-full p-4 mx-auto flex gap-4 justify-between items-center">
          <NavLink to="/">
            {({ isActive }) => (
              <div
                style={{
                  backgroundColor: isActive ? "#00D47E" : "transparent",
                  padding: "10px",
                  borderRadius: "100%",
                }}
              >
                <AttractionIcon fill={isActive ? "#fff" : "#52898F"} />
              </div>
            )}
          </NavLink>

          <button
            onClick={toggleModal}
            style={{
              backgroundColor: isCalendarActive ? "#00D47E" : "transparent",
              padding: "10px",
              borderRadius: "100%",
              border: "none",
              cursor: "pointer",
            }}
            aria-label="Open calendar modal"
          >
            <CalendarIcon fill={isCalendarActive ? "#fff" : "#52898F"} />
          </button>

          <NavLink to="/event">
            {({ isActive }) => (
              <div
                style={{
                  backgroundColor: isActive ? "#00D47E" : "transparent",
                  padding: "10px",
                  borderRadius: "100%",
                }}
              >
                <EventIcon fill={isActive ? "#fff" : "#52898F"} />
              </div>
            )}
          </NavLink>

          <NavLink to="/contact">
            {({ isActive }) => (
              <div
                style={{
                  backgroundColor: isActive ? "#00D47E" : "transparent",
                  padding: "10px",
                  borderRadius: "100%",
                }}
              >
                <SupportIcon fill={isActive ? "#fff" : "#52898F"} />
              </div>
            )}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Header;
