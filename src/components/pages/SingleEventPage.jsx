import { useParams, useNavigate } from "react-router-dom";
import eventi from "../data/eventi";

const SingleEventPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const evento = eventi.find((e) => e.id.toString() === id);

  if (!evento) {
    return <div className="text-xl">Evento non trovato.</div>;
  }

  return (
    <div className="pt-8">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-[#1D6069] text-white rounded-full hover:bg-[#154e56] transition"
      >
        ← Torna indietro
      </button>

      <h1 className="text-3xl font-bold mb-4">{evento.title}</h1>
      <span className="text-sm mb-8 bg-[#00D47E] text-white px-3 py-1 rounded-full">
        {evento.type}
      </span>
      <p className="text-gray-600 mb-2">{evento.date}</p>
      <p className="text-lg mb-4">{evento.description}</p>
    </div>
  );
};

export default SingleEventPage;
