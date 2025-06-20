import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useUser } from "./context/UserProvider";

const Profile = () => {
  const { user, loading, refreshUser } = useUser();

  // Forza il refresh al mount se c'è il token ma loading è true da troppo tempo
  useEffect(() => {
    if (loading && localStorage.getItem("token")) {
      const timer = setTimeout(() => {
        refreshUser();
      }, 1000); // Dopo 3 secondi di loading, forza il refresh

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="fixed top-5 right-5 z-[150]">
        <div className="bg-gray-200 p-4 rounded-full w-12 h-12 animate-pulse"></div>
      </div>
    );
  }

  return (
    <div className="fixed top-5 right-5 z-[150]">
      {user ? (
        <Link to="/profile" className="block">
          <div 
            className="bg-amber-200 p-4 rounded-full w-12 h-12 flex items-center justify-center font-semibold text-gray-800 transition-transform hover:scale-105"
            title={`${user.first_name} ${user.last_name}`}
          >
            {user.first_name.charAt(0).toUpperCase()}
            {user.last_name.charAt(0).toUpperCase()}
          </div>
        </Link>
      ) : (
        <Link
          to="/login"
          className="inline-flex items-center bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm"
        >
          Accedi
        </Link>
      )}
    </div>
  );
};

export default Profile;