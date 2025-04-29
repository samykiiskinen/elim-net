
  export interface User {
    email: string;
    password?: string;
    roles: string[];
  }

  export interface Project {
    verification: string;
    date: string;
    accountNo: string;
    accountName: string;
    country: string;
    receiver: string;
    purpose: string;
    decision: string;
    income: string;
    payment: string;
  }

  export interface Song {
    id: number;
    songTitle: string;
    songText: string;
    songKey: number;
  }

  export interface SongFormProps {
    onClose: () => void;
  }

  export interface UserFormProps {
    onClose: () => void;
    onUserAdded: () => void;
  }

  export interface ProjectFormProps {
    onClose: () => void;
    onProjectAdded: () => void;
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

  export interface ProjectDetailsDialogProps {
    open: boolean;
    onClose: () => void;
    project: Project | null;
    slotProps?: any;
  }

  export interface ProtectedRouteProps {
    roles: string[];
    children: React.ReactNode;
    onLoginPrompt: () => void;
  }
