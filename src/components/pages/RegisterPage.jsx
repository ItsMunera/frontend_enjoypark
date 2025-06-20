import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "../Button.jsx";
import { useAxios } from "../context/AxiosProvider.jsx";

const RegisterPage = () => {
  const axios = useAxios();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/auth/register", {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation, // Laravel richiede conferma
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      console.error("Errore di registrazione:", error.response?.data);
      alert("Registrazione fallita. Verifica i dati.");
    }
  };

  const watchCheckbox = watch("termsAndCondition");

  return (
    <div className="w-full max-w-lg absolute left-1/2 transform -translate-x-1/2 top-1/2">
      <p className="text-center mb-8 text-2xl font-semibold">Registrati</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full rounded-2xl bg-white border-2 border-[#1D6069] p-6 gap-6">
          <div className="grid grid-cols-2 gap-6">
            {/* Nome */}
            <div className="w-full">
              <label
                className="block mb-2 font-semibold text-stone-800"
                htmlFor="first_name"
              >
                Nome
              </label>
              <input
                id="firt_name"
                type="text"
                placeholder="Mario"
                {...register("first_name", {
                  required: true,
                  pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                })}
                className={`${
                  errors.nome
                    ? "border border-red-500"
                    : "border border-stone-300"
                } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              />
              {errors.nome && (
                <p className="text-red-400 font-semibold">
                  Errore: sono accettate solo lettere e spazi!
                </p>
              )}
            </div>

            {/* Cognome */}
            <div className="w-full">
              <label
                className="block mb-2 font-semibold text-stone-800"
                htmlFor="last_name"
              >
                Cognome
              </label>
              <input
                id="last_name"
                type="text"
                placeholder="Rossi"
                {...register("last_name", {
                  required: true,
                  pattern: /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/,
                })}
                className={`${
                  errors.cognome
                    ? "border border-red-500"
                    : "border border-stone-300"
                } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              />
              {errors.cognome && (
                <p className="text-red-400 font-semibold">
                  Errore: sono accettate solo lettere e spazi!
                </p>
              )}
            </div>

            {/* Email */}
            <div className="w-full">
              <label
                className="block mb-2 font-semibold text-stone-800"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                type="text"
                placeholder="mariorossi@gmail.com"
                {...register("email", {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                })}
                className={`${
                  errors.email
                    ? "border border-red-500"
                    : "border border-stone-300"
                } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              />
              {errors.email && (
                <p className="text-red-400 font-semibold">
                  Errore: inserire email valida!
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
                id="password"
                type="password"
                placeholder="********"
                {...register("password", {
                  required: true,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                })}
                className={`${
                  errors.password
                    ? "border border-red-500"
                    : "border border-stone-300"
                } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
              />
              {errors.password && (
                <p className="text-red-400 font-semibold">
                  La password deve avere almeno 8 caratteri, una maiuscola, una
                  minuscola, un numero e un simbolo.
                </p>
              )}
            </div>
          </div>

          {/* Password Confirmation */}
          <div className="w-full">
            <label
              className="block mb-2 font-semibold text-stone-800"
              htmlFor="password_confirmation"
            >
              Conferma Password
            </label>
            <input
              id="password_confirmation"
              type="password"
              placeholder="********"
              {...register("password_confirmation", {
                required: "La conferma password è obbligatoria",
                validate: (value) =>
                  value === getValues("password") ||
                  "Le password non corrispondono",
              })}
              className={`${
                errors.password_confirmation
                  ? "border border-red-500"
                  : "border border-stone-300"
              } w-full rounded-2xl min-h-10 ps-3 outline-0 shadow-none mb-1`}
            />
            {errors.password_confirmation && (
              <p className="text-red-400 font-semibold">
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* Checkbox */}
          <div className="my-4">
            <input
              className="accent-[#1D6069] outline-0 me-1 cursor-pointer"
              id="termsAndCondition"
              type="checkbox"
              {...register("termsAndCondition", {
                required: true,
              })}
            />
            <label htmlFor="termsAndCondition">
              Accetto i termini e le condizioni sull'uso dei miei dati
            </label>
          </div>

          {/* Bottone */}
          <Button disabled={!watchCheckbox} input>
            Registrati
          </Button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
