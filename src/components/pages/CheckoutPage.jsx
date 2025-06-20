import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";
import { useUser } from "../context/UserProvider";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Calcola il totale e raggruppa gli articoli
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

  const onSubmit = (data) => {
    
    console.log("Dati pagamento:", data);
    console.log("Articoli acquistati:", cartItems);

    // Svuota il carrello
    localStorage.removeItem("cart");

    // Reindirizza alla pagina di conferma
    navigate("/payment-success", {
      state: {
        orderDetails: {
          items: groupedCart,
          total: totalPrice,
          paymentMethod: `Carta terminante con ${data.cardNumber.slice(-4)}`,
        },
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      {/* Riepilogo ordine */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Riepilogo ordine</h2>

        {groupedCart.length > 0 ? (
          <>
            {groupedCart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-3 border-b"
              >
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">
                    Quantità: {item.quantity}
                  </p>
                </div>
                <p className="font-bold">{item.total.toFixed(2)}€</p>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 mt-2 ">
              <p className="font-bold text-lg">Totale</p>
              <p className="font-bold text-lg">{totalPrice.toFixed(2)}€</p>
            </div>
          </>
        ) : (
          <p>Il tuo carrello è vuoto</p>
        )}
      </div>

      {/* Form di pagamento con react-hook-form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-lg shadow-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Dettagli di pagamento</h2>

        <div className="space-y-4">
          {/* Nome sulla carta */}
          <div>
            <label
              htmlFor="cardName"
              className="block text-sm font-medium text-gray-700"
            >
              Nome sulla carta
            </label>
            <input
              id="cardName"
              type="text"
              className={`mt-1 block w-full border ${
                errors.cardName ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3`}
              {...register("cardName", {
                required: "Il nome sulla carta è obbligatorio",
              })}
            />
            {errors.cardName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cardName.message}
              </p>
            )}
          </div>

          {/* Numero carta */}
          <div>
            <label
              htmlFor="cardNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Numero carta
            </label>
            <input
              id="cardNumber"
              type="text"
              className={`mt-1 block w-full border ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm py-2 px-3`}
              placeholder="1234 5678 9012 3456"
              {...register("cardNumber", {
                required: "Il numero della carta è obbligatorio",
                pattern: {
                  value: /^[0-9]{16}$/,
                  message: "Inserisci un numero di carta valido (16 cifre)",
                },
              })}
            />
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          <div className="grid lg:grid-cols-2 gap-4">
            {/* Data scadenza */}
            <div>
              <label
                htmlFor="expiryDate"
                className="block text-sm font-medium text-gray-700"
              >
                Scadenza (MM/AA)
              </label>
              <input
                id="expiryDate"
                type="text"
                className={`mt-1 block w-full border ${
                  errors.expiryDate ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3`}
                placeholder="MM/AA"
                {...register("expiryDate", {
                  required: "La data di scadenza è obbligatoria",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                    message: "Formato MM/AA",
                  },
                })}
              />
              {errors.expiryDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.expiryDate.message}
                </p>
              )}
            </div>

            {/* CVV */}
            <div>
              <label
                htmlFor="cvv"
                className="block text-sm font-medium text-gray-700"
              >
                CVV
              </label>
              <input
                id="cvv"
                type="text"
                className={`mt-1 block w-full border ${
                  errors.cvv ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm py-2 px-3`}
                placeholder="123"
                {...register("cvv", {
                  required: "Il CVV è obbligatorio",
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "Il CVV deve essere di 3 o 4 cifre",
                  },
                })}
              />
              {errors.cvv && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.cvv.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={cartItems.length === 0}
          className={`mt-6 w-full py-3 px-4 rounded-md text-white font-bold ${
            cartItems.length > 0
              ? "bg-[#1D6069] hover:bg-[#1D606990] transition-all duration-300 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Completa acquisto
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
