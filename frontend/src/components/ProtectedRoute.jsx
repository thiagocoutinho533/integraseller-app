import { isAuthenticated } from "../services/auth";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
