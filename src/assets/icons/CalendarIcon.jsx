import * as React from "react";

const CalendarIcon = ({ fill, onClick }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    fill={fill}
    viewBox="0 -960 960 960"
    onClick={onClick}
  >
    <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80zm0-80h560v-400H200zm0-480h560v-80H200zm0 0v-80z"></path>
  </svg>
);

export default CalendarIcon;
