import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAxios } from "./AxiosProvider";

const userContext = createContext({
  user: null,
  loading: true,
  error: null,
  handleLogin: () => {},
  handleLogout: () => {},
  refreshUser: () => {},
  navigate: () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Inizializza subito con l'utente dal localStorage se presente
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const myaxios = useAxios();
  const navigate = useNavigate();

  const refreshUser = async () => {
    try {
      setLoading(true);
      const response = await myaxios.get("/api/auth/user");
      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setError(null);
      return userData;
    } catch (err) {
      console.error("Error refreshing user:", err);
      setError("Errore nel caricamento dei dati utente");
      handleLogout();
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      // Se non c'è token, pulisci tutto
      if (!token) {
        setLoading(false);
        if (user) setUser(null);
        return;
      }

      // Se c'è token ma non user, fai il refresh
      if (token && !user) {
        try {
          await refreshUser();
        } catch {
          // Gestione errore già fatta in refreshUser
        }
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const result = await myaxios.post("/api/auth/login", data);

      localStorage.setItem("token", result.data.token);
      const userData = result.data.user;
      localStorage.setItem("user", JSON.stringify(userData));

      setUser(userData);
      setError(null);
      navigate("/profile"); // Reindirizza direttamente al profilo
      return userData;
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Errore durante il login";
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // context/UserProvider.js
  const handleLogout = async () => {
    try {
      // Facoltativo: chiama l'API di logout se esiste
      await myaxios.post("/api/auth/logout");
    } catch (error) {
      console.error("Errore durante il logout:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setUser(null);
      setError(null);
      navigate("/"); // Reindirizza alla home invece che al login
    }
  };

  return (
    <userContext.Provider
      value={{
        user,
        loading,
        error,
        handleLogin,
        handleLogout,
        refreshUser,
        navigate,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserProvider;
export const useUser = () => useContext(userContext);
