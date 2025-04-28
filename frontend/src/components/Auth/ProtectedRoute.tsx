import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ProtectedRouteProps } from "../../types/interfaces";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles,
  children,
  onLoginPrompt,
}) => {
  const { isAuthenticated, userRoles } = useAuth();

  const hasRequiredRole = () => {
    return roles.some((role) => userRoles.includes(role));
  };

  if (isAuthenticated && hasRequiredRole()) {
    return <>{children}</>;
  } else {
    onLoginPrompt();
    return <Navigate to="/" />;
  }
};

export default ProtectedRoute;
