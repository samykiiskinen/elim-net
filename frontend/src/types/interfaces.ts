
export interface UserClaim {
    value: string;
  }
  
  export interface User {
    email: string;
    password: string;
    claims: UserClaim[];
  }

  export interface Song {
    id: number;
    songTitle: string;
    songText: string;
    songKey: number;
  }

  export interface FormProps {
    onClose: () => void;
  }

  export interface AuthContextType {
      isAuthenticated: boolean;
      login: (token: string) => void;
      logout: () => void;
  }

  export interface PrivateRouteProps {
    children: React.ReactNode;
  }