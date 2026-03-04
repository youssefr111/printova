import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

/**
 * @param {ReactNode} children - The content to render
 * @param {boolean} redirectIfAuthenticated - If true, redirect logged-in users (e.g., for /login)
 * @param {string} redirectPath - Path to redirect to when blocking
 */
const AuthGuard = ({ children, redirectIfAuthenticated = false, redirectPath = "/" }) => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) return <p>Loading...</p>;

  // Redirect logged-in users if redirectIfAuthenticated is true
  if (redirectIfAuthenticated && user) return <Navigate to={redirectPath} replace />;

  // Redirect unauthenticated users if redirectIfAuthenticated is false
  if (!redirectIfAuthenticated && !user) return <Navigate to="/login" replace />;

  return children;
};

export default AuthGuard;