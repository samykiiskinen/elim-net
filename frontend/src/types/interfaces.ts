
  export interface User {
    email: string;
    password?: string;
    roles: string[];
  }

  export interface Song {
    id: number;
    songTitle: string;
    songText: string;
    songKey: number;
  }

  export interface FormProps {
    onClose: () => void;
    onUserAdded: () => void;
  }

  export interface AuthContextType {
      isAuthenticated: boolean;
      login: (token: string, email: string, roles: string[]) => void;
      logout: () => void;
      userEmail: string | null;
      userRoles: string[];
      handleRefreshToken: () => Promise<string | null>;      
  }

  export interface PrivateRouteProps {
    children: React.ReactNode;
  }

  export interface UserDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    user: User | null;
    slotProps?: any;
  }

  export interface ProtectedRouteProps {
    roles: string[];
    children: React.ReactNode;
    onLoginPrompt: () => void;
  }
