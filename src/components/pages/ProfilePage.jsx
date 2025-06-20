import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { useAxios } from "../context/AxiosProvider";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ProfilePage = () => {
  const { user, loading, error, refreshUser, handleLogout } = useUser();
  const myaxios = useAxios();
  const navigate = useNavigate();
  const [qrData, setQrData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setIsLoading(true);

        // Aggiorna i dati dell'utente
        await refreshUser();

        // Recupera i dati aggiuntivi dell'utente dal backend
        const userResponse = await myaxios.get("/api/auth/user");
        setUserData(userResponse.data.user);

        // Recupera il codice QR solo se l'utente ne ha uno
        if (userResponse.data.user?.code) {
          const codeResponse = await myaxios.get("/api/active-code");
          if (codeResponse.data.has_code) {
            setQrData({
              qrCode: `user-${userResponse.data.user.id}-code-${codeResponse.data.code}`,
              verificationCode: codeResponse.data.code,
            });
          }
        }
      } catch (err) {
        console.error("Error fetching profile data:", err);
        // Gestisci l'errore senza bloccare l'interfaccia
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading || isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      </div>
    );
  }

  // Usa userData se disponibile, altrimenti fallback su user dal context
  const displayUser = userData || user;

  return (
    <div className="max-w-4xl mx-auto mt-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Il mio profilo</h1>

      {/* Sezione profilo utente */}
      <div className="flex items-center gap-4 mb-8 p-4 border border-stone-200 rounded-xl bg-white shadow-sm">
        <img
          src={`https://ui-avatars.com/api/?name=${displayUser.first_name}+${displayUser.last_name}&background=random`}
          alt="Avatar"
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <p className="text-xl font-semibold text-stone-800">
            {displayUser.first_name} {displayUser.last_name}
          </p>
          <p className="text-stone-600">{displayUser.email}</p>
          {displayUser.code && (
            <p className="text-stone-500 text-sm mt-1">
              Codice utente: {displayUser.code}
            </p>
          )}
        </div>
      </div>

      {/* Dati personali */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Dati personali</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              Nome
            </label>
            <div className="p-3 bg-stone-100 rounded-lg">
              {displayUser.first_name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              Cognome
            </label>
            <div className="p-3 bg-stone-100 rounded-lg">
              {displayUser.last_name}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-600 mb-1">
              Email
            </label>
            <div className="p-3 bg-stone-100 rounded-lg">
              {displayUser.email}
            </div>
          </div>
        </div>
      </div>

      {/* Biglietti */}
      <div>
        <h2 className="text-xl font-semibold mb-4">I miei biglietti</h2>
        {qrData ? (
          <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm">
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div className="bg-white p-2 border border-stone-200 rounded">
                  <QRCode
                    value={qrData.qrCode}
                    size={80}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="L"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xs text-stone-500 mb-1">
                    Codice di verifica
                  </p>
                  <p className="text-xl font-mono font-bold">
                    {qrData.verificationCode}
                  </p>
                </div>
              </div>
              <p className="text-xs text-stone-500 mt-2">
                Mostra questo codice all'ingresso
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 border border-stone-200 rounded-lg bg-white shadow-sm">
            <p className="text-stone-500">Nessun biglietto acquistato.</p>
            {displayUser.code && (
              <p className="text-stone-400 text-sm mt-2">
                Il tuo codice utente: {displayUser.code}
              </p>
            )}
          </div>
        )}
      </div>

      <div className="w-full mt-8 flex justify-end">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
