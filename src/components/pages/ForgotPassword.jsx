import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button.jsx";

const ForgotPassword = () => {
  return (
    <div className="w-full max-w-md absolute left-1/2 transform -translate-1/2 top-1/2">
      <p className="text-center text-2xl font-semibold mb-2">Reimposta password</p>
       <p className="text-stone-400 font-normal mb-8">Compila il campo qui sotto per ricevere una mail dove potrai reinserire una nuova password.</p>
      <form>
        <div className="rounded-2xl w-full bg-white min-h-60 border-2 border-[#1D6069] flex flex-col items-center justify-center p-6 gap-6">
          <div className="w-full">
            <label
              className="block mb-2 font-semibold text-stone-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              className="w-full rounded-2xl min-h-10 ps-3 border border-stone-300 outline-0 shadow-none"
              type="text"
              placeholder="mariorossi@gmail.com"
            />
          </div>

          <Button>Conferma</Button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
