import React, { useState } from "react";
import { useAuth } from "./AuthContext";
import { PrivateRouteProps } from "../../types/interfaces";
import LoginDialog from "./LoginDialog";

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const [dialogOpen, setDialogOpen] = useState<boolean>(!isAuthenticated);

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return isAuthenticated ? (
    <>{children}</>
  ) : (
    <LoginDialog open={dialogOpen} onClose={handleDialogClose} />
  );
};

export default PrivateRoute;
