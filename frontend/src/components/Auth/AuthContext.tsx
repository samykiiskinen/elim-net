import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType } from "../../types/interfaces";
import { jwtDecode } from "jwt-decode";
import { apiCall } from "../../services/apiCall";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userRoles, setUserRoles] = useState<string[]>([]);

  const login = async (token: string, email: string, roles: string[]) => {
    if (typeof token !== "string" || token.trim() === "") {
      console.error("Invalid token provided:", token);
      return;
    }
    localStorage.setItem("accessToken", token);
    localStorage.setItem("userEmail", email);
    try {
      const decodedToken: any = jwtDecode(token);
      setUserEmail(email);
      setUserRoles(roles);

      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
        console.log("Token has expired");
        logout();
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error decoding token:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setUserEmail(null);
    setUserRoles([]);
  };

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const email = localStorage.getItem("userEmail");
    if (token && email) {
      try {
        const decodedToken: any = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          console.log("Token has expired");
          logout();
        } else {
          setIsAuthenticated(true);
          setUserEmail(email);
          setUserRoles(decodedToken.roles || []);
        }
      } catch (error) {
        console.error("Failed to decode token:", error);
        logout();
      }
    } else {
      logout();
    }
  }, []);

  const handleRefreshToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      console.error("No refresh token available");
      return null;
    }
    try {
      const response = await apiCall("/api/users/refresh", "POST", {
        refreshToken,
      });
      if (response && response.accessToken) {
        localStorage.setItem("accessToken", response.accessToken);
        return response.accessToken;
      }
    } catch (error) {
      console.error("Failed to refresh access token", error);
      logout();
    }
    return null;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        userEmail,
        userRoles,
        handleRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
