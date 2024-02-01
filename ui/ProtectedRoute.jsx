
import { Navigate } from "react-router-dom";
import { getWithExpiry } from "../helpers/localStorageOperations";

function ProtectedRoute({ children }) {
 
  const isAuthenticated = getWithExpiry("token");

  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
