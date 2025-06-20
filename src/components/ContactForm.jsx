import { useForm } from "react-hook-form";

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data:", data);
    reset(); // resetta il form dopo l'invio
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div>
        <label className="block font-semibold mb-2">Nome*</label>
        <input
          type="text"
          {...register("nome", { required: "Il nome è obbligatorio" })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.nome && (
          <p className="text-red-500 text-sm">{errors.nome.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">Cognome*</label>
        <input
          type="text"
          {...register("cognome", { required: "Il cognome è obbligatorio" })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.cognome && (
          <p className="text-red-500 text-sm">{errors.cognome.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">Email*</label>
        <input
          type="text"
          {...register("email", {
            required: "L'email è obbligatoria",
            pattern: {
              value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
              message: "Inserisci un'email valida",
            },
          })}
          className="w-full border p-2 rounded mb-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-semibold mb-2">Messaggio*</label>
        <textarea
          {...register("messaggio", {
            required: "Il messaggio è obbligatorio",
          })}
          className="w-full border p-2 rounded h-24 mb-2"
        />
        {errors.messaggio && (
          <p className="text-red-500 text-sm">{errors.messaggio.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-[#1D6069] text-white py-2 rounded font-semibold"
      >
        Invia
      </button>
    </form>
  );
};

export default ContactForm;
