import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const {
    isAuthenticated,
    role,
    loading,
  } = useAuth();

  console.log("ProtectedRoute:");
  console.log("isAuthenticated:", isAuthenticated);
  console.log("role:", role);
  console.log("allowedRoles:", allowedRoles);

  // Wait until authentication state is restored
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <p className="text-white">
          Loading...
        </p>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Normalize role
  const normalizedRole = role?.toUpperCase();

  // If this route requires specific roles
  if (
    allowedRoles.length > 0 &&
    !allowedRoles
      .map((r) => r.toUpperCase())
      .includes(normalizedRole)
  ) {
    console.log(
      `Access denied. User role: ${normalizedRole}`
    );

    return (
      <Navigate
        to="/unauthorized"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;