import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../Button.jsx";
import { useForm } from "react-hook-form";
import { useAxios } from "../context/AxiosProvider.jsx";


const LoginPage = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/");
    } catch (error) {
      console.error("Errore di login:", error.response?.data || error.message);
      alert("Email o password errati.");
    }
  };

  return (
    <div className="w-full max-w-md absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2">
      <p className="text-center mb-8 text-2xl font-semibold">Accedi</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="rounded-2xl w-full bg-white min-h-60 border-2 border-[#1D6069] flex flex-col items-center justify-center p-6 gap-6">
          {/* Email */}
          <div className="w-full">
            <label
              className="block mb-2 font-semibold text-stone-800"
              htmlFor="email"
            >
              Email
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              })}
              id="email"
              className={`${
                errors.email
                  ? "border border-red-500"
                  : "border border-stone-300"
              } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              type="text"
              placeholder="mariorossi@gmail.com"
            />
            {errors.email && (
              <p className="text-red-400 font-semibold">
                Errore: inserire un’email valida!
              </p>
            )}
          </div>

          {/* Password */}
          <div className="w-full">
            <label
              className="block mb-2 font-semibold text-stone-800"
              htmlFor="password"
            >
              Password
            </label>
            <input
              {...register("password", {
                required: true,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
              })}
              id="password"
              className={`${
                errors.password
                  ? "border border-red-500"
                  : "border border-stone-300"
              } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              type="password"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-400 font-semibold">
                Errore: Password non conforme (8 caratteri, maiuscola,
                minuscola, numero, simbolo)
              </p>
            )}
          </div>

          {/* Ricordami + Password dimenticata */}
          <div className="w-full flex justify-between items-baseline">
            <div>
              <input
                className="accent-[#1D6069] outline-0 me-1 cursor-pointer"
                id="rememberMe"
                type="checkbox"
              />
              <label htmlFor="rememberMe">Ricordami</label>
            </div>
            
          </div>

          {/* Pulsante Login */}
          <Button input>Accedi</Button>

          {/* Divider */}
          <div className="relative w-full">
            <div className="border-b border-stone-300 absolute top-1/2 left-1/2 -translate-x-1/2 w-full"></div>
            <p className="px-4 absolute text-center bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              o se non sei registrato
            </p>
          </div>

          {/* Link a Registrazione */}
          <Button to="/register" variant>
            Registrati
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
