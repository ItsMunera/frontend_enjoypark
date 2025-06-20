import { useState } from "react";
import Card from "../Card";
import eventi from "../data/eventi";
import { Link } from "react-router";

const EventPage = () => {
  const [categoriaSelezionata, setCategoriaSelezionata] = useState("tutte");

  const categorie = ["tutte", "evento", "show"];

  const eventiFiltrati =
    categoriaSelezionata === "tutte"
      ? eventi
      : eventi.filter((evento) => evento.type === categoriaSelezionata);

  return (
    <>
      <div className="py-4">
        <div className="w-full md:w-[70%]">
          <h1 className="font-bold text-4xl">Le ultime da EnjoyPark</h1>
          <h2 className="text-xl mt-4">
            Curiosità, promozioni, iniziative speciali, eventi, spettacoli e
            tanto altro ancora! Sul Blog di EnjoyPark trovi tutte le novità e
            gli aggiornamenti sul Parco e sul territorio. Uno spazio virtuale di
            divertimento e condivisione dove restare sempre connessi con il
            mondo di EnjoyPark!
          </h2>
        </div>

        {/* Filtri */}
        <div className="w-full mt-8">
          <h2 className="text-xl font-bold">Tutti gli articoli</h2>
        </div>
        <div className="w-full flex gap-4 mt-4">
          {categorie.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaSelezionata(cat)}
              className={`p-4 rounded-full items-center flex transition-all ${
                categoriaSelezionata === cat ? "bg-[#00D47E]" : "bg-[#52898F]"
              }`}
            >
              <p className="font-bold text-[16px] text-white ">
                {cat === "tutte" ? "Tutte le categorie" : cat}
              </p>
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {eventiFiltrati.map((evento) => (
            <Link to={`/event/${evento.id}`} key={evento.id}>
              <Card
                title={evento.title}
                description={evento.description}
                img={evento.img}
                date={evento.date}
                type={evento.type}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default EventPage;
