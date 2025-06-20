import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "./context/UserProvider";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
