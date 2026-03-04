import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return null;

  const userRoles = user?.roles?.map(r => r.roleName) || [];

  const isAllowed = allowedRoles.some(role =>
    userRoles.includes(role)
  );

  if (!user || !isAllowed) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleProtectedRoute;