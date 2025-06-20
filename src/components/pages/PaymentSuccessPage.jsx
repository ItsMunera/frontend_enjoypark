import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserProvider";
import { useAxios } from "../context/AxiosProvider";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const myaxios = useAxios();
  const [qrCode, setQrCode] = useState("");
  const [randomCode, setRandomCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const generateUserCode = async () => {
      try {
        const response = await myaxios.post("/api/generate-code", {
          user_id: user.id,
        });

        if (!response.data.success) {
          throw new Error(
            response.data.message || "Errore nella generazione del codice"
          );
        }

        setQrCode(response.data.qr_code);
        setRandomCode(response.data.code);
      } catch (error) {
        console.error("Errore nella generazione del codice:", error);
        setError(
          error.response?.data?.message ||
            error.message ||
            "Si è verificato un errore"
        );
      } finally {
        setLoading(false);
      }
    };

    generateUserCode();
  }, [user, myaxios]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Torna alla Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-600 mb-2">
            Pagamento completato con successo!
          </h1>
          <p className="text-gray-600">
            Mostra questo codice al punto di ritiro per ricevere i tuoi
            biglietti
          </p>
        </div>

        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 p-4 bg-white border border-gray-200 rounded-lg">
            <QRCode
              value={qrCode}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
            />
          </div>

          <div className="bg-gray-100 px-6 py-3 rounded-lg">
            <p className="text-sm text-gray-500 mb-1">Codice di verifica</p>
            <p className="text-2xl font-mono font-bold">{randomCode}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={() => navigate("/profile")}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            Vai al tuo profilo
          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition duration-200"
          >
            Torna alla home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
