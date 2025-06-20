import percorsi from "./data/percorsi";

const CardSlider = ({ onSelect }) => {
  return (
    <>
      {percorsi.map((percorso) => (
        <div onClick={() => onSelect(percorso)} key={percorso.id} className="shrink-0 w-[200px]">
          <div
            style={{ backgroundImage: `url(${percorso.img})` }}
            className="relative overflow-hidden rounded-2xl w-full h-25 border-stone-300 mb-2 group"
          ></div>
          <p>{percorso.title}</p>
        </div>
      ))}
    </>
  );
};

export default CardSlider;
