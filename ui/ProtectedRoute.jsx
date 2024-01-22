// import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { getWithExpiry } from "../helpers/localStorageOperations";

function ProtectedRoute({ children }) {
  // const queryClient = useQueryClient();
  // const isAuthenticated = queryClient.getQueriesData(["token"]) !== 0;
  // const isAuthenticated = localStorage.getItem("token");
  const isAuthenticated = getWithExpiry("token");

  if (!isAuthenticated) return <Navigate to="/login" />;
  return children;
}

export default ProtectedRoute;
