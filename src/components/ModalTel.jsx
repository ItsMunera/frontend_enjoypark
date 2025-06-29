import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "./context/UserProvider";
import CardSlider from "./CardSlider";
import attrazioni from "./data/attrazioni";
import biglietti from "./data/biglietti";

const predefinedPaths = [
  {
    id: 1,
    title: "Percorso breve",
    description: "Un percorso veloce con 3 attrazioni principali",
    attractions: attrazioni.slice(0, 3),
  },
  {
    id: 2,
    title: "Percorso medio",
    description: "Un percorso moderato con 4 attrazioni",
    attractions: attrazioni.slice(0, 4),
  },
  {
    id: 3,
    title: "Percorso lungo",
    description: "Un percorso completo con tutte le attrazioni",
    attractions: [...attrazioni],
  },
];

const ModalTel = ({ isOpen, toggleIsOpen, initialStep = 1 }) => {
  const [step, setStep] = useState(initialStep);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedPath, setSelectedPath] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [userPaths, setUserPaths] = useState([]);
  const navigate = useNavigate();
  const { user } = useUser();

  const nextStep = () => step < 4 && setStep(step + 1);
  const prevStep = () => step > 1 && setStep(step - 1);

  useEffect(() => {
    if (isOpen) {
      setStep(initialStep);
      setSelectedItem(null);
      setSelectedPath(null);
      setCartItems([]);
    }
  }, [isOpen, initialStep]);

  const handlePathSelect = (path) => setSelectedPath(path);

  const addPathToUserPaths = () => {
    if (selectedPath && user) {
      setUserPaths([...userPaths, selectedPath]);
      setSelectedPath(null);
    }
  };

  const handlePurchase = () => {
    if (!user) {
      navigate("/login");
      toggleIsOpen();
      return;
    }
    localStorage.setItem("cart", JSON.stringify(cartItems));
    navigate("/checkout");
    toggleIsOpen();
  };

  const groupedCart = cartItems.reduce((acc, item) => {
    const found = acc.find((i) => i.title === item.title);
    if (found) {
      found.quantity += 1;
      found.total += item.price;
    } else {
      acc.push({
        title: item.title,
        price: item.price,
        quantity: 1,
        total: item.price,
      });
    }
    return acc;
  }, []);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

  return isOpen ? (
    <div className="lg:hidden fixed overflow-y-scroll rounded-t-2xl left-1/2 -translate-x-1/2 bottom-0 h-[60%] w-full bg-white border border-stone-300 p-4 z-100">
      <div
        className={`${
          step > 1 || selectedItem || selectedPath
            ? "justify-between"
            : "justify-end"
        } flex items-center mb-2`}
      >
        {(step > 1 || selectedItem || selectedPath) && (
          <div
            onClick={() => {
              if (selectedPath) setSelectedPath(null);
              else if (step === 1 && selectedItem) setSelectedItem(null);
              else prevStep();
            }}
            className="cursor-pointer"
          >
            ← Torna indietro
          </div>
        )}
        <div onClick={toggleIsOpen} className="cursor-pointer">
          ✕
        </div>
      </div>

      {/* Step 1 - Categorie e percorsi */}
      {step === 1 && !selectedItem && !selectedPath && (
        <>
          <p className="text-xl text-stone-800 mb-2 font-semibold">Categorie</p>
          <div className="flex gap-4 overflow-x-scroll mb-8">
            <CardSlider onSelect={setSelectedItem} />
          </div>
          <div className="flex flex-col">
            <p className="text-xl text-stone-800 font-semibold">
              Scegli percorso
            </p>
            <p className="mt-1 mb-3">
              Scegli tra i percorsi predefiniti 
            </p>
          </div>
          <div className="flex flex-col gap-4 mb-4">
            {user?.code && (
              <button
                onClick={() => setStep(3)}
                className="px-4 flex gap-2 py-2 bg-[#1D6069] text-white rounded-full justify-center"
              >
                I miei percorsi
              </button>
            )}
          </div>
        </>
      )}

      {/* Step 1 - Categoria selezionata */}
      {step === 1 && selectedItem && !selectedPath && (
        <div>
          <p className="text-xl font-semibold mb-4">{selectedItem.title}</p>
          <div className="flex flex-col gap-4">
            {predefinedPaths.map((path) => (
              <div
                key={path.id}
                className="border p-4 rounded-lg cursor-pointer hover:bg-gray-50"
                onClick={() => handlePathSelect(path)}
              >
                <h3 className="font-semibold">{path.title}</h3>
                <p className="text-sm text-gray-600">{path.description}</p>
                <p className="text-sm mt-2">
                  {path.attractions.length} attrazioni
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 1 - Percorso selezionato */}
      {step === 1 && selectedPath && (
        <div>
          <h2 className="text-xl font-semibold mb-4">{selectedPath.title}</h2>
          <p className="mb-4">{selectedPath.description}</p>
          <h3 className="font-semibold mb-2">Attrazioni incluse:</h3>
          <div className="space-y-4 mb-6">
            {selectedPath.attractions.map((attrazione) => (
              <div key={attrazione.id} className="flex items-center gap-3">
                <div
                  className="w-16 h-16 bg-cover bg-center rounded-lg"
                  style={{ backgroundImage: `url(${attrazione.img})` }}
                ></div>
                <div>
                  <p className="font-medium">{attrazione.title}</p>
                </div>
              </div>
            ))}
          </div>
          {user?.code && (
            <button
              onClick={addPathToUserPaths}
              className="w-full bg-[#1D6069] text-white py-2 rounded-full"
            >
              Aggiungi ai miei percorsi
            </button>
          )}
        </div>
      )}

      {/* Step 2 - Creazione percorso */}
      {/* {step === 2 && (
        <>
          <p className="text-xl text-stone-800 mb-6 font-semibold">
            Percorso personalizzato
          </p>
          {attrazioni.map((attrazione) => (
            <div
              key={attrazione.id}
              className="mb-6 flex justify-between items-center"
            >
              <div>
                <div
                  style={{ backgroundImage: `url(${attrazione.img})` }}
                  className="relative overflow-hidden rounded-2xl w-50 h-25 border-stone-300 mb-2 group"
                />
                <p>{attrazione.title}</p>
              </div>
              <div>+</div>
            </div>
          ))}
          <button className="w-full bg-[#1D6069] text-white py-2 rounded-full">
            Salva percorso
          </button>
        </>
      )} */}

      {/* Step 3 - I miei percorsi */}
      {step === 3 && (
        <>
          <p className="text-xl text-stone-800 mb-4 font-semibold">
            I miei percorsi
          </p>
          {userPaths.length === 0 ? (
            <p className="text-gray-500">Non hai ancora salvato percorsi</p>
          ) : (
            <div className="space-y-4">
              {userPaths.map((path) => (
                <div key={path.id} className="border p-4 rounded-lg">
                  <h3 className="font-semibold">{path.title}</h3>
                  <p className="text-sm text-gray-600">
                    {path.attractions.length} attrazioni
                  </p>
                  
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Step 4 - Biglietti e checkout */}
      {step === 4 && (
        <>
          <p className="text-xl text-stone-800 mb-2 font-semibold">
            Compra biglietti
          </p>
          {biglietti.map((biglietto) => (
            <div key={biglietto.id} className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">{biglietto.title}</p>
                  <p className="text-sm text-stone-600">
                    {biglietto.description}
                  </p>
                </div>
                <span className="text-lg font-bold">{biglietto.price}€</span>
              </div>
              <button
                onClick={() => setCartItems((prev) => [...prev, biglietto])}
                className="w-full bg-[#1D6069] hover:bg-[#1D606990] transition-all duration-300 text-white py-2 rounded-full"
              >
                aggiungi al carrello
              </button>
            </div>
          ))}

          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4">
              <p className="text-lg font-semibold mb-2">Carrello</p>
              {groupedCart.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-2"
                >
                  <p>
                    {item.title} x{item.quantity}
                  </p>
                  <span className="font-bold">{item.total}€</span>
                </div>
              ))}
              <div className="flex justify-between items-center border-t pt-3 mt-3">
                <p className="font-semibold">Totale</p>
                <span className="text-lg font-bold">{totalPrice}€</span>
              </div>
              <button
                onClick={handlePurchase}
                className="mt-4 w-full bg-[#1D6069] hover:bg-[#1D606990] transition-all duration-300 text-white py-2 rounded-full"
              >
                Acquista
              </button>
            </div>
          )}
        </>
      )}
    </div>
  ) : null;
};

export default ModalTel;
