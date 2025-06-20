import React, { useState, useEffect } from "react";
import { useAxios } from "./context/AxiosProvider";
import { useUser } from "./context/UserProvider";

const ModalAttrazioni = ({
  isOpen,
  onClose,
  selectedId,
  title = "",
  description = "",
}) => {
  const [attraction, setAttraction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [queueTime, setQueueTime] = useState(0);
  const [currentTimer, setCurrentTimer] = useState(0);
  const [userCode, setUserCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const myaxios = useAxios();
  const { user } = useUser();

  const calculateQueueTime = (bookingsCount) => {
    return bookingsCount * 180;
  };

  useEffect(() => {
    if (!isOpen || !selectedId) return;

    const fetchAttraction = async () => {
      try {
        setLoading(true);
        const response = await myaxios.get(`/api/attractions/${selectedId}`);
        const attractionData = response.data;

        setAttraction(attractionData);
        const initialQueueTime = calculateQueueTime(
          attractionData.bookings_count || 0
        );
        setQueueTime(initialQueueTime);
        setCurrentTimer(attractionData.timer || 0);

        setError(null);
      } catch (err) {
        setError("Errore nel caricamento dell'attrazione");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAttraction();
  }, [isOpen, selectedId]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min ${seconds < 10 ? "0" : ""}${seconds} sec`;
  };

  useEffect(() => {
    if (queueTime <= 0) return;

    const interval = setInterval(() => {
      setQueueTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [queueTime]);

  const handleBook = async () => {
    if (!userCode) {
      setCodeError("Inserisci il codice a 4 caratteri");
      return;
    }

    try {
      const response = await myaxios.post(`/api/book-with-code`, {
        attraction_id: selectedId,
        user_code: userCode,
      });

      
      const updatedAttraction = await myaxios.get(
        `/api/attractions/${selectedId}`
      );

      
      setAttraction(updatedAttraction.data);

      
      const newQueueTime = calculateQueueTime(
        updatedAttraction.data.bookings_count || 0
      );
      setQueueTime(newQueueTime);
      setCurrentTimer(updatedAttraction.data.timer || 0);

      
      setUserCode("");
      setCodeError("");

      alert(response.data.message);
    } catch (err) {
      setCodeError(
        err.response?.data?.message || "Errore durante la prenotazione"
      );
    }
  };

  if (!isOpen || !selectedId) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-end lg:items-center justify-center bg-black/60">
      <div className="w-full lg:w-[500px] bg-white rounded-t-3xl lg:rounded-xl p-6 transition-all duration-300 h-[60%] lg:h-auto overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-600 text-xl font-bold hover:text-red-500"
            aria-label="Chiudi modale"
          >
            &times;
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <>
            {attraction?.image_path && (
              <img
                src={`${process.env.REACT_APP_API_URL}/storage/${attraction.image_path}`}
                alt={title || attraction.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">
              {title || attraction?.title}
            </h2>
            <p className="text-gray-600 mb-4">
              {description || attraction?.description}
            </p>

            <div className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p className="text-sm text-gray-700 mb-2">
                🕒 <strong>Tempo di attesa corrente:</strong>{" "}
                {formatTime(queueTime)}
              </p>
              <p className="text-sm text-gray-700">
                👥 <strong>Persone in coda:</strong>{" "}
                {attraction?.bookings_count || 0}
                
              </p>
            </div>

            <div className="mb-4">
              <label
                htmlFor="userCode"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Inserisci il codice a 4 caratteri
              </label>
              <input
                type="text"
                id="userCode"
                value={userCode}
                onChange={(e) => {
                  setUserCode(e.target.value.toUpperCase());
                  setCodeError("");
                }}
                maxLength={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="ABCD"
              />
              {codeError && (
                <p className="mt-1 text-sm text-red-600">{codeError}</p>
              )}
            </div>

            <button
              onClick={handleBook}
              className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition font-medium"
            >
              Prenotati
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ModalAttrazioni;
