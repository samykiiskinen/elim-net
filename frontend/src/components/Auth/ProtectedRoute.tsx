import { useAuth } from "./AuthContext";
import { ProtectedRouteProps } from "../../types/interfaces";
import { useEffect } from "react";

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roles,
  children,
  onLoginPrompt,
}) => {
  const { isAuthenticated, userRoles } = useAuth();

  const hasRequiredRole = () => {
    return roles.some((role) => userRoles.includes(role));
  };

  useEffect(() => {
    if (!isAuthenticated || !hasRequiredRole()) {
      onLoginPrompt();
    }
  }, [isAuthenticated, userRoles, roles, onLoginPrompt]);

  if (isAuthenticated && hasRequiredRole()) {
    return <>{children}</>;
  }
  return null;
};

export default ProtectedRoute;
