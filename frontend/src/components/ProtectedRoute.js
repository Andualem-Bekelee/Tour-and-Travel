import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // Not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // Admin-only route check
  if (adminOnly && !user.isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
}

export default ProtectedRoute;
